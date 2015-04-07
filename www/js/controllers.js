angular.module('PasControllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })
    .controller('VideosCtrl', function ($scope, VideoService, LoadService, GeneralService, $stateParams) {
        var listIds;
        var id = $stateParams.playlistID;
        var promise = VideoService.getVideosByPlaylist(id);
        LoadService.show();
        promise.then(function (response) {
            console.log("Videos");
            console.log(response);
            var listVideos = response.items;
            var listIds = VideoService.getListIDs(listVideos);
            var subpromise = VideoService.getListVideosByIDs(listIds);
            subpromise.then(function (response){
                response.items = GeneralService.deleteDuplicates(response.items);
                console.log('Details Videos');
                console.log(response);
                $scope.videos = response;


                VideoService.videos[(id)] = response.items;
                LoadService.hide();
            });
        });
    })
    .controller('VideoCtrl', function ($scope, VideoService, $stateParams) {
        var videoID = $stateParams.videoID;
        var playID = $stateParams.playID;
        $scope.video = VideoService.getVideoByIDLocal(playID,videoID);
        $scope.playlist = VideoService.getPlaylistsByIDLocal(playID);
    })
    .controller('MainCtrl', function ($scope, VideoService, LoadService, GeneralService, $stateParams, PASLinfoChannel) {
        var promise = VideoService.getChannelInfo(PASLinfoChannel);
        LoadService.show();
        promise.then(function (response) {
            var list = response.items[0];
            console.log("Uploaded Videos");
            console.log(list);
            VideoService.uploadedID = list.contentDetails.relatedPlaylists.uploads;
            $scope.playlist = { id: list.contentDetails.relatedPlaylists.uploads };
            var promise = VideoService.getVideosByPlaylist(VideoService.uploadedID);
            promise.then(function (response) {
                var listVideos = response.items;
                var listIds = VideoService.getListIDs(listVideos);
                var subpromise = VideoService.getListVideosByIDs(listIds);
                subpromise.then(function (response){
                    response.items = GeneralService.deleteDuplicates(response.items);
                    VideoService.uploadedVideos = response.items;
                    VideoService.videos[($scope.playlist.id)] = response.items;
                    $scope.videos = response;
                    LoadService.hide();
                });
            });

        });
    })
    .controller('MenuCtrl', function ($scope, VideoService, PASLinfoChannel) {
        var promise = VideoService.getPlaylistsByChannel(PASLinfoChannel);
        promise.then(function (response) {
            $scope.playlists = response;
            VideoService.playlists = response.items;
            $scope.UpTitle = "Dernières Vidéos";
            $scope.UpId = VideoService.uploadedID;

        });
    })
    .controller('ActionsCtrl', function ($scope, $cordovaSocialSharing, YoutubeUrl, $ionicActionSheet) {
        $scope.shareVideo = function(videoId){
            var videoUrl = YoutubeUrl+videoId;
            $cordovaSocialSharing
                .share(null, null, null, videoUrl) // Share via native share sheet
                .then(function(result) {})
        },
            $scope.showAction = function(videoId){
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        { text: '<i class="icon ion-android-share-alt"></i> <b>Partager</b>' }
                    ],
                    titleText: 'Options',
                    cancelText: 'Annuler',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        if(index == 0){
                          $scope.shareVideo(videoId);
                        }
                        return true;
                    }
                });

            };
    })
    .controller('PlaylistCtrl', function ($scope,$stateParams, VideoService) {
        var id = $stateParams.playlistID;
        $scope.playlist = VideoService.getPlaylistsByIDLocal(id);
        $scope.title = $scope.playlist.snippet.title;
        console.log("Playlists");
        console.log($scope.playlist);
    });
