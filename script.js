const canvas = document.querySelector("canvas"),
toolBtns=document.querySelectorAll(".tool"),
fillColor=document.querySelector("#fill-color"),
ctx=canvas.getContext("2d");
//global variables with default value
let prevMouseX,prevMouseY, snapshot,
isDrawing=false,
selectedTool = "brush",
brushWidth=5;

window.addEventListener("load",() => {
    //setting canvas width/height..offsetwidth/height returns viweable width/height of an element
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

const drawRect=(e)=>{
    //if fillcolor isnt checked draw a rect with border else draw with bg 
    if(!fillColor.checked){
        //creating circle according to mouse pointer
        return ctx.strokeRect(e.offsetX,e.offsetY, prevMouseX - e.offsetX, prevMouseY-e.offsetY);
    }
    ctx.fillRect(e.offsetX,e.offsetY, prevMouseX - e.offsetX, prevMouseY-e.offsetY);
}
const drawCircle=(e)=>{
    ctx.beginPath(); //creating new path to draw circle
    //getting radius for circle according to the mouse pointer
    let radius=Math.sqrt(Math.pow((prevMouseX-e.offsetX),2) + Math.pow((prevMouseY-e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2*Math.PI); //creating circle according to the mouse pointer
    fillColor.checked? ctx.fill():ctx.stroke(); //if fillcolor is checked fill circle else draw border circle 
}
    
const startDraw =(e)=>{
    isDrawing=true;
    prevMouseX=e.offsetX; //passing current mouseX position as preMouseX value
    prevMouseY=e.offsetY;
    ctx.beginPath(); //creating new path to draw
    ctx.lineWidth=brushWidth; //passing brushwidth as linewidth
    //copying canvas data and passing as snapshot value.. this avoids dragging the image
    snapshot=ctx.getImageData(0 , 0,canvas.width,canvas.height);
}


const drawing = (e) => {
    if (!isDrawing) return; //if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); //adding copied canvas data on to this canvas
    
    if (selectedTool ==="brush"){ 
    ctx.lineTo(e.offsetX, e.offsetY); //line where mouse pointer goes
    ctx.stroke(); //fills line with colour
    }
    else if(selectedTool === "rectangle"){
        drawRect(e);
    }
    else if(selectedTool === "circle"){
        drawCircle(e);
    }
    
}

toolBtns.forEach(btn => {
    btn.addEventListener("click",()=>{ //adding click event to all tool option 
        //removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});
canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=> isDrawing=false);