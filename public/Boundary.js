function Boundary(x, y, w, h, a, color, id){
	let options = {
		friction: 0.5,
		restitution: 0,
		angle: a,
		isStatic: true,
		mass: 10,
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w; 
	this.h = h;
	this.body.id = id;

	if (color == "default"){
		this.body.render.fillStyle = "#FFFFFF";
	} else {
		this.body.render.fillStyle = color;
	}

	this.changeColor = (c) => {
		this.body.render.fillStyle = c;
	}
	
	Composite.add(world, this.body);
	//console.log(this.body);
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

	this.show = function() {
		let pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		//strokeWeight(1);
		fill(this.body.render.fillStyle);
		//fill('#26F527');
		rect(0, 0, this.w, this.h);
		pop();
	}
}