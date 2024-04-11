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
let j= 0;
let k= 0;
let kill = undefined
let killplant = false

class plants{
    constructor(){
        this.group = 1;
        this.x = 10;
        this.y = 10; 
        this.size = 2;
        this.color = 'green';
        this.age = 0
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
    seeds(){
        if(this.group === 1 && this.age > 600){
            this.age = Math.random() *10
            this.size = 4
            let rx = Math.random() *100 -50;
            let ry = Math.random() *100 -50;
            newx = this.x + rx
            newy = this.y + ry
            if(newx> 0 && newx< 1500){
                if(newy >0 && newy < 1500){
                    newseed(1, newx, newy, 'green')
                }
            }
        }
        else if(this.group === 2 && this.age > 1400){
            this.age = Math.random() *10
            this.size = 10
            let rx = Math.random() *150 -75;
            let ry = Math.random() *150 -75;
            newx = this.x + rx
            newy = this.y + ry
            if(newx> 0 && newx< 1500){
                if(newy >0 && newy < 1500){
                    newseed(2, newx, newy, 'pink')
                }
            }
        }
        else if(this.group === 3 && this.age > 2000){
            this.age = Math.random() *10
            if(this.size !== 62){
                this.size = this.size + 10
            }
            let rx = Math.random() *500 -250;
            let ry = Math.random() *500 -250;
            newx = this.x + rx
            newy = this.y + ry
            if(newx> 0 && newx< 1500){
                if(newy >0 && newy < 1500){
                    newseed(3, newx, newy, 'brown')
                }
            }
        }
    }
    
    // colisions so plants arent ontop of eachother
    // reproducing that also checks that location is within the borders
    // trees growing rather large
    // colision detection for trees so only squirrels can go in a tree
}

function newseed(group, x, y, color){
    let seed1 = new plants();
    seed1.group = group
    seed1.x = x
    seed1.y = y 
    seed1.color = color;
    allplants.push(seed1);
}
// class for animals

class animal{
    constructor(){
        this.group = 4
        this.age = 0
        this.x = 10
        this.y = 10 
        this.size =  20
        this.speedx = Math.random() *3 -1.5
        this.speedy = Math.random() *3 -1.5
        this.color = 'white'
    }
    update(){
        this.age += 1
        this.x += this.speedx 
        this.y += this.speedy 
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
    walls(){
        if((this.x - this.size) < 0){
            this.speedx = this.speedx * -1;
            this.x = 0 + this.size
        }
        else if((this.x + this.size) > 1500){
            this.speedx = this.speedx * -1;
            this.x = 1500 - this.size;
        }
        else if((this.y - this.size) < 0){
            this.speedy = this.speedy * -1;
            this.y = 0 + this.size;
        }
        else if((this.y + this.size) > 1500){
            this.speedy = this.speedy * -1;
            this.y = 1500 - this.size;
        }
    }
    // make bunnies eat grass and animals
    // size slowly shrinks while they eat to get big and reproduce
    // animalcolisions so animals eat eachother
}

canvas.addEventListener('click', function(event){
    newx = event.clientX - canvasrect.left + window.scrollX
    newy = event.clientY  - canvasrect.top + window.scrollY
    switch(spawnchoice){
        case 1:
            let grass1 = new plants();
            grass1.x = newx
            grass1.y = newy
            grass1.group = 1
            grass1.color = 'green';
            allplants.push(grass1)
        break;
        case 2:
            let flower1 = new plants();
            flower1.x = newx
            flower1.y = newy
            flower1.group = 2
            flower1.color = 'pink'
            allplants.push(flower1)
        break;
        case 3:
            let tree1 = new plants();
            tree1.x = newx
            tree1.y = newy
            tree1.group = 3
            tree1.color = 'brown'
            allplants.push(tree1);
        break;
        case 4:
            let bunny1 = new animal()
            bunny1.x = newx 
            bunny1.y = newy 
            bunny1.group = 4
            bunny1.color = 'white'
            allanimals.push(bunny1);
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

function plantcolisions(){
    // plants shouldnt be too on top of eachother
    // nothing under atree
    for(k=0; k< allplants.length; k++)
    if(j === k){}
    else if(j === allplants.length){}
    else if(k === allplants.length){} // when plants are killed it messes up the count
    else{
        let dx = allplants[j].x - allplants[k].x;
        let dy = allplants[k].y - allplants[k].y;
        let distance = Math.sqrt(dx * dx + dy * dy)
        let radii = allplants[j].size + allplants[k].size 
        if(distance > radii){}
        else if(distance === radii || distance < radii){
            // decide which one to kill
            if(this.age > allplants[k].age){
                allplants.splice(k,1) // end the loop?
            }
            else{
                allplants.splice(j,1)
            }
        }
    }

}

/*function killstuff(){
    if(killplant === true){
        allplants.splice(kill,1);
        killplant = false
    }
}*/

function itterate(){
    for(j=0; j< allplants.length; j++){
        allplants[j].draw();
        allplants[j].update();
        allplants[j].seeds();
        //plantcolisions(); // seems random
    }
    for(j=0; j< allanimals.length; j++){
        allanimals[j].update()
        allanimals[j].walls()
        allanimals[j].draw()
    }
    //killstuff();
}
// count time passing in seconds, 
//give things an age to manage growth and reproduction speeds
function animate(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    itterate()
    // fix the layering
    // add first animals for population controll
    requestAnimationFrame(animate); 
}
animate();