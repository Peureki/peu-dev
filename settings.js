let settingsToggle = document.querySelector('.settings-toggle'),
	cog = document.getElementById('settings-cog'),
	settingsPopup = document.querySelector('.settings-popup'),
	settingsOptions = document.querySelector('.settings-options'),
	refreshButton = document.getElementById('refresh');

let settingsMode = document.querySelector('.settings-mode'),
	selectedMode = document.querySelector('.selected-mode'),
	dropMode = document.getElementById('drop-mode'),
	clearMode = document.getElementById('clear-mode');

refreshButton.addEventListener("click", windowResized);

let dropChoice = 0;

function clearSettings(boundary){
	this.clearAllBoundaries = () => {
		for (let i = 0; i < boundary.length; i++){
			boundary[i].removeFromWorld();
	        boundary.splice(i, 1);
	        i--;
		}
	}
	this.clearAllDominoes = () => {
		for (let i = 0; i < dominoes.length; i++){
			dominoes[i].removeFromWorld();
	        dominoes.splice(i, 1);
	        i--;
		}
	}
	this.clearRecentBoundaries = () => {
		for (let i = 0; i < boundary.length; i++){
			if (boundary[i].body.id.includes("merp")){
				boundary[i].removeFromWorld();
		        boundary.splice(i, 1);
		        i--;
			}
		}
	}
	this.clearRecentDominoes = () => {
		for (let i = 0; i < dominoes.length; i++){
			if (dominoes[i].id.includes("merp")){
				dominoes[i].removeFromWorld();
		        dominoes.splice(i, 1);
		        i--;
			}
		}
	}
	this.clearAllCircles = () => {
		for (let i = 0; i < circles.length; i++){
			circles[i].removeFromWorld();
	        circles.splice(i, 1);
	        i--;
		}	
	}
}

function selectMode(mode){
	let html = settingsOptions.innerHTML;
	switch (mode){
	case 1: selectedMode.style.left = 0;
		html = `
			<button onclick = "dropChoice = 1;">Circles</button>
			<button onclick = "dropChoice = 2;">Squares</button>
			<button onclick = "dropChoice = 3;">Lines</button>
			<button onclick = "dropChoice = 4;">Dominoes</button>
		`;
		break;
	case 2: selectedMode.style.left = `${50}%`;
		html = `
			<button onclick = "new clearSettings(boundaries).clearAllBoundaries();">All Boundaries</button>
			<button onclick = "new clearSettings(boundaries).clearRecentBoundaries();">Recent Boundaries</button>
			<button onclick = "new clearSettings(boundaries).clearAllDominoes();">All Dominoes</button>
			<button onclick = "new clearSettings(boundaries).clearRecentDominoes();">Recent Dominoes</button>
		`;
		break;
	}
	settingsOptions.innerHTML = html;
}
selectMode(1);


function mousePressed(){
    //boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    //circles.push(new Circle(mouseX, mouseY,random(10, 20)));
    //boundaries.push(new Boundary(mouseX, mouseY, 10, 10, 0, "default", "merp"));
    switch (dropChoice){
    case 1: circles.push(new Circle(mouseX, mouseY,random(10, 20)));
        break;

    case 2: boundaries.push(new Boundary(mouseX, mouseY, 20, 20, 0, "default", "merp"));
    	break;

    case 3: boundaries.push(new Boundary(mouseX, mouseY, 200, 10, 0, "default", "merp"));
    	break;

    case 4: dominoes.push(new Domino(mouseX, mouseY, 20, windowHeight*0.2, "merp"));
    	break;

    default: circles.push(new Circle(mouseX, mouseY,random(10, 20)));
    	break;
    }
    //settingsOptions.children[dropChoice-1].style.color = "var(--color-secondary)";

}

let turn = 0,
	popUpToggle = 0;
settingsToggle.addEventListener('click', () => {
	turn += 180;
	cog.style.transform = `rotate(${turn}deg)`;

	if (popUpToggle == 0){
		settingsPopup.style.display = "flex";
		popUpToggle = 1;
	} else {
		settingsPopup.style.display = "none";
		popUpToggle = 0;
	}
})
