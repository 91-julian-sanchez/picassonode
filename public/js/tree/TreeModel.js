var TreeModel = (function () {
 
  var counter = 0;
 
  function init(nodes){

    console.info('run: TreeModel::init()');
    //Nodos 
    this.nodes = nodes;
    //Ordenar nodos en estructura de arbol
    this.sort(this.nodes[0]);
    //Arbol 
    this.tree = (new TreeJSON()).parse(this.nodes[0]); //@overwrite parse({object}) tree-model.js

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

    this.$get = function(NodesService) {

        TreeModel._service = NodesModel._service

        var name = this.name;
        var nodes = [];
        return TreeModel;
    };

});
