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
    let message = {
      x: mouseX,
      y: mouseY,
      mX: movedX,
      mY: movedY,
      win_w: width,
      win_h: height
    };
    socket.emit('mouseMoved', message);
}

function otherMouse(data){
  let sizeVar;

  push();
    background(bckgCol);

    sizeVar = int(dist(0, 0, data.mX, data.mY));

    data.x = map(data.x,0,data.win_w,0,width, true);
    data.y = map(data.y,0,data.win_h,0,height, true);
    image(halo, data.x-(haloSize/2)*sizeVar, data.y-(haloSize/2)*sizeVar, haloSize*sizeVar, haloSize*sizeVar);
  pop();
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  background(bckgCol);
}
