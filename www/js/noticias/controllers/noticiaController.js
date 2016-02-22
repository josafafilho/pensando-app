/**
 * Created by josafa on 25/10/15.
 */
angular.module('pensando.noticias')
    .controller('NoticiaCtrl', function ($scope, $stateParams, $ionicLoading, NoticiaFactory) {
        $scope.noticia = {};

        /**
         * funções relativas ao carregamento dos dados da notícia
         */
        $scope.loadNoticia = function () {
            var noticiaID = $stateParams.noticiaID;

            $scope.noticia = NoticiaFactory.getNoticia(noticiaID);

            $ionicLoading.hide();
            if (!$scope.noticia) {
                loadError();
            }
        };

        $scope.loadNoticia();

        /**
         * funções relativas ao compartilhamento da publicação
         */
        $scope.share = function () {
            $scope.noticia.share(shareSuccess, shareError);
        };

        function loadError() {
            var alert = alert('Falha ao carregar notícia!', "Ocorreu um erro ao carregar a notícia.\nTente novamente mais tarde!");

            alert.then(function () {
                $ionicHistory.goBack();
            });
        };

        function shareSuccess(result) {
            console.log(JSON.stringify(result));
        }

        function shareError(error) {
            console.error(JSON.stringify(error));
            alert('Falha ao compartilhar a notícia!', 'Ocorreu um erro enquanto tentávamos compartilhar esta notícia.');
        }

        function alert(title, text) {
            return $ionicPopup.alert({
                title: title,
                template: text,
                okType: "button-assertive"
            });
        }
    })
;