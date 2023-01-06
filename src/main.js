const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');
let width, height;

document.body.onclick = () => {
    optObj.color = randomColor()
}

function setSize() {
    width = canvas.width = window.innerWidth || document.body.clientWidth;
    height = canvas.height = window.innerHeight || document.body.clientHeight;
}
setSize()
window.onresize = setSize

var x = Math.random() * 100,
    y = Math.random() * 100

/* function draw() {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,0,0,1)'
    ctx.moveTo(x, y)
    x += Math.random() * width
    y += Math.random() * height
    ctx.lineTo(x, y)
    ctx.stroke()
}
draw() */


let randomColor = () => {
    let randomNumber = () => {
        return Math.floor(Math.random() * 255)
    }
    let red = randomNumber().toString() + ','
    let green = randomNumber().toString() + ','
    let blue = randomNumber().toString()
    let rgb = red + green + blue
    return rgb
}

randomColor()

var optObj = {
    color: '255,0,0',
    count: 400,
}

let mouseInfo = {
    x: null,
    y: null,
    max: 20000
}

window.onmousemove = (e) => {
    mouseInfo.x = e.clientX
    mouseInfo.y = e.clientY
}


for (var arr = [], i = 0; i < optObj.count; i++) {
    var x = Math.random() * width
    y = Math.random() * height
    ranx = 2 * Math.random() - 1
    rany = 2 * Math.random() - 1
    arr.push({
        x: x,
        y: y,
        ranx: ranx,
        rany: rany,
        max: 6000
    })
}

var newArr = arr.concat(mouseInfo)

function draw() {
    ctx.clearRect(0, 0, width, height)
    var nextItem,
        nextIndex,
        lineMax,
        lineX,
        lineY,
        lineRan;
    arr.forEach((item, index) => {
        item.x += item.ranx
        item.y += item.rany

        item.ranx *= item.x > width || item.x < 0 ? -1 : 1;
        item.rany *= item.y > height || item.y < 0 ? -1 : 1;
        for (nextIndex = index + 1; nextIndex < newArr.length; nextIndex++) {
            nextItem = newArr[nextIndex]

            if (nextItem.x !== null && nextItem.y !== null) {
                lineX = item.x - nextItem.x
                lineY = item.y - nextItem.y

                lineRan = lineX * lineX + lineY * lineY
                lineMax = (nextItem.max - lineRan) / nextItem.max;
            }
            if (lineRan < nextItem.max) {
                if (mouseInfo.x !== null && mouseInfo.y !== null) {
                    if (nextItem === mouseInfo && lineRan >= nextItem.max / 2) {
                        item.x -= .03 * lineX, item.Y -= .03 * lineY
                    }
                }

                ctx.beginPath()
                ctx.lineWidth = lineMax
                ctx.strokeStyle = "rgba(" + optObj.color + "," + (lineMax + 0.8) + ")"
                ctx.moveTo(item.x, item.y)
                ctx.lineTo(nextItem.x, nextItem.y)
                ctx.stroke()
            }
        }
    })
    setTimeout(draw, 30)
}
setTimeout(() => {
    draw()
}, 100)

/* if (mouseInfo.x !== null || mouseInfo.y !== null) {
    setTimeout(() => {
        draw()
    }, 100)
}

setInterval(() => {
    if (mouseInfo.x !== null && mouseInfo.y !== null) {
        setTimeout(() => {
            draw()
        }, 100)
    } else {

    }
}, 1000) */