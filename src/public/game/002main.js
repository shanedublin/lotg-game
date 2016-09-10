      // Get the canvas element from our HTML below
  var canvas = document.querySelector("#renderCanvas");
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  // -------------------------------------------------------------
//  var lotgModels = {};
  // Here begins a function that we will 'call' just after it's built
  var createScene = function () {
     // Now create a basic Babylon Scene object
     var scene = new BABYLON.Scene(engine);
     // Change the scene background color to green.
    //scene.clearColor = new BABYLON.Color3(0, 0.4, 0.4);
     // This creates and positions a free camera
     var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);
     // This targets the camera to scene origin
     camera.setTarget(BABYLON.Vector3.Zero());
     // This attaches the camera to the canvas
     camera.attachControl(canvas, false);
     // This creates a light, aiming 0,1,0 - to the sky.
     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
     // Dim the light a small amount
     light.intensity = 0.5;

     
    // var box1 = BABYLON.Mesh.CreateBox('box1',5,scene);
     
     
     
//     BABYLON.SceneLoader.ImportMesh('Circle','../assets/','hex.babylon',scene,function(meshes,other){
//    	var m = meshes[0];
//    	//console.log(m);
//    	//console.log(meshes);
//    	//console.log(other);
//   	  	m.isVisible = true;
//   	  	//m.scaling= new BABYLON.Vector3(0.5,0.5,0.5);
//   	  	lotgModels.hex = m;
//   	  	console.log(lotgModels);
//     });
	  
     
//     try {
//		
//    	 createTile(1,2,3);
//	} catch (e) {
//		console.error(e);
//	}
	  
     return scene;
     
  }; // End of createScene function
  // -------------------------------------------------------------
  // Now, call the createScene function that you just finished creating
  var scene = createScene();
  
  loadModels(scene);
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
     scene.render();
     
     
    // createTile();
	  
  });
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
     engine.resize();
  });
 
  
  