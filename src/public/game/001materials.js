'use-strict';


function loadMats(scene){
	lotgMats.redMat = new BABYLON.StandardMaterial('redMat',scene);
	lotgMats.redMat.diffuseColor = new BABYLON.Color3.FromHexString("#6d0108");
	lotgMats.redMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.redMat.ambientColor = new BABYLON.Color3.FromHexString("#6d0108");
	
	
	lotgMats.greenMat = new BABYLON.StandardMaterial('greenMat',scene);
	lotgMats.greenMat.diffuseColor =  new BABYLON.Color3(1/255,50/255,32/255);	
	lotgMats.greenMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.greenMat.ambientColor = new BABYLON.Color3(1/255,50/255,32/255);
	
	lotgMats.greenMatWalked = new BABYLON.StandardMaterial('greenMatWalked',scene);
	lotgMats.greenMatWalked.diffuseColor =  new BABYLON.Color3(1/255,50/255,32/255);	
	lotgMats.greenMatWalked.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.greenMatWalked.ambientColor = new BABYLON.Color3(1/255,80/255,32/255);
	
	
	lotgMats.blueMat = new BABYLON.StandardMaterial('blueMat',scene);
	lotgMats.blueMat.diffuseColor =  new BABYLON.Color3(0.2,0.1,0.8);	
	lotgMats.blueMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.blueMat.ambientColor = new BABYLON.Color3(0.2,0.1,0.8);
	
	
	lotgMats.greyMat = new BABYLON.StandardMaterial('greyMat',scene);
	lotgMats.greyMat.diffuseColor =  new BABYLON.Color3(0.1,0.1,0.1);	
	lotgMats.greyMat.specularColor = new BABYLON.Color3(0,0,1);
//	lotgMats.greyMat.ambientColor = new BABYLON.Color3(0.2,0.2,0.2);
	
	
	lotgMats.stubby = new BABYLON.StandardMaterial('stubby',scene);
	lotgMats.stubby.diffuseTexture = new BABYLON.Texture('../assets/stubby-uv.png',scene);
	
	
	
	lotgMats.grass = new BABYLON.StandardMaterial('grass',scene);
//	lotgMats.grass.diffuseColor =  new BABYLON.Color3(2/255,50/255,32/255);
//	lotgMats.grass.specularColor = new BABYLON.Color3(0,0,0);
//	lotgMats.grass.ambientColor = new BABYLON.Color3(0.7,0.7,0.7);
//	lotgMats.grass.diffuseTexture  = new BABYLON.Texture('../assets/hex_Circle_DIFFUSE_COLOR.jpg',scene);
	//console.log(lotgMats.grass.diffuseTexture)
	lotgMats.grass.diffuseTexture  = new BABYLON.Texture('../assets/hex-uv-colored.png',scene);
}