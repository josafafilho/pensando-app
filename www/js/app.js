angular.module('pensando',
    [
        'ionic',
        'ngCordova',
        'pensando.controllers',
        'pensando.publicacoes',
        'pensando.noticias'
    ])

    .run(function ($ionicPlatform, $rootScope, $state, $stateParams) {
        $ionicPlatform.ready(function () {
            //Plugin removido pois não precisamos controlar entrada de dados por enquanto
            //e a utilização do plugin estava afetando desempenho
            //se for necessário usar o plugin no futuro use o comando
            //cordova plugin add ionic-plugin-keyboard
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //    cordova.plugins.Keyboard.disableScroll(true);
            //}
            //
            //if (window.StatusBar) {
            //    // org.apache.cordova.statusbar required
            //    StatusBar.styleDefault();
            //}

            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //$rootScope.$on('$stateChangeError', console.log.bind(console));
            //$rootScope.$on('$stateChangeStart', console.log.bind(console));
            //$rootScope.$on('$stateNotFound', console.log.bind(console));
            //$rootScope.$on('$stateChangeSuccess', console.log.bind(console));
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'js/views/menu.html',
                controller: 'PensandoCtrl'
            })
            .state('app.debates', {
                url: '/debates',
                views: {
                    'menuContent': {
                        templateUrl: 'js/debates/views/debate.html'
                    }
                }
            })
            .state('app.noticias', {
                url: '/noticias',
                views: {
                    'menuContent': {
                        controller: 'NoticiasCtrl',
                        templateUrl: 'js/noticias/views/noticias.html',
                    }
                }
            })
            .state('app.noticia', {
                url: '/noticias/:noticiaID',
                views: {
                    'menuContent': {
                        controller: 'NoticiaCtrl',
                        templateUrl: 'js/noticias/views/noticia.html',
                    }
                }
            })
            .state('app.eventos', {
                url: '/eventos',
                views: {
                    'menuContent': {
                        templateUrl: 'js/eventos/views/evento.html',
                    }
                }
            })
            .state('app.sobre', {
                url: '/sobre',
                views: {
                    'menuContent': {
                        templateUrl: 'js/views/sobre.html'
                    }
                }
            })
            .state('app.publicacoes', {
                url: '/publicacoes',
                views: {
                    'menuContent': {
                        controller: 'PublicacoesCtrl',
                        templateUrl: 'js/publicacoes/views/publicacoes.html',
                    }
                }
            })
            .state('app.publicacao', {
                url: '/publicacoes/:publicacaoID',
                views: {
                    'menuContent': {
                        controller: 'PublicacaoCtrl',
                        templateUrl: 'js/publicacoes/views/publicacao.html',
                    }
                }
            });

// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/publicacoes');
    })
;