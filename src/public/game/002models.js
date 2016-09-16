'use-strict';



	
function loadModels(scene){
	
	console.log('loading models');
	

	var promises = [];
	
	lotgPromises.tile = new Promise  (function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Circle','../assets/','hex.babylon',scene,resolve);
	});
	
	var stubbyPromise =  new Promise(function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Cube','../assets/','stubby.babylon',scene,resolve);
	});
	
	var pillbugPromise = new Promise(function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Sphere','../assets/','pillbug.babylon',scene,resolve);
	});
	
	stubbyPromise.then(function(data){
		var stubby = data[0];
		stubby.isVisible = false;
		stubby.scaling.x = 0.5;
		stubby.scaling.y = 0.5;
		stubby.scaling.z = 0.5;		
		stubby.convertToFlatShadedMesh();
		lotgModels.stubby = stubby;		
		
	});
	
	
	
	pillbugPromise.then(function(data){
		var bug = data[0];
		bug.isVisible = false;
		bug.scaling.x = 0.25;
		bug.scaling.y = 0.25;
		bug.scaling.z = 0.25;
		bug.position.y = 2;
		//bug.convertToFlatShadedMesh();
		console.log(bug);
		lotgModels.pillbug = bug;
		
	});
	
	
	
	promises.push(lotgPromises.tile);
	promises.push(stubbyPromise);
	promises.push(pillbugPromise);
	
	return promises;
  
	
}


function createStubby(playerId){
	
	var stub = lotgModels.stubby.clone(lotgModels.stubby.name);
	stub.lotg = {};
	stub.lotg.playerId = playerId;
	stub.lotg.previousTile = null;
	stub.lotg.currentTile = null;
	stub.lotg.startingTile = null;
	//stub.lotg.selectable = true;
	
	stub.material = lotgMats.greyMat;
	stub.lotg.defaultMat = lotgMats.greyMat;
	stub.lotg.unitInfo  = getUnitInfo();
	stub.lotg.type = 'UNIT';
	stub.isVisible = true;
	lotg.units.push(stub);
	stub.lotg.indicator = trackUnit(stub,getPlayerColor(playerId));
	
	return stub;
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
