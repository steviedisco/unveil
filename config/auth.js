// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    
    'facebookAuth' : {
        'clientID' 		: '935143883178297', 
        'clientSecret' 	: 'ec6aee20e98ab5c359acb7f0e4d87607', // your App Secret
        'callbackURL' 	: 'http://localhost:1337/auth/facebook/callback'
    },
    
    'twitterAuth' : {
        'consumerKey' 		: 'your-consumer-key-here',
        'consumerSecret' 	: 'your-client-secret-here',
        'callbackURL' 		: 'http://localhost:1337/auth/twitter/callback'
    },
    
    'googleAuth' : {
        'clientID' 		: 'your-secret-clientID-here',
        'clientSecret' 	: 'your-client-secret-here',
        'callbackURL' 	: 'http://localhost:1337/auth/google/callback'
    }
};
