var viewportW = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var selectedAlbum = {};


for (var i = 0; i < albumList.length; i++) { 
	$("#albumList").append('<div class="item"><div class="smallOverlay"></div><img class="image"><div class="info"><div class="album"></div><div class="artist"></div></div></div>'); 	
	albumList[i].image = "http://chazu.arkku.net/misc/musicList/pics/powermetal/" + albumList[i].image + ".jpg";
	$('.artist').eq(i).text(albumList[i].artist); 
	$('.album').eq(i).text(albumList[i].album); 			
	$('.image').eq(i).attr('src', albumList[i].image);
}  



$('#albumList').delegate('.item', 'click', function () {
	var i = $(this).index();
	selectedAlbum = albumList[i];
	console.log(selectedAlbum);
	
	$('#bigAlbum').attr('src', selectedAlbum.image); 
	$('#albumName').text(selectedAlbum.album);
	$('#artistName').text(selectedAlbum.artist);
	$('#year').text(selectedAlbum.year);
	
	$('#trackList').empty();
	
	for (let j = 0; j < selectedAlbum.trackList.length; j++) {
		var trackName = selectedAlbum.trackList[j].name;
		var trackNum = j + 1;
		var trackDur =  selectedAlbum.trackList[j].dur;	
		if (trackDur.length < 5) {
			trackDur = "0"+trackDur;
		}
		$("#trackList").append('<div class="trackListItem"><div class="smallPlayIcon"></div><span class="trackNum">'+trackNum+'. </span>'+'<span class="trackName">'+trackName+'</span>'+'<span class="trackDuration">'+trackDur+'</span></div>');
	}  	
	
	$('#playAlbumButton').css('visibility','visible');
	$('#bigAlbum').css('visibility','visible');
	$('#splitterContainer').css('visibility','visible');
	
	$('#trackList').undelegate('.trackListItem', "click"); //remove previous click listeners 
	
	$('#trackList').delegate('.trackListItem', "click", function () {			
		var trackIndex = $('.trackListItem').index(this);

		var query = selectedAlbum.artist + " " + selectedAlbum.trackList[trackIndex].name;	
		query = query.replace(/[\s]|[.]|[,]|[(]|[)]|[']/g, "+"); //replace charcaters ans whitespaces with +		
		query = "https://www.youtube.com/results?search_query=" + query;
		window.open(query, '_blank');
	});
	
	checkSmallView();
});


$('#bigAlbum, #playAlbumButton, #bigOverlay').click(function() { 
	if (selectedAlbum.hasOwnProperty("searchQuery")) {
		window.open(selectedAlbum.searchQuery, '_blank');
	}	
});

var checkSmallView = function() {
	var x = $(this).width(), 
		y = $(this).height();
			
		
		if (!($('#trackList').is(':empty'))){
			
			$('.trackName', $('#trackList')).each(function (i) {
				var name = selectedAlbum.trackList[i].name;
				if (x < 800) {
					if (name.length > 20) {
						var shortname = name.substring(0, 20) + " ...";
						$(this).text(shortname);
					}				
				} else {
					$(this).text(name);
				}
			});	
			
		}
		
}

$(window).on('resize', function(e) {
	checkSmallView();
});

if (viewportW < 800) {
	checkSmallView();
}








