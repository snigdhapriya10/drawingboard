const canvas = document.querySelector("canvas"),
toolBtns=document.querySelectorAll(".tool"),
fillColor=document.querySelector("#fill-color"),
sizeSlider=document.querySelector("#size-slider"),
colorBtns=document.querySelectorAll(".colors .option"),
colorPicker=document.querySelector("#color-picker"),
clearCanvas=document.querySelector(".clear-canvas"),
saveImg=document.querySelector(".save-img"),
ctx=canvas.getContext("2d");
//global variables with default value
let prevMouseX,prevMouseY, snapshot,
isDrawing=false,
selectedTool = "brush",
brushWidth=5,
selectedColor="#000";
const setCanvasBackground=()=>{
    //setting whole canvas background to white, so the dl img background will be white 
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=selectedColor; //setting fillstyle to the selectedColor same as brush color
}

window.addEventListener("load",() => {
    //setting canvas width/height..offsetwidth/height returns viweable width/height of an element
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    setCanvasBackground();
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

const drawTri=(e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY); //moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX,e.offsetY); //creating first line according to mouse pointer
    ctx.lineTo(prevMouseX*2-e.offsetX, e.offsetY) //creating bottom line of triangle 
    ctx.closePath(); //closing path of a triangle so the third line draw automatically 
    fillColor.checked? ctx.fill():ctx.stroke();   
}
const startDraw =(e)=>{
    isDrawing=true;
    prevMouseX=e.offsetX; //passing current mouseX position as preMouseX value
    prevMouseY=e.offsetY;
    ctx.beginPath(); //creating new path to draw
    ctx.lineWidth=brushWidth; //passing brushwidth as linewidth
    ctx.strokeStyle=selectedColor; //passing selectedColor as stroke style
    ctx.fillStyle=selectedColor; //passing selectedColor as fill style
    //copying canvas data and passing as snapshot value.. this avoids dragging the image
    snapshot=ctx.getImageData(0 , 0,canvas.width,canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return; //if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); //adding copied canvas data on to this canvas
    
    if (selectedTool ==="brush" || selectedTool ==="eraser"){ 
        ctx.strokeStyle=selectedTool==="eraser"?"#fff":selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY); //line where mouse pointer goes
    ctx.stroke(); //fills line with colour
    }
    else if(selectedTool === "rectangle"){
        drawRect(e);
    }
    else if(selectedTool === "circle"){
        drawCircle(e);
    }
    else{
        drawTri(e);
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

sizeSlider.addEventListener("change",()=>brushWidth=sizeSlider.value); //passing slider value as brush size 

colorBtns.forEach(btn => {
    btn.addEventListener("click",()=>{ //adding click event to all color button 
     //removing active class from the previous option and adding on current clicked option
     document.querySelector(".options .selected").classList.remove("selected");
     btn.classList.add("selected");
     //passing selected btn background color as selectedcolor value
     selectedColor=window.getComputedStyle(btn).getPropertyValue("background-color");
     console.log("Selected color:", color); // Debug log
     selectedColor = color; // Correct assignment
    });
});
colorPicker.addEventListener("change",()=>{
    colorPicker.parentElement.style.background=colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height); //clear whole canvas
    setCanvasBackground(); 
});


saveImg.addEventListener("click",()=>{
    const link=document.createElement("a");//creating <a> element
    link.download = `${Date.now()}.jpg`;//passing current date as link download value
    link.href=canvas.toDataURL(); //passing canvasdata as link href value
    link.click(); //clicking link to dl
});

canvas.addEventListener("mousedown",startDraw);
canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mouseup",()=> isDrawing=false);