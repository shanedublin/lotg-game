'use-strict';
var hex = {};


hex.adjacent = function(tile1,tile2){
	
	var cube1 = hex.convertCords(tile1.x, tile1.z);
	var cube2 = hex.convertCords(tile2.x, tile2.z);
	var dist = hex.cubeDist(cube1,cube2);
	
	if(dist === 1)
		return true;
	
	return false;
};


/**
 *  find the distance between tiles with normal coordinates
 */
hex.dist = function(tile1,tile2){
	var cube1 = hex.convertCords(tile1.x, tile1.z);
	var cube2 = hex.convertCords(tile2.x, tile2.z);
	var dist = hex.cubeDist(cube1,cube2);
	
	return dist;
};

/**
 * finds the distance between tiles with cube coordinates
 */
hex.cubeDist = function(cube1,cube2){
	var x =  Math.abs(cube1.x - cube2.x);
	var y =  Math.abs(cube1.y - cube2.y);
	var z =  Math.abs(cube1.z - cube2.z);
	
	return (x + y + z) / 2;
};

/**
 *  returns the cube coords
 *  col = x, rows = y
 *  
 */
hex.convertCords = function(col,row){
	
	var x = col;
	var y =row - (col + (col&1)) /2;
	var z = -x - y;
	
	return {x:x,y:y,z:z};
};


if(false){
	
//	console.log((2 & 1));
//	console.log((1 & 1));
//	console.log(hex.convertCords(0,0));
//	console.log(hex.convertCords(1,0));
	console.log(hex.convertCords(1,1));
	console.log(hex.convertCords(2,0));
console.log(hex.adjacent({x: 1, z:1},{x: 2, z: 0}));
console.log(hex.adjacent({x: 3, z:3},{x: 4, z: 2}));
console.log(hex.adjacent({x: 6, z:6},{x: 7, z: 7}));
console.log(hex.adjacent({x: 6, z:4},{x: 7, z: 5}));
}