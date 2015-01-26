window.onload = function() {



// ---------------------------------   Carriage   --------------------------------------------------
//Constructor
var Carriage = function() {
	this.$el = document.getElementById("carriage");
	this.state = "off";
	this.$el.style.left = "30px";
	this.$el.style.top = "37px";
};
	
	//Turn on function
	Carriage.prototype.turnOn = function() {
		if (this.state === "off") {
			this.state = "on";
		}
		else {
			alert("Your horse is already bridled, sir!");
		}
	};
	
	//Move right function
	Carriage.prototype.moveRight = function() {
		if (this.state === "on") {
			this.$el.style.left = parseInt(this.$el.style.left, 10) + gear + "." + gearbox[gear][rpm] + "px";
			console.log(this.$el.style.left);
			writing.$rpmIndicator.innerHTML = rpm;
		}
		if ((rpm < 15) && (xmasTree.$r4Lights.className.indexOf("start") !== -1)) {
			rpm++;
		}
		if (this.state === "off") {
			alert("Is your horse bridled, sir??");
		}
	};
	
	//Move left function
	Carriage.prototype.moveLeft = function() {
		if (this.state === "on") {
			this.$el.style.left = parseInt(this.$el.style.left, 10) - 5 + "px";
		}
		else {
			alert("Is your horse bridled, sir??");
		}
	};

	//Finish check function
	Carriage.prototype.finish = function() {
		if(parseInt(this.$el.style.left, 10) > 1190) {
			alert("Great race, sir!");
		}
	};

	//The Gear System!!
	
	//Gear variable
	var gear = 1;
	
	//RPM variable
	var rpm = 0;

	//The gearbox array
	var gearbox = [[],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],
	[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],
	[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],
	[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],
	[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16],[0,1,2,3,4,5,6,7,8,9,11,12,13,14,15,16]];
	
	//Gear variable
	var gear = 1;
	
	//RPM variable
	var rpm = 0;
	
	//Gear change function
	Carriage.prototype.gearChange = function() {
		if ((gear < 10) && (rpm === 15)) {
			gear++;
			rpm = 0;
			writing.$gearIndicator.innerHTML = gear;
		}
	};
	
	//For rpm change, see moveRight function
	
//Creating Carriage instance
var carriage = new Carriage();

// ---------------------------------   Christmas Tree   -----------------------------------------------
//Constructor
var ChristmasTree = function() {
	this.$stageLights = document.getElementById("stageLights");
	this.$yRowLights = document.getElementsByClassName("yRow");
	this.$r1Lights = document.getElementById("row1Lights");
	this.$r2Lights = document.getElementById("row2Lights");
	this.$r3Lights = document.getElementById("row3Lights");
	this.$r4Lights = document.getElementById("row4Lights");
	this.$r5Lights = document.getElementById("row5Lights");
	
	};
	
	//Stage check function
	ChristmasTree.prototype.stageCheck = function() {
		if (parseInt(carriage.$el.style.left, 10) > 148) {
			this.$stageLights.className = "start";
		}
	};
	
	//Light cascade function (refactor?)
	ChristmasTree.prototype.lightCascade = function() {
		var _this = this;
		if ((this.$stageLights.className === "start" ) && (xmasTree.$r4Lights.className !== "start")) {
			var timeoutId1 = window.setTimeout(function() {
				_this.turnOnRow1();
			}, 1500);
			var timeoutId2 = window.setTimeout(function() {
				_this.turnOnRow2();
			}, 2000);
			var timeoutId3 = window.setTimeout(function() {
				_this.turnOnRow3();
			}, 2500);
			var timeoutId4 = window.setTimeout(function() {
				_this.turnOnRow4();
			}, 3000);
		}
	};
	
	//For cascade: turn on row 1
	ChristmasTree.prototype.turnOnRow1 = function() {
		this.$r1Lights.className += " start";
	};
	//For cascade: turn on row 2
	ChristmasTree.prototype.turnOnRow2 = function() {
		this.$r2Lights.className += " start";
	};
	//For cascade: turn on row 3
	ChristmasTree.prototype.turnOnRow3 = function() {
		this.$r3Lights.className += " start";
	};
	//For cascade: turn on row 4 (CSS styling makes green)
	ChristmasTree.prototype.turnOnRow4 = function() {
		this.$r4Lights.className += " start";
	};
	
	//False start / red light function
	ChristmasTree.prototype.falseCheck = function() {
		if ((this.$r4Lights.className.indexOf("start") === -1) && (parseInt(carriage.$el.style.left, 10) > 182)) {
			this.$r5Lights.className += "falseStart";
			alert("It seems you've jumped the gun, sir.");
		}
	};

//Creating ChristmasTree instance
var xmasTree = new ChristmasTree();

// ---------------------------------  Writing   ----------------------------------------------------
//Constructor
var Writing = function() {
	this.$rpmIndicator = document.getElementById("rpmValue");
	this.$gearIndicator = document.getElementById("gearValue");
};

//Creating Writing instance
var writing = new Writing();

// ---------------------------------  Event Listener   ---------------------------------------------
window.addEventListener("keydown", function(event) {
	
	//-----Right move and lighting
	if (event.keyCode === 39) {
		carriage.moveRight();
		xmasTree.stageCheck();
		xmasTree.lightCascade();
		xmasTree.falseCheck();
		carriage.finish();
	}
	
	//-----Horse Bridle
	if (event.keyCode === 13) {
		carriage.turnOn();
	}
	
	//-----Left move
	if (event.keyCode === 37) {
		carriage.moveLeft();
	}
	
	//-----Gear change
	if (event.keyCode === 32) {
		carriage.gearChange();
	}
	});


};