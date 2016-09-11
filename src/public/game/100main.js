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
     lotgCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 10, 10, 40, new BABYLON.Vector3(0, 70, 0), scene);
     
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
  Promise.all(loadModels(scene)).then(function(data){
	  var stub = createStubby();
	  
	  moveUnit(stub,lotg.map[0][0][0]);
	  moveUnit(createStubby(),lotg.map[1][0][0]);
	  
  });
  
  
  loadHud(scene);
  
  
  
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
	  
	  lotgCanvas.fps.children[0].text =  engine.fps.toFixed(0) ;
     scene.render();
     
    // createTile();
	  
  });
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
     engine.resize();
     
     moveHud();
  });
 
  