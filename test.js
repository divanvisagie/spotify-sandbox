const fetch = require('node-fetch')
const Bacon = require('baconjs')

const TOKEN = require('./secrets/token').token

const getWebToken = () => `Bearer ${TOKEN}`
const DEFAULT_HEADERS = {
    'Authorization': getWebToken(),
    'Content-Type' : 'application/json',
    'Accept': 'application/json'
}


function getArchEnemy(offset = 0, limit = 2) {
    const url = `https://api.spotify.com/v1/search?q=Arch%20Enemy&type=artist&market=US&limit=${limit}&offset=${offset}`

    const promise = fetch(url, {
        headers: DEFAULT_HEADERS
    }).then(response => response.json())

    const stream = Bacon.fromPromise(promise)
    return stream
}

getArchEnemy()
    .flatMap(data => data.artists.items)
    .onValue(output => console.log(output))
