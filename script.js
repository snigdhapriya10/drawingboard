const canvas = document.querySelector("canvas"),
ctx=canvas.getContext("2d");

const drawing = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY); //line where mouse pointer goes
    ctx.stroke(); //fills line with colour
}
canvas.addEventListener("mousemove",drawing);