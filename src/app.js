const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherstack = require("./utils/weatherstack")

const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const public_Dir = path.join(__dirname,"../public")
const views_Dir = path.join(__dirname,"../templates/views")
const partials_Dir = path.join(__dirname,"../templates/partials")

// SETUP HANDLEBARS ENGINES AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', views_Dir)
hbs.registerPartials(partials_Dir)

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(public_Dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'PROFILE',
        name: 'Crisjahn Perez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'HELP',
        name: 'Crisjahn Perez',
        helpText: 'This is some helpful text.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'INFORMATION',
        name: 'Crisjahn Perez'
    })
})

app.get('/projects', (req, res) => {
    res.render('project', {
        title: 'PROJECTS',
        name: 'Crisjahn Perez'
    })
})
app.get('/projects/weather', (req, res) => {
    res.render('weather', {
        title: 'WEATHER APP',
        name: 'Crisjahn Perez',
        message1: 'Partly Cloudy Day',
        message2: ' icon by ',
        message3: 'Icons8',
        reference1: 'https://icons8.com/icon/elq8R5kggLjc/partly-cloudy-day',
        reference2: 'https://icons8.com/icon/elq8R5kggLjc/partly-cloudy-day',
    })
})


app.get('/projects/weather/search', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a location.'
        })
    }
    geocode(req.query.address, (err, add) => {
        if (add === undefined) {
            return res.send({
                error: err
            })
        }
        weatherstack(add.latitude, add.longitude, (error, loc) => {
            if (loc === undefined) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location: add.name,
                temperature: loc.temperature,
                feelslike: loc.feelslike,
                condition: loc.condition
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('lost', {
        name:"Crisjahn Perez",
        result:"Error: 404",
        message:"Help article not found."
    })
})


app.get('*', (req, res) => {
    res.render('lost', {
        name:"Crisjahn Perez",
        result:"Error: 404",
        message:"Page not found."
    })
})

app.listen(3000, () => {
    console.log('Server is now running.')
})