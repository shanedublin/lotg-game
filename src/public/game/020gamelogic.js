'use-strict';

function createGame(){
	
	var game = {};
	
	game.currentState = lotg.gameStates.setUp;
	game.turns = 0;
	
	game.currentPlayerId = 1;
	
	
	game.movedUnits = new Set();
	
	game.placeUnit = function(unit, tile){
		if(game.currentState !== lotg.gameStates.setUp){
			console.error('Not ready to set up unit yet!');
			return;
		}
		setUnit(unit,tile);
		
	};
		
	game.moveUnit = function(unit,tile){
		
		
		
		if(game.currentState !== lotg.gameStates.move) {
			console.error('Not time to move yet');
			return;
		}
		
		if(unit.lotg.playerId !== game.currentPlayerId){
			console.log('Not that players Turn!');
			return;
		}
		
		if(unit.lotg.unitInfo.remainingMoves <= 0){			
			console.log('Unit out of moves!');
			return;
		}
		// check to see if they are moving to and adjacent tile
		
		if(!hex.adjacent(unit.lotg.previousTile.lotg.position,tile.lotg.position)){
			console.log('Not adjacent!');
			return;
		}
		
		if(setUnit(unit,tile)){
			//console.log(unit);
			unit.lotg.unitInfo.movePath.push(tile);
			tile.material = lotgMats.greenMatWalked;
			unit.lotg.unitInfo.remainingMoves -= 1;
			selectObject(unit);
			game.movedUnits.add(unit);
		}
		//game.setState(lotg.gameStates.attack);
		//game.currentState = lotg.gameStates.attack;
	};
	
	
	game.attackUnit = function(attacker, defender){
		
		if(game.currentState !== lotg.gameStates.attack){
			console.error('Not time to atatck!');
			return;
		}
		
		if(attacker.lotg.playerId !== game.currentPlayerId){
			console.log('Not that players Turn!');
			return;
		}
		
		console.log('atacked player!');
		//game.setState(lotg.gameStates.move);
			
		//game.nextPlayer();
	};
	
	game.nextPlayer = function(){
		
		// reset the color of the move path
		// reset the remaining move
		for(let unit of game.movedUnits){
			unit.lotg.unitInfo.remainingMoves = unit.lotg.unitInfo.move;
			for (let i = 0; i< unit.lotg.unitInfo.movePath.length; i ++){
				let tile = unit.lotg.unitInfo.movePath[i];
				tile.material = tile.lotg.defaultMat;
			}
		}
		// clear the set only keep track of the units moved this round
		game.movedUnits.clear();
		
		
		if(game.currentPlayerId === 1){
			game.currentPlayerId = 2;
		}
		else{
			game.currentPlayerId = 1;	
		}
		game.setState(lotg.gameStates.move);
	};
	
	game.finishSetUp=function(){
		game.setState(lotg.gameStates.move);
		//game.currentState = lotg.gameStates.move;
	};
	
	game.setState = function(state){
		game.currentState = state;
		lotgCanvas.header.children[0].text ='Player ' + game.currentPlayerId + ' ' +  game.currentState;
	};
	
	
	game.doneWithState = function(){
		switch (game.currentState) {
		case lotg.gameStates.move:
			game.setState(lotg.gameStates.attack);
			break;
		case lotg.gameStates.attack:
			game.nextPlayer();
			//game.setState(lotg.gameStates.attack);			
			break;

		default:
			console.error('State not Handled!');
			break;
		}
	};
	
	return game;
	
	function setUnit(unit, tile){
		if(tile.lotg.unit === null){	
			var  newPos = {
					x: tile.position.x,
					y: tile.position.y,
					z: tile.position.z
			};
			
			newPos.y += 0.75;
			unit.position = newPos;
			tile.lotg.unit = unit;
			//console.log(unit.lotg);
			if(unit.lotg.previousTile !== null){
				unit.lotg.previousTile.lotg.unit = null;
			}
				
			unit.lotg.previousTile = tile;
			
			return true;
				
		}
		else{
			console.log('There is already a unit there!');
			return false;
		}	
	}
	
	
}


