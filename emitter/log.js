"use strict";

let settings; try { settings = require('./init'); } catch (e) {}
let chalk; try { chalk = require('chalk'); } catch (e) {}
let moment; try { moment = require('moment'); } catch (e) {}

/**
 * Stuff copied from log4js@2.3.11 and sticky-cluster@0.3.2
 */

const levels = {
    all: [Number.MIN_VALUE, 'ALL', 'grey'],
    trace: [5000, 'TRACE', 'blue'],
    debug: [10000, 'DEGUG', 'cyan'],
    info: [20000, 'INFO', 'green'],
    warn: [30000, 'WARN', 'yellow'],
    error: [40000, 'ERROR', 'red'],
    fatal: [50000, 'FATAL', 'magenta'],
    mark: [9007199254740992, 'MARK', 'grey'], // 2^53
    off: [Number.MAX_VALUE, 'OFF', 'grey']
};

function getCurrentTime() {
    const dt = moment ? moment().format('YYYY-MM-DD HH:mm:ss.SSS') : Date.now();
    return `[${dt}]`;
}

function levelise(lvl) {
    return `[${levels[lvl][1]}]`;
}

function categorise(catOrCats) {
    return Array.isArray(catOrCats) ?
        catOrCats.reduce((s, d, i, a) => `${s}${i ? ' ' : ''}[${d}]`, '') :
        typeof catOrCats === 'string' ? `[${catOrCats}]` :
            `[${catOrCats.toString()}]`;
}

function pidise() {
    return `[${process.pid}]`;
}

function serialise(d) {
    try {
        if (d instanceof Error && d.stack && JSON.stringify(d) === '{}')
            return `type: ${d.constructor.name}, message: ${d.message}, stack trace: ${JSON.stringify(d.stack)}`;
        // else if (d instanceof Object) // so that output doesn't interfere with logging left hand side consistency(?)
        //     return JSON.stringify(d);
        else
            return d;
    } catch (e) {
        return `serialisation threw an exception: ${e}`;
    }
}

module.exports = function (cats, lvl, ...args) {
    // programmer errors, fail quickly
    if (!args.length) throw new SyntaxError('no data to log provided!');
    // is level high enough?
    if (levels[lvl][0] < levels[(((settings || {}).node || {}).log || {}).level || 'info'][0]) return;

    const prepend = chalk ?
        chalk`{${levels[lvl][2]} ${getCurrentTime()} ${pidise()} ${levelise(lvl)} ${categorise(cats)} - }` :
        `${getCurrentTime()} ${levelise(lvl)} ${categorise(cats)} ${pidise()} - `;

    console.log(prepend, ...args.map(serialise));
};
