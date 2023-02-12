var Engine = Matter.Engine,
    //Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events;

var engine, world, ground,
    dominoes = [], boundaries = [], circles = []; 

var body = document.body,
    html = document.documentElement;

var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

let circleResetCount = 0,
    circleScreenCount = 0,
    continuouslyCreateCircles;

let throttle = 0;

let personalityFocusWord = document.getElementById('personality-focus-word');

let color = [
        "#9303c8", // Purple
        "#f7e000", // Yellow
        "#0f63e2", // Blue
        "#f7994a", // Orange
        "#eb0088", // Red
        "#f0f5a1", // Lime?
        "#f765a3", // Pink
        "#59cc68", // Green
    ];

let words = [
        "personality",
        "fun",
        "dynamics",
        "color",
        "beauty",
        "charm",
        "who you are",
        "charisma",
        "simple",
        "modern",
        "excellence",
        "marvelous",
        "cool",
        "rad",
        "value",
        "class",
        "reputable",
        "attractive",
        "powerful",
        "smart",
        "bright",
        "your dream",
        "merit",
        "savvy",
        "weird",
        "interest",
        "nifty",
        "gains",
        "prestige",
        "comfort",
        "family",
        "love",
        "profits",
        "influence",
        "authenticity",
        "radiance",
        "convenience",
        "usefulness",
        "representation",
        "wholesome",
        "assistance",
        "quality",
        "dynamite",
        "efficiency",

    ];

function randomColor(){
    return color[Math.floor(Math.random() * color.length)];
}
function randomWords(){
    return words[Math.floor(Math.random() * words.length)];
}

// Check whether or not the user is actively browsing the page
// If not browsing => stop creating the circles so when the user comes back, all the circles that accumulated won't spawn at once
// If on page => reset 
document.addEventListener('visibilitychange', () => {
    clearInterval(continuouslyCreateCircles);
    if (!document.hidden)
        windowResized();
});

function windowResized() {
    //Matter.Body.scale(boundaries[0].body, 1.1, 1.1);

    //console.log(boundaries);
    // ** Have to initialize in all functions and not as a normal global because p5 will not recongize it
    let thirdWidth = windowWidth/3; 
   
    // For boundaries, change the position so it can stay relative to it's original position on the screen
    // for (let i = 0; i < boundaries.length; i++){
    //     switch (boundaries[i].body.id) {
    //     // HERO SECTION
    //     case "left-wall": Matter.Body.setPosition(boundaries[i].body, {x: 0, y: 0});
    //         break;
    //     case "right-wall": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth, y: 0});
    //         break;
    //     case "hero-block-1": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.2}); 
    //         break;
    //     case "hero-block-2": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.85, y: windowHeight*0.35});
    //         break;
    //     case "hero-block-3": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.5});
    //         break;
    //     case "hero-block-4": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.85, y: windowHeight*0.65});
    //         break;
    //     case "hero-block-5": Matter.Body.setPosition(boundaries[i].body, {x: windowWidth*0.7, y: windowHeight*0.80});
    //         break;
    //     // DEV CYCLE PART 1 
    //     case "staircase-1": Matter.Body.setPosition(boundaries[i].body, {x: (thirdWidth*2+(thirdWidth/2)), y: windowHeight});
    //         break;
    //     case "staircase-2": Matter.Body.setPosition(boundaries[i].body, {x: (thirdWidth+(thirdWidth/2)), y: windowHeight*1.33});
    //         break;  
    //     case "staircase-3-1": Matter.Body.setPosition(boundaries[i].body, {x: width*0.055, y: windowHeight*1.66});
    //         break;  
    //     case "staircase-3-2": Matter.Body.setPosition(boundaries[i].body, {x: width*0.165, y: windowHeight*1.66});
    //         break; 
    //     case "staircase-3-3": Matter.Body.setPosition(boundaries[i].body, {x: width*0.275, y: windowHeight*1.66});
    //         break; 
    //     }
    // }

    for (let i = 0; i < boundaries.length; i++){
        boundaries[i].removeFromWorld();
        boundaries.splice(i, 1);
        i--;
    }
    // for (let i = 0; i < circles.length; i++){
    //     circles[i].removeFromWorld();
    //     circles.splice(i, 1);
    //     i--;
    // }
    circleResetCount = 1;

    // Recalcaulate the pageHeight because it does not adjust the canvas without it
    pageHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    setup();

}

function setup(){
    // Create the Canvas that the physics and animations will take place in 
    // createCanvas(w, h);
    let canvas = createCanvas(windowWidth, pageHeight);
    canvas.style('display', 'block');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('z-index', '-1');

    // ** Have to initialize in all functions and not as a normal global because p5 will not recongize it
    let thirdWidth = windowWidth/3; 


    // Create engine
    engine = Engine.create();
    world = engine.world; 
    Engine.run(engine); 

    // EDGES OF THE SCREEN
    // This way, the objects won't go beyond the screen on the sides
    boundaries.push(new Boundary(-2, 0, 5, windowHeight*6.5, 0, 'left-wall'));
    boundaries.push(new Boundary(windowWidth, 0, 5, windowHeight*6.5, 0, 'right-wall'));

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
        // PERSONALITY BOUNDARIES
        // Default this circle to green to match the "Personality" word
        boundaries.push(new BoundaryCircle(width*0.6, windowHeight*3.5, random(width*0.1, width*0.2), '#26F527', 'personality-shape-1'));
        boundaries.push(new BoundaryPolygon(random(width*0.15, width*0.3), windowHeight*5, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-2'));
        boundaries.push(new BoundaryPolygon(random(width*0.65, width*0.85), windowHeight*4.3, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-3'));
        boundaries.push(new BoundaryPolygon(random(width*0.3, width*0.4), windowHeight*4.1, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-4'));
        boundaries.push(new BoundaryPolygon(random(width*0.1, width*0.3), windowHeight*3.7, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-5'));
        boundaries.push(new BoundaryPolygon(random(width*0.7, width*0.9), windowHeight*3.9, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-6'));
        boundaries.push(new BoundaryPolygon(random(width*0, width*0.2), windowHeight*4.5, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-7'));
        boundaries.push(new BoundaryPolygon(random(width*0.8, width*0.9), windowHeight*4.8, random(3, 6), random(width*0.1, width*0.2), randomColor(), 'personality-shape-8'));
        // DOMINOES
        // ABOUT SECTION
        // Large line to slow down the balls after the Personaity section
        boundaries.push(new Boundary(0, windowHeight*5.25, width*1.9, 30, 0.05, 'about-line-1'));
        // Slope on the right that aims the dominoes
        boundaries.push(new Boundary(width, windowHeight*5.7, width*0.2, 10, -0.2, 'about-line-2'));
        // Domino line 1
        boundaries.push(new Boundary(width*0.65, windowHeight*6, width*0.75, 10, 0, 'domino-line-1'));
        // Domines on dominoes line 1
        dominoes.push(new Domino(width*0.30, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.35, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.40, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.45, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.50, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.55, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.60, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.65, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.70, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.75, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.80, windowHeight*5.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.85, windowHeight*5.9, 20, windowHeight*0.2)); 

        // PROJECTS SECTION
        // Domino wall
        boundaries.push(new Boundary(0, windowHeight*7, width*2, 30, 0, 'about-line-1'));
        dominoes.push(new Domino(width*0.10, windowHeight*6.9, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.20, windowHeight*6.9, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.30, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.40, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.50, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.60, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.70, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.80, windowHeight*6.9, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.90, windowHeight*6.9, 20, windowHeight*0.2)); 

        dominoes.push(new Domino(width*0.10, windowHeight*6.7, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.20, windowHeight*6.7, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.30, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.40, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.50, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.60, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.70, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.80, windowHeight*6.7, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.90, windowHeight*6.7, 20, windowHeight*0.2)); 

        dominoes.push(new Domino(width*0.10, windowHeight*6.5, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.20, windowHeight*6.5, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.30, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.40, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.50, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.60, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.70, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.80, windowHeight*6.5, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.90, windowHeight*6.5, 20, windowHeight*0.2)); 

        dominoes.push(new Domino(width*0.10, windowHeight*6.3, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.20, windowHeight*6.3, 20, windowHeight*0.2));
        dominoes.push(new Domino(width*0.30, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.40, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.50, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.60, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.70, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.80, windowHeight*6.3, 20, windowHeight*0.2)); 
        dominoes.push(new Domino(width*0.90, windowHeight*6.3, 20, windowHeight*0.2));
        // Keep creating circles at the start
        // Check what screen count it is in so the circles can properly drop in the right location
        circleScreenCount = 1

        if (circleResetCount == 0){
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(windowWidth*0.6, -20, random(10, 30)));
            }, 1000);
        } else if (circleResetCount == 1 && circleScreenCount == 1){
            clearInterval(continuouslyCreateCircles);
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(windowWidth*0.6, -20, random(10, 30)));
            }, 1000);
        }
        
    } else {
        // MOBILE VERSION
        //
        // Keep creating circles at the start
        circleScreenCount = 2;

        if (circleResetCount == 0){
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(20, -20, random(10, 30)));
            }, 1000);    
        } else if (circleResetCount == 1 && circleScreenCount == 2){
            clearInterval(continuouslyCreateCircles);
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(20, -20, random(10, 30)));
            }, 1000); 
        }

        // HERO BOUNDARIES 
        boundaries.push(new Boundary(0, windowHeight*0.60, width, 10, 0.2, 'hero-block-1'));
        boundaries.push(new Boundary(windowWidth, windowHeight*0.70, width, 10, -0.2, 'hero-block-2'));
        boundaries.push(new Boundary(0, windowHeight*0.80, width, 10, 0.2, 'hero-block-3'));
        // "OUR IMAGINATION"
        boundaries.push(new Boundary(0, windowHeight*2.63, width, 10, 0, 'imagine-block-1'));
        boundaries.push(new Boundary(width, windowHeight*2.63, width, 10, 0, 'imagine-block-1'));
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
                let iterateAngle0 = () => {
                    if (angleArray[0] < 0.2){
                        angleArray[0] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, -`${angleArray[0]}`);
                        setTimeout(iterateAngle0, 10);
                    }
                }
                if (angleArray[0] < 0.2)
                    setTimeout(iterateAngle0, 10);
            break;
            case "staircase-2":
                let iterateAngle1 = () => {
                    if (angleArray[1] < 0.2){
                        angleArray[1] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, -`${angleArray[1]}`);
                        setTimeout(iterateAngle1, 10);
                    }
                }
                if (angleArray[1] < 0.2)
                    setTimeout(iterateAngle1, 10);
            break;
            case "staircase-3-2":
                Matter.Body.setStatic(pair.bodyB, false);
                pair.bodyB.collisionFilter.group = -1;
                pair.bodyB.collisionFilter.category = 2;
                pair.bodyB.collisionFilter.mask = 0;
            break;
            case "staircase-4":
                let iterateAngle2 = () => {
                    if (angleArray[2] < 0.2){
                        angleArray[2] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, `${angleArray[2]}`);
                        setTimeout(iterateAngle2, 10);
                    }
                }
                if (angleArray[2] < 0.1)
                    setTimeout(iterateAngle2, 10);
            break;
            case "staircase-5":
                let iterateAngle3 = () => {
                    if (angleArray[3] < 0.2){
                        angleArray[3] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, `${angleArray[3]}`);
                        setTimeout(iterateAngle3, 10);
                    }
                }
                if (angleArray[3] < 0.2)
                    setTimeout(iterateAngle3, 10);
            break;
            case "staircase-6":
                let iterateAngle4 = () => {
                    if (angleArray[4] < 0.2){
                        angleArray[4] += 0.0001;
                        Matter.Body.setAngle(pair.bodyB, -`${angleArray[4]}`);
                        setTimeout(iterateAngle4, 10);
                    }
                }
                if (angleArray[4] < 0.2)
                    setTimeout(iterateAngle4, 10);
            break;
            case "personality-shape-1":
                // Create a throttle so that it does not triggle the color change too much, esp when there's a lot of collisions
                if (throttle == 0){
                    pair.bodyB.render.fillStyle = randomColor();
                    personalityFocusWord.style.color = pair.bodyB.render.fillStyle;
                    personalityFocusWord.innerHTML = randomWords();
                    throttle = 1;
                    setTimeout(() => {
                        throttle = 0;
                    }, 500);
                }
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

    for (let i = 0; i < dominoes.length; i++){
        dominoes[i].show();

        if (dominoes[i].isOffScreen()){
            dominoes[i].removeFromWorld(); 
            dominoes.splice(i, 1);
            i--;
        }
    }

}




