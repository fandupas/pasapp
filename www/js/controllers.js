angular.module('PasControllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })
    .controller('VideosCtrl', function ($scope, VideoService, $stateParams) {
        var id = $stateParams.playlistID;
        var promise = VideoService.getVideosByPlaylist(id);
        promise.then(function (response) {
            console.log("Videos");
            console.log(response);
            $scope.videos = response;
            VideoService.videos = response.items;
        });
    })
    .controller('VideoCtrl', function ($scope, VideoService, $stateParams, $sce) {
        var videoID = $stateParams.videoID;
        $scope.video = VideoService.getVideoByIDLocal(videoID);
        this.config = {
            sources: [
                {src: "http://www.youtube.com/watch?v="+$scope.video.snippet.resourceId.videoId}
            ],
            theme: "../lib/videogular-themes-default/videogular.css",
            plugins: {

            },
            responsive: true
        };

    })
    .controller('MainCtrl', function ($scope, VideoService, $stateParams) {


    })
    .controller('MenuCtrl', function ($scope, VideoService, PASLinfoChannel) {
        var promise = VideoService.getPlaylistsByChannel(PASLinfoChannel);
        promise.then(function (response) {
            $scope.playlists = response;
            VideoService.playlists = response.items;
        });
    })
    .controller('PlaylistCtrl', function ($scope,$stateParams, VideoService) {
        var id = $stateParams.playlistID;
        $scope.playlist = VideoService.getPlaylistsByIDLocal(id);
        $scope.title = $scope.playlist.snippet.title;
        console.log("Playlists");
        console.log($scope.playlist);
    });
