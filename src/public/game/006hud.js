
function loadHud(scene){
	lotgCanvas.fps = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id:'ScreenCanvas',
		size:new BABYLON.Size(100,50),
		backgroundFill: '#4040408f',
		backgroundRoundRadius: 8,
		x: 50,
		y: 50,
		children:[
	          new BABYLON.Text2D('Hello World',{
	        	  id: 'text',
	        	  marginAlignment: 'h: center, v: center',
	        	  fontName: '12pt Arial'
	          })
		     ]
	
	
	});
	
	lotgCanvas.SelectedUnit = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id:'SelectedUnit',
		size:new BABYLON.Size(200,200),
		backgroundFill: '#4040408f',
		backgroundRoundRadius: 8,
		x: 10,
		y: 10,
		children:[
	          new BABYLON.Text2D('Nothing',{
	        	  id: 'text',
	        	  marginAlignment: 'h: center, v: center',
	        	  fontName: '12pt Arial'
	          })
		     ]
	
	
	});
	moveHud();
}

function moveHud(){
	//console.log(lotgCanvas);
	//console.log(window.innerHeight);
	lotgCanvas.fps.x = window.innerWidth - lotgCanvas.fps.size.width;
	lotgCanvas.fps.y = window.innerHeight -  lotgCanvas.fps.size.height;
	
}


function selectObject(mesh){
	try {
		//console.log(lotgSelectedObject);
		if(lotgSelectedObject !== null){
			lotgSelectedObject.material = lotgSelectedObject.lotg.defaultMat;
		}	
		
	} catch (e) {
		console.error(e);
	}
	
	lotgSelectedObject = mesh;
	lotgSelectedObject.material = lotgMats.blueMat;
	
	
	try {
		//lotgSelectedObject.lotg.name
		if(lotgSelectedObject !== null){
			lotgCanvas.SelectedUnit.children[0].text = lotgSelectedObject.lotg.unitInfo.name;
		}else{
			lotgCanvas.SelectedUnit.children[0].text = 'hate';
			
		}
	} catch (e) {
		console.error(e);
	}
	
}
