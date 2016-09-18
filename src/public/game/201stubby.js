'use-strict';

function loadStubby(){
	
	var stubbyPromise =  new Promise(function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Cube','../assets/','stubby.babylon',scene,resolve);
	});
	
	stubbyPromise.then(function(data){
		var stubby = data[0];
		stubby.isVisible = false;
		stubby.scaling.x = 0.5;
		stubby.scaling.y = 0.5;
		stubby.scaling.z = 0.5;		
//		stubby.convertToFlatShadedMesh();
		lotgModels.stubby = stubby;		
		
	});
	return stubbyPromise;
	
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
	stub.lotg.unitInfo  = new unitInfo({attack : 3, move:5, health: 5, defense : 4, height : 4, name : "Stubs"});
	stub.lotg.type = 'UNIT';
	stub.isVisible = true;
	lotg.units.push(stub);
	stub.lotg.indicator = trackUnit(stub,getPlayerColor(playerId));
	
	return stub;
}