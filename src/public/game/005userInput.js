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
				moveUnit(lotgSelectedObject,mesh);
			}else{
				console.log('Attacka me Some Bad GUYS!');
			}
					
				
		}		 
			 
		 if(event.button === 0){	
			 selectObject(mesh);						 
		 }				 			 
	 }
	  
}
//  window.addEventListener('onmousedown',function(event){
//	 console.log(event); 
//  });
  
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