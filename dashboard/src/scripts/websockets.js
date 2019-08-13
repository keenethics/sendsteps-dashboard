import io from 'socket.io-client';

export function getSocket() {
    const webSocket = io(
        'https://node.sendsteps.com:8001', 
        {
            'reconnection': true,
            'reconnectionDelay': 2000,
            'reconnectionAttempts': (24 * 60 * 60),
            'reconnectionDelayMax': 5000,
            'timeout': 10000,
            'transports': ['websocket']
        }
    );
    webSocket.emit('vote:updated', {});

    // webSocket.on('session:subscribed', data => {
    //     console.log('session:subscribed', data);
    // });
    return webSocket;
}