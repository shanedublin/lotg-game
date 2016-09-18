
var tileHeight = 0.86;
var tileHalfWidth = 1.5;
var tileFullWidth = 3;
var tileThickness = 0.5;


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
//	console.log(counter);
	
	
}
function hardCodeMap(_x,_y,_z){
	initMap(_x,_y,_z);
	for(let x = 0; x < _x; x ++){
		for(let y = 0; y < 1; y ++){			
			for(let z = 0; z < _z; z++){
				createTile(x, y, z);
				
			}
		}
	}
	
	createTile(0, 1, 3);
	createTile(0, 1, 4);
	createTile(0, 1, 5);
	createTile(0, 1, 6);
	
	createTile(1, 1, 4);
	createTile(1, 1, 5);
	createTile(1, 2, 5);
	createTile(1, 1, 6);
	
	createTile(2, 1, 4);
	createTile(2, 1, 5);
	
	createTile(4, 1, 4);
	createTile(4, 2, 4);
	createTile(4, 3, 4);
	createTile(4, 4, 4);
	createTile(4, 5, 4);
	createTile(5, 1, 5);
	createTile(5, 2, 5);
	createTile(5, 3, 5);
	createTile(5, 4, 5);
	createTile(5, 5, 5);
	
	
	createTile(9, 1, 3);
	createTile(9, 1, 4);
	createTile(9, 1, 5);
	createTile(9, 1, 6);
	
	createTile(8, 1, 3);
	createTile(8, 1, 4);
	createTile(8, 2, 4);
	createTile(8, 1, 5);
	
	createTile(7, 1, 4);
	createTile(7, 1, 5);
	
	createTile(3, 1, 3);
	createTile(3, 2, 3);
	createTile(6, 1, 6);
	createTile(6, 2, 6);
	
	lotgCamera.setTarget(new BABYLON.Vector3(5*tileHalfWidth,0,10*tileHeight));
}



function createFlatMap(_x,_y,_z){
	initMap(_x,_y,_z);
	for(let x = 0; x < _x; x ++){
		for(let y = 0; y < _y; y ++){			
			for(let z = 0; z < _z; z++){
				var tile = createTile(x, 0, z);
//				lotg.map[x][y][z] = tile;
			}
		}
	}
	lotgCamera.setTarget(new BABYLON.Vector3(5*tileHalfWidth,0,10*tileHeight));
	//lotgCamera.setPosition(new BABYLON.Vector3(10*tileHalfWidth,0,10*tileHeight));
	
	
}

/**
 * Notice always start building with the lower tiles first
 * @param x
 * @param y
 * @param z
 * @returns
 */
function createTile(x,y,z){
	// console.log(lotgModels);
	 var tile = lotgModels.hex.clone(lotgModels.hex.name);
	 tile.lotg = {};
	 tile.lotg.unitInfo = {};
	 tile.lotg.type = 'TILE';
	 tile.lotg.unitInfo.name = 'Tile';
	 tile.lotg.object = null;
	 tile.lotg.defaultMat = lotgMats.grass;
	 tile.material = lotgMats.grass;
//	 tile.lotg.defaultMat = null;
	 tile.lotg.position = {x:x,y:y,z:z};
	 tile.isVisible = true;
	 if(x %2 === 0){
		 tile.position.x = x * tileHalfWidth;
		 tile.position.z = z * tileHeight * 2;
		 
	 }else{
		 tile.position.z = z * tileHeight * 2 - tileHeight ;
		 tile.position.x = x * tileHalfWidth;
	 }
	 tile.position.y = y * tileThickness;
	 
	 if(y > 0){
		 try {
			 lotg.map[x][y-1][z].lotg.object = tile;
		} catch (e) {
			lotg.error('No tile underneath this one, This case is not yet handeled ', e);
		}
	 }
	 lotg.map[x][y][z] = tile;
	 return tile;
	 
	 
	  
 }