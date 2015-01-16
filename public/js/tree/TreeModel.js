/*=============================================================================
TreeModel Model()
  -Hacer la peticion al servidor para traer los nodos de cada proyecto 
  -Esctructurar los nodos en una estructura de arbol
  -Hacer busquedas de nodos en los arboles
==============================================================================*/

var TreeModel = (function () {
 
  var counter = 0;
 
  function init(nodes){

    console.info('run: TreeModel::init() (dir:tree/TreeModel.js)');
    
    this.nodes = nodes; //Nodos traidos por el TreeService desde el servidor
    this.sort(this.nodes[0]); //Ordenar nodos en estructura de arbol   

    //Convierte la estructura de arbol en un Modelo de Arbol de la libreri TreeModel 
    //@overwrite parse({object}) tree-model.js
    this.tree = (new TreeJSON()).parse(this.nodes[0]); 
    
    return this.tree;

  }

  function sort(node){

    //Ordena los nodos en una estructura de arbol
    for (var i = 0; i < node.children.length; i++) {
      for (var j = 0; j < this.nodes.length; j++) {

        if(this.nodes[j].id==node.children[i].id){
          node.children[i] = this.nodes[j]; //Clonar y Guardar hijo 
          this.sort(this.nodes[j]); //Funcion recursiva para Encontrar nietos
          this.nodes.splice(j,1); //Eliminar nodo
          break;
        } 

      }
    };
  }

  function find(id){

    //@overwrite first(function(){...}) tree-model.js
    var node = this.tree.first(function (node) {
        return node.model.id === id;
    });

    return node.model;

  }

  ////////////////////////////////////////////////////////////////////////////////

  return {
     _service:null,
     nodes:[],
     init:init,
     sort:sort,
     find:find
  };
 
})();

//injecta Modelo
angular.module('TreeModel',[]);
//Provedor del modelo
app.provider('TreeModel', function() {

    console.info('run: TreeModel (dir:tree/TreeModel.js)');

    this.name = 'modelo';

    this.$get = function(TreeService) {

        TreeModel._service = TreeService;

        var name = this.name;
        var nodes = [];
        return TreeModel;
    };

});
