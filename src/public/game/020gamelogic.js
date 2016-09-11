'use-strict';

function moveUnit(unit, tile){
	//console.log('moving unit');
	
	if(tile.lotg.unit === null){	
		var  newPos = {
				x: tile.position.x,
				y: tile.position.y,
				z: tile.position.z
		};
		
		newPos.y += 0.75;
		unit.position = newPos;
		tile.lotg.unit = unit;
		console.log(unit.lotg);
		if(unit.lotg.previousTile !== null){
			unit.lotg.previousTile.lotg.unit = null;
		}
			
			unit.lotg.previousTile = tile;
	}
	else{
		console.log('There is already a unit there!');
	}
	
	
	//console.log(unit);
	//console.log('to tile');
	//console.log(tile);
}

function attackUnit(attacker, defender){
	
}