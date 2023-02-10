var Engine = Matter.Engine,
    //Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

var engine, box1, world, ground,
    boxes = [], boundaries = [], circles = []; 

var body = document.body,
    html = document.documentElement;

var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

function windowResized() {
    resizeCanvas(windowWidth, pageHeight);
    //Matter.Body.scale(boundaries[0].body, 1.1, 1.1);

    //console.log(boundaries);
    
   

    for (let i = 0; i < boundaries.length; i++){
        switch (boundaries[i].body.id) {
        case "left-wall": Matter.Body.setPosition(boundaries[i].body, {x: 0, y: 0});
            break;
        case "right-wall": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth, y: 0});
            break;
        case "hero-block-1": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.2}); 
            break;
        case "hero-block-2": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.85, y: windowHeight*0.35});
            break;
        case "hero-block-3": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.5});
            break;
        case "hero-block-4": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.85, y: windowHeight*0.65});
            break;
        case "hero-block-5": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.80});
            // boundaries[i].body.collisionFilter.group = -1;
            // boundaries[i].body.collisionFilter.category = 2;
            // boundaries[i].body.collisionFilter.mask = 0;
            break;
        }
    }
}

function setup(){
    // Create the Canvas that the physics and animations will take place in 
    // createCanvas(w, h);
    let canvas = createCanvas(windowWidth, pageHeight);
    canvas.style('display', 'block');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');


    // Create engine
    engine = Engine.create();
    world = engine.world; 
    Engine.run(engine); 

    let thirdWidth = windowWidth/3; 

    boundaries.push(new Boundary(0, 0, 5, pageHeight, 0, 'left-wall'));
    boundaries.push(new Boundary(windowWidth, 0, 5, pageHeight, 0, 'right-wall'));

    console.log('windowHeight', windowHeight, 'windowWidth', windowWidth);

    if (windowWidth > 768){
        // DESKTOP VERSION
        //
        // HERO BOUNDARIES 
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.2, width*0.3, 10, 0.2, 'hero-block-1'));
        boundaries.push(new Boundary(windowWidth*0.85, windowHeight*0.35, width*0.3, 10, -0.2, 'hero-block-2'));
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.50, width*0.3, 10, 0.2, 'hero-block-3'));
        boundaries.push(new Boundary(windowWidth*0.85, windowHeight*0.65, width*0.3, 10, -0.2, 'hero-block-4'));
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.80, width*0.3, 10, 0.2, 'hero-block-5'));
        // STAIRCASES
        boundaries.push(new Boundary((thirdWidth*2+(thirdWidth/2)), windowHeight, width*0.333333, 10, 0, 'staircase-1'));
        boundaries.push(new Boundary((thirdWidth+(thirdWidth/2)), windowHeight*1.33, width*0.333333, 10, 0, 'staircase-2'));
        boundaries.push(new Boundary(width*0.055, windowHeight*1.66, width*0.11, 10, 0, 'staircase-3-1'));
        boundaries.push(new Boundary(width*0.165, windowHeight*1.66, width*0.11, 10, 0, 'staircase-3-2'));
        boundaries.push(new Boundary(width*0.275, windowHeight*1.66, width*0.11, 10, 0, 'staircase-3-3'));
        // STAIRCASES BACKWARDS
        boundaries.push(new Boundary(thirdWidth/2, windowHeight*2.33, width*0.333333, 10, 0, 'staircase-4'));
        boundaries.push(new Boundary((thirdWidth+(thirdWidth/2)), windowHeight*2.66, width*0.333333, 10, 0, 'staircase-5'));
        boundaries.push(new Boundary((thirdWidth*2+(thirdWidth/2)), windowHeight*3, width*0.333333, 10, 0, 'staircase-6'));
        
        
    } else {
        // MOBILE VERSION
        //
        // HERO BOUNDARIES 
        boundaries.push(new Boundary(0, windowHeight*0.60, width, 10, 0.2, 'hero-block-1'));
        boundaries.push(new Boundary(windowWidth, windowHeight*0.70, width, 10, -0.2, 'hero-block-2'));
        boundaries.push(new Boundary(0, windowHeight*0.80, width, 10, 0.2, 'hero-block-3'));
    }

    // 
    for (let i = 0; i < boundaries.length; i++){
        switch (boundaries[i].body.id){
        case "staircase-3": 
            // boundaries[i].body.collisionFilter.group = -1;
            // boundaries[i].body.collisionFilter.category = 2;
            // boundaries[i].body.collisionFilter.mask = 0;
            // boundaries[i].body.render.fillStyle = "blue";
        break;
        }
    }
    // let iterateAngle = (angle, body) => {
    //     angle += 0.0001; 
    //     angleArray[0] = angle;
    //     console.log(angle);
    //     if (angle < 0.1){
    //         Matter.Body.setAngle(body, -`${angle}`);
    //         setTimeout(iterateAngle(angle, body), 10);
    //     }
    // }
    // Add an empty array full of 0s based on the amount of boundaries. 
    // Use this array to individually apply angles if collision applies
    let addAngle = 0,
        addAngle2 = 0;
    let angleArray = new Array(boundaries.length).fill(0);

    Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs; 
        for (let i = 0; i < pairs.length; i++){
            let pair = pairs[i];
            // Check the IDs of each collision
            // If matched => do something with that specific ID
            // 
            // FOR STAIRCASES:
            // Trigger => change angle
            switch (pair.bodyB.id){
            case "staircase-1":
                let iterateAngle = () => {
                    console.log('does this happen')
                    if (angleArray[0] < 0.1){
                        angleArray[0] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, -`${angleArray[0]}`);
                        setTimeout(iterateAngle, 50);
                    }
                }
                if (angleArray[0] < 0.1)
                    setTimeout(iterateAngle, 50);

                // merp
                // this is a test
                

                //setTimeout(iterateAngle(angleArray[0], pair.bodyB), 10);

                //Matter.Body.setAngle(pair.bodyB, -0.1);
            break;
            case "staircase-2":
                Matter.Body.setAngle(pair.bodyB, -0.1);
            break;
            case "staircase-3-2":
                Matter.Body.setStatic(pair.bodyB, false);
                pair.bodyB.collisionFilter.group = -1;
                pair.bodyB.collisionFilter.category = 2;
                pair.bodyB.collisionFilter.mask = 0;
            break;
            case "staircase-4":
                Matter.Body.setAngle(pair.bodyB, 0.1);
            break;
            case "staircase-5":
                Matter.Body.setAngle(pair.bodyB, 0.1);
            break;
            case "staircase-6":
                Matter.Body.setAngle(pair.bodyB, -0.1);
            break;
            }
        }
    })

}

function mousePressed(){
    //boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    circles.push(new Circle(mouseX, mouseY,random(10, 20)));
}



function draw(){
    background('#171E29');
    //Engine.run(engine); 
    /*
    for (let i = 0; i < boxes.length; i++){
        boxes[i].show();
    }
    */
    //circles.push(new Circle(mouseX, mouseY,random(5, 10)));

    for (let i = 0; i < circles.length; i++){
        circles[i].show();

        if (circles[i].isOffScreen()){
            circles[i].removeFromWorld(); 
            circles.splice(i, 1);
            i--;
        }
    }

    


    // boundaries[0].body.position.x = windowWidth*0.7;
    // boundaries[0].body.position.y = windowHeight*0.2;

    for (let i = 0; i < boundaries.length; i++){
        
        boundaries[i].show();
    }

}


