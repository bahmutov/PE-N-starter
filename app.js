/**
 * API keys and Passport configuration.
 */
var config = require('./config');

// Connect to pouchdb
var PouchDb = require('pouchdb');
PouchDb.plugin(require('store.pouchdb'));
var pouch = new PouchDb(config.get('db'));
require('./models/init-models')(pouch);

var passportConf = require('./config/passport');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var apiController = require('./controllers/api');
var contactController = require('./controllers/contact');

var app = require('./config/server');
var passport = require('passport');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  console.log('logged in via github');
  res.redirect(req.session.returnTo || '/');
});

/**
 * Error Handler.
 */
var errorHandler = require('errorhandler');
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
