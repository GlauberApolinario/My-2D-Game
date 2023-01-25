const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
// console.log(context);

context.fillStyle = 'White';
context.fillRect(0,0, canvas.width, canvas.height);

const image = new Image();
image.src = './Img/Island Map.png';

const playerImage = new Image();
playerImage.src = './Assets/playerDown.png';

class Sprite {
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }

    draw(){
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -1020,
        y: -520
    },
    image: image
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

function animation () {
    window.requestAnimationFrame(animation)
    background.draw()
    context.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

    if (keys.w.pressed && lastKey === 'w') background.position.y += 3
    else if (keys.a.pressed && lastKey === 'a') background.position.x += 3
    else if (keys.s.pressed && lastKey === 's') background.position.y -= 3
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= 3
}

animation()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    // console.log(e.key)
    switch (e.key){
        case 'w':
            console.log('pressed w')
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            console.log('pressed a')
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            console.log('pressed s')
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            console.log('pressed d')
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    // console.log(e.key)
    switch (e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

