const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.status(200).send("I mock Azure App Service")
})

app.get('/5xx', (req, res) => {
    console.error("This is a 5xx error")
    res.status(500).send('Error')
})

app.get('/4xx', (req, res) => {
    console.error("This is a 4xx error")
    res.status(404).send('Error')
})

app.get('/2xx', (req, res) => {
    console.log("A normal request")
    res.status(200).send('Error')
})

const timer = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

app.get('/delay', async (req, res) => {
    await timer(10000)
    console.warn("This is a slow request. Please try to log this.")
    return res.status(200).send('Thanks for waiting')
})

app.get('/slow', (req, res) => {
    for (let index = 0; index < 9999999999999; index++) {
        for (let j = 0; j < 9999999999999; j++) {
            for (let x = 0; x < 9999999999999; x++) {
            }
        }
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server up and running on http://localhost/')
})
