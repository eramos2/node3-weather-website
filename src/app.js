
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Emmanuel Ramos'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Emmanuel Ramos'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'This is a help message!',
        title: 'Help',
        name: 'Emmanuel Ramos'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    const address = req.query.address
    console.log(address)
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        } 

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })

    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404',
        name: 'Emmanuel Ramos'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404',
        name: 'Emmanuel Ramos'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
