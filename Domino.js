function Domino(x, y, w, h, id){
	let options = {
		density: 0.001,
	    restitution: 0.5,
	    friction: 1,
	    frictionAir: 0.01,
	}


	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w; 
	this.h = h;
	// For some reason, this.body.id = id breaks physics ???
	this.id = id;
	

	this.isOffScreen = () => {
		let pos = this.body.position; 
		if (pos.y > height + 100){
			return true; 
		} else {
			return false; 
		}
	}

	this.removeFromWorld = () => {
		Composite.remove(world, this.body);
	}
	Composite.add(world, this.body);

	this.show = function() {
		var pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		fill('#FFFFFF');
		rect(0, 0, this.w, this.h);
		pop();
	}
}