const canvas = document.getElementById("main");
var ctx = canvas.getContext('2d');
var canvasrect = canvas.getBoundingClientRect();
let grass = [];
let flowers = [];
let trees = [];
let bunnies = [];
let butterfly = [];
let squirel = [];
let frog = [];
let fox = [];
let snake = [];
let flies = [];
let allplants = grass.concat(flowers, trees)
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
let touching = false;
let spawnbuttons = [];
spawnbuttons.push(spawngrass, spawnflower, spawntrees, spawnbunnies, spawnbutterfly, spawnsquirel, spawnfrog, spawnfox, spawnsnake, spawnflies)

function glowbutton(){
    spawnbuttons.forEach(function(element){
        element.style.backgroundColor = 'lightblue'
    })
    switch(spawnchoice){
        case 1:
            spawngrass.style.backgroundColor = 'blue'
        break;
        case 2:
            spawnflower.style.backgroundColor = 'blue'
        break;
        case 3:
            spawntrees.style.backgroundColor = 'blue'
        break;
        case 4:
            spawnbunnies.style.backgroundColor = 'blue'
        break;
        case 5:
            spawnbutterfly.style.backgroundColor = 'blue'
        break;
        case 6:
            spawnsquirel.style.backgroundColor = 'blue'
        break;
        case 7:
            spawnfrog.style.backgroundColor = 'blue'
        break;
        case 8:
            spawnsnake.style.backgroundColor = 'blue'
        break;
        case 9:
            spawnfox.style.backgroundColor = 'blue'
        break;
        case 10:
            spawnflies.style.backgroundColor = 'blue'
        break;
    }
}

// seperate arrays for each group
class plants{ 
    constructor(group, x, y, color){ //put arguements here and create seeds this way
        this.group = a;
        this.x = 10;
        this.y = 10; 
        this.size = 2;
        this.color = 'green';
        this.age = Math.random() *100
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
   /* seeds(){
        if( this.age > 600){
            this.age = Math.random() *100
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
            this.age = Math.random() *100
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
            this.age = Math.random() *100
            if(this.size < 70){
                this.size = this.size + 10
                for(k=0; k< allplants.length; k++){
                    let dx = this.x - allplants[k].x
                    let dy = this.y - allplants[k].y 
                    let distance = Math.sqrt(dx * dx + dy * dy)
                    let radii = this.size + allplants[k].size
                    if(this.group === allplants[k].group){}
                    else if(distance < radii){
                        allplants.splice(k,1)
                    }
                }
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
    }*/
    
    // colisions so plants arent ontop of eachother
    // reproducing that also checks that location is within the borders
    // trees growing rather large
    // colision detection for trees so only squirrels can go in a tree
}

function seedgrass(){
    grass.forEach(function(g){
        if(g.age > 600){
            g.age = Math.random *100
            g.size = 4
            let rx = Math.random() *100 -50;
            let ry = Math.random() *100 -50;
            newx = g.x + rx
            newy = g.y + ry
                    let seed = newseed(1,newx,newy,'green')
                    if( touching = false){
                        grass.push(seed)
                    }
                
            
        }
    })
}

function distance(thing1, thing2){
    // measure distence between two things so i dont have to wright this a dozen times
    let dx = thing1.x - thing2.x;
    let dy = thing1.y - thing2.y;
    let distance = Math.sqrt(dx*dx + dy*dy)
    let radii = thing1.size + thing2.size;
    touching = false
    if(distance < radii){
        touching = true
    }
}

function newseed(group, x, y, color){
    if(x>0 && x<1500){
        if(y>0 && y<1500){
            let seed1 = new plants(group, x, y, color)

            for(a=0; a< allplants.length; a++){
                distance(seed1, allplants[a])
                if(touching = true) return // maybe count up if still false, if not working
            }

        }
    }

    let seed1 = new plants();
    seed1.group = group
    seed1.x = x
    seed1.y = y 
    seed1.color = color;
    let print = true;
    for(k=0; k< allplants.length; k++){
        let print = distance(seed1, allplants[k])
        if(print === true)return
        else{
            switch(seed1.group){
                case 1: 
                    grass.push(seed1)
                break;
                case 2:
                    flowers.push(seed1)
                break;
                case 3:
                    trees.push(seed1)
                break;
            }

        }
        /*let dx = seed1.x - allplants[k].x
        let dy = seed1.y - allplants[k].y 
        let distance = Math.sqrt(dx * dx + dy * dy)
        let radii = seed1.size + allplants[k].size
        if(distance < radii){
           print = false;
        }*/
    }
    if(print === false){
        allplants.push(seed1); 
    }
}


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
        this.hunger = 100
        // hunger, stops eating when full
    }
    update(){
        this.age += 1
        this.x += this.speedx 
        this.y += this.speedy 
        this.hunger -= .001
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
    // make bunnies eat grass and flowers
    // reprooduce when age and hunger is above a certain point
    // animalcolisions so animals eat eachother
}

function babies(){ // just for bunnies?
    // use groups to only check same spiecies
    bunnies.forEach(function(j){
       // compare distances an have them reproduce if touching
       for(k= 1; k<bunnies.length; k++){
       if(j === bunnies[k]){}
       else{
       let dx = j.x - bunnies[k].x
       let dy = j.y - bunnies[k].y
       let distance = Math.sqrt(dx*dx + dy*dy)
       let radii = j.size + bunnies[k].size 
       if(distance< radii){
        // problem is i only want one baby
        // check age check hunger check recent breeding
        // maybe an adult age and a breeding age when they breed it goes down to adult age not baby age
        if(j.age > 100 && bunnies[k].age > 100){
            // need to check hunger
            let bunny1 = new animal()
            bunny1.x = j.x 
            bunny1.y = j.y
            bunny1.group = 4
            bunny1.color = 'white'
            bunnies.push(bunny1);
            j.age = 10
            bunnies[k].age = 10
        }
       }
       }
       }

    })

}
// next they need to die!!
// hunger gradually decreases, 
// when hungry they kill and eat grass, 
// when starve they die
function bunnyeats(){
    bunnies.forEach(function(b){
        if(b.hunger < 99){
            for(g=0; g< grass.length; g++){
                let touching = distance(b, grass[g])
                console.log(touching)
            }
           /* grass.forEach(function(g){
               let touching = distance(b, g)
               if(touching === true){
                grass.splice(g,1)
                b.hunger +=1
               }
            })
            flowers.forEach(function(f){
                let touching = distance(b, f)
                if(touching === true){
                    flowers.splice(f,1)
                    b.hunger +=3
                }
            })*/
        }
    })
}

canvas.addEventListener('click', function(event){
    newx = event.clientX - canvasrect.left + window.scrollX
    newy = event.clientY  - canvasrect.top + window.scrollY
    switch(spawnchoice){
        case 1:
            let grass1 = new plants(1, newx, newy, 'green');
            grass.push(grass1)
        break;
        case 2:
            let flower1 = new plants(2,newx, newy, 'pink');
            flowers.push(flower1)
        break;
        case 3:
            let tree1 = new plants(3, newx, newy, 'brown');
            trees.push(tree1);
        break;
        case 4:
            let bunny1 = new animal()
            bunny1.x = newx 
            bunny1.y = newy 
            bunny1.group = 4
            bunny1.color = 'white'
            bunnies.push(bunny1);
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
    // nothing under a tree
    for(k=0; k< allplants.length; k++)
    if(j === k){}
    else if(j === allplants.length){}
    else if(k === allplants.length){} // when plants are killed it messes up the count
    else{
        let dx = allplants[j].x - allplants[k].x;
        let dy = allplants[j].y - allplants[k].y;
        let distance = Math.sqrt(dx * dx + dy * dy)
        let radii = allplants[j].size + allplants[k].size /2;
        if(distance > radii){}
        else if(distance === radii || distance < radii){
            // decide which one to kill
            if(this.age > allplants[k].age){
                //allplants.splice(k,1) // end the loop?
                allplants[k].color = 'black'
            }
            else{
                //allplants.splice(j,1)
                allplants[j].color = 'black'
            }
        }
    } // still killing way too many

}

function killstuff(){
   for(j=0; j< allplants.length; j++){
    if(allplants[j].color === 'black'){
        allplants.splice(j,1)
        break;
    }
   }
}

function itterate(){
    
    let allanimals = bunnies.concat(butterfly, squirel, frog, fox, snake, flies)
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
    babies();
    bunnyeats();
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