const canvas = document.querySelector('#preview');
const context = canvas.getContext('2d'); //  crear imagenes en 2 dimensiones
const btn = document.querySelector('#btn');
canvas.style.display = 'none';

canvas.width = 512;
canvas.height = 384;

context.width = canvas.width;
context.height = canvas.height;

const video = document.querySelector('#video');

const socket = io();

function publicarMensaje(msg){
    document.querySelector('.status').innerText = msg;
}

function loadCamara(stream){
    video.srcObject = stream;
    publicarMensaje('camara funcionando');
}

function errorCamara(){
    publicarMensaje('camara ha fallado');
}

function verVideo(video, context){
    context.drawImage(video, 0,0, context.width, context.height);
    socket.emit('stream', canvas.toDataURL('image/webp'));
}

btn.addEventListener('click', () => {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if(navigator.getUserMedia){
        navigator.getUserMedia({video:true}, loadCamara, errorCamara)
    }

    const intervalo = setInterval(() => {
        verVideo(video, context);
    }, 30); // Entre menos intervalo de tiempo, más recursos consume el servidor pero mejor se ve el movimiento en vivo del video
});