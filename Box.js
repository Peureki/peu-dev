function Box(x, y, w, h){
	let options = {
		friction: 0,
		restitution: 0.6,
	}


	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w; 
	this.h = h;
	Composite.add(world, this.body);

	this.show = function() {
		var pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		strokeWeight(1);
		stroke(255);
		fill(127);
		rect(0, 0, this.w, this.h);
		pop();
	}
}