const request = require('request')

const weatherstack = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=719179faadbf1fe1babbe3b8147b3da4&query=" + latitude+ "," + longitude

    request({url:url, json:true}, (error, {body}) =>{
        if(error){
            callback("Unable to connect to weather service.", undefined)
        }else if(body.error){
            callback("Unable to get the weather, location not found.", undefined)
        }else{
            callback(undefined,{
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                condition: body.current.weather_descriptions[0],
                time: body.location.localtime
            })
        }
    })
}

module.exports = weatherstack