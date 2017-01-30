//app/routes.js
module.exports = function(app, passport){
	//Home page
	app.get('/', function(req, res){
		res.render('index.ejs'); //render index file
	});

	//login page
	app.get('/login', function(req, res){
		res.render('auth/login.ejs', { message: req.flash('loginMessage') });
	});

	//process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', //redirect tosecure profile page
		failureRedirect: '/login', //redirect to signup page
		failureFlash: true //allow flash messages
	}));

	//signup
	app.get('/signup', function(req, res){
		res.render('auth/signup.ejs', { message:req.flash('signupMessage') });
	});

	//process signup page
	app.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	//profilesection
	app.get('/profile', isLoggedIn, function(req, res){
		res.render('pages/profile.ejs', { 
			user : req.user //get user from the session
		});
	});

	//logout
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	//google routes
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	//the callback after google has authenticated the user
	app.get('/auth/google/callback', passport.authenticate('google', {
		successRedirect : '/profile',
		failureRedirect: '/'
	}));

	//serve app routes for functionality
	app.get('/student', function(req, res){
		res.render('pages/student.ejs', { message : 'this is the student page '});
	});

	app.get('/admin', function(req, res){
		res.render('pages/admin.ejs', { message : 'this is the admin page '});
	});

	app.get('/department', function(req, res){
		res.render('pages/department.ejs', { message : 'this is the department page '});
	});

	app.get('/employer', function(req, res){
		res.render('pages/employer.ejs', { message : 'this is the employer page '});
	});

};
//middleware to ensure user is isLoggedIn

function isLoggedIn(req, res, next){
	//if user is authenticated ..carry on
	if (req.isAuthenticated())
		return next();
	//if not authenticated redirect to home page
	res.redirect('/');
}