app.controller("PicassoController",function($scope, NodesModel, PicassoModel ){

  console.info('run: PicassoController');

  //La promesa es lo ultimo proceso en ejecutarse

  promise = NodesModel._service;

  promise.then(
    function(response) { 
      console.info('PicassoController:promise:response()');

      //Iniciar picasso ////////////////////////////////////////////////////////////////////////////
      PicassoModel.init($scope.nodes);
      
      //Recorre nodos
      for (var i = 0; i< $scope.nodes.length ; i++) {

        if($scope.nodes[i].points.length!=0)
          $scope.nodes[i].path_data = PicassoModel.createPathData($scope.nodes[i]);//crea path svg para cada nodo
        
        $scope.nodes[i].index = i;//crea un index para cada nodo

      } 
      ///////////////////////////////////////////////////////////////////////////////////////////
    },
    function(errorPayload) {
        $log.error('failure loading movie', errorPayload);
    }
  );

});

//console.log("clicked! x: " + event.clientX +" y:"+ event.clientY);