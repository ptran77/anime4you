var animeSearchEl = document.querySelector("#search-anime");
var animeTitleInput = document.querySelector("#anime-search-input")
var mangaCheck = false;


function searchAnime(anime) {
  // API call 
  var apiUrl =  "https://api.jikan.moe/v4/anime?q=" + anime + "&page=1"
// API fetch
  fetch(apiUrl).then(function(response) {
    $("#load-info").removeClass("display-off");
    $("#anime-modal-info").addClass("display-off");
    if(response.ok){
      response.json().then(function(data){
          // below is the jQuery that adds the modal displaying the info from the jikan API
        $("#noAnime").addClass("display-off");

        $("#animeTitle").text(data.data[0].titles[0].title);
        $("#synopsis").text(data.data[0].synopsis);
        $("#animeImg").attr("src", data.data[0].images.jpg.image_url);
        $("#add-anime").removeClass("display-off");
        
        $("#load-info").addClass("display-off");
        $("#anime-modal-info").removeClass("display-off");


        $("#manga").text("");
        $("#recommend-section").addClass("display-off");
        $("#no-recommended").addClass("display-off");
        
        $("#load-manga").removeClass("display-off");

        $("#load-recommend").removeClass("display-off");
        $("#manga").addClass("display-off");
        $("#no-recommended").addClass("display-off");
        $("#recommend-section").addClass("display-off");

        gotManga(data.data[0].titles[0].title);
        animeRecommender(data.data[0].mal_id);
        })
    } else {
      $("#animeTitle").text("");
      $("#synopsis").text("");
      $("#animeImg").attr("src", "");
      $("#add-anime").addClass("display-off");

      $("#manga").text("");
      $("#noAnime").removeClass("display-off");
      $("#recommend-section").addClass("display-off");
      $("#no-recommended").addClass("display-off");

      $("#load-info").addClass("display-off");
      $("#anime-modal-info").removeClass("display-off");

      }
      })
    };
    
// filters throgh anime's info to see if there is a manga as  well
function gotManga(name) {    
  var apiUrl =  "https://api.jikan.moe/v4/manga?q=" + name + "&page=1";
      
  fetch(apiUrl).then(function(response) {
    if(response.ok){
      response.json().then(function (data) {

      if (data.data.length > 0) {
        $("#manga").text("Has a manga")
      } else {
        $("#manga").text("Does not have Manga");
      }

      $("#load-manga").addClass("display-off");
      $("#manga").removeClass("display-off");

      })
    }
  })
};

function displayRecommended(animeList) {
  let reclist = $("#recommendation-list");
  reclist.text("")
  for (let i = 0; i < 3; i++) {


    let animeCard = document.createElement("div");
    animeCard.setAttribute("class","card orange lighten-4");
    let cardInfo = document.createElement("div");
    cardInfo.setAttribute("class","card-content");
    cardInfo.style.padding = "5px";
    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", animeList[i].entry.images.jpg.image_url);
    let cardTitle = document.createElement("span");
    cardTitle.setAttribute("class","card-title");
    cardTitle.textContent = animeList[i].entry.title;
    cardInfo.appendChild(cardImg);
    cardInfo.appendChild(cardTitle);
    animeCard.appendChild(cardInfo);

    // add to top anime list
    reclist.append(animeCard);
  }

}


function animeRecommender(title) {
  // api call to the jikan recommender
  var apiCall = 'https://api.jikan.moe/v4/anime/' + title + '/recommendations';
 
  fetch(apiCall).then(function(response) {
    if(response.ok) {
      response.json().then(function (data) {

        if (data.data.length == 0) {
           
          $("#load-recommend").addClass("display-off");
          $("#no-recommended").removeClass("display-off")
        } else {
             
          displayRecommended(data.data);
          $("#load-recommend").addClass("display-off");
          $("#recommend-section").removeClass("display-off")
        }

        }) 
      }
    })
    
};

// event listener allowing the client to click on the anime's card taking them to a modal displaying the anime they clicked
$("#recommendation-list").on("click", ".card", function(){
  searchAnime($(this).find(".card-content").find(".card-title").text())
})

// uses materializecss modal form to display User requested anime info
$(document).ready(function(){
  $('.modal').modal();
});
// event listener for the search button linked to the input area
animeSearchEl.addEventListener("click", function() {
  searchAnime(animeTitleInput.value);
})