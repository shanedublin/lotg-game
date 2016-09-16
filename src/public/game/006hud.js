
function loadHud(scene){
	var defaultFont = '14pt Arial';
	
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
	        	  fontName: defaultFont
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
	          new BABYLON.Text2D('Name:',{
	        	  id: 'text',
	        	  x:10, y:174,	        	  
	        	  fontName: defaultFont
	          }),
	          new BABYLON.Text2D('Player ID: ',{
	        	 id: 'playerId',
	        	 x: 10, y: 154,	        	 
	        	 fontName: defaultFont
	          }),
	          
          	new BABYLON.Text2D('Health',{
	      		parent: lotgCanvas.SelectedUnit,		
	    		id:'health',
	    		x:10, y: 134,
	    		fontName: defaultFont
	    			
	    	}),
	    	
	    	new BABYLON.Text2D('Attack',{
	    		parent: lotgCanvas.SelectedUnit,		
	    		id:'attack',
	    		x:10, y: 114,
	    		fontName: defaultFont
	    			
	    	}),
	    	
	    	new BABYLON.Text2D('Defense',{
	    		parent: lotgCanvas.SelectedUnit,		
	    		id:'defense',
	    		x:10, y: 94,
	    		fontName: defaultFont
	    			
	    	}),
	    	
	    	new BABYLON.Text2D('Move',{
	    		parent: lotgCanvas.SelectedUnit,		
	    		id:'Move',
	    		x:10, y: 74,
	    		fontName: defaultFont
	    			
	    	}),
	    	
	    	new BABYLON.Text2D('Range',{
	    		parent: lotgCanvas.SelectedUnit,		
	    		id:'range',
	    		x:10, y: 54,
	    		fontName: defaultFont
	    			
	    	})
		     ]
	
	
	});
	
	
	
	
	lotgCanvas.header = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id: 'Header',
		size: new BABYLON.Size(400,50),
		backgroundFill: '#4040408f',
		backgroundRoundRadius: 8,
		x: 50,
		y: 50,
		children:[
	          new BABYLON.Text2D('Player 1 turn',{
	        	  id: 'headerText',
	        	  marginAlignment: 'h: center, v: center',
	        	  fontName: '18pt Arial'
	          })
		     ]
		
	});
	
	
	lotgCanvas.cancelMove = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id: 'cancle',
		size:new BABYLON.Size(130,50),
		backgroundFill: '#4040408f',
		backgroundRoundRadius: 8,
		x: window.innerWidth - 140,
		y: 70		
	});
	
	lotgCanvas.resetButton = new BABYLON.Rectangle2D(
	  		  {parent: lotgCanvas.cancelMove,
	  			  id:'cancelButton',  		  
	  			  x: 0,y:0,
	  			  width : 130, height: 50,
	  			  roundRadius: 10,
	  			  children:[
			            new BABYLON.Text2D('Cancel Move',{
		        	  id: 'cancel Move Text',
		        	  marginAlignment: 'h: center, v: center',
		        	  fontName: defaultFont
		          })]
	  		  });
	
	
	
	lotgCanvas.done = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id:'Done',
		size:new BABYLON.Size(100,50),
		backgroundFill: '#4040408f',
		backgroundRoundRadius: 8,
		x: window.innerWidth - 110,
		y: 10	
	});
	
	lotgCanvas.doneButton = new BABYLON.Rectangle2D(
  		  {parent: lotgCanvas.done,
  			  id:'doneButton',  		  
  			  x: 0,y:0,
  			  width : 100, height: 50,
  			  roundRadius: 10,
  			  children:[
		            new BABYLON.Text2D('Done',{
	        	  id: 'text',
	        	  marginAlignment: 'h: center, v: center',
	        	  fontName: defaultFont
	          })]
  		  });
	
	lotgCanvas.doneButton.pointerEventObservable.add(function(d,s){
		if(d.button === 0){
			lotg.game.doneWithState();			
		}
		
	},BABYLON.PrimitivePointerInfo.PointerUp);
	
	lotgCanvas.resetButton.pointerEventObservable.add(function(d,s){
		if(d.button === 0){
			lotg.game.cancelMovement();			
		}
		
	},BABYLON.PrimitivePointerInfo.PointerUp);
	
	
	lotgCanvas.sprites = new BABYLON.ScreenSpaceCanvas2D(scene,{
		id:' spritesCanvas',
		size: new BABYLON.Size(200,200),
		backgroundFill: '#4040408f',		
		backgroundRoundRadius: 8,
		x: 10,
		y: window.innerHeight - 210
	
	});
	
	
	
	lotgCanvas.attackText = new BABYLON.Text2D('Attack: 0',{								
		parent: lotgCanvas.sprites,
		id:'Attack',
		x:10, y: 170,
		fontName: defaultFont
			
	});
	lotgCanvas.defenseText = new BABYLON.Text2D('Defense: 0',{
		parent: lotgCanvas.sprites,
		id:'defense',
		x:10,y:140,
		fontName: defaultFont
		
	});
	lotgCanvas.resultText = new BABYLON.Text2D('Result',{
		parent: lotgCanvas.sprites,	
		id:'result',
		x:10, y: 110,
		fontName: defaultFont
	});
	
	
	
	
//	console.log(lotg.textures.swordTexture);
	
	//TODO figure out why textures are not loading correctly
	lotg.textures.sword = new BABYLON.Sprite2D(lotg.textures.swordTexture,{		
		parent:lotgCanvas.sprites,
		id:'swordThing',
		x:10,y:90
				
	});
	
	lotg.textures.sheild = new BABYLON.Sprite2D(lotg.textures.sheildTexture,{
		parent:lotgCanvas.sprites,
		id:'sheildThing',
		x:50,y:522
	});
	
//	try {
//		
//	} catch (e) {
//		console.error(e);
//	}
	
	
	
	
	
	moveHud();
}
function hate(res){
	console.log(res);
}

function moveHud(){
	//console.log(lotgCanvas);
	//console.log(window.innerHeight);
	lotgCanvas.fps.x = window.innerWidth - lotgCanvas.fps.size.width - 10;
	lotgCanvas.fps.y = window.innerHeight -  lotgCanvas.fps.size.height - 10;
	
	
	lotgCanvas.header.x = window.innerWidth /2 - lotgCanvas.header.size.width /2;
	lotgCanvas.header.y = window.innerHeight -  lotgCanvas.header.size.height -10;
	
	lotgCanvas.done.x = window.innerWidth - 110;
	lotgCanvas.cancelMove.x = window.innerWidth - 140;
	
	lotgCanvas.sprites.y = window.innerHeight - 210;
	
}



