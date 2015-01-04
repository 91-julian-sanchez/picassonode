var PicassoModel = (function () {
 
  var counter = 0;
 
  //inicia Picasso
  function init(nodes){

    console.log('run: PicassoModel::init()');
    this.nodes = nodes;
    
  }

  function createPathData(node){
     
    //Recorre puntos de nodo[i]
    for (var j = 0; j< node.points.length ; j++) {
      //Renderiza  puntos (x,y) 
      if(j==0){
        svg_path_element = "M "+node.points[j].x+" "+node.points[j].y;// console.log('M ('+node.points[j].x+','+node.points[j].y+')') ; 
      }else{    
        svg_path_element = svg_path_element +" L "+ node.points[j].x+ " " + node.points[j].y+"";// console.log('L ('+node.points[j].x+','+node.points[j].y+')') ; 
      }

    } 

    return svg_path_element;
  }

  function getNode(index){   
    return document.getElementById(this.nodes[index].name);
  }

  function setAttribute( attr , value ){
      /*Agregar atributos al objeto SVG*/
      this.node_selected.svg_path_element.setAttribute(attr , value);
  }

  function select(index){
    
    if(this.node_selected.node!=null){

      if(this.node_selected.node.index!=index){
       
        //Restaura el color de borde del antiguo nodo svg seleccionado
        this.stroke(this.node_selected.node.index);

        //Asigna color 'seleccionado' al borde del nuevo nodo svg seleccionado
        this.stroke(index, '#39ff14');

        return true;

      }else{

        //Deselecionar y restaurar el color de borde del antiguo nodo svg seleccionado
        this.stroke(this.node_selected.node.index);
        this.node_selected = {};

        return false;
      }
       
    }else{

      //Asigna color 'seleccionado' al borde del nuevo nodo svg seleccionado
      this.stroke(index, '#39ff14');
      return true;

    }

  }

  return {
 
    init:init,
    _service:null,
    _nodes:null,
    _currentNode:0,
    //Nodo seleccionado node_selected
    node_selected: {},  // node_selected{svg_path_element:'', node: null}
    createPathData:createPathData,//Crea el path para el nodo SVG <path>
    setAttribute:setAttribute,//Agregar un atributo SVG a nodo SVG <path>
    select:select,//Seleccionar un nodo current node.
  
    getNode:function(index){   
      return document.getElementById(this.nodes[index].name);
    },

    //Asigna color de relleno a un nodo svg
    fill:function(index){
      this.node_selected.svg_path_element  = document.getElementById(this.nodes[index].name); //seleccionar nuevo elemento
      this.setAttribute("fill" , this.nodes[index].fill);
    },

    //Asigna color de relleno cuando el mouse pasa por un nodo svg
    fillover:function(index){
      this.node_selected.svg_path_element  = document.getElementById(this.nodes[index].name); //seleccionar nuevo elemento
      this.setAttribute("fill" , this.nodes[index].fill_over); // ColorLuminance(node.fill,0.25) set color de borde
    },

    //Asigna color de borde a un nodo svg
    stroke:function(index,color){

      this.node_selected.node= this.nodes[index];
      this.node_selected.svg_path_element  = document.getElementById(this.node_selected.node.name); //seleccionar elemento DOM svg <path>
      
      if(color==undefined)
      this.setAttribute("stroke" , this.node_selected.node.stroke); //set color de borde
      else
      this.setAttribute("stroke" , color); //set color de borde

    }
    
  };
 
})();

//injecta Modelo
angular.module('PicassoModel',[]);
//Provedor del modelo
app.provider('PicassoModel', function() {

    this.name = 'modelo';

    this.$get = function(NodesService) {

        PicassoModel._service = NodesModel._service

        var name = this.name;
        var nodes = [];
        return PicassoModel;
    };

});


/*The Module Pattern*/
/*

/*
  Crea un path para cada nodo: utilizar metodo si se migra la aplicacion a una tecnololia distinta a
  Angular js. 

  //d = "path data"

  function init(nodes){

    //se optiene la primera etiqueta <g>...</g>
    this.svg_grouping = document.getElementsByTagName('g')[0];

    for (var i = 0; i < this.nodes.length ; i++) {
      this.setNode(this.nodes[i]);
    }
    
  }

  function setNode(node){

    //Crea una ruta path SVG
    this.node_selected.svg_path_element = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 

    //Crea datos de ruta 'd'
    this.svg_path_element = this.createPathData(node);

    //Atributos de la ruta 
    this.setAttribute('id',node.name ); //set id
    this.setAttribute('d', this.svg_path_element+" Z" ); // set datos de ruta
    this.setAttribute("stroke" , node.stroke); //Set stroke colour
    this.setAttribute("stroke-width" , node.strokeWidth); //Set stroke colour
    this.setAttribute("fill" , node.fill ); //Set stroke colour #530053
   
    //Agrega nodo al svg_grouping 'g'
    this.svg_grouping.appendChild( this.node_selected.svg_path_element );

  }

  //Agrega listeners al nodo
  var path_element = document.getElementById(node.name); 

  path_element.addEventListener("mouseover", function() { listener.mouseover(this) } , false); 
  path_element.addEventListener("mouseout", function(){ listener.mouseout(this)} , false); 
  path_element.addEventListener('click', function() { listener.click(this) }, false);

  var listener = (function () {
 
  function click(node) {
    console.log(node);
    var index_node =  String((node.id).split('N')[1]) ;
    node.setAttribute('style','fill:'+vector_core.nodes[index_node].stroke );
  }

  function mouseover(node) {
      var index_node =  String((node.id).split('N')[1]) ;
      node.setAttribute('style','fill:'+vector_core.nodes[index_node].fill_over );
      console.log('mouseover');
  };

  function mouseout(node) {
      var index_node =  (node.id).split('N')[1] ;
      node.setAttribute('style','fill:'+ vector_core.nodes[index_node].fill );
      console.log('mouseout');
  }

  return {
 
    mouseover: mouseover,
 
    mouseout: mouseout,

    click: click

  };
 
} )();

*/



