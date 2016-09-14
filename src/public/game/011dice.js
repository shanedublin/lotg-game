'use-strict';

var attackChance = 50;
var defenseChance = 33;

function rollAttack(x){
	var numDice = 0;
	for(let i = 0; i < x ; i ++){		
		var amount = (Math.random() *100) +1;
		
		if(amount > 100- attackChance){
			numDice ++;
		}
	}
	
	return numDice;
}

function rollDefense(x){
	
	var numDice = 0;
	for(let i = 0; i < x ; i ++){		
		var amount = (Math.random() *100) +1;

		if(amount > 100- defenseChance){
			numDice ++;
		}
	}
	console.log(numDice);
	return numDice;
}

function roll20Side(){
	return Math.floor( Math.random()*20 + 1);
}




//(function(){
//	array = [0,0,0,0,0,0];
//	attackArray = [0,0,0,0,0,0];
//	twenty = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//	for(let i = 0;i < 10000; i ++ ){
//		let t = roll20Side();
//		twenty[t] ++;
//		
//		let resultA = rollAttack(5);
//		let result = rollDefense(5);
//		attackArray[resultA] ++;
//		array[result] ++;
//		
//	}
//	console.log(array);
//	console.log(attackArray);
//	console.log(twenty);
//	
//})();



