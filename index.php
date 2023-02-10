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

	<div class = "main-container">
		<div class = "staircase-container">
			<div class = "staircase">
				
			</div>
			<div class = "staircase">
				
			</div>
			<div class = "staircase">
				
			</div>
		</div> 
	</div>

	<div class = "main-container">
		<div class = "staircase-container" id = "staircase-backwards">
			<div class = "staircase">
				
			</div>
			<div class = "staircase">
				
			</div>
			<div class = "staircase">
				
			</div>
		</div> 
	</div>

</body>
<script type = "text/javascript" src = "<?php echo $base;?>/p5.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src="matter.js"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Box.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Boundary.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/Circle.js?v=<?php echo $date;?>"></script>
<script type = "text/javascript" src = "<?php echo $base;?>/rube-goldberg.js?v=<?php echo $date;?>"></script>

</html>
