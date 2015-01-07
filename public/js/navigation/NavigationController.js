
//Configuracion modulo navegacion
angular.module('navigation',[])
  .controller('NavigationController',['$scope',function($scope){ //configuracion controlador
    
  }])
  .directive('navigation',function(){//configuracion directiva
    //retorna html al template
    return {
      restrict:'A',
      isolate:true,
      link: function($scope,$elm,$attrs){
        new NavigationDirective($scope);
      },
      scope:true
    }
})

/*
//Configuracion modulo navegacion
angular.module('navigation',[])
  .controller('NavigationController',['$scope',function($scope){ //configura controlador
    
  }])
  .directive('navigation',function(){//configura directiva
    //retorna html al template
   return {
      restrict:'A',
      isolate:true,
      link: function($scope,$elm,$attrs){

        $scope.name = "N3";
        $scope.fill = "#07A3DC";
        $scope.fill_over = "#07A3DC";
        $scope.stroke = "#530053";
        $scope.strokeWidth = "1.5";
        $scope.parent = "N2";
        $scope.childs = [];
      },
      scope:true
    }
  })*/
