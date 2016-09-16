
function loadSprites(scene){

	var promises = [];
	
	var sheildPromise =	new Promise(function(resolve,reject){
		lotg.textures.sheildTexture =	 new BABYLON.Texture('assets/sheild.png',scene,true,false,1,resolve,reject);
	});
	
	var swordPromise = new Promise(function(resolve,reject){
		lotg.textures.swordTexture =  new BABYLON.Texture('assets/sword.png',scene,true,false,1,resolve,reject);
	});	
	
//	var indicatorPromise = new Promise(function(resolve,reject){
//		lotg.textures.indicator = new BABYLON.Texture('assets/indicator.png',scene,true,false,1,resolve,reject);
//	});
	
	promises.push(sheildPromise);
	promises.push(swordPromise);
//	promises.push(indicatorPromise);
	
	
	sheildPromise.then(function(data){		
		console.log('shield.png Loaded');			
	},function(err){
		console.error(err);
	});
	
	swordPromise.then(function(data){		
		console.log('sword.png Loaded');			
	},function(err){
		console.error(err);
	});
	
//	indicatorPromise.then(function(data){		
//		console.log('indicator.png Loaded');		
//		
//	},function(err){
//		console.error(err);
//	});
	
	
	
	
	
	
	lotg.sprites.indicatorManager = new BABYLON.SpriteManager('sheildManager','assets/indicator.png',200,64,scene);

//	var test = new BABYLON.Sprite('indicator',lotg.sprites.indicatorManager);
//	test.position.y = 1;
//	test.position.x = 1;
//	test.position.z = 1;
//	test.size= 0.25;
	
	
	
	
	return promises;
}