app.controller("layersController", function($scope, TreeModel, NodesModel , PicassoModel ) {
    
    console.info('run: layersController (dir:layers/layersController.js)');
	//Inicia servicio
    promise = TreeModel._service;

    promise.then(
	    function(response) { 
	    	//console.log($scope.tree);
	    },
	    function(error) {
	      $log.error('failure loading movie', error);
	    }
    );

    $scope.selectLayer= function(id){

        $selected_current_nodes=null;
        $scope.$parent.multiselected_nodes = null;
        PicassoModel.destroyMultiselectNode();

        var node = TreeModel.find(id);
        var selected = PicassoModel.select( node );

        if(selected){
            $scope.$parent.current_node = PicassoModel._currentNode;
        }else{
            $scope.$parent.current_node = null;
        }
     
        //Modo de seleccion
        $scope.$parent.select_simple_mode=true;
        $scope.$parent.select_multiple_mode=false;

        if(!node.selected)
    	node.selected=true; //css class
    	else
    	node.selected=false; //css class

    }

    $scope.showLayer = function (){
    	alert('mostrar nodo');
    }

});