var express = require('express');
var router = express.Router();

//MODELS
var Tags = require('../models/tags');
var Project = require('../models/project');
var Core = require('../models/core');

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
			res.redirect('home.html');
		});

	/*PICASSO NODE APP ====================================================================================*/

		//@GET
		router.get('/app/:id', isAuthenticated, function(req, res){
			res.redirect('../app/index.html?project='+req.params.id);
		});

		//@GET
		router.get('/core/:id', isAuthenticated, function(req, res){

			Project.findOne({ _id: req.params.id }, function(err,project){

				Core.findOne({ project_id: project._id }, function(err,core){

					if(err)
					res.send(err);

					var piccasso_core = {
						title:project.name,
						nodes: core.nodes
					} 

					res.json(piccasso_core);

			    });

			});
			
		});

		//@GET
		router.get('/core/node/:id', function(req, res){

			//res.send(err);
			Core.findOne({ project_id: req.params.id }, function(err,core){

				if(err)
				res.send(err);

			// 	core.nodes.push( {
			//       "id": "C0",
			//       "name": "Cluster0",
			//       "fill": "#530053",
			//       "fill_over": "#530053",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"",
			//       "children":[{"id": "N0"},{"id": "N1"},{"id": "N6"}],
			//       "points": [
			//       	{
			//           "x": "0",
			//           "y": "150"
			//         },
			//         {
			//           "x": "150",
			//           "y": "150"
			//         },
			//         {
			//           "x": "150",
			//           "y": "0"
			//         },
			//         {
			//           "x": "0",
			//           "y": "0"
			//         }
			//       ]
			//     },
			//     {
			//       "id": "N0",
			//       "name": "N0",
			//       "fill": "#530053",
			//       "fill_over": "#530053",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"C0",
			//       "children":[{"id": "N2"},{"id": "N5"}],
			//       "points": [
			//         {
			//           "x": "0",
			//           "y": "150"
			//         },
			//         {
			//           "x": "150",
			//           "y": "150"
			//         },
			//         {
			//           "x": "150",
			//           "y": "0"
			//         },
			//         {
			//           "x": "0",
			//           "y": "0"
			//         }
			//       ]
			//     },
			//     {
			//       "id": "N1",
			//       "name": "N1",
			//       "fill": "#530053",
			//       "fill_over": "#530053",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"C0",
			//       "children":[{"id": "N4"},{"id": "N3"}],
			//       "points": [
			//         {
			//           "x": "0",
			//           "y": "-150"
			//         },
			//         {
			//           "x": "-150",
			//           "y": "-150"
			//         },
			//         {
			//           "x": "-150",
			//           "y": "0"
			//         },
			//         {
			//           "x": "0",
			//           "y": "0"
			//         }
			//       ]
			//     },
			//     {
			//       "id": "N2",
			//       "name": "N2",
			//       "fill": "#210021",
			//       "fill_over": "#210021",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"N0",
			//       "children":[],
			//       "points": [
			//         {
			//           "x": "0",
			//           "y": "50"
			//         },
			//         {
			//           "x": "50",
			//           "y": "50"
			//         },
			//         {
			//           "x": "50",
			//           "y": "0"
			//         },
			//         {
			//           "x": "0",
			//           "y": "0"
			//         }
			//       ]
			//     },    
			//     {
			//       "id": "N3",
			//       "name": "N3",
			//       "fill": "#210021",
			//       "fill_over": "#210021",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"N1",
			//       "children":[],
			//       "points": [
			//         {
			//           "x": "0",
			//           "y": "-25"
			//         },
			//         {
			//           "x": "-25",
			//           "y": "-25"
			//         },
			//         {
			//           "x": "-25",
			//           "y": "0"
			//         },
			//         {
			//           "x": "0",
			//           "y": "0"
			//         }
			//       ]    
			//     },
			//     {
			//       "id": "N4",
			//       "name": "N4",
			//       "fill": "#210021",
			//       "fill_over":  "#210021",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"N1",
			//       "children":[],
			//       "points": [
			//         {
			//           "x": "-50",
			//           "y": "-100"
			//         },
			//         {
			//           "x": "-50",
			//           "y": "-150"
			//         },
			//         {
			//           "x": "-150",
			//           "y": "-150"
			//         },
			//         {
			//           "x": "-150",
			//           "y": "-100"
			//         }
			//       ]
			//     },
			//     { 
			//       "id": "N5",
			//       "name": "N5",
			//       "fill": "#210021",
			//       "fill_over": "#210021",
			//       "stroke": "#530053",
			//       "strokeWidth": "1.5",
			//       "parent":"N0",
			//       "children":[],
			//       "points": [
			//         {
			//           "x": "70",
			//           "y": "150"
			//         },
			//         {
			//           "x": "70",
			//           "y": "110"
			//         },
			//         {
			//           "x": "110",
			//           "y": "110"
			//         },
			//         {
			//           "x": "110",
			//           "y": "70"
			//         },
			//         {
			//           "x": "150",
			//           "y": "70"
			//         },
			//         {
			//           "x": "150",
			//           "y": "150"
			//         }
			      
			//       ]
			//     },
			//     { 
			//       "id": "N6",
			//       "name": "N6",
			//       "fill": "#2FB5F3",
			//       "fill_over": "#0AA4EE",
			//       "stroke": "#038CCF",
			//       "strokeWidth": "1.5",
			//       "parent":"C0",
			//       "children":[],
			//       "points": [
			//         {
			//           "x": "18",
			//           "y": "-24"
			//         },
			//         {
			//           "x": "18",
			//           "y": "-84"
			//         },
			//         {
			//           "x": "108",
			//           "y": "-84"
			//         },
			//         {
			//           "x": "108",
			//           "y": "-24"
			//         }
			//       ]
			//     }
			// );

			core.nodes.push(
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
			    }
			   );
				core.save(function(err) {
			      if (err)
			        res.send('error')
			      else
			        res.send('success')
			    });

		    });

			
		});




	/*....................................................................................................*/

	/*PROJECTS ==========================================================================================*/

		//@GET
		router.get('/project', function(req, res){

		    Project.find({ user_id: req.user._id }, function(err,projecs){

				if(err)
				res.send(err);

				res.json(projecs);

			});
		});

		//@POST
		router.post('/project',function (req, res){

			Project.create({
				user_id: req.user._id, 
				name: req.body.name, 
				description: req.body.description, 
			    contributors: req.body.contributors,
				done:false
			},function(err,project){

				if(err)
				res.send(err);

				Core.create({
					project_id: project._id, 
					nodes:[],
					done:false
				},function(err,core){

					if(err)
					res.send(err);

					res.json({"redirect":'read'});

				});

			});

		});

	/*...................................................................................................*/

	/* POST Tags ==========================================================================//
	|	Renderiza pagina home
	==================================================================================================*/

		//@POST
		router.post('/tags',  isAuthenticated,function (req, res){
		  
		  console.log(req.name);
		  	Tags.create({
		  		name: req.name, 
				label: req.label, 
				fill: req.fill, 
				fill_over: req.fill_over,
				done:false
		  	},function(err,tags){

		  		if(err)
		  		res.send(err);

		  		Tags.find(function(err,tags){
		  			if(err)
		  			res.send(err);

		  			res.json(tags);
		  		});

		  	});

		  	console.log("Request data:");

			res.send(req.name);
		});

		return router;
}





