
var tileHeight = 0.86;
var tileHalfWidth = 1.5;
var tileFullWidth = 3;


lotgPromises.tile.then(function(data,data2){
	//data.isVisible = false;
	var tile = data[0];
	tile.isVisible = false;
	tile.rotation.y = Math.PI/2;
	tile.material= lotgMats.greenMat;
	
	//console.log(data[0]);
	//console.log(data[1]);
	lotgModels.hex = tile;
	createFlatMap();

	
});

function initMap(_x,_y,_z){
	var counter = 0;
	//TODO clean map object better than this.
	lotg.map = null;
	lotg.map = [_x];
	for(let x = 0; x < _x; x ++){
		lotg.map[x] = [_y];
		for(let y = 0; y <_y; y ++ ){
			lotg.map[x][y] = [_z];
			for(let z = 0; z < _z; z ++){
				counter ++;
				lotg.map[x][y][z] = null;
			}
		}
	}
	console.log(counter);
	
	
}

function createFlatMap(){
	initMap(20,1,20);
	for(let x = 0; x < 20; x ++){
		for(let y = 0; y < 1; y ++){			
			for(let z = 0; z < 20; z++){
				var tile = createTile(x, 0, z);
				lotg.map[x][y][z] = tile;
			}
		}
	}
	lotgCamera.setTarget(new BABYLON.Vector3(10*tileHalfWidth,0,20*tileHeight));
	//lotgCamera.setPosition(new BABYLON.Vector3(10*tileHalfWidth,0,10*tileHeight));
	
	
}

function createTile(x,y,z){
	// console.log(lotgModels);
	 var tile = lotgModels.hex.clone(lotgModels.hex.name);
	 tile.lotg = {};
	 tile.lotg.unitInfo = {};
	 tile.lotg.type = 'TILE';
	 tile.lotg.unitInfo.name = 'Tile';
	 tile.lotg.unit = null;
	 
	 tile.lotg.defaultMat = lotgMats.greenMat;
	 tile.lotg.position = {x:x,y:y,z:z};
	 tile.isVisible = true;
	 if(x %2 === 0){
		 tile.position.x = x * tileHalfWidth;
		 tile.position.z = z * tileHeight * 2;
		 
	 }else{
		 tile.position.z = z * tileHeight * 2 - tileHeight ;
		 tile.position.x = x * tileHalfWidth;
	 }
	 tile.position.y = y ;
	 return tile;
	 
	 
	  
 }