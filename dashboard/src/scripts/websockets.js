import io from 'socket.io-client';

let nodeServer = process.env.NODE_URL;

let activeSocket = null

console.log(nodeServer)
export function getSocket() {
    if(!activeSocket) {
        activeSocket = io(
            nodeServer, 
            {
                'reconnection': true,
                'reconnectionDelay': 2000,
                'reconnectionAttempts': (24 * 60 * 60),
                'reconnectionDelayMax': 5000,
                'timeout': 10000,
                'transports': ['websocket']
            }
        );

        activeSocket.emit('session:subscribe', {sessionId: 591});
    }
    return activeSocket;
}