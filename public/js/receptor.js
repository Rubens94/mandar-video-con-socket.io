const socket = io();

socket.on('stream', (image) => {
    let img = document.getElementById('play');
    img.src = image;
})