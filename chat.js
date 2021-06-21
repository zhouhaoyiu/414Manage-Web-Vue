const ws = require('ws');

const server = new ws.Server({
    port:8000
})

server.on('open',handleOpen);
server.on('close',handleClose);
server.on('error',handleError);
server.on('connection',handleConnection);

function handleOpen(){
    console.log('BE:WebSocket open');
}
function handleClose(){
    console.log('BE:WebSocket close');
}
function handleError(){
    console.log('BE:WebSocket error');
}
function handleConnection(e){
    console.log('BE:WebSocket connection');
    e.on('message',handleMessage);
}
function handleMessage(msg){
    console.log(msg);
    console.log(server.clients);
    server.clients.forEach((c)=> {
        c.send(msg);
    })
}