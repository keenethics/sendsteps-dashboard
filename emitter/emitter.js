"use strict";

const io = require("socket.io-client");
const fs = require("fs");
const log = require('./log');

class Emitter {
    constructor() {
        this.conf = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));
        log('socketio', 'info', 'connecting to ' + this.conf.nodeJsServer);
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // @TODO replace this, see nodejs repo
        this.socket = io(this.conf.nodeJsServer, {
            'reconnection': true,
            'timeout': 20000,
            'reconnectionAttempts': 10000000000000,
            'transports': ['websocket'],
            'secure': true
        });

        this.socket.on("connect", (e) => {
            log('socketio', 'info', "connected, starting emit loop");
            this.connected = true;
            this.emitEvents();
        });

        this.socket.on("disconnect", (e) => {
            this.connected = false;
            log('socketio', 'info', "disconnect", e);
        });

        this.socket.on("reconnect", (e) => {
            log('socketio', 'info', "reconnect", e);
        });

        this.socket.on("reconnect_attempt", (e) => {
            this.connected = false;
            log('socketio', 'warn', "reconnect_attempt", e);
        });

        this.socket.on("reconnecting", (e, attemptNumber) => {
            this.connected = false;
            log('socketio', 'warn', "reconnecting", e);
        });

        this.socket.on("error", (e, errorData) => {
            log('socketio', 'error', "error", e);
        });

        this.socket.on("reconnect_error", (e) => {
            log('socketio', 'error', "reconnect_error", e.message);
        });

        this.socket.on("reconnect_failed", (e) => {
            log('socketio', 'error', "reconnect_failed", e);
        });

        this.filePath = '../api-nova/emitter/events.log';
        if (!fs.existsSync(this.filePath)) {
            log(['init', 'events'], 'info', 'creating ' + this.filePath);
            fs.writeFileSync(this.filePath, '');
        }
    }

    emitEvents() {
        if (!this.connected) {
            log(['events', 'socketio'], 'warn', "stopped emitting till connection returns");
            return;
        }

        const contents = this.readFileContents();
        const lines = contents.split("\n");
        const numEvents = Math.floor(lines.length / 2);

        const currentdate = new Date();
        const datetime = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
            
        if (numEvents) {
            for (let i = 0; i < lines.length; i += 2) {
                const eventName = lines[i];
                const eventData = lines[i + 1];
                if (eventName && eventData) {
                    log(['events', 'socketio'], 'trace', datetime + ' - ' + eventName + ' ' + (eventData.data && eventData.data.length ? '(' + eventData.data.length + ')' : ''));
                    this.socket.emit(eventName, JSON.parse(eventData));
                }
            }
        }
        //process.nextTick(            this.emitEvents.bind(this));
        setTimeout(this.emitEvents.bind(this), 150);
    }

    readFileContents() {
        const contents = fs.readFileSync(this.filePath, 'utf-8');
        fs.truncateSync(this.filePath);
        return contents;
    }
}

new Emitter();
