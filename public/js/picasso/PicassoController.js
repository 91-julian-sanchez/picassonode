app.controller("PicassoController",function($scope, TreeModel, PicassoModel ,NodesModel){

  console.info('run: PicassoController (dir:picasso/PicassoController.js)');

  //La promesa es lo ultimo proceso en ejecutarse

  promise = TreeModel._service;

  promise.then(
    function(response) { 

      console.info('run: PicassoController:promise:response() (dir:picasso/PicassoController.js)'); 

      //Iniciar picasso ////////////////////////////////////////////////////////////////////////////
      PicassoModel.init($scope.tree.model);    
      /////////////////////////////////////////////////////////////////////////////////////////////

    },
    function(errorPayload) {
        $log.error('failure loading movie', errorPayload);
    }
  );

});

//console.log("clicked! x: " + event.clientX +" y:"+ event.clientY);