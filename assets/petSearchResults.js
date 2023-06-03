/**
 * JavaScript
 * Pet-Search 
 */
let zipCode = $("#navSearch");
let appendModal = $('.fa-search');
let initLoadState = '';
let divEl = '';
const animalDataFromIndex = {
    type : "",
    breed : "",
    
}
const userData = {
    zip : "",
    distance : "",
    fromTypeButton : "",
    newUrl : "",
    nextBtnUrl : "",
    backBtnUrl : "",
}
// Code for Modals
function modalAlert1(input) {
    divEl = $(`
    <div id="dialog" title="Format error" class="ui-widget rounded-1">
    <p>${input}.</p>
    </div>`);
    let someEl = divEl.insertAfter(appendModal);
    $("#dialog").dialog({
        modal: true,
        height: 200,
        draggable: true,
        autoOpen: false,
    show: {
        effect: "blind",
        duration: 500
      },
    hide: {
        effect: "explode",
        duration: 750
      },
    buttons: [{
        text: "Ok",
        click: function() {
        $( this ).dialog( "close" );
        },
        }],
    });
    $("#dialog").on("dialogclose", function(){
        $("#dialog").remove();   // remove dialog from DOM
    })
    $( "#dialog" ).dialog( "open" );
};
// Code for Modals
function modalAlert2(input) {
    divEl = $(`
    <div id="dialog" title="Input error" class="ui-widget rounded-1">
    <p>${input}.</p>
    </div>`);
    divEl.insertAfter(appendModal);
    $("#dialog").dialog({
        modal: true,
        height: 200,
        draggable: true,
        autoOpen: false,
    show: {
        effect: "blind",
        duration: 500
      },
    hide: {
        effect: "explode",
        duration: 750
      },
    buttons: [{
        text: "Ok",
        click: function() {
        $( this ).dialog( "close" );
        },
        }],
    });
    $("#dialog").on("dialogclose", function(){
        $("#dialog").remove();   // remove dialog from DOM
    });
    $( "#dialog" ).dialog( "open" );
};
// Code for Modals
function modalAlert3(input) {
    divEl = $(`
    <div id="dialog" title="Pet Info" class="ui-widget rounded-1">
    <h5>Contact:</h5>
    <p><li>${input.phone}</li><li>${input.email}</</li></p>
    </div>`);
    divEl.insertAfter(appendModal);
    $("#dialog").dialog({
        modal: true,
        height: 400,
        draggable: true,
        autoOpen: false,
    show: {
        effect: "blind",
        duration: 500
      },
    hide: {
        effect: "explode",
        duration: 750
      },
    buttons: [{
        text: "Ok",
        click: function() {
        $( this ).dialog( "close" );
        },
        }],
    });
    $("#dialog").on("dialogclose", function(){
        $("#dialog").remove();   // remove dialog from DOM
    })
    $( "#dialog" ).dialog( "open" );
};
// Code for Modals
function modalAlert4(input) {
    divEl = $(`
    <div id="dialog" title="Breed Info" class="ui-widget rounded-1">
    <h5><strong>${input[0].breed}</strong></h5>
    <p><i>Data & Origin:</i>
    <a href="#" title="This is an image of a cat">
    <img src="${input[0].img}" alt="${input[0].breed}">
    </a>
    <li>Weight:${input[0].meta.weight}</li>
    <li>Height:${input[0].meta.height}</li>
    <li>Coat:${input[0].meta.coat}</li>
    <li>Origin:${input[0].origin}</li>
    </p>
    </div>`);
    divEl.insertAfter(appendModal);
    $("#dialog").dialog({
        modal: true,
        height: 500,
        draggable: true,
        autoOpen: false,
    show: {
        effect: "blind",
        duration: 500
      },
    hide: {
        effect: "explode",
        duration: 750
      },
    buttons: [{
        text: "Ok",
        click: function() {
        $( this ).dialog( "close" );
        },
        }],
    });
    $("#dialog").on("dialogclose", function(){
        $("#dialog").remove();   // remove dialog from DOM
    })
    $( "#dialog" ).dialog( "open" );
};

/////////////////////code resused from index.js////////////////////////
// sets items in local storage
function setStorage(key, value){
    localStorage.setItem(key, value);
}
// saves auth key to local storage and checks its age
function authKeyExpired(){
    let currTimeStamp = Math.floor(Date.now() / 1000);
    let timeDiff = currTimeStamp - localStorage.exp;
    const expiryTime = 3600;
    if(timeDiff >= expiryTime){
        localStorage.removeItem('token');
        localStorage.removeItem('exp');
    }
    return (timeDiff >= expiryTime || localStorage.token === undefined);
};
async function getWikipediaApi(breed) {
    // encodeURIComponent will ensure the string is properly formated to go into the URL.
    let encodeBreed = encodeURIComponent(breed);
    let url = `https://dog-breeds2.p.rapidapi.com/dog_breeds/breed/${encodeBreed}`;
    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0d00143dfemshcfa11c25093ca9bp1442f9jsnf5e008afc921',
            'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
        }
    };
    try{
        let response = await fetch(url, options);
        if(response.ok){
            let data = await response.json();
            return data;
        }else{
            throw new Error('network response not ok');
        };
    }catch(error){
        console.log('Error:inside WikiApi', error);
    };
};
// gets a access token
async function getToken() {
    // confirmes authKey is valid, will call API for new key when needed
    if(authKeyExpired()){
    const clientId = 'Eohh2DT9tfvVJHhqcILMutCp65djOTin3jgP9yOznFSTNR5Nr8';
    const clientSecret = '77mOBQIaScP5uUxJw66mkNdWTBJ5wwQvrz5QXgdK';
    const tokenEndpoint = 'https://api.petfinder.com/v2/oauth2/token';
// "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}" https://api.petfinder.com/v2/oauth2/token
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);
// the URLSearchParams object, which allows you to create a URL-encoded string by appending key-value pairs. 
// The Content-Type header is set to 'application/x-www-form-urlencoded' which denotes the format of the data being sent in the request body, 
// then the request body is passed as a string using body.toString().
// When sending data in this format, JavaScript's 
// URLSearchParams() object is commonly used to construct the request body
// it provides an easy way to create and manipulate URL-encoded data.
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });
// Content-Type header is used to specify the MIME type (media type) of the data in the request or response body. 
// In the case of 'application/x-www-form-urlencoded', it indicates that the data is encoded as key-value pairs in a URL-encoded format.
// The Content-Type header of 'application/x-www-form-urlencoded' 
// is set to inform the server that the request body contains URL-encoded data, and the URLSearchParams() object is used to construct that data.
      if (response.ok) {
        const data = await response.json();
        let token = data.access_token;
        setStorage('token', token);
        let expiration = Math.floor(Date.now() / 1000);
        setStorage('exp', expiration);
        console.log('Everything OK ' + "BeginTimeStamp: " + expiration);
      }else {
        throw new Error('Network response not OK');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    }else {
        return;
    };
};
// async function to get pet data (this should be integrated with getToken() because they are dependencies) but not reliant upon other functions
async function getAnimals(type) {      // this function will need to be modified later to accomodate search results
    const url = `https://api.petfinder.com/v2/${type}`;
    try{
    // since token must be check against time, we need to call getToken() here (we are using persistant data for the key)
    await getToken();
    let response = await fetch(url,{
      headers:{
        Authorization: `Bearer ${localStorage.token}`, 
        }
    });
    if(response.ok) {
        let data = await response.json();
        return data;
    }else{
        throw new Error('Network not OK in getAnimals');
    }
    }catch(error){
    console.log('Error: in Type data ', error);
    };
};
async function getData(type){
    // do not want getToken() to be here or it will mess up the flexibility of the code *CLEAN CODE* is the goal
        try{
            let data = await getAnimals(type);
            return {data, type};
        }catch(error){
            console.log('Error', error);
        };
};
// get data from search bar
function parseSearchBar(){
    // gets url data
    let windowData = document.location.href.split('?')[1];
    // splits for testing
    windowData = windowData.split('=');
    if(windowData.length == 2){
        // joins for parsing
        windowData = windowData.join('=');
        // sets animal object data
        animalDataFromIndex.type = windowData;
        initLoadState =  `animals?${animalDataFromIndex.type}`;
    }else if(windowData.length == 4){
        // joins for parsing
        windowData = windowData.join('=');
        // matches all occurrences of "%20" in the string. The g flag indicates a global search, it will replace all instances of "%20" instead of just the first occurrence.
        windowData = windowData.replace(/%20/g, " ");
        windowData = windowData.replace(/breed=/g, "");
        windowData = windowData.replace(/#/g,"");
        windowData = windowData.split('&');
        // sets animal object data
        animalDataFromIndex.type = windowData[0];
        animalDataFromIndex.breed = windowData[1];
        // sets user zip object data
        userData.zip = windowData[windowData.length-1];
        initLoadState = `animals?${animalDataFromIndex.type}&${userData.zip}&distance=100&sort=-distance`;
    };
    
};
function searchByDistance(){
    $('.distance').click(function(event){
        userData.distance = event.target.innerText;
        if(/miles/.test(userData.distance)){
            userData.distance = userData.distance.replace(/miles/g, "").trim();
            userData.distance = `distance=${userData.distance}`;
            console.log(userData.distance);
        }
        if (userData.distance == 'Any'){
            userData.distance = 'distance=500'
        };
    });
};
function searchByType(){
    $('.types').click(function(event){
        let type = event.target.innerText;
        if (type){
            // set object data from type dropdown button
            userData.fromTypeButton = `type=${type.slice(0, type.length-1).toLowerCase()}`;
        };
        }
    );
};
// get data from zipcode
function getNewZipCode(){
    $("#zip").on('click', function(event){
        event.preventDefault();
        if(isNaN(zipCode.val()) || zipCode.val().length != 5 || zipCode.val() == null){
            let alertMsg1 = 'invalid zip format';
            modalAlert1(alertMsg1);
        }else{
            userData.zip = `location=${zipCode.val().trim()}`;
            updateUrl();
            userData.newUrl = localStorage.getItem('ApiUrl');
            generateContent(userData.newUrl);
        };
    }); 
};
// update the url
function updateUrl(){
    if(userData.distance != "" && userData.fromTypeButton != ""){
        let newSearch = `animals?${userData.fromTypeButton}&${userData.zip}&${userData.distance}&sort=-distance`;
        setStorage('ApiUrl', newSearch);
    }else{
        let alertMsg2 = 'Please complete all feilds';
        modalAlert2(alertMsg2);
    };
};
// dynamically generate the page
function makeTheWholePage(search){
    $('#pets').empty();
    let firstDiv = $(`<div class="container"></div>`);
    $('#pets').append(firstDiv);
    let secondDiv = $(`
    <div id="container" class="section-title text-center">
        <h2>Pets needing a home</h2>
        <hr>
    </div>`);
    $(firstDiv).append(secondDiv);
    generateContent(search);
}
// generate the pets
function generateContent(search){
    // generate content on page load
    let contentRow = $('<div class="row"></div>');
    contentRow.insertAfter($('#container'));
    getData(search).then(function(data){
        for(let i = 0; i <= data.data.animals.length-1; i++){
            let checkImg = data.data.animals[i].photos && data.data.animals[i].photos.length ? data.data.animals[i].photos[0].medium : "assets/secondaryAssests/image/ime-5.jpeg";
            let petContent = ` 
            <div class="col-lg-3 col-sm-6 col-xs-12">
            <div class="our-team my-2">
            <img src="${checkImg}" alt="${data.data.animals[i].name}">
            <div class="team-content">
            <h3 class="title">${data.data.animals[i].name}</h3>
            <span class="post">${data.data.animals[i].status}/${data.data.animals[i].gender}</span>							
            <ul class="social">
            <button class="contactInfo fa fa-phone" data-value="${data.data.animals[i].contact.email}/${data.data.animals[i].contact.phone}"></button>
            <button class="breedInfo fas fa-info-circle" data-value="${data.data.animals[i].breeds.primary}"></button>
            </ul>
            </div>
            </div>
            </div>`
            contentRow.append(petContent);
            petContent = contentRow;
        };
        userData.nextBtnUrl = data.data.pagination._links.next && data.data.pagination._links.next.href ? data.data.pagination._links.next.href : "";
        userData.backBtnUrl = data.data.pagination._links.previous && data.data.pagination._links.previous.href ? data.data.pagination._links.previous.href : "";
    $(".contactInfo").click(function(event){
        event.stopPropagation();
        let info = event.target.dataset.value;
        info = info.replace(/ /, '-');
        info = info.split('/');
        contactInfo = {
            phone : info[1],
            email : info[0]
        };
        modalAlert3(contactInfo);
    })
    $(".breedInfo").click(function(event){
        let breedData = event.target.dataset.value;
        if (breedData == 'German Shepherd Dog'){
            breedData = breedData.replace(/Dog/g, '').trim();
            callWikiApi(breedData);
            return;
        }else if( breedData == 'Chocolate Labrador Retriever'){
            breedData = breedData.replace(/Chocolate/g, '').trim();
            callWikiApi(breedData);
            return;
        }else if(breedData == 'Anatolian Shepherd' ){
            breedData = breedData.replace(/Anatolian Shepherd/g,'Kangal Shepherd').trim();
            callWikiApi(breedData);
            return;
        }else if(breedData == 'Mixed Breed' ){
            let input=[{img:"https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"}];
            callWikiApi(input);
            return;
        };
        callWikiApi(breedData);
    });
    });
};
function callWikiApi(breed){
    getWikipediaApi(breed).then(function(data){
        modalAlert4(data);
})};
// function that grabs the 'next page/previous buttons' and calls makeTheWholePage() and passes it the next page url from the api
function changePage(){
    $('.nextBtn').click(function(){
        if(userData.nextBtnUrl != null){
        userData.nextBtnUrl = userData.nextBtnUrl.replace(/\/v2/g,'').trim();
        makeTheWholePage(userData.nextBtnUrl);
        };
    });
    $('.previousBtn').click(function(){
        if(userData.nextBtnUrl != null){
        userData.backBtnUrl = userData.backBtnUrl.replace(/\/v2/g,'').trim();
        makeTheWholePage(userData.backBtnUrl);
        };
    });
};
function init(){
    parseSearchBar();
    searchByDistance();
    searchByType();
    getNewZipCode();
    makeTheWholePage(initLoadState);
    changePage();
};

document.addEventListener('DOMContentLoaded', init());

