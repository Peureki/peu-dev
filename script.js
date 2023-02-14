// ====================================================================================================
// PROJECT SLIDER
// Allow users to select the slider container and grab and slide horizontally
// ====================================================================================================
let slider = document.querySelector('.overflow-x-container'),
    mouseDown = false,
    startX,
    scrollLeft;

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

// ====================================================================================================
// OBSERVER OJBECT
// Create new object that will take "observe" if the user has scrolled to where the object is visible
// If object is visible => do the .show effect
// ====================================================================================================
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            // These classes are before 'show' is added to the className so that it only happens once          
            //entry.target.classList.add('show'); 
            if (entry.target.id == "staircase-launch"){
                for (let i = 0; i < boundaries.length; i++){
                    switch (boundaries[i].body.id){
                    case "imagine-block-1":
                    case "imagine-block-2":
                        Matter.Body.setStatic(boundaries[i].body, false);
                        boundaries[i].body.collisionFilter.group = -1;
                        boundaries[i].body.collisionFilter.category = 2;
                        boundaries[i].body.collisionFilter.mask = 0;
                        break;
                    }
                }
            }
            
            entry.target.classList.add('show');    
        }
    })
}, {
    threshold: 0.2,
});

let staircaseLaunch = document.getElementById('staircase-launch'),
    staircase = document.querySelectorAll('.staircase');
observer.observe(staircaseLaunch);
staircase.forEach((el) => observer.observe(el));
