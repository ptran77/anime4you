// function to list of anime of a genre using Jikan API
function getGenre(genreId){
    let apiUrl = "https://api.jikan.moe/v4/anime?genres=" + genreId;
    
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function (data) {

                // clear genre list
                $("#genre-list").text("");
                console.log(data.data);
                // display anime to genre list
                displayAnimeList(data.data,$("#genre-list"),10);
            })
        }
    })
}

// Dropdown trigger
$('.dropdown-trigger').dropdown();

// Event Listener to call Genre Anime Info
$("#genre-dropdown").on('click', ".genre" ,function(){
    getGenre(this.getAttribute("data-number"));
})

// Event Listener to display Anime info from an anime in Genre List
$("#genre-list").on("click", ".card", function(){
    searchAnime($(this).find(".card-content").find(".card-title").text())
})