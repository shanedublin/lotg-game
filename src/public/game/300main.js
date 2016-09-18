      // Get the canvas element from our HTML below
  var canvas = document.querySelector("#renderCanvas");
  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
  // -------------------------------------------------------------
  
  // Here begins a function that we will 'call' just after it's built
  var createScene = function () {

     var scene = new BABYLON.Scene(engine);

     //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);
     lotgCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 10, 10, 40, new BABYLON.Vector3(10, 80, -20), scene);
     lotgCamera.attachControl(canvas, false);     
	  
     return scene;
     
  };
  
  // create scene
  var scene = createScene();
  
  
  // load all the things
  lotgScene = scene;
  loadMats(scene);
  loadLights(scene);
  var texturePromises = loadSprites(scene);
  var modelPromises = loadModels(scene); 
  var heroPromises = loadHeroes(scene);
  Promise.all(texturePromises).then(function(data){
	  loadHud(scene);  
  });
  
  lotg.game = createGame();
  
  
  Promise.all(heroPromises).then(function(data){
	  
	  lotg.game.placeUnit(createStubby(1),lotg.map[0][0][0]);
	  lotg.game.placeUnit(createCone(1),lotg.map[1][0][0]);
	  lotg.game.placeUnit(createBug(1),lotg.map[2][0][0]);
	  lotg.game.placeUnit(createBug(1),lotg.map[3][0][0]);
	  lotg.game.placeUnit(createBug(1),lotg.map[4][0][0]);
	  
	  lotg.game.placeUnit(createStubby(2),lotg.map[9][0][9]);
	  lotg.game.placeUnit(createCone(2),lotg.map[8][0][9]);
	  lotg.game.placeUnit(createBug(2),lotg.map[7][0][9]);
	  lotg.game.placeUnit(createBug(2),lotg.map[6][0][9]);
	  lotg.game.placeUnit(createBug(2),lotg.map[5][0][9]);
	  startClock(scene);
	  lotg.game.finishSetUp();
  }).catch(function(error){
	  console.log(error);
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
 
  
