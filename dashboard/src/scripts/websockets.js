import io from 'socket.io-client';

let socket = null;

export function getSocket() {
    if(!socket) {
        socket = io(
            'http://localhost:8001/', // Move to .env with proper url 
            {
                'reconnection': true,
                'reconnectionDelay': 2000,
                'reconnectionAttempts': (24 * 60 * 60),
                'reconnectionDelayMax': 5000,
                'timeout': 10000,
                'transports': ['websocket']
            }
        );
    }
    return socket;
}