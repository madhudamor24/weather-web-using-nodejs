const request = require('request')

// use address as input to find latitude, longitude, and placename
const geocoding = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFtb3JtYWRodTI0IiwiYSI6ImNrcWkzcnN5czJqcXQycHF0bnN0bTN1b3gifQ.EJqt1tLR36G_6APvIcJdbg'
    
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to weather service !!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, Try another search!!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

// exports the geocoding
module.exports = geocoding

