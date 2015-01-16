
/**
 *
 * 
 *
 * 
 */
 
//SERVICIO =============================================================================
app.service('TreeService', function($http) {

  console.info('run: TreeService (dir:tree/TreeService.js)');
  var promise = $http.get('/core');//Peticion Get al servidor
  return promise;

});