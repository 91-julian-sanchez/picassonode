var TreeModel = (function () {
 
  var counter = 0;
 
  function init(nodes){

    console.log('run: TreeModel::init()');
    this.nodes = nodes;
    // hint: TreeModel, tree and root are
    // globally available on this page
    for (var i = 0; i < this.nodes.length; i++) {
      if(this.nodes[i].children.length!=0)
        this.sort(this.nodes[i]);//Ordenar arbol
    };

    return (new TreeJSON()).parse(this.nodes); //@overwrite parse({object}) tree-model.js

  }

  function sort(node){
    for (var i = 0; i < node.children.length; i++) {
      for (var j = 0; j < this.nodes.length; j++) {
        if(this.nodes[j].id==node.children[i].id){
          node.children[i] = this.nodes[j]; //Guardar hijo 
          this.sort(this.nodes[j]); //Encontrar mis nieto
          this.nodes.splice(j,1);
          break;
        } 
      }
    };
  }

  ////////////////////////////////////////////////////////////////////////////////

  return {
     _service:null,
     nodes:[],
     init:init,
     sort:sort
  };
 
})();

//injecta Modelo
angular.module('TreeModel',[]);
//Provedor del modelo
app.provider('TreeModel', function() {

    this.name = 'modelo';

    this.$get = function(NodesService) {

        TreeModel._service = NodesModel._service

        var name = this.name;
        var nodes = [];
        return TreeModel;
    };

});
