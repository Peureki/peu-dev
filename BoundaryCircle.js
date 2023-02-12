function BoundaryCircle(x, y, r, color, id){
	let options = {
		friction: 0,
		restitution: 0,
		isStatic: true,
	}

	this.body = Bodies.circle(x, y, r, options);
	this.r = r; 
	this.body.id = id;
	this.body.render.fillStyle = color;
	Composite.add(world, this.body);

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
		var pos = this.body.position,
			angle = this.body.angle;

		push();
		translate(pos.x, pos.y); 
		rotate(angle);
		rectMode(CENTER);
		fill(this.body.render.fillStyle);
		ellipse(0, 0, this.r * 2);
		pop();
	}
}

//fill('#f7e000');