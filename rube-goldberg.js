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
    continuouslyCreateCircles,
    createCircleArray = [];

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
        "dynamic",
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
// Clear continously spawning circles
function clearCircle(array){
    this.clearAll = () => {
        for (let i = 0; i < array.length; i++){
            clearInterval(array[i].interval);
        }
    }

    this.clearOnly = (NAME) => {
        for (let i = 0; i < array.length; i++){
            if (array[i].name.includes(NAME)){
                clearInterval(array[i].interval);
            }
        }
    }
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
    //console.log(boundaries);
    // ** Have to initialize in all functions and not as a normal global because p5 will not recongize it
    let thirdWidth = windowWidth/3; 

    circleResetCount = 1;

    for (let i = 0; i < boundaries.length; i++){
        boundaries[i].removeFromWorld();
        boundaries.splice(i, 1);
        i--;
    }

    // Recalcaulate the pageHeight because it does not adjust the canvas without it
    pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    setup();

}

p5.disableFriendlyErrors = true;

function setup(){
    // ** Have to initialize in all functions and not as a normal global because p5 will not recongize it
    let thirdWidth = windowWidth/3; 

    // Create engine
    engine = Engine.create();
    world = engine.world; 
    Engine.run(engine); 
    

    if (windowWidth > 900){
        // DESKTOP VERSION
        //
        // Create the Canvas that the physics and animations will take place in 
        // createCanvas(w, h);
        let canvas = createCanvas(windowWidth, pageHeight);
        canvas.style('display', 'block');
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('z-index', '-1000');
        // EDGES OF THE SCREEN
        // This way, the objects won't go beyond the screen on the sides
        boundaries.push(new Boundary(-2, 0, 5, windowHeight*7, 0, "default", 'left-wall'));
        boundaries.push(new Boundary(windowWidth, 0, 5, windowHeight*7, 0, "default", 'right-wall'));
        // HERO BOUNDARIES 
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.2, width*0.3, 10, 0.2, "default", 'hero-block-1'));
        boundaries.push(new Boundary(windowWidth*0.85, windowHeight*0.35, width*0.3, 10, -0.2, "default", 'hero-block-2'));
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.50, width*0.3, 10, 0.2, "default", 'hero-block-3'));
        boundaries.push(new Boundary(windowWidth*0.85, windowHeight*0.65, width*0.3, 10, -0.2, "default", 'hero-block-4'));
        boundaries.push(new Boundary(windowWidth*0.7, windowHeight*0.80, width*0.3, 10, 0.2, "default", 'hero-block-5'));
        // STAIRCASES
        boundaries.push(new Boundary((thirdWidth*2+(thirdWidth/2)), windowHeight, width*0.333333, 10, 0, "default", 'staircase-1'));
        boundaries.push(new Boundary((thirdWidth+(thirdWidth/2)), windowHeight*1.33, width*0.333333, 10, 0, "default", 'staircase-2'));
        boundaries.push(new Boundary(width*0.055, windowHeight*1.66, width*0.11, 10, 0, "default", 'staircase-3-1'));
        boundaries.push(new Boundary(width*0.165, windowHeight*1.66, width*0.11, 10, 0, "default", 'staircase-3-2'));
        boundaries.push(new Boundary(width*0.275, windowHeight*1.66, width*0.11, 10, 0, "default", 'staircase-3-3'));
        // STAIRCASES BACKWARDS
        boundaries.push(new Boundary(thirdWidth/2, windowHeight*2.33, width*0.333333, 10, 0, "default", 'staircase-4'));
        boundaries.push(new Boundary((thirdWidth+(thirdWidth/2)), windowHeight*2.66, width*0.333333, 10, 0, "default", 'staircase-5'));
        boundaries.push(new Boundary((thirdWidth*2+(thirdWidth/2)), windowHeight*3, width*0.333333, 10, 0, "default", 'staircase-6'));
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
        boundaries.push(new Boundary(0, windowHeight*5.25, width*1.9, 30, 0.05, "default", 'about-line-1'));
        // Slope on the right that aims the dominoes
        boundaries.push(new Boundary(width, windowHeight*5.7, width*0.2, 10, -0.2, "default", 'about-line-2'));
        // Domino line 1
        boundaries.push(new Boundary(width*0.65, windowHeight*6, width*0.75, 10, 0, "default", 'domino-line-1'));
        // Domines on dominoes line 1
        dominoes.push(new Domino(width*0.30, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.35, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.40, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.45, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.50, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.55, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.60, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.65, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.70, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.75, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.80, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 
        dominoes.push(new Domino(width*0.85, windowHeight*5.9, 20, windowHeight*0.2, "about-dominoes")); 

        // PROJECTS SECTION
        // Domino wall
        boundaries.push(new Boundary(0, windowHeight*8, width*2, 10, 0, "default", 'project-line-1'));
        dominoes.push(new Domino(width*0.05, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.15, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.25, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.35, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.45, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.55, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.65, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.75, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.85, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.95, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.10, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.20, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.30, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.40, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.50, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.60, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.70, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.80, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.90, windowHeight*7.9, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.10, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.20, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.30, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.40, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.50, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.60, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.70, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.80, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.90, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.05, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.15, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.25, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.35, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.45, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.55, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.65, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.75, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.85, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.95, windowHeight*7.7, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.10, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.20, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.30, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.40, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.50, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.60, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.70, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.80, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.90, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.05, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.15, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.25, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.35, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.45, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.55, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.65, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.75, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.85, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.95, windowHeight*7.5, 10, windowHeight*0.2, "project-dominoes")); 

        dominoes.push(new Domino(width*0.10, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.20, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.30, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.40, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.50, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.60, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.70, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.80, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.90, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes"));

        dominoes.push(new Domino(width*0.05, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.15, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.25, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes"));
        dominoes.push(new Domino(width*0.35, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.45, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.55, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.65, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.75, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.85, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 
        dominoes.push(new Domino(width*0.95, windowHeight*7.3, 10, windowHeight*0.2, "project-dominoes")); 

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
        // Since Observer is in the script.js file, do this func to remove any lingering contact bodies
        // Otherwise it doesn't form properly when user changes screen size
        new setBoundary(boundaries, "contact").clearBodies();
        
    } else {
        pixelDensity(1);
        
        // MOBILE VERSION
        //
        // Create the Canvas that the physics and animations will take place in 
        // createCanvas(w, h);
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.style('display', 'block');
        canvas.style('position', 'fixed');
        canvas.style('top', '0');
        canvas.style('z-index', '-1000');
        // Keep creating circles at the start
        circleScreenCount = 2;

        if (circleResetCount == 0){
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(random(0, windowWidth), -20, random(5, 20)));
            }, 1000);  

            // Putting this here because if this function gets triggered more than once, there will be more occurances of it at once
            // Ex: Leave the screen once and come back => two instances of setMobile(); meaning double the boundaries formed
            // Since circleResetCount by default is 0 when you first load the page, this only happens once
            // When the screen resizes, then circleResetCount = 1 from windowResized();
            setMobile();  
        } else if (circleResetCount == 1 && circleScreenCount == 2){
            clearInterval(continuouslyCreateCircles);
            continuouslyCreateCircles = setInterval(() =>{
                circles.push(new Circle(random(0, windowWidth), -20, random(5, 20)));
            }, 1000); 
        }
        // EDGES OF THE SCREEN
        // This way, the objects won't go beyond the screen on the sides
        boundaries.push(new Boundary(-10, 0, 20, pageHeight*2, 0, "default", 'left-wall'));
        boundaries.push(new Boundary(windowWidth+10, 0, 20, pageHeight*2, 0, "default", 'right-wall'));

        // boundaries.push(new Boundary(0, windowHeight*0.60, width, 5, 0.2, "default", 'hero-block-1'));
        // boundaries.push(new Boundary(windowWidth, windowHeight*0.70, width, 5, -0.2, "default", 'hero-block-2'));
        // boundaries.push(new Boundary(0, windowHeight*0.80, width, 5, 0.2, "default", 'hero-block-3'));
        // boundaries.push(new Boundary(windowWidth, windowHeight*0.90, width*0.84, 5, -0.2, "default", 'hero-block-4'));
    }
    // Add an empty array full of 0s based on the amount of boundaries. 
    // Use this array to individually apply angles if collision applies
    let addAngle = 0,
        addAngle2 = 0;
    let angleArray = new Array(boundaries.length).fill(0);

    // Do stuff when circles collide with boundaries
    Events.on(engine, 'collisionStart', (event) => {
        let pairs = event.pairs; 
        for (let i = 0; i < pairs.length; i++){
            let pair = pairs[i];
            // Check the IDs of each collision
            // If matched => do something with that specific ID
            // 
            // FOR STAIRCASES:
            // Trigger => change angle of boundaries
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

function draw(){
    background('#171E29');

    for (let i = 0; i < circles.length; i++){
        circles[i].show();

        if (circles[i].isOffScreen()){
            circles[i].removeFromWorld(); 
            circles.splice(i, 1);
            i--;
        }
    }

    // for (let i = 0; i < boundaries.length; i++){
    //     boundaries[i].show();      
    // }

    for (let i = 0; i < boundaries.length; i++){
        boundaries[i].show();

        if (boundaries[i].isOffScreen()){
            boundaries[i].removeFromWorld(); 
            boundaries.splice(i, 1);
            i--;
        }
    }

    if (dominoes.length != 0){
        for (let i = 0; i < dominoes.length; i++){
            dominoes[i].show();
            if (dominoes[i].isOffScreen()){
                dominoes[i].removeFromWorld(); 
                dominoes.splice(i, 1);
                i--;
            }
        }
    }
    

}


