'use-strict';
function trackUnit(mesh,color){
	
	var indicator = new BABYLON.Sprite('indicator',lotg.sprites.indicatorManager);
	var indicator2 = new BABYLON.Sprite('indicator',lotg.sprites.indicatorManager);
	
	indicator.position.y = 2;
	indicator.position.x = 1;
	indicator.position.z = 1;
	indicator.size= 0.25;
	indicator.color = color;
	indicator2.position.y = 2;
	indicator2.position.x = 1;
	indicator2.position.z = 1;
	indicator2.size= 0.25;
	indicator2.color = color;
	
	
	indicator.time = 0;
	indicator.lotg ={
		defaultColor: color
	};
	indicator.select = function(){
		indicator.color = new BABYLON.Color4(1,1,0,1);
//		indicator2.color = new BABYLON.Color4(1,1,0,1);
	};
	indicator.unselect = function(){
		indicator.color = indicator.lotg.defaultColor;
//		indicator2.color = indicator.lotg.defaultColor;
	};
	
	indicator.clear = function(){
		lotgScene.unregisterBeforeRender(circle);
		indicator.dispose();
		indicator2.dispose();
		indicator =  null;
		indicator2 = null;
	};
	
	
	function circle(){
		//console.log('wow');
		indicator.time += lotg.clock.delta;
		indicator.position.x = mesh.position.x + Math.cos(indicator.time / 1000);
		indicator.position.z = mesh.position.z + Math.sin(indicator.time / 1000);		
		indicator.position.y = mesh.lotg.currentTile.position.y  + 0.65 ;	
		
		indicator2.position.x = mesh.position.x + Math.cos(Math.PI +indicator.time / 1000);
		indicator2.position.z = mesh.position.z + Math.sin(Math.PI + indicator.time / 1000);
		indicator2.position.y = mesh.lotg.currentTile.position.y  + 0.65;
		//console.log(indicator.time);
		
	}
	lotgScene.registerBeforeRender(circle);
	
	return indicator;
	
}

