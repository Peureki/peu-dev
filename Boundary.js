function Boundary(x, y, w, h, a, id){
	let options = {
		friction: 0,
		restitution: 0.6,
		angle: a,
		isStatic: true,
	}

	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w; 
	this.h = h;
	this.body.id = id;
	Composite.add(world, this.body);
	console.log(this.body);

	this.show = function() {
		let pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		//strokeWeight(1);
		fill('#FFFFFF');
		//fill('#26F527');
		rect(0, 0, this.w, this.h);
		pop();
	}
}