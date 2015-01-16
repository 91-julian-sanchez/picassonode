
/*
comandos disponibles para los datos de ruta (<path d = "path data" />):

M = moveto
L = lineto
H = lineto horizontal
V = lineto verticales
C = curveto
S = curveto suave
Q = curva Bézier cuadrática
T = suave curveto Bézier cuadrática
A = arco elíptico
Z = closepath

*/

var vector_corex = {
"nodes": [
    {
      "points": [
        {
          "x": "0",
          "y": "150"
        },
        {
          "x": "150",
          "y": "150"
        },
        {
          "x": "150",
          "y": "0"
        },
        {
          "x": "0",
          "y": "0"
        },
      
      ],
      "name": "N0",
      "fill": "#530053",//none
      "fill_over": ColorLuminance( "#530053", 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'none',
      'childs':['N2']
    },
    {
      "points": [
        {
          "x": "0",
          "y": "-150"
        },
        {
          "x": "-150",
          "y": "-150"
        },
        {
          "x": "-150",
          "y": "0"
        },
        {
          "x": "0",
          "y": "0"
        },
      
      ],
      "name": "N1",
      "fill": "#530053",//none
      "fill_over": ColorLuminance( "#530053" , 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'none',
      'childs':[]
    },
    {
      "points": [
        {
          "x": "0",
          "y": "50"
        },
        {
          "x": "50",
          "y": "50"
        },
        {
          "x": "50",
          "y": "0"
        },
        {
          "x": "0",
          "y": "0"
        },
      
      ],
      "name": "N2",
      "fill": "#07A3DC",//none
      "fill_over": ColorLuminance( "#07A3DC" , 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'N0',
      'childs':[]
    },    
    {
      "points": [
        {
          "x": "0",
          "y": "-25"
        },
        {
          "x": "-25",
          "y": "-25"
        },
        {
          "x": "-25",
          "y": "0"
        },
        {
          "x": "0",
          "y": "0"
        },
      
      ],
      "name": "N3",
      "fill": "#07A3DC",//none
      "fill_over": ColorLuminance( "#07A3DC" , 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'N2',
      'childs':[]
    },
    {
      "points": [
        {
          "x": "-50",
          "y": "-100"
        },
        {
          "x": "-50",
          "y": "-150"
        },
        {
          "x": "-150",
          "y": "-150"
        },
        {
          "x": "-150",
          "y": "-100"
        },
      
      ],
      "name": "N4",
      "fill": "#07A3DC",//none
      "fill_over": ColorLuminance( "#07A3DC" , 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'N2',
      'childs':[]
    },
    {
      "points": [
        {
          "x": "70",
          "y": "150"
        },
        {
          "x": "70",
          "y": "110"
        },
        {
          "x": "110",
          "y": "110"
        },
        {
          "x": "110",
          "y": "70"
        },
        {
          "x": "150",
          "y": "70"
        },
        {
          "x": "150",
          "y": "150"
        }
      
      ],
      "name": "N5",
      "fill": "#07A3DC",//none
      "fill_over": ColorLuminance( "#07A3DC" , 0.25),
      "stroke": "#530053",
      "strokeWidth": "1.5",
      "parent":'N0',
      'childs':[]
    }
  ]
}
