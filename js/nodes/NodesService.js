
/**
 *
 * 
 *
 * 
 */
 
//SERVICIO =============================================================================
app.service('NodesService', function($http) {

  console.info('NodesService.js - NodesService');
  var promise = $http.get('core/dummy.json');//Peticion Get al servidor
  return promise;

});