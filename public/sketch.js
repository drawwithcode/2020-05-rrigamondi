let socket = io();

let bckgCol = 'black';
let haloSize = 600;

socket.on('connect', newConnection);

function newConnection(){
  console.log("your id: " + socket.id);
}

function preload(){
  halo = loadImage("./assets/halo.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(bckgCol);
  noStroke();
  socket.on('mouseBroadcast', otherMouse);
}

function draw() {
  sizeVar = int(dist(mouseX, mouseY, pmouseX, pmouseY));
    let message = {
      x: mouseX,
      y: mouseY,
      sizeVar: map(sizeVar, 1, 120, 0, 1, true),
      win_w: width,
      win_h: height
    };
    socket.emit('mouseMoved', message);
}
function otherMouse(data){
  push();
    background(bckgCol);
    data.x = map(data.x,0,data.win_w,0,width, true);
    data.y = map(data.y,0,data.win_h,0,height, true);
    image(halo, data.x-(haloSize/2)*data.sizeVar-2, data.y-(haloSize/2)*data.sizeVar-2, haloSize*data.sizeVar-4, haloSize*data.sizeVar-4);
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  background(bckgCol);
}
