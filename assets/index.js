/**
 * JavaScript Pet-Seacrh
 * index.html JacaScript
 */
// get vars from index
let searchBarDropMenu = $('#search-type');
let zipCode = $('#zipcode'); 
let searchByType = $("#navSearch")  // search by Dog/cat/horse/bird/rabbit from dropdown
let navSearchBtn =$("#navSearchBtn") // search by type in navbar
let initVal = 'Dog'
let navEl = $('#navbarSupportedContent')
let zip = 0
let breed = null
// Modal alert box taken from jQuery UI examples
function modalAlert() {
    let divEl = $(`
    <div id="dialog" title="Input error" class="ui-widget rounded-1">
    <p>Input invalid please retry.</p>
    </div>`)
    divEl.insertAfter(navEl)
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
          // Uncommenting the following line would hide the text,
          // resulting in the label being used as a tooltip
          // showText: true,
        }],
    });
    $("#dialog").on("dialogclose", function(){
        $("#dialog").remove()   // remove dialog from DOM
    })
    $( "#dialog" ).dialog( "open" );
};
// sets items in local storage
function setStorage(key, value){
    localStorage.setItem(key, value)
}
// saves auth key to local storage and checks its age
function authKeyExpired(){
    let currTimeStamp = Math.floor(Date.now() / 1000);
    let timeDiff = currTimeStamp - localStorage.exp
    const expiryTime = 3600;
    if(timeDiff >= expiryTime){
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
    }
    return (timeDiff >= expiryTime || localStorage.token === undefined);
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
        let token = data.access_token
        setStorage('token', token)
        let expiration = Math.floor(Date.now() / 1000)
        setStorage('exp', expiration)
        console.log('Everything OK ' + "BeginTimeStamp: " + expiration)
        //return token;
      } else {
        throw new Error('Network response not OK');
      }
    } catch (error) {
      console.log('Error:', error);
    }
    }else {
        return
    }
}
// async function to get pet data (this should be integrated with getToken() because they are dependencies) but not reliant upon other functions
async function getAnimals(type) {      // this function will need to be modified later to accomodate search results
    const url = `https://api.petfinder.com/v2/types/${type}/breeds`
    try{
    // since token must be check against time, we need to call getToken() here (we are using persistant data for the key)
    await getToken();
    let response = await fetch(url,{
      headers:{
        Authorization: `Bearer ${localStorage.token}`, 
        }
    })
    if(response.ok) {
        let data = await response.json();
        //console.log(data)
        return data
    }else{
        throw new Error('Network not OK in getAnimals')
    }
    }catch(error){
    console.log('Error: in Type data ', error)
    }
}
async function getData(type){
    // do not want getToken() to be here or it will mess up the flexibility of the code *CLEAN CODE* is the goal
        try{
            let adoptionData = await getAnimals(type);
            return {adoptionData, type}
        }catch(error){
            console.log('Error', error)
        }
}
// this code turns this function into one that returns uses the promise object 
// this is done so it can be chained
function getDataFromNavDropDown(event){
    return new Promise(function(resolve){
        let type = event.target.innerText
        if (type){
            type = type.slice(0, type.length-1)
            initVal = type
            resolve(type)
        }
    })
}

// updates the maind drop menu with avaliable anaimals
function updateDropMenu(adoptionData, type){
    searchBarDropMenu.empty()
    let firstOption = $(`<option value="" disabled selected>${type} breeds</option>`);
    searchBarDropMenu.append(firstOption);
// this was a different way i had to figure out, cause accessing the array
// directly with a for loop didnt work for some reason
    adoptionData.breeds.forEach((breed) => {
    let nextOption = $(`<option class="breedOption" value="${breed.name}">${breed.name}</option>`);
    nextOption.insertAfter(firstOption);
    firstOption = nextOption;
});
}

function returnAvaliableBreeds(){
        $('#search-type').on('change', function(){
            //resolve(searchBarDropMenu.val())
            breed = searchBarDropMenu.val()
            console.log(breed)
            handleSearchResults()
        })
}

function getZipCode(){
        $("#zip").on('click', function(event){
            event.preventDefault()
            if(isNaN(zipCode.val()) || zipCode.val().length != 5 || searchBarDropMenu.val() == null){
                modalAlert()
            }else{
                zip = zipCode.val()
                handleSearchResults()
            }
        }) 
}
// added event handler to class='dropdown-item' and chain function calls
// getDataFromNavDropDown function creates and returns a new promise 
// that resolves with the extracted type. In the click event handler, 
// the resolved type is passed to the getData function using the then() method. 
// Finally, the adoptionData is logged to the console.
function navBarTypeSearch(){
    $('.dropdown-item').click(function(event){
        getDataFromNavDropDown(event)
        //pass a callback function to then().
        .then(function(type){
            return getData(type)
        })
        .then(function(data){
            updateDropMenu(data.adoptionData, data.type)
            console.log(data.adoptionData, data.type)
        })
        }
    )
}
function navBarTextSearch(){
    return new Promise(function(resolve){
        navSearchBtn.click(function(event){
        event.preventDefault()
        let searchVal = searchByType.val().toLowerCase().trim() // fix it if user input is plural
        if(searchVal[searchVal.length-1] == 's'){
            searchVal = searchVal.slice(0,-1)
        }
        if(searchVal == 'cat' || searchVal == 'dog' || searchVal =='horse' || searchVal == 'bird' || searchVal == 'rabbit'){
                resolve(searchVal);
        }else{
                modalAlert(event)
            }
        })
    })
}
function changePage(url){
    window.location.href = url
}
function handleSearchResults(data){

    if(data === 'cat' || data === 'dog' || data === 'horse' || data === 'bird' || data === 'rabbit' ){
        let go1 = `./petSearchResults.html?type=${data}` // has to be in this format or it wont work
        changePage(go1)
    }
    if((initVal === 'Cat' || initVal === 'Dog' || initVal === 'Horse' || initVal === 'Bird' || initVal === 'Rabbit') && /^[0-9]{5}$/.test(zip)){
        let go2 = `./petSearchResults.html?type=${initVal}&breed=${breed}&location=${zip}`
        changePage(go2)
    }
}
function init(type){
    getData(type)
    .then(function(data){
        updateDropMenu(data.adoptionData, data.type)
        console.log(data.adoptionData, data.type)
        })
    navBarTypeSearch()  
    navBarTextSearch().then(handleSearchResults) // returns cats/dogs/horses/birds/rabbits
    getZipCode()  
    returnAvaliableBreeds()    
}

 document.addEventListener('DOMContentLoaded', init(initVal))