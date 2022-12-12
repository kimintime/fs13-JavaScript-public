/*Global variables are set for the JSON object that handles the search results for all movies, and the JSON object that handles specific titles. 
I decided to keep these two separate. The index counter for number of pages of results is also global, given
how many functions need access to it, as well the scroll position tracker, to go back to where you were on the page when you close out the 
search results.*/

let jsonObj;
let jsonObj2;
let scrollPos;
let index = 1;

//Listens for the enter key, modified to work on mobile devices.

document.addEventListener("keyup", function (event) {
    if (event.code === 'Enter') {

        index = 1;
        mainSearch(index);

        //Makes the keyboard popup go back down on mobiles and tablets
        document.activeElement.blur();
    }
});

/*Listens for the click on the search input and goes to the mainSearch function, passing along the index counter, which is reset to 1 here again as an
ounce of prevention.*/

document.getElementById('mySearch').addEventListener('click', function () {

    index = 1;
    document.activeElement.blur();

    mainSearch(index);
});

/*JQuery animation for the Scroll to Top button, such that it scrolls smooth and slow. Animations aren't my thing, and I find I get them working better in
JQuery, even if JQuery is also not really my thing.*/

$(document).ready(function() {
    
    $(window).scroll(function() {
        
        if ($(this).scrollTop() > 20) {
            
            $('#toTopBtn').fadeIn();

        } else {
            
            $('#toTopBtn').fadeOut();
        }
    });

    $('#toTopBtn').click(function() {

        $("html, body").animate({
        
            scrollTop: 0

        }, 1000);
    
    return false;
    
    });
});


//Accepts the input from the search bar, sending that value to the JSON parser, to then return the results.

function mainSearch() {

    /*Hides the revelant tags so that there's no leftover styling in between new searches.*/

    let url, xmlhttp;

    let x = document.getElementById("hide");
    x.style.display = "none";

    let y = document.getElementById("results");
    y.style.display = "none";

    let country = document.getElementById("myInput").value;

    //Added this innerHTML to clear some styling from previous searches.    
    document.getElementById('content').innerHTML = "";

    if (!country) {

        url = 'https://restcountries.com/v2/all';
        xmlhttp = new XMLHttpRequest();
        

    } else {

        //Resets the look of the input field.
        document.getElementById("myInput").classList.remove('input-placeholder-false');
        document.getElementById("myInput").style.border = "none";
        document.getElementById("myInput").placeholder = "Enter your country search here...";

        document.getElementById("myInput").value = "";

        url = `https://restcountries.com/v2/name/${country}`
        xmlhttp = new XMLHttpRequest();
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            x = document.getElementById("hide");
            x.style.display = "";

            //If there's no values returned in the results, the page defaults to this.
            x.innerHTML = "<h1>No Results Found</h1>";

            y = document.getElementById("footer");
            footer.innerHTML = "";

            jsonObj = JSON.parse(xmlhttp.responseText);

            mainResults(jsonObj);

        }
    }
}

/*Queries Restcountries for results of the specific country clicked on from the search results. Then passes that object 
to the showCountry function for parsing of the JSON object.*/

function countrySearch(country) {

    let code = country;

    const url = `https://restcountries.com/v2/alpha/${code}`;
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {

        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            jsonObj2 = JSON.parse(xmlhttp.responseText);

            //console.log(xmlhttp.responseText);

            showCountry(jsonObj2);
        }
    }
}

/*Basically parses the JSON object of search results and displays them on the page.*/

function mainResults(jsonObj) {

    const data = jsonObj;
    let endRow = '</div>';
    let list = '<div class="row d-flex justify-content-center">';

    //Sets up the div to display the results
    var x = document.getElementById("hide");
    x.style.display = "";

    //Iterates through the search results and formats the HTML.
    for (let i = 0; i < data.length; i++) {

        list += '<div class="col-md-4 text-center results"><h3>' + data[i].name + '</h3>';
        list += '<ul class="countrylist">';
        list += '<li><b>Capital:</b> ' + data[i].capital + '</li>';
        list += '<li><b>Region:</b> ' + data[i].region + '</li>';
        list += '</ul>';

        if (data[i].flags.png !== null) {

            //console.log(data[i].flags.png)

            let flag = data[i].flags.png

            //console.log(`<img class='thumbnail' src=${flag}</img></br>`)

            list += `<img class='thumbnail' src='${flag}'</img></br>`
            list += '<button type="button" class="btn btn-success">More</button>' + endRow;

        } else {

            list += '</br><button type="button" class="btn btn-success">More</button>' + endRow;
        }
    }

    //Prints out the HTML to the div.   
    document.getElementById("hide").innerHTML = list + endRow;

    /*Sets up the More buttons, iterates through them, returns the given id to the countrySearch function to query for 
    the correct country. JQueary for animation to scroll to that div, to more easily see the results.*/

    const buttons = document.getElementsByClassName("btn-success");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (i) {
            scrollPos = $(window).scrollTop();

            document.getElementById("results").style.display = "";

            let country = data[i].alpha3Code;

            countrySearch(country);

            $('html, body').animate({ 
                scrollTop: $("#results").offset().top, 
            });

    /*Without this bind, the event listener was blissfully unaware of the i counter, and it's needed to match the right 
    button click to the right IMDB ID. Credit to Stack Overflow.*/

        }.bind(null, i));
    }

    const posters = document.getElementsByClassName("thumbnail");

    for (let i = 0; i < posters.length; i++) {

        posters[i].addEventListener("click", function (i) {
            scrollPos = $(window).scrollTop();

            document.getElementById("results").style.display = "";

            let country = data[i].alpha3Code;

            countrySearch(country);

            $('html, body').animate({
                scrollTop: $("#results").offset().top
            });

        }.bind(null, i));
    }
}

//Parses the JSON object that contains the results for a given country, and formats the HTML.

function showCountry(jsonObj2) {

    const data = jsonObj2;
    let endRow = '</div>';
    let text = '<div class="col-md-8">';
    let img = '<div class="col-md-4">';

    //console.log(data.name)

    let y = document.getElementById("results");
    y.style.display = "";

    text += '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    text += '<h3>' + data.name + '</h3>';
    text += '<ul>';
    text += '<li><b>Capital:</b> ' + data.capital + '</li>';
    text += '<li><b>Region:</b> ' + data.region + '</li>';
    text += '<li><b>Subregion:</b> ' + data.subregion + '</li>';
    text += '<li><b>Population:</b> ' + data.population + '</li>';
    text += '<li><b>Area:</b> ' + data.area + '</li>';
    text += '<li><b>Timezones:</b></br>';

    for(let i = 0; i < data.timezones.length; i++) {
        text += '<p> ' + data.timezones[i] + '</p></li>';
    }

    text += '<li><b>Currency:</b></br>';

    for(let i = 0; i < data.currencies.length; i++) {
        text += '<p> ' + data.currencies[i].name + '</p></li>';
    }

    text += '<li><b>Languages:</b></br>';

    for(let i = 0; i < data.languages.length; i++) {

        text += '<p> ' + data.languages[i].name + '</p></li>';
    }

    text += '</ul>';
    text += endRow;
    
    const flag = data.flags.png

    if(data.Poster !== null) {
        text += img+`<img class='full' src='${flag}'</img></br>`;
    } else {
        text += img + endRow;
    }
    
    //Sets up the divs to display the results
    document.getElementById('content').style.display = "";
    document.getElementById('content').innerHTML = text;

     //console.log(document.getElementById('content').innerHTML);
    
    //Handles the close button for the results
    
    const close = document.querySelectorAll(".close");
    
    for(let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", function(i) {
            
            document.getElementById('content').innerHTML = "";
            
            let y = document.getElementById("results");
            y.style.display = "none";

            console.log(scrollPos)

            setTimeout(
                function() {
                  $('html, body').animate({
                    scrollTop: scrollPos
                  }, 500);
                }, 1000);

        }.bind(null, i));
    }   
}