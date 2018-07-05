import HomeView from '../views/home';
import AboutView from '../views/about';


export default function config($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', HomeView)
		.when('/about', AboutView)
		.otherwise({
			redirectTo: '/'
		});
}

config.$inject = ['$routeProvider', '$locationProvider'];
