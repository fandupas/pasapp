/**
 * Created by PAS on 9/01/2015.
 */
angular.module('PasServices', [])

    .service('VideoService', function (Youtube) {
        this.getPlaylistsByChannel = function (channelId) {
            return Youtube.listPlaylists({ part: 'snippet', channelId: channelId, maxResults: '20' });

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
        this.getVideoByIDLocal = function (videoID) {
            if (videoID == null) return null;
            for (i = 0; i < this.videos.length; i++) {
                if (this.videos[i].id == videoID) {
                    return this.videos[i];
                }
            }
        }
        this.getListVideosByIDs = function (listIds) {
            return Youtube.listVideos({part: 'snippet, contentDetails, statistics', id: listIds, maxResults: '50'});
        }
    })
