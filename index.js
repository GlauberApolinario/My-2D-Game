const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;
console.log(context);

context.fillStyle = 'White'
context.fillRect(0,0, canvas.width, canvas.height)