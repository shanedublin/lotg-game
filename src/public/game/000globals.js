'use-strict';
lotgModels = {};

lotgScene = {};

lotgPromises = {};

lotgMats = {};

lotgCamera = {};

lotgCanvas = {};

lotgSelectedObject = null;




lotg = {};
lotg.units = [];

lotg.game = null;


lotg.map = null;

lotg.gameStates = {
		setup: 'setup',
		initiative: 'initiative',
		startTurn: 'startTurn',
		move: 'move',
		attack: 'attack',
		attacked: 'Done attacking',
		nextPlayer: 'nextPlayer',
		victory: 'victory'
		
};

lotg.textures = {};