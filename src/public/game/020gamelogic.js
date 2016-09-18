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
			
			
			
			
			
			// check to see if they are moving to and adjacent tile
			
			if(!hex.adjacent(unit.lotg.currentTile.lotg.position,tile.lotg.position)){
				console.log('Not adjacent!');
				return;
			}
			
			var moveModifier = 1;
			var heightDif =  tile.lotg.position.y - unit.lotg.currentTile.lotg.position.y ;
			//console.log(heightDif);
//			console.log('waa');
			
			if(unit.lotg.unitInfo.height <= heightDif){
				console.log('Unit to small to climb Up!');
				return;
			}
			// it cost more to move up hill
			if(heightDif > 0){
				//console.log('greater than 0');
				moveModifier += heightDif;
			}
			
			if(unit.lotg.unitInfo.remainingMoves < moveModifier){			
				console.log('Unit out of moves!');
				return;
			}
			
			if(setUnit(unit,tile)){
				//console.log(unit);
				unit.lotg.unitInfo.movePath.push(tile);
				tile.material = lotgMats.greenMatWalked;
				unit.lotg.unitInfo.remainingMoves -= moveModifier;
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
		
		let distanceBetween = hex.dist(attacker.lotg.currentTile.lotg.position,
				defender.lotg.currentTile.lotg.position); 
		
		if(distanceBetween > attacker.lotg.unitInfo.range){
			console.log('Not close enough to attack!');
			return;
		}		
		//TODO figure out line of site
		
		
		console.log('atacked player!');
		var attackResult = attackMath(attacker,defender);
		
		
		var damage = clamp(attackResult.damage,0,99);
		defender.lotg.unitInfo.health -= damage;
		lotgCanvas.attackText.text = 'Attack: '+ attackResult.attack;
		lotgCanvas.defenseText.text = 'Defense: '+ attackResult.defense;		
		lotgCanvas.resultText.text = 'Result: ' + damage + '  Hits!'; 
		if(defender.lotg.unitInfo.health <=0){
			console.log('unit Killed');
			removeUnit(defender);
		}
		
		game.setState(lotg.gameStates.attacked);
		//game.setState(lotg.gameStates.move);
			
		//game.nextPlayer();
	};
	
	game.nextPlayer = function(){
		
		// reset the color of the move path
		// reset the remaining move
		resetMovement(true);
		game.turnUnit = null;
		
		
		if(game.currentPlayerId === 1){
			game.currentPlayerId = 2;
		}
		else{
			game.currentPlayerId = 1;	
		}
		clearDiceBoard();
		game.setState(lotg.gameStates.move);
		game.checkVictory();
	};
	
	game.finishSetUp=function(){
		game.setState(lotg.gameStates.move);
		//game.currentState = lotg.gameStates.move;
	};
	
	game.setState = function(state){
		game.currentState = state;
		if(game.currentState === lotg.gameStates.victory){
			lotgCanvas.header.children[0].text = 'Player ' + game.winner + ' is Victorious'; 
		}else{
			lotgCanvas.header.children[0].text ='Player ' + game.currentPlayerId + ' ' +  game.currentState;
			
		}
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
				
				game.turnUnit = null;
			}  
			resetMovement(false);
		}else{
			console.error('Not a movement Turn!');
		}
	};
	
	game.checkVictory = function(){
		let p1 = 0;
		let p2 = 0;
		for(let i = 0; i < lotg.units.length; i++){
			let unit = lotg.units[i];
			if(unit.lotg.playerId === 1)
				p1 ++;
			if(unit.lotg.playerId === 2)
				p2 ++;
		}
		if(p1 <= 0){
			game.winner = 2;
			game.setState(lotg.gameStates.victory);
		}
		if(p2 <= 0){
			game.winner = 1;
			game.setState(lotg.gameStates.victory);
		}
		console.log(game.winner);
		
		
	};
	
	return game;
	
	function clearDiceBoard(){
		lotgCanvas.attackText.text = 'Attack: ';
		lotgCanvas.defenseText.text = 'Defense: ';		
		lotgCanvas.resultText.text = 'Result: ' ;
	}
	
	/**
	 * calculates how many dice should be rolled. 
	 * if the user is higher roll 1 extra dice!
	 */
	function attackMath(attacker, defender){
		
		// can player attack is he in range
		
		
		
		var attackAmount = attacker.lotg.unitInfo.attack;
		if(attacker.lotg.currentTile.position.y > defender.lotg.currentTile.position.y){
			attackAmount ++;
		}
		
		var defendAmount = defender.lotg.unitInfo.defense;
		if(defender.lotg.currentTile.position.y > attacker.lotg.currentTile.position.y){
			defendAmount ++;
		}
		console.log('attack: ' + attackAmount + ' defense:'  + defendAmount);
		var attackDice  = rollAttack(attackAmount);
		var defenseDice = rollDefense(defendAmount);
		var damage = attackDice - defenseDice;
		return {attack:attackDice, defense: defenseDice,damage:damage};
	}
	
	
	/**
	 * If you only want to reset the movement path color pass true
	 */
	function resetMovement(colorOnly){
		for(let unit of game.movedUnits){
			unit.lotg.unitInfo.remainingMoves = unit.lotg.unitInfo.move;
			for (let i = 0; i< unit.lotg.unitInfo.movePath.length; i ++){
				let tile = unit.lotg.unitInfo.movePath[i];
				tile.material = tile.lotg.defaultMat;
			}
			if(!colorOnly){
				setUnit(unit,unit.lotg.startingTile);
				
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
		}
		
		if(game.turnUnit === unit){
			return true;
		}
		
		//if its not the same type of sqaud
		if(unit.lotg.unitInfo.name !== game.turnUnit.lotg.unitInfo.name){
			console.log(unit.lotg.unitInfo.name);
			console.log(game.turnUnit.lotg.unitInfo.name);
			console.log('squad not match');
			return false;
		}
		
		if(unit.lotg.unitInfo.type === 'squad'){
			for(let moved of game.movedUnits){
				if(moved === unit){
					return true;
				}
			}
		}
		
		if(game.movedUnits.size < unit.lotg.unitInfo.num){
			return true;
		}
		
		// this
		console.log('cant move unit');
		return false;
		
		
//		
//		if(game.turnUnit !== unit){
//			console.error('You cant move that unit this turn!');
//			return false;
//		}else{
//			return true;
//		}
		
	}
	
	function setUnit(unit, tile){
			
			if(tile.lotg.object === null){	
				var  newPos = {
						x: tile.position.x,
						y: tile.position.y,
						z: tile.position.z
				};
				
				newPos.y += unit.lotg.unitInfo.yOffset;
				unit.position = newPos;
				tile.lotg.object = unit;
			//	console.log(unit.lotg);
				if(unit.lotg.startingTile === null){
					unit.lotg.startingTile = tile;
				}
				
				//console.log(unit.lotg.currentTile);
				if(unit.lotg.currentTile !== null){					
					unit.lotg.currentTile.lotg.object = null;
				}	
				unit.lotg.currentTile = tile;
				
				return true;
					
			}
			else{
				console.log('There is already a unit there!');
				return false;
			}		
	}
	
	function removeUnit(unit){
		
		unit.lotg.currentTile.lotg.object = null;
		unit.lotg.indicator.clear();
		var index = lotg.units.indexOf(unit);
		if(index > -1){
			lotg.units.splice(index,1);
		}
		unit.dispose();
	}
	
	
}


