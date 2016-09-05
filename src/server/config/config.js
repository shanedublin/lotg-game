(function(){
	'use-strict';	
	var config = {};
	
	config.publicFolder = "build/public";
	config.buildFolder = './build/public';
	config.sourceFolder = 'src/public';
	config.index = 'src/public/index.html';
	
	
	
	
	
	
	
	
	config.defaultSequelizeSettings = {
			timestamps: false,
			freezeTableName: true,
			underscored: true
	};
	
	
//	if(process.env.NODE_ENV == 'developement'){
//		//console.log('waaaaaaluigi');
//		// this is th connection for local host...
//		config.mongoConnection = {
//				url : 'mongodb://192.168.0.2:27017/lotg'
//		};
//		
//		config.databaseConnection =['lotg','shane','hate', {		
//			host: '192.168.0.2',
//			//host: 'lotg.cykfhv8ar8q9.us-west-2.rds.amazonaws.com',
//			dialect: 'postgres',
//			port: 5432,
//			logging: false,
//			pool:{
//				max: 5,
//				min: 1,
//				idle: 10000
//			}
//	
//	}];
//	}else{		
//		// This is the production enviroment
//		config.mongoConnection = {
//				url : 'mongodb://localhost:27017/lotg'
//		};
//		console.log('**********Database password************');
//		console.log(process.env.POSTGRES_PASSWORD);
//		console.log('***************************************');
//		config.databaseConnection =['lotg','shane',process.env.POSTGRES_PASSWORD, {
//			host: 'lotg.cykfhv8ar8q9.us-west-2.rds.amazonaws.com',
//			dialect: 'postgres',
//			port: 5432,
//			logging: false,
//			pool:{
//				max: 5,
//				min: 1,
//				idle: 10000
//			}
//	
//	}];
//	}
	
	
	config.nodeAddress = 'localhost:3000';



	module.exports = config;

})();