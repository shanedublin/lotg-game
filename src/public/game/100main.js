      // Get the canvas element from our HTML below
  var canvas = document.querySelector("#renderCanvas");
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  // -------------------------------------------------------------
  
  // Here begins a function that we will 'call' just after it's built
  var createScene = function () {
     // Now create a basic Babylon Scene object
     var scene = new BABYLON.Scene(engine);
     scene.ambientColor = new BABYLON.Color3(1,1,1);
     // Change the scene background color to green.
    //scene.clearColor = new BABYLON.Color3(0, 0.4, 0.4);
     // This creates and positions a free camera
     //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);
     lotgCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 10, 10, 40, new BABYLON.Vector3(10, 80, -20), scene);
     
     // This targets the camera to scene origin
     //lotgCamera .setTarget(BABYLON.Vector3.Zero());
     // This attaches the camera to the canvas
     lotgCamera .attachControl(canvas, false);
     // This creates a light, aiming 0,1,0 - to the sky.
     var light = new BABYLON.PointLight("light1", new BABYLON.Vector3(60, 1000, 60), scene);
     // Dim the light a small amount
     light.intensity = 0.5;

     
	  
     return scene;
     
  }; // End of createScene function
  // -------------------------------------------------------------
  // Now, call the createScene function that you just finished creating
  var scene = createScene();
  lotgScene = scene;
  loadMats(scene);
  var texturePromises = loadSprites(scene);
  var modelPromises = loadModels(scene); 
  Promise.all(texturePromises).then(function(data){
	  loadHud(scene);  
  });
  
  lotg.game = createGame();
  
  
  Promise.all(modelPromises).then(function(data){
	  
	  lotg.game.placeUnit(createStubby(1),lotg.map[0][0][0]);
//	  lotg.game.placeUnit(createStubby(1),lotg.map[1][0][0]);
	  lotg.game.placeUnit(createStubby(2),lotg.map[9][0][9]);
//	  lotg.game.placeUnit(createStubby(2),lotg.map[8][0][9]);
	  lotg.game.finishSetUp();
  });
  
  
  
  Promise.all(texturePromises,modelPromises).then(function(data){
	  console.log('textures and models loaded');
	  engine.runRenderLoop(function () {
		  
		  lotgCanvas.fps.children[0].text =  engine.fps.toFixed(0) ;
		  scene.render();
		  
		  // createTile();
		  
	  });
  });
  
  
  // Register a render loop to repeatedly render the scene
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
     engine.resize();
     
     moveHud();
  });
 
  
