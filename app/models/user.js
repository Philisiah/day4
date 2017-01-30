//load dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define schema
var userSchema = mongoose.Schema({

	local :{
		email : String,
		password : String,
		usertype : String,
		firstname : String,
		lastname : String,
		reg_num : String,
		department : String,
		gender : String
	},
	facebook : {
		id :String,
		token : String,
		email :String,
		name:String
	},
	twitter : {
		id :String,
		token : String,
		displayName :String,
		username:String
	},
	google :{
		id :String,
		token : String,
		email :String,
		name:String
	}
});

//methods
//generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//create model for users and expose it to app
module.exports = mongoose.model('User', userSchema);