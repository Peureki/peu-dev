<!DOCTYPE html>
<html>
<head>
	<?php 
		//$base  = "https://www.peuwebdesign.com";
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
		*	NAVIGATION AND OTHER STUFF
		*
		*
	-->

	<div class = "nav-container">
		<div class = "nav-bar">
			<ul id = "nav-list">
				<a href = "#home"><li>Home</li></a>
				<a href = "#development"><li>Development</li></a>
				<a href = "#about"><li>About</li></a>
				<a href = "#projects"><li>Projects</li></a>
				<a href = "#pricing"><li>Pricing</li></a>
				<a href = "#contact"><li>Contact</li></a>
			</ul>
		</div>

		<div class = "inner-nav">
			<div class = "light-dark-mode">
				<img src = "<?php echo $base;?>/images/moon.svg" id = "moon">
				<img src = "<?php echo $base;?>/images/sun.svg" id = "sun">
			</div>

			<div class = "settings-toggle">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" fill-rule="nonzero" id = "settings-cog"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M22.20508,2c-0.48953,0.00026 -0.90693,0.35484 -0.98633,0.83789l-0.97266,5.95508c-1.16958,0.34023 -2.28485,0.7993 -3.33594,1.37109l-4.91406,-3.50977c-0.39728,-0.28369 -0.94131,-0.23911 -1.28711,0.10547l-3.89062,3.88672c-0.3432,0.34344 -0.39015,0.88376 -0.11133,1.28125l3.45703,4.94531c-0.58061,1.05722 -1.04985,2.17878 -1.39844,3.35938l-5.92969,0.98633c-0.4815,0.0811 -0.83404,0.49805 -0.83398,0.98633v5.5c-0.00088,0.48518 0.3466,0.901 0.82422,0.98633l5.93359,1.05078c0.3467,1.17855 0.81296,2.30088 1.39453,3.35937l-3.5,4.89648c-0.28369,0.39728 -0.23911,0.94131 0.10547,1.28711l3.88867,3.89063c0.34265,0.34275 0.88175,0.39048 1.2793,0.11328l4.95508,-3.46875c1.05419,0.57517 2.17218,1.03762 3.3457,1.38086l0.99023,5.96289c0.08025,0.48228 0.49742,0.83584 0.98633,0.83594h5.5c0.4858,0.00071 0.90184,-0.34778 0.98633,-0.82617l1.06055,-5.98633c1.16868,-0.3485 2.28142,-0.8178 3.33008,-1.39648l4.98828,3.5c0.39749,0.27882 0.93781,0.23187 1.28125,-0.11133l3.88867,-3.89258c0.34612,-0.34687 0.38995,-0.89343 0.10352,-1.29102l-3.55664,-4.9375c0.56867,-1.04364 1.02681,-2.14972 1.36719,-3.31055l6.01758,-1.05469c0.47839,-0.08448 0.82689,-0.50053 0.82617,-0.98633v-5.5c-0.00026,-0.48953 -0.35484,-0.90693 -0.83789,-0.98633l-6.00781,-0.98242c-0.34266,-1.15945 -0.80206,-2.26356 -1.37109,-3.30664l3.50781,-4.99805c0.27882,-0.39749 0.23187,-0.93781 -0.11133,-1.28125l-3.89062,-3.88867c-0.34687,-0.34612 -0.89343,-0.38995 -1.29102,-0.10352l-4.92383,3.54102c-1.04908,-0.57636 -2.16255,-1.04318 -3.33398,-1.38867l-1.04687,-5.98437c-0.08364,-0.47917 -0.49991,-0.82867 -0.98633,-0.82812zM23.05664,4h3.80859l0.99609,5.68555c0.06772,0.38959 0.35862,0.70269 0.74219,0.79883c1.46251,0.36446 2.83609,0.94217 4.08984,1.70117c0.34265,0.20761 0.77613,0.1907 1.10156,-0.04297l4.67969,-3.36328l2.69336,2.69336l-3.33203,4.74805c-0.22737,0.3236 -0.24268,0.75079 -0.03906,1.08984c0.75149,1.25092 1.32146,2.61583 1.68555,4.07031c0.0969,0.38717 0.41473,0.67966 0.80859,0.74414l5.70703,0.93359v3.80859l-5.71875,1.00391c-0.3899,0.06902 -0.70237,0.36157 -0.79687,0.74609c-0.35988,1.45263 -0.93019,2.8175 -1.68164,4.06836c-0.20617,0.34256 -0.18851,0.775 0.04492,1.09961l3.37891,4.68945l-2.69336,2.69531l-4.74023,-3.32617c-0.32527,-0.22783 -0.75452,-0.24163 -1.09375,-0.03516c-1.24752,0.75899 -2.62251,1.33943 -4.08008,1.70898c-0.38168,0.09622 -0.67142,0.40737 -0.74023,0.79492l-1.00977,5.6875h-3.81445l-0.94141,-5.66211c-0.06549,-0.39365 -0.35874,-0.7107 -0.74609,-0.80664c-1.46338,-0.36069 -2.84314,-0.93754 -4.10547,-1.69531c-0.33857,-0.20276 -0.76473,-0.18746 -1.08789,0.03906l-4.70312,3.29492l-2.69531,-2.69922l3.32422,-4.64648c0.23221,-0.3254 0.24834,-0.75782 0.04102,-1.09961c-0.76602,-1.26575 -1.34535,-2.6454 -1.71094,-4.11523c-0.09555,-0.38244 -0.40684,-0.67307 -0.79492,-0.74219l-5.63086,-1v-3.81445l5.62695,-0.93555c0.39312,-0.06519 0.71002,-0.35754 0.80664,-0.74414c0.36873,-1.4749 0.94778,-2.85432 1.71094,-4.11719c0.20562,-0.33876 0.19183,-0.76697 -0.03516,-1.0918l-3.28516,-4.69531l2.69727,-2.69531l4.66211,3.33203c0.32413,0.23112 0.75447,0.248 1.0957,0.04297c1.25566,-0.75415 2.63862,-1.32636 4.10352,-1.68555c0.38927,-0.09584 0.68369,-0.41486 0.74805,-0.81055zM25,17c-4.40643,0 -8,3.59357 -8,8c0,4.40643 3.59357,8 8,8c4.40643,0 8,-3.59357 8,-8c0,-4.40643 -3.59357,-8 -8,-8zM25,19c3.32555,0 6,2.67445 6,6c0,3.32555 -2.67445,6 -6,6c-3.32555,0 -6,-2.67445 -6,-6c0,-3.32555 2.67445,-6 6,-6z"></path></g></g></svg>
			</div>
		</div>

		<div class = "hamburger">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>

	

	<div class = "settings-popup">
		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round" id = "refresh">
	  		<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
	  		<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
	  		<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
		</svg>
		<div class = "settings-mode">
			<p id = "drop-mode" onclick = "selectMode(1);">Drop</p>
			<p id = "clear-mode" onclick = "selectMode(2);">Clear</p>
			<div class = "selected-mode"></div>
		</div>
		<div class = "settings-options">
		</div>
	</div>



	<!-- 
		*
		*
		*	HERO SECTION
		*
		*
	-->
	<div class = "main-container" id = "home">

		<div class = "sideheader-container" id = "hero-header">
			<h1 id = "hero-brand-name">Peu</h1>
			<h2>Web Design & Development</h2>
			<a href = "#contact-header"><button>Let's start your project!</button></a>
		</div>
	</div>
	<!-- 
		*
		*
		*	DEVELOPMENT CYCLE CONTAINER PART 1
		*
		*
	-->
	<div class = "main-container" id = "development">
		<div class = "sideheader-container" id = "development-header-part1">
			<h2>Elevating<span class = "header-highlight"> Small Businesses </span></h2>
		</div>

		<div class = "staircase-container">


			<div class = "staircase">
				<h3>Develop</h3>
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
			<h2 id = "personality-sticky">Let's add <span class = "header-highlight" id = "personality-focus-word"> Unique </span> to your website</h2>
		</div>
	</div>
	<!-- 
		*
		*
		*	ABOUT ME
		*
		*
	-->
	<div class = "main-container" id = "about">
		<div class = "header-container" id = "about-header">
			<h2 id = "about-header-highlight">Hi! <span class = "header-highlight">I'm Matt</span></h2>
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
	<div class = "main-container" id = "projects">
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
					<h3>Alfonso & Webber</h3>
					<img src = "<?php echo $base;?>/images/Alfonso_Webber_Logo_Horizontal_White.svg">
					<div class = "inner-flex-buttons">
						<!-- <a href = "https://www.chicagoshufflers.com/" target = "_blank"><button>Case Study</button></a> -->
						<a href = "https://www.alfonsoandwebber.com/" target = "_blank"><button>View Site</button></a>
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

		<div class = "project-tooltip">
			<p>Drag</p>
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
			<h2>Be <span class = "header-highlight">different</span> than everyone else</h2>
		</div>
	</div>

	<!-- 
		*
		*
		*	PRICING
		*
		*
	-->
	<div class = "main-container" id = "pricing">
		<div class = "header-container" id = "pricing-header">
			<h2><span class = "header-highlight">$0 down</span> for all plans</h2>
			<h5>Hosting • Domain •  Google Analytics • SEO</h5>
			<p>*Pricing may vary depending on the scope and complexity of the project</p>
			<a href = "#contact"><button>Let's get started!</button></a>
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
	<div class = "main-container" id = "contact">
		<div class = "header-container" id = "contact-header">
			<h2>Start building your<span class = "header-highlight">dream site</span> today!
			<h5><a href = "mailto:peuwebdesign@gmail.com">peuwebdesign@gmail.com</a></h5>
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
<script type = "text/javascript" src = "<?php echo $base;?>/settings.js?v=<?php echo $date;?>"></script>

</html>
