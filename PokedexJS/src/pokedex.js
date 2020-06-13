const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'Pokemon_Logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

let request = new Request('https://pokeapi.co/api/v2/pokemon/')
let count = 0

fetch(request, {mode: 'cors'}) 
    .then((resp) => resp.json())
    .then(function(data) {

        count = data.count
        let pokeUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=' + count
        let pokeRequest = new Request(pokeUrl)

        fetch(pokeRequest, {mode: 'cors'})
            .then((resp) => resp.json())
            .then(function(data) {

            console.log('DATA: \n')
            console.log(data)

            data.results.forEach(pokemon => {

                const card = document.createElement('div')
                card.setAttribute('class', 'card')
                const h1 = document.createElement('h1')
                const p = document.createElement('p')
                const pImg = document.createElement('img')
    
                fetch(pokemon.url)
                .then((resp) => resp.json())
                .then(function(pokeData) {
    
                    //Set Pokemon's name
                    var pokeName = ''
                    if (!!pokeData.species.name) {
                        pokeName = pokeData.species.name
                    }
                    else {
                        pokeName = pokemon.name
                    }
                    h1.textContent = capitaliseFirstLetter(pokeName)
    
                    //Set Pokemon's type
                    var prettyTypes = ''
                    pokeData.types.forEach(function(t, idx, array) {
                        prettyTypes += capitaliseFirstLetter(t.type.name)
                        if (idx != array.length - 1) {
                            prettyTypes += ' / '
                        }
                    })
                    p.textContent = `${prettyTypes}`
    
                    //Set Pokemon's sprite
                    pImg.src = pokeData.sprites.front_default
                    pImg.class = "lazy"
                    pImg.alt = "A lazy image"
                    var lazyLoadInstance = new LazyLoad({
                        elements_selector: ".lazy",
                        load_delay: 300
                    });
                })
    
                // Append the cards to the container element
                container.appendChild(card)
                card.appendChild(h1)
                card.appendChild(pImg)
                card.appendChild(p)
            })
        })
        .catch(function(error) {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            app.appendChild(errorMessage)
        })
    })


function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setNextRequest(newUrl) {
    request = new Request(newUrl)
    return request
}