/**
 * Created by josafa on 17/02/16.
 */
angular.module('pensando.noticias')
    .controller('NoticiasCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, NoticiaFactory) {
        $scope.noticias = [];
        $scope.currentPage = 0;
        $scope.hasNextPage = true;

        $scope.select = function (noticia) {
            $ionicLoading.show({
                template: 'Carregando notícias...'
            });
            $state.go('app.noticia', {noticiaID: noticia.id});
        };

        $scope.loadMore = function () {
            NoticiaFactory.getNoticias(++$scope.currentPage)
                .then(loadMoreSuccess, loadMoreError);
        };

        function loadMoreSuccess(noticias) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.noticias = noticias;
        }

        function loadMoreError(error) {
            $scope.hasNextPage = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            alert('Falha ao carregar notícias!', "Ocorreu um erro ao carregar as notícias. Tente novamente mais tarde!");
            console.error(JSON.stringify(error));
        }

        function alert(title, text) {
            return $ionicPopup.alert({
                title: title,
                template: text,
                okType: "button-assertive"
            });
        }
    });
