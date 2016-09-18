function loadLights(scene){
	

  var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  light.diffuse = new BABYLON.Color3(1,1,1);
  light.specular = new BABYLON.Color3(0,0,0);
  light.position = new BABYLON.Vector3(0,100,0);
  light.intensity = 1;
  
//  var directionalLight = new BABYLON.DirectionalLight('directionalLight',new BABYLON.Vector3(.5, 1, .5), scene)
//  directionalLight.diffuse = new BABYLON.Color3(1,1,1);
//  directionalLight.specular = new BABYLON.Color3(0,0,0);
//  directionalLight.intensity = 10;
  
  
  var hemisphericLight = new BABYLON.HemisphericLight('hemisphericLight',new BABYLON.Vector3(0, 0, 0), scene);
  hemisphericLight.diffuse = new BABYLON.Color3(1,1,1);
  hemisphericLight.specular = new BABYLON.Color3(0,0,0);
  hemisphericLight.intensity = 10;
}