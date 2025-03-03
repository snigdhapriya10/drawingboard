const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawing = (e) => {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

const startDrawing = (e) => {
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    canvas.addEventListener("mousemove", drawing);
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", drawing);
});
