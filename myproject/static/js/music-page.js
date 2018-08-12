
/* I know this code leaves a lot to be desired. I'm in a rush, and
I'd forgotten how long it takes to do things with jQuery. */

$(document).ready(function() {

	var currSongId = "0"; //the ID (and index in the song list) of the current or last played song
	//initialize music player (it just has play/pause and volume functionality)
	var player = new Plyr($('#music-player'), { speed: { options: [1] }, settings: [] });
	var songs = $('#song-list li'); //array of song list elements
	var playNextSongTimeout; //a timeout for automatic progression to next song

	setup();

	function setup() {
		makeSongActive("0"); //highlight the first song
		addNewlinesToLyrics();
		songs.each(function() {
			var songHandle = $(this).find('.song-handle');
			var songTitle = $(this).find('.song-title');
			//plays a song and highlights it
			songHandle.click(function() {
				playSong(songTitle.text(), songHandle.attr('id'));
				clearAnimationStyles(songHandle);
			});
			songHandle.hover(function() {
				zoomSongHandle($(this), '1em', '0.9', 300);
			});
			songHandle.mouseleave(function() {
				zoomSongHandle($(this), '1em', '0.6', 300);
			});
			var lyricsBtn = $(this).find('.lyrics-btn');
			//if there are lyrics for this song
			if (lyricsBtn.length) {
				var lyrics = $(this).closest('li').find('.lyrics-text');
				lyricsBtn.click(function(event) {
					event.stopPropagation(); //prevent song-handle click event
					showOrHideLyrics(lyrics);
				});
			}
			$('.download-song').click(function(event) {
				event.stopPropagation(); //prevent song-handle click event
			})
		});
		/* If applicable, play the next song in the queue when a given song ends */
		player.on('ended', queueNextSong);
		$('.frwrd-btn').click(function() {
			selectNextSong();
		});
		$('.back-btn').click(function() {
			selectPrevSong();
		});
	}

	function playSong(songTitle, songId) {
		clearTimeout(playNextSongTimeout); //if a song is queued to play, let the user's selection
										   //of song take precedence
		setPlayerSource(songTitle);
		player.play();
		makeSongInactive(currSongId);
		makeSongActive(songId);
		currSongId = songId;
	}

	function queueNextSong() {
		playNextSongTimeout = setTimeout(selectNextSong, 1000);
	}

	function selectNextSong() {
		var songNum = parseInt(currSongId);
		if (songNum < songs.length - 1) {
			var nextSongId = songNum + 1;
			selectSong(nextSongId);
		}
	}

	function selectPrevSong() {
		var songNum = parseInt(currSongId);
		if (songNum > 0) {
			var nextSongId = songNum - 1;
			selectSong(nextSongId);
		}
	}

	/* Simulates the user clicking on a song with songId */
	function selectSong(songId) {
		var nextSongHandle = songs.eq(songId).find('.song-handle');
		//simulate the user clicking the song with songId
		nextSongHandle.click();
	}

	function setPlayerSource(songTitle) {
		$('#music-player').attr('src', 'static/music/' + songTitle + '.mp3');
	}

	function makeSongActive(songId) {
		$('#' + songId).addClass('active');
		$('#' + songId).removeClass('inactive');
	}

	function makeSongInactive(songId) {
		$('#' + songId).addClass('inactive');
		$('#' + songId).removeClass('active');
	}

	/* Lyrics come back from the server with \n to indicate a new
	line. Rather than use white-space or the server to render the
	newlines, I decided to give this task to JS and use
	<br> elements to ensure the lyrics are displayed correctly */
	function addNewlinesToLyrics() {
		$('.lyrics-text').each(function() {
			var lyrics = $(this).text();
			//replace all \n with <br>
			var lyricsWithNewLines = lyrics.replace(/\n/g, '<br>');
			$(this).html(lyricsWithNewLines);
		});
	}

	function showOrHideLyrics(lyricsObj) {
		if (isHidden(lyricsObj)) {
			lyricsObj.slideDown({duration: 2000});
			scrollTo(lyricsObj);
		}
		else {
			lyricsObj.slideUp({duration: 2000});
		}
	}

	function isHidden(jqueryElem) {
		return (jqueryElem.css('display') === 'none');
	}

	/* Slowly scrolls the screen to jqueryElem */
	function scrollTo(jqueryElem) {
		$([document.documentElement, document.body]).animate({
        	scrollTop: jqueryElem.offset().top
    	}, 1000);
	}

	/* Unfortunately, jQuery animations add inline styles.
	Thankfully, it's really easy to clear those. Clears
	all the inline styles on an element to allow the originally
	intended CSS to take precedence. */
	function clearAnimationStyles(jQueryElem) {
		jQueryElem.attr('style', '');
	}

	function zoomSongHandle(songHandle, fontSize, opacity, duration) {
		if (songHandle.attr('id') != currSongId) {
			songHandle.animate({
				'font-size': fontSize,
				'opacity': opacity
			}, duration);
		}
	}

});