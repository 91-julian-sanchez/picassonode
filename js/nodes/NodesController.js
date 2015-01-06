app = angular.module('nodes',[]);

/*----------------------------------------------------------/*
| CONFIGURACION CONTROLLADOR NODESCONTROLLER                |
------------------------------------------------------------*/

/*
 *Se injecta al controlador el modelos NodesModel y PicassoModel y el ambito $scope
*/

app.controller("NodesController", function($scope, NodesModel , PicassoModel ) {

  console.info('run: NodesController');
 
  //Inicia servicio
  promise = NodesModel._service;

  promise.then(
    function(response) { 

      console.info('NodesController:promise:response()'); 
      //Configuracion modelo
      NodesModel.setNodes(response.data.nodes);
    
      //Configuracion $scope(ambito)
      $scope.nodes = response.data.nodes; //Guarda nodos en $scope(ambito).
      $scope.current_node = null; // Nodo actual.
      $scope.multiselected_nodes = null; //Modo multiseleccion.
      $selected_current_nodes=null;
   
      //Actualiza $scope
      $scope.$watchCollection('current_node', function(newModel, oldModel) {

        /*console.info('NodesController:watchCollection("current_node")'); 
        //1.Traer nodo svg <path>
        svg_current_node = PicassoModel.getNode(newModel.index);

        //2.Seleccionar nodo 
        selected = PicassoModel.select(newModel.index); */

       /* if(selected){

          //3.Agregar atributos
          PicassoModel.setAttribute("fill" , newModel.fill);
          PicassoModel.setAttribute('id',newModel.name );
          PicassoModel.setAttribute("stroke" , newModel.stroke); 
          PicassoModel.setAttribute("stroke-width" , newModel.strokeWidth);
          PicassoModel.setAttribute("fill" , newModel.fill );

        }*/
          
        //console.log('new current_node'); console.log(newModel);
        //console.log('old current_node'); console.log(oldModel);

      });

      //Actualiza $scope
      $scope.$watchCollection('selected_current_nodes', function(newModel, oldModel) {
       

        console.log(newModel);
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




