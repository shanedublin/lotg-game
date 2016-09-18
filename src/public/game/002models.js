'use-strict';



	
function loadModels(scene){
	
	console.log('loading models');
	

	var promises = [];
	
	lotgPromises.tile = new Promise  (function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Circle','../assets/','hex.babylon',scene,resolve);
	});
	
	

	
	
	lotgPromises.tile.then(function(data,data2){
		//data.isVisible = false;
		var tile = data[0];
		tile.isVisible = false;
		tile.rotation.y = Math.PI/2;
		tile.material = lotgMats.grass;
//		tile.renderOutline = true;
		tile.scaling.y = 2;
//		tile.convertToFlatShadedMesh();
		//console.log(data[0]);
		//console.log(data[1]);
		lotgModels.hex = tile;
//		createFlatMap(10,1,10);
		hardCodeMap(10,7,10);

		
	});

	
	
	

	
	
	promises.push(lotgPromises.tile);
//	promises.push(stubbyPromise);
//	promises.push(pillbugPromise);
	
	return promises;
  
	
}




function getPlayerColor(playerId){
	
	var blue = new BABYLON.Color4(8/255,5/255,190/255,0.8);
	var red = new BABYLON.Color4(190/255,5/255,8/255,0.8);
	
	switch (playerId) {
	case 1:
		return blue;		
	case 2:
		return red;
	default:
		break;
	}
	
	
}

function getUnitInfo(){
	var unit = {};
	unit.name = 'Stubs';
	unit.health = 1;
	unit.move = 7;
	unit.remainingMoves = 7;
	unit.attack = 3;
	unit.defense = 3;
	unit.range = 1;
	unit.movePath = [];
	unit.height = 4;
	
	return unit;
}
