'use-strict';

function loadHeroes(scene){
	
	var promises = [];
	// load stubby
	promises.push(loadStubby());
	
	// load pillbug
	promises.push(loadPillbug());
	// load cone
	promises.push(loadCone());
	
	return promises;
	
}

class unitInfo{
	constructor({health = 1, range = 1, defense = 1, attack = 1,	
				move = 1 , height = 1, name = 'Unnamed',
				type = 'hero', yOffset = 1}={}){
		this.health = health;
		this.range = range;
		this.defense = defense;
		this.attack = attack;
		this.move = move;		
		this.remainingMoves = move;
		this.movePath = [];
		this.height = height;
		this.yOffset = yOffset;
		this.name = name;
		this.type = type;
		this.attacked = false;
	}
	
}

class squad extends unitInfo{
	constructor({health = 1, range = 1, defense = 1, attack = 1, move = 1 , height = 1, name = 'Unnamed Squad',	type = 'squad', yOffset = 1, num = 3 } = garbage){
		super({health : health, range : range, defense : defense, attack :attack,	move : move , height : height, name : name , type : type, yOffset : yOffset});
		this.num = num;
	}
	
	
}