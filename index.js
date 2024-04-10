const canvas = document.getElementById("main");
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
let allplants = [];
let allanimals = [];
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
let spawnchoice = 1; 

class plants{
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
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
    // reproducing that also checks that location is within the borders
    // trees growing rather large
    // colision detection for trees so only squirrels can go in a tree
}
// class for animals

canvas.addEventListener('click', function(event){
    newx = event.clientX - canvasrect.left + window.scrollX
    newy = event.clientY  + window.scrollY
    switch(spawnchoice){
        case 1:
            let grass1 = new plants();
            grass1.x = newx
            grass1.y = newy
            grass1.color = 'green';
            allplants.push(grass1)
        break;
        case 2:
            let flower1 = new plants();
            flower1.x = newx
            flower1.y = newy
            allplants.push(flower1)
        break;
        case 3:
            let tree1 = new plants();
            tree1.x = newx
            tree1.y = newy
            tree1.color = 'brown'
            tree1.size = 60
            allplants.push(tree1);
        break;
        case 4:
        break;
        case 5:
        break;
        case 6:
        break;
        case 7:
        break;
        case 8:
        break;
        case 9:
        break;
        case 10:
        break;
        
    }
})

function itterate(){
    for(j=0; j< allplants.length; j++){
        allplants[j].draw();
    }
}
// count time passing in seconds, 
//give things an age to manage growth and reproduction speeds
function animate(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    itterate()
    requestAnimationFrame(animate); 
}
animate();