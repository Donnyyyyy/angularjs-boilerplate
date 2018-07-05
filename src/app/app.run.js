export default function run($rootScope, $route, $dingo) {
	$rootScope.$on("$routeChangeSuccess", function (currentRoute, previousRoute) {
		$rootScope.title = $route.current.title;
	});
	$dingo.init();
}

run.$inject = ['$rootScope', '$route', '$dingo'];
