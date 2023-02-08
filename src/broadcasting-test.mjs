import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data, isBinary) {
    broadcast(data, isBinary);
  });

  function broadcast(data, isBinary) {
      wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data, { binary: isBinary });
          }
        });
  }

  setInterval(() => {
    broadcast(JSON.stringify(getSocketState()), false);
  }, 5000)
});

function getSocketState() {
    let dataState = [];
    wss.clients.forEach((client => {
        console.log(JSON.stringify(client));
        dataState.push(client);
    }));
    return dataState;
}

