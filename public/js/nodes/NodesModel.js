//MODELO  ===============================================================================

var NodesModel = (function () {
 
  var counter = 0;

  var addNode = function(newObj) {
      //productList.push(newObj);
  }

  var setNodes = function(nodes){
    _nodes = nodes;
  }

  var getNodes = function(){
      return _nodes;
  }
 
  return {
 
    //Injected by the provider
    _service:null,

    //Class Properties
    _currentNode:0,
    _nodes:null,

    init:function(){
    /*  .then(this._handleLoadSlidesSuccess.bind(this),this._handleLoadSlidesError.bind(this));*/
     /* this._service.d.then(this._handleLoadSlidesSuccess.bind(this));*/
     this._service.async().then(this._handleLoadSlidesSuccess.bind(this));
    
    },

    _handleLoadSlidesSuccess: function (result) {
      console.log('_handleLoadSlidesSuccess');
      this._nodes = result.nodes;
      console.log(this._nodes);
      return counter++;
    },
 
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    },

    addNode: addNode,
    setNodes: setNodes,
    getNodes: getNodes

  };
 
})();
 
 
//injecta Modelo
angular.module('NodesModel',[]);

app.provider('NodesModel', function() {

    console.info('run: NodesModel (dir:nodes/NodesModel.js)');

    this.name = 'modelo';

    this.$get = function(NodesService) {

        NodesModel._service = NodesService;
        var name = this.name;
        var nodes = [];

        return NodesModel;
    };

});
