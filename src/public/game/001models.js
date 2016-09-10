'use-strict';
lotgModels = {};




	
function loadModels(scene){
	
	console.log('loading models');
	
	var tilePromise = new Promise  (function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Circle','../assets/','hex.babylon',scene,resolve);
	});
	
  
	tilePromise.then(function(data,data2){
		//data.isVisible = false;
		var tile = data[0];
		tile.isVisible = false;
		tile.rotation.y = Math.PI/2;
		//console.log(data[0]);
		//console.log(data[1]);
		lotgModels.hex = tile;
//		createTile(0,0,0);
//		createTile(0,0,1);
//		createTile(0,0,2);
//		createTile(0,0,3);
//		createTile(0,0,4);
//		createTile(0,0,5);
//		
		for(let x = 0; x < 20; x ++){
			for(let z = 0; z < 20; z++){
				createTile(x, 0, z);
			}
		}
		
		
//		createTile(8,0,0);
	});
	
	
}




var tileHeight = 0.86;
var tileHalfWidth = 1.5;
var tileFullWidth = 3;

function createTile(x,y,z){
	// console.log(lotgModels);
	 var tile = lotgModels.hex.clone(lotgModels.hex.name);
	 tile.isVisible = true;
	 if(x %2 === 0){
		 tile.position.x = x * tileHalfWidth;
		 tile.position.z = z * tileHeight * 2;
		 
	 }else{
		 tile.position.z = z * tileHeight * 2 + tileHeight ;
		 tile.position.x = x * tileHalfWidth;
	 }
	 tile.position.y = y ;
	 
	 
	  
 }


	// load all the models
	
	
	
