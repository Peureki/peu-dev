function Circle(x, y, r){
	let options = {
		friction: 0,
		restitution: 0.7,
	}


	this.body = Bodies.circle(x, y, r, options);
	this.r = r; 
	Composite.add(world, this.body);

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
		var pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		strokeWeight(1);
		stroke('#FF1178');
		fill('#FF1178');
		ellipse(0, 0, this.r * 2);
		pop();
	}
}