'use-strict';

function loadCone(){
	
	var conePromise = new Promise(function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Cone','../assets/','cone.babylon',scene,resolve);
	});	
	
	conePromise.then(function(data){
		var cone = data[0];
		cone.isVisible = false;
		cone.scaling.x = 0.75;
		cone.scaling.y = 1;
		cone.scaling.z = 0.75;
		cone.position.y = 2;
		cone.position.x = 3;
		lotgModels.cone = cone;
		cone.convertToFlatShadedMesh();
		cone.material = lotgMats.greyMat;
//		cone.lotg.defaultMat = lotgMats.greyMat;
		
	});
	
	return conePromise;
	
}


function createCone(playerId){
	
	var cone = lotgModels.cone.clone(lotgModels.cone.name);
	cone.lotg = {};
	cone.lotg.playerId = playerId;
	cone.lotg.previousTile = null;
	cone.lotg.currentTile = null;
	cone.lotg.startingTile = null;
	//cone.lotg.selectable = true;
	
//	cone.material = lotgMats.greyMat;
//	cone.lotg.defaultMat = lotgMats.greyMat;
	cone.lotg.unitInfo  = new unitInfo({attack : 2, move:5, health: 2, defense : 3, height : 4, range: 6 ,name : "Cone",yOffset : 2});
	cone.lotg.type = 'UNIT';
	cone.isVisible = true;
	lotg.units.push(cone);
	cone.lotg.indicator = trackUnit(cone,getPlayerColor(playerId));
	
	return cone;
}