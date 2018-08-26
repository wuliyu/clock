const clock = (function() {
	const WIDTH = 600;
	const HEIGHT = 600;
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext("2d");
	const R = WIDTH / 2;
	function drawBackground() {
		context.save();
		context.translate(R, R);
		context.beginPath();
		context.lineWidth = 10;
		context.arc(0, 0, R - 5, 0, 2*Math.PI, false);
		context.stroke();

		var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
		context.font = "50px Arial";
		context.textAlign = "center";
		context.textBaseline = "middle";
		hourNumbers.forEach(function(number, i) {
			var rad = 2 * Math.PI / 12 * i;
			var x = Math.cos(rad) * (R - 50);
			var y = Math.sin(rad) * (R - 50);
			context.fillText(number, x, y);
		});

		for (var i = 0; i < 60; i++) {
			var rad = 2 * Math.PI / 60 * i;
			var x = Math.cos(rad) * (R - 18);
			var y = Math.sin(rad) * (R - 18);
			context.beginPath();
			if (i % 5 === 0) {
				context.arc(x, y, 4, 0, 2 * Math.PI , false);
			}
			context.arc(x, y, 2, 0, 2 * Math.PI , false);
			context.fill();
		}
	};
	function drawHour() {
		context.beginPath();
		context.lineWidth = 6;
		context.moveTo(0, 10);	
		context.lineTo(0, -r / 2);
		context.stroke();
	};
	function drawDot() {
		context.beginPath();
		context.arc(0, 0, 10, 0, 2 * Math.PI, false);
		context.fill();
	};

	function drawHour(hour, minute) {
		context.save();
		context.beginPath();
		var rad = 2 * Math.PI / 12 * hour;
		var mrad = 2 * Math.PI / 12 / 60 * minute;
		context.rotate(rad + mrad);
		context.lineWidth = 6;
		context.lineCap = "round";
		context.moveTo(0, 10);	
		context.lineTo(0, -R / 2);
		context.stroke();
		context.restore();
	};

	function drawMinute(minute) {
		context.save();
		context.beginPath();
		var rad = 2 * Math.PI / 60 * minute;
		context.rotate(rad);
		context.lineWidth = 4;
		context.lineCap = "round";
		context.moveTo(0, 10);	
		context.lineTo(0, -R + 30);
		context.stroke();
		context.restore();
	};

	function drawSecond(second) {
		context.save();
		context.beginPath();
		var rad = 2 * Math.PI / 60 * second;
		context.rotate(rad);
		context.lineWidth = 2;
		context.lineCap = "round";
		context.moveTo(-2, 20);	
		context.lineTo(2, -R + 60);
		context.stroke();
		context.restore();
	};
 	return {
 		init:function () {
			document.body.style["text-align"] = "center";
			canvas.width = WIDTH;
			canvas.height = HEIGHT;
		},
		

		draw:function (){
			context.clearRect(0, 0, WIDTH, HEIGHT);
			var now = new Date();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
			drawBackground();
			drawHour(hour, minute);
			drawMinute(minute);
			drawSecond(second);
			drawDot();
			context.restore();
		}
 	};
})();

clock.init();
clock.draw();
setInterval(clock.draw, 1000);



