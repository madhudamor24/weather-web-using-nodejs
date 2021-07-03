const request = require('request')

// use latitude and longitude as input to find weather environment of that area
const forecasting = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c8ad5370b910e0380ae353e8ee335e7c&query='+ latitude +',' + longitude 
    
    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service !!', undefined)
        }else if(body.error){
            callback('Unable to find location, Try another search!!', undefined)
        }else{
            const environment={
                temperature: body.current.temperature,
                weather: body.current.weather_descriptions[0],
                precipitation: body.current.precip,
                humidity: body.current.humidity,
                wind_speed: body.current.wind_speed,
                pressure:body.current.pressure
            }
            callback(undefined, environment)
        }
    })
}

// export the forcasting
module.exports = forecasting
