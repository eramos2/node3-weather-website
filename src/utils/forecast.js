const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e4a2dd5d480eab4e898f14079e7e5da8&units=f&query=' + lon + ',' + lat + ''

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location, please add different coordinates', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current
            callback(undefined, weather_descriptions[0] + '. It is currently ' +  temperature + ' degrees out. It feels like ' + feelslike + '.')
        }
    })

} 


module.exports = forecast
