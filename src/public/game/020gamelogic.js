'use-strict';

function createGame(){
	
	var game = {};
	
	game.currentState = lotg.gameStates.setUp;
	game.turns = 0;
	
	// the unit that the playe is moving this turn	
	game.turnUnit = null;
	
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
			
			if(!canUseUnit(unit)){
				return;
			}
			
			
			if(unit.lotg.unitInfo.remainingMoves <= 0){			
				console.log('Unit out of moves!');
				return;
			}
			
			// check to see if they are moving to and adjacent tile
			
			if(!hex.adjacent(unit.lotg.currentTile.lotg.position,tile.lotg.position)){
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
		
		if(!canUseUnit(attacker)){
			return;
		}
		
		console.log('atacked player!');
		var attackResult = attackMath(attacker,defender);
		
		lotgCanvas.attackText.text = 'Attack: '+ attackResult.attack;
		lotgCanvas.defenseText.text = 'Defense: '+ attackResult.defense;		
		lotgCanvas.resultText.text = 'Result: ' + clamp(attackResult.damage,0,99) + '  Hits!'; 
		game.setState(lotg.gameStates.attacked);
		//game.setState(lotg.gameStates.move);
			
		//game.nextPlayer();
	};
	
	game.nextPlayer = function(){
		
		// reset the color of the move path
		// reset the remaining move
		resetMovement();
		game.turnUnit = null;
		
		
		if(game.currentPlayerId === 1){
			game.currentPlayerId = 2;
		}
		else{
			game.currentPlayerId = 1;	
		}
		clearDiceBoard();
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
			game.setState(lotg.gameStates.attacked);
			break;
		case lotg.gameStates.attacked:
			game.nextPlayer();
			//game.setState(lotg.gameStates.attack);			
			break;

		default:
			console.error('State not Handled!');
			break;
		}
	};
	
	game.cancelMovement = function(){
		if(game.currentState === lotg.gameStates.move){
			if(game.turnUnit !== null){
				setUnit(game.turnUnit,game.turnUnit.lotg.startingTile);
				game.turnUnit = null;
			}  
			resetMovement();
		}else{
			console.error('Not a movement Turn!');
		}
	};
	
	return game;
	
	function clearDiceBoard(){
		lotgCanvas.attackText.text = 'Attack: ';
		lotgCanvas.defenseText.text = 'Defense: ';		
		lotgCanvas.resultText.text = 'Result: ' ;
	}
	
	function attackMath(attacker, defender){
		var attackDice  = rollAttack(attacker.lotg.unitInfo.attack);
		var defenseDice = rollDefense(defender.lotg.unitInfo.defense);
		var damage = attackDice - defenseDice;
		return {attack:attackDice, defense: defenseDice,damage:damage};
	}
	
	function resetMovement(){
		for(let unit of game.movedUnits){
			unit.lotg.unitInfo.remainingMoves = unit.lotg.unitInfo.move;
			for (let i = 0; i< unit.lotg.unitInfo.movePath.length; i ++){
				let tile = unit.lotg.unitInfo.movePath[i];
				tile.material = tile.lotg.defaultMat;
			}
			unit.lotg.startingTile = unit.lotg.currentTile;
			
		}
		
		// clear the set only keep track of the units moved this round
		game.movedUnits.clear();
	}
	
	/**
	 * checks to see if you can use that unit
	 * if no unit has been selected yet or its the same unit
	 * used in that turn you can use it.
	 */
	function canUseUnit(unit){
		if(game.turnUnit === null){			
			game.turnUnit = unit;
			return true;
		}else{
			if(game.turnUnit !== unit){
				console.error('You cant move that unit this turn!');
				return false;
			}else{
				return true;
			}
		}
	}
	
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
			//	console.log(unit.lotg);
				if(unit.lotg.startingTile === null){
					unit.lotg.startingTile = tile;
				}
				
				//console.log(unit.lotg.currentTile);
				if(unit.lotg.currentTile !== null){					
					unit.lotg.currentTile.lotg.unit = null;
				}	
				unit.lotg.currentTile = tile;
				
				return true;
					
			}
			else{
				console.log('There is already a unit there!');
				return false;
			}	
		
	}
	
	
}


