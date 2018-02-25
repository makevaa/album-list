for(var i = 0; i < itemCount; i++) { // Create empty html elements for each track in the list
	$("#albumList").append('<div class="item"><div class="smallOverlay"></div><img class="image"><div class="info"><div class="album"></div><div class="artist"></div></div></div>'); 
}  

$('.item').each(function(i, obj) {
	var curArtist = albumList[i].artist;
	var curAlbum = albumList[i].album;
	var curYear = albumList[i].year;
	var curImage = albumList[i].image;
	var curCountry = albumList[i].country;	

	$('.artist').eq(i).text(curArtist); 
	$('.album').eq(i).text(curAlbum); 	
		
	var fullImageSrc = "http://chazu.arkku.net/misc/musicList/pics/powermetal/" + curImage + ".jpg";
	$(".image").eq(i).attr({ 'src':fullImageSrc});
		
	var curSearchQue = albumList[i].searchQue;
	fullSearchQue = "https://www.youtube.com/results?search_query=" + curSearchQue;
});


var searchQue;
var idArr = [];

$('.item').click(function() { 
	var i = $(this).index();
	var imgSrc = $('.image').eq(i).attr('src');
	$('#bigAlbum').attr('src', imgSrc); 
	
	$('#albumName').text(albumList[i].album);
	$('#artistName').text(albumList[i].artist);
	$('#year').text(albumList[i].year);
	searchQue = albumList[i].searchQue;
		
	$('#trackList').empty();
	
	idArr.length = 0;
	
	var trackAm = albumList[i].trackAmount;
	
	for(var i2 = 0; i2 < trackAm; i2++) {
		var trackName = albumList[i].trackList[i2].name;
		var trackNum = i2 + 1;
		var trackDur =  albumList[i].trackList[i2].dur;	
		$("#trackList").append('<div class="trackListItem"><div class="smallPlayIcon"></div><span class="trackNum">'+trackNum+'. </span>'+'<span class="trackName">'+trackName+'</span>'+'<span class="trackDuration">'+trackDur+'</span></div>');		
		idArr.push(albumList[i].trackList[i2].id);
	}  
	
	
	$('#playAlbumButton').css('visibility','visible');
	$('#bigAlbum').css('visibility','visible');
	$('#splitter').css('visibility','visible');
	
	
	$('.trackListItem').click(function() { 
		var indexTL = $(this).index();
		
		//reset the tracklist style for all items		
		$('.trackListItem').removeClass("selectedTrack");
		
		console.log("trackListItem clicked.");
		var artist = $('#artistName').text();
		var track = $('.trackName').eq(indexTL).text();
		
		var result = artist + " " + track;	
		result = result.replace(/\s/g, "+");  // Replace whitespace with "+"
		var specRegex = /[.]|[,]|[(]|[)]|[']/g; // The symbols inside the [] brackets are matched
		result = result.replace(specRegex, "+"); // and replaced with "+"
		
		if (result.substring(result.length-1) == "+") { // If last symbol ends up being "+", remove it
			result = result.substring(0, result.length-1);
		}	
		
		var result = "https://www.youtube.com/results?search_query=" + result;
		window.open(result,'_blank');
	});
});


$('#bigAlbum, #playAlbumButton, #bigOverlay').click(function() { 
	window.open(searchQue,'_blank');
});
