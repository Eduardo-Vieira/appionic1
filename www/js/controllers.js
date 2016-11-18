angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Menu do App
  $scope.menus = [{title:'Playlists', icon:'ion-ios-paper', href:'#/app/playlists', click:''},
                  {title:'Pessoas', icon:'ion-android-people', href:'#/app/pessoas', click:''}
                 ];
  
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://www.w3schools.com/angular/customers_mysql.php';
    var dataFactory = {};

    dataFactory.getPessoas = function () {
        return $http.get(urlBase);
    };

    return dataFactory;
}])
.controller('PessoasCtrl', function($scope, $ionicLoading, dataFactory){
    var _this = this
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner><p>Carregando...</p>'
    })
    // iniciar rest
    getPessoas();

    function getPessoas() {
        dataFactory.getPessoas()
            .then(function (response) {
                //Loading ...
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

                //Resultado de dados
                $scope.pessoas = response.data.records;
            
            }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
    
    $scope.doRefresh = function() {
      getPessoas();     
    };
   
    
});