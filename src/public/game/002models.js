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
	
	
	stubbyPromise.then(function(data){
		var stubby = data[0];
		stubby.isVisible = false;
		stubby.scaling.x = 0.5;
		stubby.scaling.y = 0.5;
		stubby.scaling.z = 0.5;		
		
		lotgModels.stubby = stubby;
		
		
		
	});
	
	promises.push(lotgPromises.tile);
	promises.push(stubbyPromise);
	
	return promises;
  
	
}


function createStubby(){
	var stub = lotgModels.stubby.clone(lotgModels.stubby.name);
	stub.lotg = {};
	stub.lotg.previousTile = null;
	//stub.lotg.selectable = true;
	
	stub.material = lotgMats.redMat;
	stub.lotg.defaultMat = lotgMats.redMat;
	stub.lotg.unitInfo  = getUnitInfo();
	stub.lotg.type = 'UNIT';
	stub.isVisible = true;
	return stub;
}


function getUnitInfo(){
	var unit = {};
	unit.name = 'Stubs';
	unit.health = 1;
	unit.move = 1;
	unit.attack = 1;
	unit.defense = 1;
	unit.range = 1;
	
	return unit;
}