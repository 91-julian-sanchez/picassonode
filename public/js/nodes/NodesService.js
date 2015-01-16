
/**
 *
 * 
 *
 * 
 */
 
//SERVICIO =============================================================================
app.service('NodesService', function($http) {

  console.info('run: NodesService (dir:nodes/NodesService.js)');
  var promise = $http.get('/core');//Peticion Get al servidor
  return promise;

});