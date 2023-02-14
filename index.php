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

	<title>Peu Web Designs | Web Designs & Development</title>
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

		<div class = "sideheader-container" id = "hero-header">
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
		<div class = "sideheader-container" id = "development-header-part1">
			<h2>Elevating<span class = "header-highlight"> Small Businesses </span></h2>
		</div>

		<div class = "staircase-container">


			<div class = "staircase">
				<h3>Development</h3>
				<p><span class = "staircase-num">3</span>
					<span>Once we've set on a design, I can start coding it and bringing it to life!</span></p>
			</div>
			<div class = "staircase">
				<h3>Design</h3>
				<p><span class = "staircase-num">2</span>
					<span>We'll meet again to discuss if there's any inspiration you'd like to draw from. I'll make 1-3 mock designs and we will collaborate through the whole process.</span></p>
			</div>
			<div class = "staircase">
				<h3>Intake</h3>
				<p><span class = "staircase-num">1</span>
					<span>This is the initial contact! We'll talk and discuss your vision and goals to determine if this route is the perfect fit for you.</span></p>
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
		<div class = "sideheader-container" id = "development-header-part2">
			<h2>Our only limit to design is <span class = "header-highlight">our imagination</span></h2>
		</div>
		<div class = "staircase-container-mirror">
			<div class = "staircase">
				<h3>Revise</h3>
				<p><span class = "staircase-num">4</span>
					<span>After creating the website, I'll send it back for you to review. We'll check if there's any typos, padding/margin issues, responsiveness that could be tweaked, etc.</span></p>
			</div>
			<div class = "staircase">
				<h3>Test</h3>
				<p><span class = "staircase-num">5</span>
					<span>This phase goes hand-in-hand with Revise. We'll test the website, especially if there's heavy scripts such as animations or effects. We'll also discuss any last minute changes and get a target launch date!</span></p>
			</div>
			<div class = "staircase">
				<h3 id = "staircase-launch">Launch!</h3>
				<p><span class = "staircase-num">6</span>
					<span>This is the best part. We can show the world our creation! Share with your friends, family, current and future clients something you can show off.</span></p>
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
					<h3>Chicago Shufflers</h3>
					<img src = "<?php echo $base;?>/images/chicago-shufflers-logo.png">
					<div class = "inner-flex-buttons">
						<!-- <a href = "https://www.chicagoshufflers.com/" target = "_blank"><button>Case Study</button></a> -->
						<a href = "https://www.chicagoshufflers.com/" target = "_blank"><button>View Site</button></a>
					</div>
				</div>
				<div class = "project">
					<h3>208 Turf</h3>
					<img src = "<?php echo $base;?>/images/208-logo.svg">
					<div class = "inner-flex-buttons">
						<!-- <a href = "https://www.208turf.com/" target = "_blank"><button>Case Study</button></a> -->
						<a href = "https://www.208turf.com/" target = "_blank"><button>View Site</button></a>
					</div>
				</div>
				
				<div class = "project">
					<h3>Venture Holidays Aruba</h3>
					<img src = "<?php echo $base;?>/images/aruba-logo.png">
					<div class = "inner-flex-buttons">
						<!-- <a href = "https://www.kiteboardingaruba.com/" target = "_blank"><button>Case Study</button></a> -->
						<a href = "https://www.kiteboardingaruba.com/" target = "_blank"><button>View Site</button></a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 
		*
		*
		*	DOMINO WALL
		*
		*
	-->
	<div class = "main-container" id = "domino-wall-container">
		<div class = "header-container" id = "domino-wall-header">
			<h2>Let's build something<span class = "header-highlight">together</span></h2>
		</div>
	</div>

	<!-- 
		*
		*
		*	PRICING
		*
		*
	-->
	<div class = "main-container" id = "pricing-container">
		<div class = "header-container" id = "pricing-header">
			<h2><span class = "header-highlight">$0 down</span> for all plans</h2>
			<h5>Hosting • Domain •  Google Analytics • SEO</h5>
			<p>*Pricing may vary depending on the scope and complexity of the project</p>
			<button>Let's get started!</button>
		</div>

		<div class = "plans-container">
			<div class = "plans">
				<h4>Static</h4>
				<h3><span class = "header-highlight">$100</span><span class = "plan-subheader">per month<span></h3>
				<p>Simple, yet elegant</p>
				<ul>
					<li>Custom templates</li>
					<li>1 page free</li>
					<li>1hr/month free maintenance</li>
				</ul>
			</div>
			<div class = "plans">
				<h4>Dynamic</h4>
				<h3><span class = "header-highlight">$200</span><span class = "plan-subheader">per month<span></h3>
				<p>Show the world who you are and your business</p>
				<ul>
					<li>The sky is our limit to design</li>
					<li>Up to 7 pages free</li>
					<li>3hr/month free maintenance</li>
				</ul>
			</div>
			<div class = "plans">
				<h4>Basic</h4>
				<h3><span class = "header-highlight">$150</span><span class = "plan-subheader">per month<span></h3>
				<p>Let's make an impact</p>
				<ul>
					<li>Custom templates</li>
					<li>Up to 5 pages free</li>
					<li>2hr/month free maintenance</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 
		*
		*
		*	CONTACT ME
		*
		*
	-->
	<div class = "main-container">
		<div class = "header-container" id = "contact-header">
			<h2>Send me a message and or fill out the questionnaire so we can start creating<span class = "header-highlight">your goals</span>
			<h4><a href = "">newyenmatt@gmail.com</a></h4>
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
