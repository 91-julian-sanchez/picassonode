app.directive('layers',function(){
	return{
		restrict:'A',
		template: "<div class='layer' ng-repeat='layer in layers' > {{layer}} </div>"
	}
});