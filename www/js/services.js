/**
 * Created by PAS on 9/01/2015.
 */
angular.module('PasServices', [])

    .service('VideoService', function (Youtube) {
        this.videos = [];

        this.getPlaylistsByChannel = function (channelId) {
            return Youtube.listPlaylists({ part: 'snippet', channelId: channelId, maxResults: '50' });

        }
        this.getPlaylistsByIDLocal = function (playlistID) {
            if (playlistID == null) return null;
            for (i = 0; i < this.playlists.length; i++) {
                if (this.playlists[i].id == playlistID) {
                    return this.playlists[i];
                }
            }
        }
        this.getVideosByPlaylist = function (playlistID) {
            return Youtube.listPlaylistItems({ part: 'snippet', playlistId: playlistID, maxResults: '50' });
        }
        this.getVideoByIDLocal = function (playID,videoID) {
            if (videoID == null) return null;
            for (i = 0; i < this.videos[(playID)].length; i++) {
                if (this.videos[(playID)][i].id == videoID) {
                    return this.videos[(playID)][i];
                }
            }
        }
        this.getListVideosByIDs = function (listIds) {
            return Youtube.listVideos({part: 'snippet, contentDetails, statistics', id: listIds, maxResults: '50'});
        }
        this.getChannelInfo = function (channelId) {
            return Youtube.listChannels({part: 'contentDetails', id: channelId});
        }
        this.getListIDs = function(listVideos){
            var listIds;
            for (i = 0; i < listVideos.length; i++) {
                var videoId = listVideos[i].snippet.resourceId.videoId;
                if(i == 0)
                    listIds = videoId;
                else
                    listIds = listIds + ',' + videoId;
            }
            return listIds;
        }
    })
