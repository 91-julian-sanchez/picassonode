app = angular.module('nodes',[]);

/*----------------------------------------------------------/*
| CONFIGURACION CONTROLLADOR NODESCONTROLLER                |
------------------------------------------------------------*/

/*
 *Se injecta al controlador el modelos NodesModel y PicassoModel y el ambito $scope
*/
var nodex = {};
app.controller("NodesController", function($scope, NodesModel , PicassoModel , TreeModel ) {

  console.info('run: NodesController');
 
  //Inicia servicio
  promise = NodesModel._service;

  promise.then(
    function(response) { 

      console.info('NodesController:promise:response()'); 

      $scope.tree= TreeModel.init( JSON.parse(JSON.stringify(response.data.nodes)) ).model;

      //Configuracion modelo
      NodesModel.setNodes(response.data.nodes);
    
      //Configuracion $scope(ambito)
      $scope.nodes = response.data.nodes; //Guarda nodos en $scope(ambito).
      $scope.current_node = null; // Nodo actual.
      $scope.multiselected_nodes = null; //Modo multiseleccion.
      $selected_current_nodes=null;
   
      //Actualiza $scope
      $scope.$watchCollection('current_node', function(newModel, oldModel) {
          
        //console.log('new current_node'); console.log(newModel);
        //console.log('old current_node'); console.log(oldModel);

      });

      //Actualiza $scope
      $scope.$watchCollection('selected_current_nodes', function(newModel, oldModel) {

        if($scope.multiselected_nodes!=null){
          for (var i = 0; i < $scope.multiselected_nodes.length; i++) {

            //Modificamos modelo 
            if(newModel.fill!='' && newModel.fill!= undefined) 
              PicassoModel.nodes[ $scope.multiselected_nodes[i] ].fill = newModel.fill;

            if(newModel.fill_over!='' && newModel.fill_over!= undefined)
              PicassoModel.nodes[$scope.multiselected_nodes[i]].fill_over = newModel.fill_over ;

            if(newModel.stroke!='' && newModel.stroke!= undefined)
              PicassoModel.nodes[$scope.multiselected_nodes[i]].stroke = newModel.stroke; 

            if(newModel.strokeWidth!='' && newModel.strokeWidth!= undefined)
              PicassoModel.nodes[$scope.multiselected_nodes[i]].strokeWidth = newModel.strokeWidth;

          };
        }

      });

    },
    function(error) {
      $log.error('failure loading movie', error);
    }
  );


  //Click sobre un nodo svg para activar seleccionador multiple de nodos svg
  $scope.click= function(index, event){

    $scope.multiselected_nodes = PicassoModel.pushMultiselectNode(index);

    var deselected = PicassoModel.deselect(index);

    if(deselected)
    $scope.current_node = null;

    $scope.select_multiple_mode=true;
    $scope.select_simple_mode=false;

  },

  //Doble click sobre un nodo svg para seleccionarlo
  $scope.dbl_click= function(index, event){
    
    $selected_current_nodes=null;
    $scope.multiselected_nodes = null;
    PicassoModel.destroyMultiselectNode();

    var selected = PicassoModel.select(index);
    
    if(selected){
      PicassoModel.deleteMultiselectNode(index);
      PicassoModel._currentNode=index;
      $scope.current_node = $scope.nodes[index];
    }else{
      $scope.current_node = null;
    }
    
    $scope.select_simple_mode=true;
    $scope.select_multiple_mode=false;

  },

  $scope.mouseover= function(index, event){
    PicassoModel.fillover(index);
  },

  $scope.mouseleave= function(index, event){
    PicassoModel.fill(index);
  }

}
);

