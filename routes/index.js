var express = require('express');
var router = express.Router();
var dummy_core = {
	"title":"jVectormaps",
	"nodes": [
	    {
	      "id": "C0",
	      "name": "Cluster0",
	      "fill": "#530053",
	      "fill_over": "#530053",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"",
	      "children":[{"id": "N0"},{"id": "N1"},{"id": "N6"}],
	      "points": [
	      	{
	          "x": "0",
	          "y": "150"
	        },
	        {
	          "x": "150",
	          "y": "150"
	        },
	        {
	          "x": "150",
	          "y": "0"
	        },
	        {
	          "x": "0",
	          "y": "0"
	        }
	      ]
	    },
	    {
	      "id": "N0",
	      "name": "N0",
	      "fill": "#530053",
	      "fill_over": "#530053",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"C0",
	      "children":[{"id": "N2"},{"id": "N5"}],
	      "points": [
	        {
	          "x": "0",
	          "y": "150"
	        },
	        {
	          "x": "150",
	          "y": "150"
	        },
	        {
	          "x": "150",
	          "y": "0"
	        },
	        {
	          "x": "0",
	          "y": "0"
	        }
	      ]
	    },
	    {
	      "id": "N1",
	      "name": "N1",
	      "fill": "#530053",
	      "fill_over": "#530053",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"C0",
	      "children":[{"id": "N4"},{"id": "N3"}],
	      "points": [
	        {
	          "x": "0",
	          "y": "-150"
	        },
	        {
	          "x": "-150",
	          "y": "-150"
	        },
	        {
	          "x": "-150",
	          "y": "0"
	        },
	        {
	          "x": "0",
	          "y": "0"
	        }
	      ]
	    },
	    {
	      "id": "N2",
	      "name": "N2",
	      "fill": "#210021",
	      "fill_over": "#210021",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"N0",
	      "children":[],
	      "points": [
	        {
	          "x": "0",
	          "y": "50"
	        },
	        {
	          "x": "50",
	          "y": "50"
	        },
	        {
	          "x": "50",
	          "y": "0"
	        },
	        {
	          "x": "0",
	          "y": "0"
	        }
	      ]
	    },    
	    {
	      "id": "N3",
	      "name": "N3",
	      "fill": "#210021",
	      "fill_over": "#210021",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"N1",
	      "children":[],
	      "points": [
	        {
	          "x": "0",
	          "y": "-25"
	        },
	        {
	          "x": "-25",
	          "y": "-25"
	        },
	        {
	          "x": "-25",
	          "y": "0"
	        },
	        {
	          "x": "0",
	          "y": "0"
	        }
	      ]    
	    },
	    {
	      "id": "N4",
	      "name": "N4",
	      "fill": "#210021",
	      "fill_over":  "#210021",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"N1",
	      "children":[],
	      "points": [
	        {
	          "x": "-50",
	          "y": "-100"
	        },
	        {
	          "x": "-50",
	          "y": "-150"
	        },
	        {
	          "x": "-150",
	          "y": "-150"
	        },
	        {
	          "x": "-150",
	          "y": "-100"
	        }
	      ]
	    },
	    { 
	      "id": "N5",
	      "name": "N5",
	      "fill": "#210021",
	      "fill_over": "#210021",
	      "stroke": "#530053",
	      "strokeWidth": "1.5",
	      "parent":"N0",
	      "children":[],
	      "points": [
	        {
	          "x": "70",
	          "y": "150"
	        },
	        {
	          "x": "70",
	          "y": "110"
	        },
	        {
	          "x": "110",
	          "y": "110"
	        },
	        {
	          "x": "110",
	          "y": "70"
	        },
	        {
	          "x": "150",
	          "y": "70"
	        },
	        {
	          "x": "150",
	          "y": "150"
	        }
	      
	      ]
	    },
	    { 
	      "id": "N6",
	      "name": "N6",
	      "fill": "#2FB5F3",
	      "fill_over": "#0AA4EE",
	      "stroke": "#038CCF",
	      "strokeWidth": "1.5",
	      "parent":"C0",
	      "children":[],
	      "points": [
	        {
	          "x": "18",
	          "y": "-24"
	        },
	        {
	          "x": "18",
	          "y": "-84"
	        },
	        {
	          "x": "108",
	          "y": "-84"
	        },
	        {
	          "x": "108",
	          "y": "-24"
	        }
	      ]
	    }
	]
};


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST =============================================================================//
	|	Verifica credenciales de autentificacion, si son correctas se redirecciona a la ruta '/home' 
	|	si no lo son se redirecciona a la ruta '/'
	==================================================================================================*/

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page ==========================================================================//
	|	Renderiza pagina de registro
	==================================================================================================*/

	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST ==============================================================================//
	|	Verifica que los datos de registro sean validos , si son correctos se redirecciona a la ruta '/home' 
	|	si no lo son se redirecciona a la ruta '/'
	==========================================================================================================*/

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Handle Logout ==========================================================================//
	|   Cerrar session y redirecciona a ruta '/'
	==================================================================================================*/
	
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET Home Page ==========================================================================//
	|	Renderiza pagina home
	==================================================================================================*/
	router.get('/home', isAuthenticated, function(req, res){
		res.redirect('app.html');
		/*res.render('home', { user: req.user });*/
	});

	/*PicassoNode API Rest*/
	router.get('/core', isAuthenticated, function(req, res){
		res.send(dummy_core);
	});

	/* GET login page. */
	router.get('/walter', isAuthenticated, function(req, res){
		res.render('walter_get', { user: req.user });
	});

	router.post('/walter',  isAuthenticated,function (req, res){
	  res.render('walter_post');
	});

	return router;
}





