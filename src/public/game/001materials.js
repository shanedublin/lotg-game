
function loadMats(scene){
	lotgMats.redMat = new BABYLON.StandardMaterial('redMat',scene);
	lotgMats.redMat.diffuseColor = new BABYLON.Color3.FromHexString("#6d0108");
	lotgMats.redMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.redMat.ambientColor = new BABYLON.Color3.FromHexString("#6d0108");
	
	
	lotgMats.greenMat = new BABYLON.StandardMaterial('greenMat',scene);
	lotgMats.greenMat.diffuseColor =  new BABYLON.Color3(1/255,50/255,32/255);	
	lotgMats.greenMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.greenMat.ambientColor = new BABYLON.Color3(1/255,50/255,32/255);
	
	
	lotgMats.blueMat = new BABYLON.StandardMaterial('blueMat',scene);
	lotgMats.blueMat.diffuseColor =  new BABYLON.Color3(0.2,0.1,0.8);	
	lotgMats.blueMat.specularColor = new BABYLON.Color3(0,0,0);
	lotgMats.blueMat.ambientColor = new BABYLON.Color3(0.2,0.1,0.8);
}