const canvas = document.getElementById("main");
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
let plants = [];
let animals = [];
let spawngrass = document.getElementById('grass');
let spawnflower = document.getElementById('flowers');
let spawntrees = document.getElementById('trees');
let spawnbunnies = document.getElementById('bunnies');
let spawnbutterfly = document.getElementById('butterflies');
let spawnsquirel = document.getElementById('squirels');
let spawnfrog = document.getElementById('frogs');
let spawnfox = document.getElementById('fox');
let spawnsnake = document.getElementById('snakes');
let spawnflies = document.getElementById('flies');  

class flower{
    constructor(){
        this. x = 10;
        this.y = 10; 
        this.size = 10;
        this.color = 'pink';
    }
    update(){
        this.age += 1;
    }
    draw(){
        ctx.fillstyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function spawn(l){
    switch(l){
        case 1: 
            let flower1 = new flower();
            plants.push(flower1)
        break;
    }
}

function itterate(){
    for(j=0; j< plants.length; j++){
        plants[j].draw();
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    itterate()
    requestAnimationFrame(animate); 
}