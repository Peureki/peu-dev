const wHeight = window.innerHeight,
    wWidth = window.innerWidth;

// Areas on the site that Observer can trigger
let heroHeader = document.getElementById('hero-header'),
    devHeaderPart1 = document.getElementById('development-header-part1'),
    devHeaderPart2 = document.getElementById('development-header-part2'),
    staircaseLaunch = document.getElementById('staircase-launch'),
    personalitySticky = document.getElementById('personality-sticky'),
    aboutHeader = document.getElementById('about-header-highlight'),
    projectHeader = document.getElementById('project-header'),
    dominoHeader = document.getElementById('domino-wall-header'),
    pricingHeader = document.getElementById('pricing-header'),
    contactHeader = document.getElementById('contact-header');

// Bulk html that will trigger with Observer
let staircase = document.querySelectorAll('.staircase');

// ====================================================================================================
// PROJECT SLIDER
// Allow users to select the slider container and grab and slide horizontally
// ====================================================================================================
let slider = document.querySelector('.overflow-x-container'),
    mouseDown = false,
    startX,
    scrollLeft;

// A circular popup "drag" will appear when user hovers over the projects area
let projectTooltip = document.querySelector('.project-tooltip');

// When this gets called, let the popup follow the mouse
function showProjectTooltip(e){
    projectTooltip.style.opacity = 1;
    projectTooltip.style.left = `${e.clientX}px`; 
    projectTooltip.style.top = `${e.clientY}px`;
}

slider.addEventListener('mousemove', showProjectTooltip, false);
slider.addEventListener('mouseleave', (e) => {
        projectTooltip.style.opacity = 0;
    },false);



// ====================================================================================================
// DRAGGABLE PROJECTS
// Sets an array of overflow-x projects to be draggable both desktop and mobiile depending on 
// screen size
// ====================================================================================================
if (wWidth > 900){
    let startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
        mouseDown = false;
    };

    slider.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if(!mouseDown) { return; }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener('mousedown', startDragging, false);
    slider.addEventListener('mouseup', stopDragging, false);
    slider.addEventListener('mouseleave', stopDragging, false);
} else {
    let startDragging = function (e) {
        mouseDown = true;
        startX = e.changedTouches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

    };
    let stopDragging = function (event) {
        mouseDown = false;
    };

    slider.addEventListener('touchmove', (e) => {
        if(!mouseDown) { return; }
        const x = e.changedTouches[0].pageX; 
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;
    }, {passive: true});

    slider.addEventListener('touchmove', startDragging, {passive: true});
    slider.addEventListener('touchend', stopDragging, {passive: true});
    slider.addEventListener('touchcancel', stopDragging, {passive: true});
}






// ====================================================================================================
// SET BOUNDARY OBJECT
// Sets an array of intervals with various effects
// ====================================================================================================
let setBoundaryArray = [];
function setBoundary(boundary, NAME){
    this.boundary = boundary; 
    this.body = boundary.body; 
    this.name = NAME;


    // this.[do something] of set objects
    // 1. Check if the NAME matches
    // 2. If yes => push setInterval value and NAME into array
    this.growRadius = () => {
        let counter = 0,
            initialLength = boundary.length,
            onlyLength = 0;
        for (let i = 0; i < boundary.length; i++){
            if (boundary[i].body.id.includes(NAME)){
                onlyLength++; 
                setBoundaryArray.push({
                    num: setInterval(() => {
                            try{
                                Matter.Body.scale(boundary[i].body, 1.01, 1.01); 
                                boundary[i].r *= 1.01;
                                counter++;
                                if (counter == 1000){
                                    this.clearOnlyInterval();
                                }
                            // When the previous boundaries fall off and get removed from the array, 
                            // this should catch the error of i not existing anymore as the array length shifts down
                            } catch (error){
                                // If the boundary length changes from when this function originally started, 
                                // => clear the intervals and reset the function
                                if (initialLength != boundary.length){
                                    this.clearOnlyInterval();
                                    //this.growRadius();

                                } 
                                if (onlyLength == boundary.length - 2){
                                    this.growRadius();
                                }
                            }  
                            
                        }, 10),
                    name: NAME,
                });
            }
        }
    }
    this.move = () => {
        let counter = 0,
            initialLength = boundary.length;
        for (let i = 0; i < boundary.length; i++){
            if (boundary[i].body.id.includes(NAME)){
                setBoundaryArray.push({
                    num: setInterval(() => {
                            try{
                                if (boundary[i].body.position.x < -20){
                                    Matter.Body.setPosition(boundary[i].body, {x: wWidth+20, y: random(0, wHeight)});
                                } else {
                                    Matter.Body.setPosition(boundary[i].body, {x: boundary[i].body.position.x-5, y: boundary[i].body.position.y});
                                    
                                }
                                
                            // When the previous boundaries fall off and get removed from the array, 
                            // this should catch the error of i not existing anymore as the array length shifts down
                            } catch (error){
                                // If the boundary length changes from when this function originally started, 
                                // => clear the intervals and reset the function
                                if (initialLength != boundary.length){
                                    this.clearOnlyInterval();
                                    this.move();
                                }
                            }  
                            
                        }, random(30, 50)),
                    name: NAME,
                });
            }
        }
    }
    // MULTIPLIER SHOULD BE AROUND 1.1 - 1.5
    // Anything higher will make things..explode
    this.growxSpin = (multiplier) => {
        let counter = 0,
            initialLength = boundary.length;
        for (let i = 0; i < boundary.length; i++){
            if (boundary[i].body.id.includes(NAME)){
                setBoundaryArray.push({
                    num: setInterval(() => {
                            try{
                                Matter.Body.scale(boundary[i].body, multiplier, 1.01); 
                                boundary[i].w *= multiplier;
                                boundaries[i].h *= 1.01;
                                counter++; 
                                if (counter == 100){
                                    this.clearOnlyInterval();
                                    this.spin();
                                }
                            // When the previous boundaries fall off and get removed from the array, 
                            // this should catch the error of i not existing anymore as the array length shifts down
                            } catch (error){
                                // If the boundary length changes from when this function originally started, 
                                // => clear the intervals and reset the function
                                if (initialLength != boundary.length){
                                    this.clearOnlyInterval();
                                    this.growxSpin(1.3);
                                }
                            }                          
                        }, 100),
                    name: NAME,
                });
            }
        }
    }
    this.spin = () => {
        this.clearOnlyInterval();
        let initialLength = boundary.length;
        for (let i = 0; i < boundary.length; i++){
            if (boundary[i].body.id.includes(NAME)){
                let randomAngle = random(0.001, 0.01),
                    negCheck = random(-1, 1),
                    angle = boundary[i].body.angle;
                setBoundaryArray.push({
                    num:
                        setInterval(() => {
                            try {
                                if (angle != 0){
                                    if (angle < 0){
                                        angle += -`${randomAngle}`;
                                    } else {
                                        angle += randomAngle;
                                    }
                                } else {
                                    if (negCheck <= 0)
                                        angle += -`${randomAngle}`; 
                                    else 
                                        angle += randomAngle;
                                }
                                

                                Matter.Body.setAngle(boundary[i].body, angle);  
                            } catch (error){
                                if (initialLength != boundary.length){
                                    this.clearOnlyInterval();
                                    this.spin();
                                }
                            }
                            
                        }, 50),
                    name: NAME,
                });

            }
        }
    }
    // Removes only current intervals and animations
    this.clearOnlyInterval = () => {
        for (let i = 0; i < setBoundaryArray.length; i++){
            if (setBoundaryArray[i].name.includes(NAME)){
                clearInterval(setBoundaryArray[i].num);
                setBoundaryArray.splice(i, 1);
                i--;
            }
        }
    }
    // Removes: 
    // All bodies
    // All current intervals or animations 
    this.clearBodies = () => {
        for (let i = 0; i < setBoundaryArray.length; i++){
            if (setBoundaryArray[i].name.includes(NAME)){
                clearInterval(setBoundaryArray[i].num);
                setBoundaryArray.splice(i, 1);
                i--;
            }
        }
        for (let i = 0; i < boundary.length; i++){
            if (boundary[i].body.id.includes(NAME)){
                Matter.Body.setStatic(boundary[i].body, false);
                boundary[i].body.collisionFilter.group = -1;
                boundary[i].body.collisionFilter.category = 2;
                boundary[i].body.collisionFilter.mask = 0;

                // boundary.splice(i, 1);
                // i--;
                //console.log("boundary: ", boundary);
                
                
                // setBoundaryArray.splice(i, 1);
                // i--;             
            }
        }        
    }
    this.clearDominoes = () => {
        for (let i = 0; i < boundary.length; i++){
            Matter.Body.setStatic(boundary[i].body, false);
            boundary[i].body.collisionFilter.group = -1;
            boundary[i].body.collisionFilter.category = 2;
            boundary[i].body.collisionFilter.mask = 0;
        }
    }
    // This stops a body from scaling
    this.stop = (time) => {
        setTimeout(() => {
            for (let i = 0; i < boundary.length; i++){
                if (boundary[i].body.id.includes(NAME)){
                    for (let j = 0; j < setBoundaryArray.length; j++){
                        if (setBoundaryArray[j].name.includes(NAME)){
                            clearInterval(setBoundaryArray[j].num);
                        }
                    } 
                }
            }
        }, time);
    }
}



// ====================================================================================================
// DESKTOP OBSERVER OJBECT
// Create new object that will take "observe" if the user has scrolled to where the object is visible
// If object is visible => do the .show effect
// ====================================================================================================
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            if (entry.target.id == "pricing-header"){
                // new setBoundary(boundaries, "about").clearBodies();
                // new setBoundary(boundaries, "domino").clearBodies();
                // new setBoundary(boundaries, "project").clearBodies();
                new setBoundary(boundaries, "contact").clearBodies();
                // new setBoundary(dominoes, "").clearDominoes();

                new clearCircle(createCircleArray).clearOnly('contact');
            }
            else if (entry.target.id == "contact-header"){
                
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-1'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-2'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-3'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-4'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-5'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-6'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-7'));
                boundaries.push(new Boundary(random(wWidth*0.1, wWidth*0.8), random(wHeight*9.4, wHeight*10.2), 10, 5, 0, randomColor(), 'contact-boundary-8'));

                new setBoundary(boundaries, "contact").growxSpin(1.5);

                createCircleArray.push({
                    interval: setInterval(() =>{
                        circles.push(new Circle(random(0, wWidth), wHeight*9, random(10, 30)));
                    }, 1000),
                    name: "contact-circles",
                });
            }
            entry.target.classList.add('show');    
        }
    })
}, {
    threshold: 0.2,
});



staircase.forEach((el) => observer.observe(el));
observer.observe(pricingHeader);
observer.observe(contactHeader);

// ====================================================================================================
// MOBIILE OBSERVER OJBECT
// Because the canvas at full wWidth and pagewHeight is too large for mobile (too much performance),
// Canvas is now only screen wWidth, wHeight, and position fixed
// Change the behavior and look of bodies based on where the user is scrolling
// ====================================================================================================
function setMobile(){
    let mobileObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting){
                // ====================================================================================================
                // HERO CONTAINER
                // ====================================================================================================
                if (entry.target.id == "hero-header"){
                    new setBoundary(boundaries, "imagine-block").clearBodies();
                    boundaries.push(new Boundary(0, wHeight*0.60, wWidth, 5, 0.2, "default", 'hero-block-1'));
                    boundaries.push(new Boundary(wWidth, wHeight*0.70, wWidth, 5, -0.2, "default", 'hero-block-2'));
                    boundaries.push(new Boundary(0, wHeight*0.80, wWidth, 5, 0.2, "default", 'hero-block-3'));
                    boundaries.push(new Boundary(wWidth, wHeight*0.90, wWidth*0.84, 5, -0.2, "default", 'hero-block-4'));
                }
                // ====================================================================================================
                // DEVELOPMENT CYCLE CONTAINER PART 1
                // ====================================================================================================
                if (entry.target.id == 'development-header-part1'){
                    new setBoundary(boundaries, "hero-block").clearBodies();
                // ====================================================================================================
                // DEVELOPMENT CYCLE CONTAINER PART 2
                // ====================================================================================================
                } else if (entry.target.id == "development-header-part2"){
                    

                    boundaries.push(new Boundary(0, wHeight*0.5, wWidth, 10, 0, "default", 'imagine-block-1'));
                    boundaries.push(new Boundary(wWidth, wHeight*0.5, wWidth, 10, 0, "default", 'imagine-block-2'));

                // ====================================================================================================
                // DEVELOPMENT CYCLE CONTAINER PART 2 ("LAUNCH" STAIRCASE)
                // ====================================================================================================
                } else if (entry.target.id == "staircase-launch"){
                    new setBoundary(boundaries, "personality-shape").clearBodies();
                    new setBoundary(boundaries, "imagine-block").clearBodies();
                    new setBoundary(boundaries, "about-spinning").clearBodies();

                // ====================================================================================================
                // PERSONALITY CONTAINER
                // ====================================================================================================
                } else if (entry.target.id == "personality-sticky"){

                    boundaries.push(new BoundaryPolygon(random(wWidth*0.15, wWidth*0.5), wHeight*0.5, random(3, 6), random(30, 50), randomColor(), 'personality-shape-2'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.45, wWidth*0.85), wHeight*0.3, random(3, 6), random(30, 50), randomColor(), 'personality-shape-3'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.2, wWidth*0.4), wHeight*0.2, random(3, 6), random(30, 50), randomColor(), 'personality-shape-4'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.1, wWidth*0.4), wHeight*0.7, random(3, 6), random(30, 50), randomColor(), 'personality-shape-5'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.4, wWidth*0.8), wHeight*0.9, random(3, 6), random(30, 50), randomColor(), 'personality-shape-6'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.2, wWidth*0.6), wHeight*0.5, random(3, 6), random(30, 50), randomColor(), 'personality-shape7'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.5, wWidth*0.9), wHeight*0.8, random(3, 6), random(30, 50), randomColor(), 'personality-shape-8'));

                    new setBoundary(boundaries, "personality-shape").move();                

                // ====================================================================================================
                // PROJECT CONTAINER
                // ====================================================================================================
                } else if (entry.target.id == "project-header"){
                    new setBoundary(boundaries, "personality-shape").clearBodies();
                    new setBoundary(boundaries, "domino").clearBodies();

                // ====================================================================================================
                // DOMINO CONTAINER
                // ====================================================================================================
                } else if (entry.target.id == "domino-wall-header"){
                    boundaries.push(new BoundaryCircle(0, wHeight*0.1, random(5, 10), '#26F527', 'domino-1'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.15, wWidth*0.5), wHeight*0.5, random(3, 6), random(5, 10), randomColor(), 'domino-2'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.45, wWidth*0.85), wHeight*0.3, random(3, 6), random(5, 10), randomColor(), 'domino-3'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.2, wWidth*0.4), wHeight*0.2, random(3, 6), random(5, 10), randomColor(), 'domino-4'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.1, wWidth*0.4), wHeight*0.7, random(3, 6), random(5, 10), randomColor(), 'domino-5'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.4, wWidth*0.8), wHeight*0.9, random(3, 6), random(5, 10), randomColor(), 'domino-6'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.2, wWidth*0.6), wHeight*0.5, random(3, 6), random(5, 10), randomColor(), 'domino-7'));
                    boundaries.push(new BoundaryPolygon(random(wWidth*0.5, wWidth*0.9), wHeight*0.8, random(3, 6), random(5, 10), randomColor(), 'domino-8'));

                    new setBoundary(boundaries, "domino").growRadius();
                    

                // ====================================================================================================
                // PRICING CONTAINER
                // ====================================================================================================
                } else if (entry.target.id == "pricing-header"){
                    new setBoundary(boundaries, "contact").clearBodies();

                // ====================================================================================================
                // CONTACT CONTAINER
                // ====================================================================================================
                } else if (entry.target.id == "contact-header"){
                    new setBoundary(boundaries, "domino").clearBodies();

                    boundaries.push(new Boundary(wWidth*0.1, wHeight*0.2, 10, 5, 0, randomColor(), 'contact-boundary-1'));
                    boundaries.push(new Boundary(wWidth*0.3, wHeight*0.4, 10, 5, 0, randomColor(), 'contact-boundary-2'));
                    boundaries.push(new Boundary(wWidth*0.5, wHeight*0.6, 10, 5, 0, randomColor(), 'contact-boundary-3'));
                    boundaries.push(new Boundary(wWidth*0.7, wHeight*0.8, 10, 5, 0, randomColor(), 'contact-boundary-4'));
                    boundaries.push(new Boundary(wWidth*0.9, wHeight*0.3, 10, 5, 0, randomColor(), 'contact-boundary-5'));
                    boundaries.push(new Boundary(wWidth*0.5, wHeight*0.5, 10, 5, 0, randomColor(), 'contact-boundary-6'));
                    new setBoundary(boundaries, "contact").growxSpin(1.3);
                }
                
                entry.target.classList.add('show');    
            }
        })
    }, {
        threshold: 0.5,
    });

    mobileObserver.observe(heroHeader);
    mobileObserver.observe(devHeaderPart1);
    mobileObserver.observe(devHeaderPart2);
    mobileObserver.observe(staircaseLaunch);
    mobileObserver.observe(personalitySticky);
    mobileObserver.observe(aboutHeader);
    mobileObserver.observe(projectHeader);
    mobileObserver.observe(dominoHeader);
    mobileObserver.observe(pricingHeader);
    mobileObserver.observe(contactHeader);
}

// PROJECT IMAGES
let project1Img = document.getElementById('project-1-img'),
    project2Img = document.getElementById('project-2-img');

// PLANS
let plans = document.querySelectorAll('.plans');

// ====================================================================================================
// NAVIGATION
// ==================================================================================================== 
let hamburger = document.querySelector('.hamburger'),
    hamburgerSpan = hamburger.children;

let nav = document.querySelector('.nav-bar'),
    navList = document.getElementById('nav-list').children,
    navToggle = 0;

if (wWidth < 900){
    // When users click tha hamburger, animate the spans to form the same pattern as the boundaries in the beginning
    hamburger.addEventListener('click', () => {
        if (navToggle == 0){
            hamburgerSpan[0].style.transform = "rotate(20deg) translate(-5px, -3px)";
            hamburgerSpan[1].style.transform = "rotate(-20deg) translateX(5px)";
            hamburgerSpan[2].style.transform = "rotate(20deg) translate(-5px, 3px)";

            hamburgerSpan.forEach((el) => {el.style.backgroundColor = "var(--color-secondary)"});

            nav.style.display = "block";
            navToggle = 1;
        } else {
            hamburgerSpan[0].style.transform = "unset";
            hamburgerSpan[1].style.transform = "unset";
            hamburgerSpan[2].style.transform = "unset";

            hamburgerSpan.forEach((el) => {el.style.backgroundColor = "var(--color-white)"});

            nav.style.display = "none";
            navToggle = 0;
        }
    });
    // For each nav li, when users click on it => remove nav bar and go to the appropiate section
    navList.forEach((li) => {
        li.addEventListener('click', () => {
            hamburgerSpan[0].style.transform = "unset";
            hamburgerSpan[1].style.transform = "unset";
            hamburgerSpan[2].style.transform = "unset";

            hamburgerSpan.forEach((el) => {el.style.backgroundColor = "var(--color-white)"});

            nav.style.display = "none";
            navToggle = 0;
        });
    });
}

// ====================================================================================================
// LIGHT/DARK MODE
// ==================================================================================================== 
let themeButton = document.querySelector('.light-dark-mode'),
    moon = document.getElementById('moon'),
    sun = document.getElementById('sun'),
    themeToggle = 0;

let cssVar = (name, value) => {
    if (name.substr(0, 2) !== "--") name = "--" + name; 
    if (value) document.documentElement.style.setProperty(name, value);

    return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function lightMode(){
    moon.style.opacity = 0;
    moon.style.transform = "translateX(-50px)";

    setTimeout(() => {
        moon.style.transform = "translateX(50px)";

        moon.style.display = "none";
        sun.style.display = "block";
        setTimeout(() => {
            sun.style.opacity = 1;
            sun.style.transform = "translateX(0px)"; 
        }, 10);
    }, 200);

    cssVar('color-primary', "#24d43b");
    cssVar('color-secondary', "#574cee");
    cssVar('color-subheader', "#68b3e0");
    cssVar('color-white', "#333241");

    // Navigation links
    navList.forEach((li) => {
        li.firstChild.style.textShadow = "none";
    });

    // Change project 1 and 2 image sources
    project1Img.src = "./images/chicago-shufflers-logo-black.png";
    project2Img.src = "./images/Alfonso_Webber_Logo_Horizontal_Black.svg";

    // Remove background for plans
    plans.forEach((p) => {
        p.style.backgroundColor = "transparent";
    });

    localStorage.setItem('mode', 1);
}

function darkMode(){
    themeToggle = 0;

    sun.style.opacity = 0;
    sun.style.transform = "translateX(-50px)";

    setTimeout(() => {
        sun.style.transform = "translateX(50px)";

        sun.style.display = "none";
        moon.style.display = "block";
        setTimeout(() => {
            moon.style.opacity = 1;
            moon.style.transform = "translateX(0px)"; 
        }, 10);
    }, 200);

    cssVar('color-primary', "#26F527");
    cssVar('color-secondary', "#0ABCF7");
    cssVar('color-subheader', "#FFFFFF");
    cssVar('color-white', "#FFFFFF");

    // Navigation links
    navList.forEach((li) => {
        li.firstChild.style.textShadow = "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;";
    });
    // Boundaries and Dominoes
    for (let i = 0; i < boundaries.length; i++){
        boundaries[i].changeColor("#FFFFFF");
    }

    // Change project 1 and 2 image sources
    project1Img.src = "./images/chicago-shufflers-logo.png";
    project2Img.src = "./images/Alfonso_Webber_Logo_Horizontal_White.svg";

    // Give back the background
    plans.forEach((p) => {
        p.style.backgroundColor = "var(--color-bkg-black-fade)";
    });

    localStorage.setItem('mode', 0);
}

// LOCAL STORAGE
if (localStorage.mode == 0 || localStorage.mode == undefined){
    // IF 0 => DO DARK MODE
    themeToggle = 0;
    darkMode();
} else {
    // IF 1 => DO LIGHT MODE
    themeToggle = 1;
    lightMode();
}

themeButton.addEventListener('click', () => {
    // IF DARK MODE
    // => DO LIGHT MODE
    if (themeToggle == 0){
        themeToggle = 1;
        lightMode();

    // IF LIGHT MODE
    // => DO DARK MODE
    } else {
        themeToggle = 0;
        darkMode();
    }
});






    

