'use-strict';

function startClock(scene){
	

	function gameClock(){
		let time = Date.now() ;
		let deltaTime = 0;
		let runTime = 0;
		 
		function tick(){
			deltaTime = Date.now() - time;
			runTime += deltaTime;
			time = Date.now();
			//console.log(deltaTime);
		}
		
		
		let clock = {
				get delta() {return deltaTime;}
		};
//		clock.delta = function(){
//			return deltaTime;
//		};
		
		scene.registerBeforeRender(tick);
		return clock;
		
	}
	lotg.clock = gameClock();
	//console.log(lotg.clock);


//gameClock();
}