  window.addEventListener('click',mouseDownHandler);
  
//  document.onmousedown = function(event){
//	  if(event.button === 2){
//		  console.log(event);  
//		  //event.preventDefault();
//		  //alert('hatehate hate');
//		  return false;
//	  }
//  };
  
  
function mouseDownHandler (event){	  
	//middle mouse click, Do nothing
	if(event.button === 1){
		return false;
	}
 
	var pickResult = scene.pick(lotgScene.pointerX,lotgScene.pointerY);
		 //console.log(pickResult);
	if(pickResult.hit){
		var mesh = pickResult.pickedMesh;
		if(mesh.lotg === undefined || mesh.lotg === null){
			return;
		}		
		
		if(event.button === 2){
			if(lotgSelectedObject === null){
				return;				
			}
			if(lotgSelectedObject.lotg.type !== 'UNIT'){
				return;
			}
			
			if(mesh.lotg.type === 'TILE'){
				//console.log('Move me to that tile!');
				try {
					
					lotg.game.moveUnit(lotgSelectedObject,mesh);
				} catch (e) {
						console.error(e);
				}
			}else{
				//console.log('Attacka me Some Bad GUYS!');
				lotg.game.attackUnit(lotgSelectedObject,mesh);
			}
					
				
		}		 
			 
		 if(event.button === 0){	
			 //TODO check that the item is selectable;
			 selectObject(mesh);						 
		 }				 			 
	 }
	  
}
//  window.addEventListener('onmousedown',function(event){
//	 console.log(event); 
//  });

window.addEventListener('keyup',function(event){
	if(event.code === 'Space'){
		console.log(lotg.units);
	}
});
  
  document.addEventListener('contextmenu',function(event){
	  try {		
		  mouseDownHandler(event);
	  } catch (e) {
		  console.error(e);
		// TODO: handle exception
	  }
	event.preventDefault();
	  return false;
  },false);
  
  
  function selectObject(mesh){
		
		if(lotgSelectedObject !== null){
			if(lotgSelectedObject.lotg.indicator !== undefined){
				lotgSelectedObject.lotg.indicator.unselect();
				
			}
			//lotgSelectedObject.material = lotgSelectedObject.lotg.defaultMat;
		}	
			
		
		
		lotgSelectedObject = mesh;
		if(lotgSelectedObject.lotg.indicator !== undefined){
			lotgSelectedObject.lotg.indicator.select();
			
		}
		//lotgSelectedObject.lotg.indicator.select();
		//lotgSelectedObject.material = lotgMats.blueMat;
		
		
		try {
			//lotgSelectedObject.lotg.name
			if(lotgSelectedObject !== null){
				if(lotgSelectedObject.lotg.unitInfo === undefined || lotgSelectedObject.lotg.unitInfo.name === 'Tile'){
					
					clearInfoBox();
					return;
					
				}
				//console.log(lotgSelectedObject.lotg.unitInfo);
				//console.log(lotgSelectedObject.lotg.position);
				
				//console.log(lotgCanvas.SelectedUnit.children);
				lotgCanvas.SelectedUnit.children[0].text = 'Name: ' + lotgSelectedObject.lotg.unitInfo.name;
				if(lotgSelectedObject.lotg.playerId !== undefined){
					lotgCanvas.SelectedUnit.children[1].text = 'Player ID: ' + lotgSelectedObject.lotg.playerId;				
				}else{
					lotgCanvas.SelectedUnit.children[1].text = 'Player ID: N/A';
				}
				lotgCanvas.SelectedUnit.children[2].text = 'Health: ' + lotgSelectedObject.lotg.unitInfo.health;
				lotgCanvas.SelectedUnit.children[3].text = 'Attack: ' + lotgSelectedObject.lotg.unitInfo.attack;
				lotgCanvas.SelectedUnit.children[4].text = 'Defense: ' + lotgSelectedObject.lotg.unitInfo.defense;
				lotgCanvas.SelectedUnit.children[5].text = 'Move: ' + lotgSelectedObject.lotg.unitInfo.remainingMoves +' / '+ lotgSelectedObject.lotg.unitInfo.move;
				lotgCanvas.SelectedUnit.children[6].text = 'Range: ' + lotgSelectedObject.lotg.unitInfo.range;
				
				
			}else{
				lotgCanvas.SelectedUnit.children[0].text = 'hate';
				
			}
		} catch (e) {
			console.error(e);
		}
		function  clearInfoBox(){
			lotgCanvas.SelectedUnit.children[0].text = 'Name: ' ;
			lotgCanvas.SelectedUnit.children[1].text = 'Player ID:';				
			lotgCanvas.SelectedUnit.children[2].text = 'Health: ' ;
			lotgCanvas.SelectedUnit.children[3].text = 'Attack: ' ;
			lotgCanvas.SelectedUnit.children[4].text = 'Defense: ';
			lotgCanvas.SelectedUnit.children[5].text = 'Move: ' ;
			lotgCanvas.SelectedUnit.children[6].text = 'Range: ' ;
		}
		
		
	}
  
  