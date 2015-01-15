app = angular.module('nodes',[]);

/*----------------------------------------------------------/*
| CONFIGURACION CONTROLLADOR NODESCONTROLLER                |
------------------------------------------------------------*/

/*
 *Se injecta al controlador el modelos NodesModel y PicassoModel y el ambito $scope
*/

app.controller("NodesController", function($scope, NodesModel , PicassoModel , TreeModel ) {

  console.info('run: NodesController');
 
  //Inicia servicio
  promise = NodesModel._service;

  promise.then(
    function(response) { 

      console.info('NodesController:promise:response()'); 

      $scope.tree = TreeModel.init( response.data.nodes );
      console.log($scope.tree);
    
      //Configuracion modelo
     // NodesModel.setNodes($scope.tree_aux);//no esta haciendo nada
    
      //Configuracion $scope(ambito)
      $scope.nodes = $scope.tree; //Guarda nodos en $scope(ambito).
      $scope.current_node = null; // Nodo actual.
      $scope.multiselected_nodes = null; //Modo multiseleccion.
      $selected_current_nodes=null;
   
      //Actualiza $scope
      $scope.$watchCollection('current_node', function(newModel, oldModel) {
          
      });

      //Actualiza $scope
      $scope.$watchCollection('selected_current_nodes', function(newModel, oldModel) {

        if($scope.multiselected_nodes!=null){
          for (var i = 0; i < $scope.multiselected_nodes.length; i++) {

            if(i%2!=0){

              //Modificamos modelo 
              if(newModel.fill!='' && newModel.fill!= undefined) 
                PicassoModel.multiselected_nodes[i].fill = newModel.fill;

              if(newModel.fill_over!='' && newModel.fill_over!= undefined)
                PicassoModel.multiselected_nodes[i].fill_over = newModel.fill_over ;

              if(newModel.stroke!='' && newModel.stroke!= undefined)
                PicassoModel.multiselected_nodes[i].stroke = newModel.stroke; 

              if(newModel.strokeWidth!='' && newModel.strokeWidth!= undefined)
                PicassoModel.multiselected_nodes[i].strokeWidth = newModel.strokeWidth;

            }       

          };
        }

      });

    },
    function(error) {
      $log.error('failure loading movie', error);
    }
  );


  //Click sobre un nodo svg para activar seleccionador multiple de nodos svg
  $scope.click= function(id, event){

    if($scope.current_node==null){

      $scope.multiselected_nodes = PicassoModel.pushMultiselectNode( TreeModel.find(id) );

      //Modo de seleccion
      $scope.select_multiple_mode=true;
      $scope.select_simple_mode=false;

    }

  },

  //Doble click sobre un nodo svg para seleccionarlo
  $scope.dbl_click= function(id, event){
    
    $selected_current_nodes=null;
    $scope.multiselected_nodes = null;
    PicassoModel.destroyMultiselectNode();

    var selected = PicassoModel.select( TreeModel.find(id) );

    if(selected)
      $scope.current_node = PicassoModel._currentNode;
    else
      $scope.current_node = null;
    
    //Modo de seleccion
    $scope.select_simple_mode=true;
    $scope.select_multiple_mode=false;

  },

  $scope.mouseover= function(id, event){
    PicassoModel.fillover( TreeModel.find(id) );
  },

  $scope.mouseleave= function(id, event){
    PicassoModel.fill( TreeModel.find(id) );
  }

}
);

