const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocoding = require('./utils/geocoding')
const forecasting = require('./utils/forecasting')

// for app
const app = express()

// hosting webpage
const portNum = process.env.PORT || 3000

//path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// load html pages
// home page
app.get('',(req,res)=>{
    res.render('home',{
        title:'Weather',
        name:'Madhulika Damor'
    })
})

// about page
app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About',
        name:'Madhulika Damor'
    })
})

// help page
app.get('/help', (req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text !!',
        title:'Help',
        name:'Madhulika Damor'
    })
})

// add nodejs weather-app part for application like forcasting and geocoding
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address !!'
        })
    }

    geocoding(req.query.address, (error, {latitude, longitude, location}={} )=>{
        if(error){
            return res.send({error})
        }
    
        forecasting(latitude, longitude, (error, data2) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                address: req.query.address,
                temperature: data2.temperature,
                weather: data2.weather,
                precipitation: data2.precipitation,
                humidity: data2.humidity,
                wind_speed: data2.wind_speed,
                pressure:data2.pressure,
                location,
                address: req.query.address,
            })
            
        })
    })
})

// error page
app.get('*', (req,res)=>{
    res.render('404_error',{
        title:'404 error ',
        name:'Madhulika Damor',
        errorMessage:'Page not found !!'
    })
})

// our web-page
app.listen(portNum, () =>{
    console.log('Server is up on port ' + portNum)
})