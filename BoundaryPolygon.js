function BoundaryPolygon(x, y, sides, r, color, id){
	let options = {
		friction: 0,
		restitution: 0,
		isStatic: true,
		mass: 5,
	}

	this.body = Bodies.polygon(x, y, sides, r, options);
	this.r = r; 
	this.body.id = id;
	this.body.render.fillStyle = color;
	Composite.add(world, this.body);
	fill(color);

	this.isOffScreen = () => {
		let pos = this.body.position; 
		if (pos.y > height + 50){
			return true; 
		} else {
			return false; 
		}
	}

	this.removeFromWorld = () => {
		Composite.remove(world, this.body);
	}

	this.setRadius = (newR) => {
		this.r = newR;
	}

	this.changeColor = (color) => {
		fill(color);
	}

	this.show = function() {
		var pos = this.body.position;

		push();
		//translate(pos.x, pos.y); 
		rectMode(CENTER);
		fill(this.body.render.fillStyle);
		noStroke();
		beginShape();
		for (let i = 0; i < sides; i++){
			vertex(this.body.vertices[i].x, this.body.vertices[i].y);
		}
		endShape();
		pop();
	}
}

//fill('#f7e000');