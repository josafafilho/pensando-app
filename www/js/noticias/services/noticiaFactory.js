/**
 * Created by josafafilho on 11/23/15.
 */

angular.module('pensando.noticias')
    .factory('NoticiaFactory', function ($http, $cordovaSocialSharing, $sce) {

        var noticias = [];

        var baseUrl = "http://pensando.mj.gov.br/wp-json/";
        var endpoint = "noticias/";

        //if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
            baseUrl = "http://api-pensando/wp-json/";
        //}

        var url = baseUrl + endpoint;

        var noticiaFactory = {};

        noticiaFactory.getNoticias = function (page) {
            var config = {
                transformResponse: appendTransform($http.defaults.transformResponse, noticiasTransform),
                params: {
                    page: page || 1
                }
            };

            return $http.get(url, config).then(function (response) {
                noticias = noticias.concat(response.data);
                return noticias;
            });
        }
        ;

        noticiaFactory.getNoticia = function (id) {
            for (var i = 0; i < noticias.length; i++) {
                if (noticias[i].id == id) {
                    return noticias[i];
                }
            }
            return null;
        };

        function appendTransform(defaults, transform) {
            defaults = angular.isArray(defaults) ? defaults : [defaults];

            return defaults.concat(transform);
        }

        function noticiasTransform(noticiasraw) {
            var noticias = [];

            noticiasraw.forEach(function (noticiaraw) {
                var noticia = new Noticia(noticiaraw);
                noticias.push(noticia);
            });

            return noticias;
        }

        var Noticia = function (json) {
            this.id = json.ID || null;
            this.url = json.url || null;
            this.title = json.title || null;
            this.subtitle = json.subtitle || null;
            this.content = json.content || null;
            this.date = json.date || null;
            this.slug = json.slug || null;
            this.link = json.link || null;
            this.featured_image = json.featured_image || null;
            this.meta = json.meta || null;
            this.categories = json.terms.category || null;
        };

        Noticia.prototype.getCategoriesString = function () {
            if (this.categories){
                return this.categories.map(function (category) {
                    return category.name;
                }).join(", ");
            }
            return "";
        };

        Noticia.prototype.getFeaturedImageUrl = function(){
            return $sce.trustAsResourceUrl(this.featured_image.guid);
        };

        Noticia.prototype.share = function (onSuccess, onFailure) {
            var title = this.title;
            var message = this.title;
            var link = this.link;

            $cordovaSocialSharing.share(message, title, null, link).then(onSuccess, onFailure);
        };

        return noticiaFactory;
    });
