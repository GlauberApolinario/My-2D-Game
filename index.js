const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
// console.log(context);
// context.fillStyle = 'White';
// context.fillRect(0,0, canvas.width, canvas.height);

const collisionsMap = []
for (let i = 0; i< collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 +i))
}

class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw(){
        context.fillStyle = 'rgba(255,0,0,0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

const offset = {
    x: -1020,
    y: -570
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
            boundaries.push(
                new Boundary({position: {
                    x:j * Boundary.width + offset.x,
                    y:i * Boundary.height + offset.y
                }
            })
        )
    })
});

const image = new Image();
image.src = './Img/Island Map.png';

const playerImage = new Image();
playerImage.src = './Assets/playerDown.png';

class Sprite {
    constructor({position, velocity, image, frames = {max: 1}}){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        
    }

    draw(){
        context.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}


const player = new Sprite({
    position: {
        x:canvas.width / 2 - 192 / 4 / 2,
        y:canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
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

const movables = [background, ...boundaries]

function collision({object1, object2}) {
    return(
        object1.position.x + object1.width >= object2.position.x &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.y + object1.height >= object2.position.y
    )
}

// boundaries.forEach(boundary => {
//     boundary.draw()
//     if (
//         collision({
//             object1: player,
//             object2: boundary
//         })
//     )
// })


function animation () {
    window.requestAnimationFrame(animation)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()

    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                collision({
                    object1: player,
                    object2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }

        if(moving)

        movables.forEach((movable) => {
            movable.position.y +=3
        })
    }else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                collision({
                    object1: player,
                    object2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.x +=3
        })
    }else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                collision({
                    object1: player,
                    object2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y -3
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.y -=3
        })
    }else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if(
                collision({
                    object1: player,
                    object2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.x -=3
        })
    }
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

