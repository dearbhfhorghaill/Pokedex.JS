const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'Pokemon_Logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

let request = new Request('https://pokeapi.co/api/v2/pokemon/')
let count = 0
var current_page = 1
var records_per_page = 21
var objJson = []

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page) {
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    container.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < count; i++) {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')
        const h1 = document.createElement('h1')
        h1.className = "pokemon_title"
        const p = document.createElement('p')
        p.className = ""
        const pImg = document.createElement('img')
    
        fetch(objJson[i].url)
            .then((resp) => resp.json())
            .then(function(pokeData) {
    
                //Set Pokemon's name
                var pokeName = ''
                if (!!pokeData.species.name) {
                    pokeName = pokeData.species.name
                }
                else {
                    pokeName = objJson[i].name
                }
                h1.textContent = capitaliseFirstLetter(pokeName)
    
                //Set Pokemon's type
                var types = []
                var prettyTypes = ''
                pokeData.types.forEach(function(t, idx, array) {
                    types.push(t.type.name)
                    prettyTypes += capitaliseFirstLetter(t.type.name)
                    if (idx != array.length - 1) {
                        prettyTypes += ' / '
                    }
                })
                p.textContent = `${prettyTypes}`
    
                //Set Pokemon's sprite
                pImg.src = pokeData.sprites.front_default

                //Set background type colours
                console.log("TYPE COLOURS: " + types)
                setTypeColours(types, h1)
            })
    
            // Append the cards to the container element
            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(pImg)
            card.appendChild(p)
    }
    page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / records_per_page);
}

function setTypeColours(types, h1) {
    //Requires NodeJS to work - porting to React version
    // var typeColours = [];
    // const MongoClient = require('mongodb').MongoClient;
    // const uri = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.imrmz.mongodb.net/pokedex?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //     const collection = client.db("pokedex").collection("types");
    //     types.array.forEach(element => {
    //        typeColours.push(collection.find({_id:element}, {type:1, _id:0})) 
    //     });
    //     console.log("DB COLOURS: " + typeColours)
    //     if (typeColours.length == 1) {
    //         typeColours.push(typeColours[0]);
    //     }
    //     h1.style.background = `linear-gradient(120deg, ${typeColours[0]}, ${typeColours[1]})`;
    //     client.close();
    // });
}

window.onload = function() {
    fetch(request, {mode: 'cors'}) 
    .then((resp) => resp.json())
    .then(function(data) {

        count = data.count
        let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=' + count
        let pokeRequest = new Request(pokeUrl)

        fetch(pokeRequest, {mode: 'cors'})
            .then((resp) => resp.json())
            .then(function(data) {

            objJson = data.results
            changePage(1);
        })
        .catch(function(error) {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = error
            app.appendChild(errorMessage)
        })
    })
};