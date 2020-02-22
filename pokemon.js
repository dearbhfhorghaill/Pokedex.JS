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