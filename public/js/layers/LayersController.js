app.controller("layersController", function($scope, NodesModel , PicassoModel , TreeModel ) {
    
	//Inicia servicio
    promise = NodesModel._service;

    promise.then(
	    function(response) { 
	    	console.log($scope.tree);
	    },
	    function(error) {
	      $log.error('failure loading movie', error);
	    }
    );

    $scope.selectLayer= function(node){
    	if(!node.selected)
    	node.selected=true;
    	else
    	node.selected=false;
    }

    $scope.showLayer = function (){
    	alert('mostrar nodo');
    }

});