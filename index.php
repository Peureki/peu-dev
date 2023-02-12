<!DOCTYPE html>
<html>
<head>
	<?php 
		//$base  = "https://www.peuwebdesigns.com";
		$base = "http://localhost/peuwebdesigns";
		$date = date("D M d, Y G:i"); // For versioning
	?>

	<!--<link rel ="stylesheet" type="text/css" href="./styles.css">-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

	<title> Matt Nguyen </title>
	<!--<link rel = "shortcut icon" href = "./images/logo.png">-->
	<link type = "text/css" rel = "stylesheet" href = "<?php echo $base;?>/styles.css?v=<?php echo $date;?>">
</head>
<body>
	<!-- 
		*
		*
		*	HERO SECTION
		*
		*
	-->
	<div class = "main-container" id = "hero-container">
		<div class = "nav-container">
			<div class = "nav-bar">
				<ul>
					<li>Home</li>
					<li>Services</li>
					<li>Pricing</li>
					<li>Portfolio</li>
					<li>Contact</li>
				</ul>
			</div>

			<div class = "day-night-mode">
				<img src = "<?php echo $base;?>/images/moon.svg">
			</div>

			<div class = "hamburger">
				Ham
			</div>
		</div>

		<div class = "header-container" id = "hero-header">
			<h1 id = "hero-brand-name">Peu</h1>
			<h2>Web Design & Development</h2>
			<button>Let's start your project!</button>
		</div>
	</div>
	<!-- 
		*
		*
		*	DEVELOPMENT CYCLE CONTAINER PART 1
		*
		*
	-->
	<div class = "main-container">
		<div class = "header-container" id = "development-header-part1">
			<h2>Elevating<span class = "header-highlight"> Small Businesses </span></h2>
		</div>

		<div class = "staircase-container">


			<div class = "staircase">
				<h3>Development</h3>
				<p><span class = "staircase-num">3</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
			<div class = "staircase">
				<h3>Design</h3>
				<p><span class = "staircase-num">2</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
			<div class = "staircase">
				<h3>Intake</h3>
				<p><span class = "staircase-num">1</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
		</div> 
	</div>
	<!-- 
		*
		*
		*	DEVELOPMENT CYCLE CONTAINER PART 2
		*
		*
	-->
	<div class = "main-container" id = "main-staircase-container">
		<div class = "header-container" id = "development-header-part2">
			<h2>Our only limit to design is <span class = "header-highlight">our imagination</span></h2>
		</div>
		<div class = "staircase-container-mirror">
			<div class = "staircase">
				<h3>Revise</h3>
				<p><span class = "staircase-num">4</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
			<div class = "staircase">
				<h3>Test</h3>
				<p><span class = "staircase-num">5</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
			<div class = "staircase">
				<h3>Launch!</h3>
				<p><span class = "staircase-num">6</span>
					<span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></p>
			</div>
		</div> 
	</div>

	<!-- 
		*
		*
		*	PERSONALITY SECTION
		*
		*
	-->
	<div class = "main-container" id = "personality-container">
		<div class = "header-container" id = "personality-header">
			<h2 id = "personality-sticky">Let's add <span class = "header-highlight" id = "personality-focus-word"> Personality </span> to your website</h2>
		</div>
	</div>
	<!-- 
		*
		*
		*	ABOUT ME
		*
		*
	-->
	<div class = "main-container">
		<div class = "header-container" id = "about-header">
			<h2>Hi! <span class = "header-highlight">I'm Matt</span></h2>
			<p>As a kid, I used to create Rube Goldberg contraptions and set up thousands of dominoes. I strive to live my life with my passions. Dominoes, dancing, gaming, buliding communities, web development. I love to see my passions create art or to have a positive impact in the world. This website is a product of combining those passions. Let's work together so I can help you show off your passion!</p>
		</div>
	</div>
	<!-- 
		*
		*
		*	PROJECTS
		*
		*
	-->
	<div class = "main-container">
		<div class = "header-container" id = "project-header">
			<h2>Check out some of my <span class = "header-highlight">projects</span></h2>
		</div>

		<div class = "overflow-x-container">
			<div class = "overflow-x-slider">
				<div class = "project">
					<img src = "<?php echo $base;?>/images/Logo_White.png">
					<div class = "inner-flex-buttons">
						<a href = "https://www.chicagoshufflers.com/" target = "_blank"><button>Case Study</button></a>
						<a href = "https://www.chicagoshufflers.com/" target = "_blank"><button>View Site</button></a>
					</div>
				</div>
				<div class = "project">
					<img src = "<?php echo $base;?>/images/Logo_White.png">
					<div class = "inner-flex-buttons">
						<button>Case Study</button>
						<button>View Site</button>
					</div>
				</div>
				<div class = "project">
					<img src = "<?php echo $base;?>/images/Logo_White.png">
					<div class = "inner-flex-buttons">
						<button>Case Study</button>
						<button>View Site</button>
					</div>
				</div>
				<div class = "project">
					<img src = "<?php echo $base;?>/images/Logo_White.png">
					<div class = "inner-flex-buttons">
						<button>Case Study</button>
						<button>View Site</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
<script type = "text/javascript" src = "<?php echo $base;?>/p5.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src="matter.js"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Domino.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Boundary.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/BoundaryCircle.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/BoundaryPolygon.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Circle.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/rube-goldberg.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/script.js?v=<?php echo $date;?>"></script>

</html>
