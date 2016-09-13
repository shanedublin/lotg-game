
function loadSprites(scene){

	var promises = [];
	
	var sheildPromise =	new Promise(function(resolve,reject){
		lotg.textures.sheildTexture =	 new BABYLON.Texture('assets/sheild.png',scene,true,false,1,resolve,reject);
	});
	
	var swordPromise = new Promise(function(resolve,reject){
		lotg.textures.swordTexture =  new BABYLON.Texture('assets/sword.png',scene,true,false,1,resolve,reject);
	});
	
	promises.push(sheildPromise);
	promises.push(swordPromise);
	
	
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
	
	
	return promises;
	
	
	
	
//	var spriteManager = new BABYLON.SpriteManager('sheildManager','assets/sheild.png',20,64,scene);
//	
//	var test = new BABYLON.Sprite('sheild',spriteManager);
//	test.position.y = 1;
//	test.position.x = 2;
}