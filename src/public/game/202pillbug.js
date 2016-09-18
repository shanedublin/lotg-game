'use-strict';

function loadPillbug(){
	
	var pillbugPromise = new Promise(function(resolve,reject){
		BABYLON.SceneLoader.ImportMesh('Sphere','../assets/','pillbug.babylon',scene,resolve);
	});	
	
	pillbugPromise.then(function(data){
		var bug = data[0];
		bug.isVisible = false;
		bug.scaling.x = 0.25;
		bug.scaling.y = 0.25;
		bug.scaling.z = 0.25;
		bug.position.y = 2;
		lotgModels.pillbug = bug;
		bug.convertToFlatShadedMesh();
		bug.material = lotgMats.greyMat;
		
	});
	
	return pillbugPromise;
	
}


function createBug(playerId){
	
	var bug = lotgModels.pillbug.clone(lotgModels.pillbug.name);
	bug.lotg = {};
	bug.lotg.playerId = playerId;
	bug.lotg.previousTile = null;
	bug.lotg.currentTile = null;
	bug.lotg.startingTile = null;
	//bug.lotg.selectable = true;
	
	bug.material = lotgMats.greyMat;
	bug.lotg.defaultMat = lotgMats.greyMat;
	bug.lotg.unitInfo  = new squad({attack : 2, move:7, health: 1,
		defense : 3, height : 2, name : "Bug", yOffset :0.5 ,type:'squad'} );
	

	bug.lotg.type = 'UNIT';
	bug.isVisible = true;
	lotg.units.push(bug);
	bug.lotg.indicator = trackUnit(bug,getPlayerColor(playerId));
	
	return bug;
}