const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'Pokemon_Logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

fetch('https://pokeapi.co/api/v2/pokemon/') 
    .then((resp) => resp.json())
    .then(function(data) {
        data.results.forEach(pokemon => {
            // Create a div with a card class
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            // Create an h1 and set the text content to the Pokemon's name
            const h1 = document.createElement('h1')
            h1.textContent = capitaliseFirstLetter(pokemon.name)

            // Create a p and set the text content to the Pokemon's type(s)
            const p = document.createElement('p')
            fetch(pokemon.url)
                .then((resp) => resp.json())
                .then(function(pokeData) {
                    var prettyTypes = ''
                    pokeData.types.forEach(function(t, idx, array) {
                        prettyTypes += capitaliseFirstLetter(t.type.name)
                        if (idx != array.length - 1) {
                            prettyTypes += ' / '
                        }
                    })
                    p.textContent = `${prettyTypes}`
                })

            // Append the cards to the container element
            container.appendChild(card)

            // Each card will contain an h1 and a p
            card.appendChild(h1)
            card.appendChild(p)
        })
    })
    .catch(function(error) {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    })

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// Create a request variable and assign a new XMLHttpRequest object to it.
//var request = getRequestWithURL('https://pokeapi.co/api/v2/pokemon/')
//request.onload = function() {
//     // Begin accessing JSON data here
//     if (request.status >= 200 && request.status < 400) {
//         var data = JSON.parse(this.responseText)
//         data.results.forEach(pokemon => {
//             // Create a div with a card class
//             const card = document.createElement('div')
//             card.setAttribute('class', 'card')

//             // Create an h1 and set the text content to the Pokemon's name
//             const h1 = document.createElement('h1')
//             h1.textContent = pokemon.name

//             // Create a p and set the text content to the Pokemon's type(s)
//             const p = document.createElement('p')
//             var pokeRequest = getRequestWithURL(pokemon.url)
//             pokeRequest.onload = function() {
//                 console.log(pokeRequest)
//                 var pokeData = JSON.parse(pokeRequest.responseText)
//                 console.log(pokeData)
//                 if (pokeRequest.status >= 200 && pokeRequest.status < 400) {
//                     var prettyTypes = ''
//                     console.log(pokeData)
//                     pokeData.results.forEach(type => {
//                         prettyTypes += type.name + ' / '
//                     })
//                     p.textContent = `${prettyTypes}...` // End with an ellipses
//                     pokeData.results.forEach(pokemon => {
                        
//                     })
//                 }
//             }

//             // Append the cards to the container element
//             container.appendChild(card)

//             // Each card will contain an h1 and a p
//             card.appendChild(h1)
//             card.appendChild(p)
//         })
//     }
//     else {
//         const errorMessage = document.createElement('marquee')
//         errorMessage.textContent = `Gah, it's not working!`
//         app.appendChild(errorMessage)
//     }
    
// //}

// Send request
// request.send()

// function getRequestWithURL(url) {
//     var request = new XMLHttpRequest()
//     // Open a new connection, using the GET request on the URL endpoint
//     request.open('GET', url, true)   
//     return request 
// }