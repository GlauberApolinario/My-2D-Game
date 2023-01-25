const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
console.log(battleZonesData)

canvas.width = 1024;
canvas.height = 576;
// console.log(context);
// context.fillStyle = 'White';
// context.fillRect(0,0, canvas.width, canvas.height);

const collisionsMap = []
for (let i = 0; i< collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 +i))
}

const battleZonesMap = []
for (let i = 0; i< battleZonesData.length; i += 70){
    battleZonesMap.push(battleZonesData.slice(i, 70 +i))
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

const battleZones = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
            battleZones.push(
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

const foregroundImage = new Image();
foregroundImage.src = './Img/foreground.png';

const playerDownImage = new Image();
playerDownImage.src = './Assets/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './Assets/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './Assets/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './Assets/playerRight.png';

const player = new Sprite({
    position: {
        x:canvas.width / 2 - 192 / 4 / 2,
        y:canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites:{
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage

    } 
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
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

const movables = [background, ...boundaries, foreground, ...battleZones]

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
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()
    foreground.draw()

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (let i=0; i<battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =
        (Math.min(
            player.position.x + player.width,
            battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
            player.position.y + player.height,
            battleZone.position.y + battleZone.height
        ) -
            Math.max(player.position.y, battleZone.position.y))
            if (
                collision({
                    object1: player,
                    object2: battleZone
                })&&
                overlappingArea > (player.width * player.height)/2  &&
                Math.random() <0.01
            ){
                console.log('BATTLEZONE')
                break
            }
        }
    }

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up
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
        player.moving = true
        player.image = player.sprites.left
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
        player.moving = true
        player.image = player.sprites.down
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
        player.moving = true
        player.image = player.sprites.right
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
let clicked = false
addEventListener('click', () => {
    if(!clicked){
        audio.Map.play()
        clicked = true
    }
}
)
