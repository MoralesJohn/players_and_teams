//  App declrartion including ngRoute
var playerAppModule = angular.module('playerApp', ['ngRoute']);

//  ROUTES
playerAppModule.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'partials/assocs.html'
		})
		.when('/players', {
			templateUrl: 'partials/players.html'
		})
		.when('/teams', {
			templateUrl: 'partials/teams.html'
		});
});

//  FACTORIES
playerAppModule.factory('playerFactory', function(){
	var players = [
		{name: 'Jack'},
		{name: 'Jill'},
		{name: 'Tom'},
		{name: 'Marigold'},
		{name: 'Gertie'},
		{name: 'George'},
		{name: 'Stella'}
	];
	var factory = {};
	factory.getAll = function(){
		return players;
	};
	factory.add = function(player){
		players.push(player);
	};
	factory.destroy = function(player){
		players.splice(players.indexOf(player), 1);
	};
	return factory;
});
playerAppModule.factory('teamFactory', function(){
	var teams = [
		{name: 'Racers', _players: []},
		{name: 'Swingers', _players: []},
		{name: 'Walkers', _players: ['Jack']}
	];
	var factory = {};
	factory.getAll = function(){
		return teams;
	};
	factory.add = function(team){
		team._players = [];
		teams.push(team);
	};
	factory.destroy = function(team){
		teams.splice(teams.indexOf(team), 1);
	};
	factory.addAssoc = function(assoc){
		for (team of teams){
			if (team.name == assoc.team){
				team._players.push(assoc.player);
				break;
			};
		};
	};
	factory.destroyAssoc = function(assoc){
		for (team of teams){
			if (team.name == assoc.team){
				console.log(team.name, team._players);
				team._players.splice(team._players.indexOf(assoc.player), 1);
				break;
			};
		};
	};
	return factory;
});

//  CONTROLLERS
playerAppModule.controller('playerController', function($scope, playerFactory){
	$scope.players = playerFactory.getAll();
	$scope.newPlayer = {};
	$scope.add = function(){
		playerFactory.add($scope.newPlayer);
		$scope.newPlayer = {};
		$scope.players = playerFactory.getAll();
	};
	$scope.delete = function(player){
		playerFactory.destroy(player);
		$scope.players = playerFactory.getAll();
	};
});
playerAppModule.controller('teamController', function($scope, teamFactory){
	$scope.teams = teamFactory.getAll();
	$scope.newTeam = {};
	$scope.add = function(){
		teamFactory.add($scope.newTeam);
		$scope.newTeam = {};
		$scope.teams = teamFactory.getAll();
	};
	$scope.delete = function(team){
		teamFactory.destroy(team);
		$scope.teams = teamFactory.getAll();
	};
});
playerAppModule.controller('assocController', function($scope, playerFactory, teamFactory){
	$scope.players = playerFactory.getAll();
	$scope.teams = teamFactory.getAll();
	
	$scope.add = function(){
		assoc = {player: $scope.newAssoc.player.name, team: $scope.newAssoc.team.name}
		teamFactory.addAssoc(assoc);
		$scope.newAssoc = {};
		$scope.teams = teamFactory.getAll();
	};
	$scope.delete = function(assoc){
		teamFactory.destroyAssoc(assoc);
		$scope.teams = teamFactory.getAll();
	};
});
