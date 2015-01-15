app.controller("PicassoController",function($scope, NodesModel, PicassoModel ){

  console.info('run: PicassoController');

  //La promesa es lo ultimo proceso en ejecutarse

  promise = NodesModel._service;

  promise.then(
    function(response) { 

      console.info('PicassoController:promise:response()');

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