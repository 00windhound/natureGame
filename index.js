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
let allplants = [];
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

class plants{ 
    constructor(group, x, y, color){
        this.group = group;
        this.x = x;
        this.y = y; 
        this.size = 2;
        this.color = color;
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
}

function seedgrass(){
    grass.forEach(function(g){
        if(g.age > 640){
            g.age = Math.random() *100
            g.size = 4
            let rx = Math.random() *100 -50;
            let ry = Math.random() *100 -50;
            newx = g.x + rx
            newy = g.y + ry
            let seed = new plants(1,newx, newy,'green')
            let approved = seedverify(seed)
            if( approved === true){ 
                grass.push(seed)
            }
        }
    })
}

function seedflower(){
    flowers.forEach(function(f){
        if(f.age > 1400){
            f.age = Math.random() *100;
            f.size = 10;
            for(a=0; a<grass.length; a++){
                let touching = colision(f, grass[a])
                if(touching === true){
                    grass.splice(a,1) // it broke killing a hell of a lot more than 1
                }
            }
            let rx = Math.random() *150 -75;
            let ry = Math.random() *150 -75;
            newx = f.x + rx // can i make the math in less lines
            newy = f.y + ry
            let seed = new plants(2, newx, newy, 'pink')
            let approved = seedverify(seed)
            if(approved === true){
                flowers.push(seed)
            }
        }
    })
}

function seedtrees(){
    trees.forEach(function(t){
        if(t.size < 100){
            t.size += .02
            // kill touching plants
            for(a=0; a< grass.length; a++){
                let touching = colision(t, grass[a])
                if(touching === true){
                    grass.splice(a,1)
                }
            } // there is some randomness going on here
            for(a=0; a<flowers.length; a++){
                let touching = colision(t, flowers[a])
                if(touching === true){
                    flowers.splice(a,1)
                }
            }
        }
        if(t.age > 2000){
            t.age = Math.random() * 100;
            let rx = Math.random() * 500 - 250
            let ry = Math.random() * 500 - 250
            newx = t.x + rx;
            newy = t.y + ry;
            let seed = new plants(3, newx, newy, 'hsl(25, 22%, 20%)')
            let approved = seedverify(seed)
            if(approved === true){
                trees.push(seed)
            }
        }
    })
}

function colision(thing1, thing2){ // go back to thing1 and thing2
    let touching = false;
    let dx = thing1.x - thing2.x;
    let dy = thing1.y - thing2.y;
    let distance = Math.sqrt(dx*dx + dy*dy)
    let radii = thing1.size + thing2.size;
    if(distance < radii){
        touching = true
    }
    return touching;
}

function seedverify(seed){// test its location 
    let approved = true;
    if(seed.x<0 || seed.x>1500){
        approved = false;
    }
    if(seed.y<0 || seed.y>1500){
        approved = false;
    }
    touching = false;
    for(a=0; a< allplants.length; a++){
        let touching = colision(seed, allplants[a]) // maybe count up if still false, if not working. it souldnt break cuz im not changing it back
        if(touching === true){
            approved = false
        }
    }
    return approved;
}


class animal{
    constructor(group, x, y, color){
        this.group = group
        this.age = 0
        this.x = x
        this.y = y
        this.size =  4
        this.speedx = Math.random() *3 -1.5
        this.speedy = Math.random() *3 -1.5
        this.color = color
        this.hunger = 100
    }
    update(){
        this.age += 1
        this.x += this.speedx 
        this.y += this.speedy 
        this.hunger -= .05
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

function forbunnies(){
    bunnies.forEach(function(b){
        if(b.size < 20){
            b.size += .01
        } //  have color dim if hungry
        // eat then dim then die
        if(b.hunger < 99){
            for(g=0; g<grass.length; g++){
                let touching = colision(b, grass[g])
                if(touching === true){
                    grass.splice(g,1)
                    b.hunger += 1
                }
            }
            for(f=0; f<flowers.length; f++){
                let touching = colision(b, flowers[f])
                if(touching === true){
                    flowers.splice(f,1)
                    b.hunger += 5
                }
            }
            if(b.hunger < 0){
                // i think i need a dead animals array
                bunnies.splice(b,1)
            }
        }
        if(b.hunger < 15){
            // dim
        }
    })
} // i need a way to diplay hunger

/*
function forbunnies(){
    bunnies.forEach(function(j){
       // compare distances an have them reproduce if touching
       for(k= 1; k<bunnies.length; k++){
       if(j === bunnies[k]){}
       else{
        touching = false;
        distance(j.x, j.y, j.size, bunnies[k])
        if(touching === true){

        }
    
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

}*/
// next they need to die!!
// hunger gradually decreases, 
// when hungry they kill and eat grass, 
// when starve they die/*

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
            let tree1 = new plants(3, newx, newy, 'hsl(25, 22%, 30%)');
            trees.push(tree1);
        break;
        case 4:
            let bunny1 = new animal(4,newx, newy, 'white')
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

/*function plantcolisions(){
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

}*/

/*function killstuff(){
   for(j=0; j< allplants.length; j++){
    if(allplants[j].color === 'black'){
        allplants.splice(j,1)
        break;
    }
   }
}*/

function itterate(){
    allplants = grass.concat(flowers, trees)
    let allanimals = bunnies.concat(butterfly, squirel, frog, fox, snake, flies)
    seedgrass();
    seedflower();
    seedtrees();
    for(j=0; j< allplants.length; j++){
        allplants[j].draw();
        allplants[j].update();
        seedgrass()
        //plantcolisions(); // seems random
    }
    for(j=0; j< allanimals.length; j++){
        allanimals[j].update()
        allanimals[j].walls()
        allanimals[j].draw()
    }
    forbunnies()
    //bunnyeats();
}

function animate(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    itterate()
    // fix the layering
    requestAnimationFrame(animate); 
}
animate();