console.log('Client side javascript file is loaded!')

const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const resultMessage = document.querySelector('#result_message')
const resultLocation = document.querySelector('#result_location')
const resultCondition = document.querySelector('#result_condition')
const resultTemperature = document.querySelector('#result_temperature')
const resultFeelslike = document.querySelector('#result_feelslike')


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    fetch('/projects/weather/search?address='+location).then((response) => {
            response.json().then((data) => {
                    resultMessage.textContent = ""
                    resultLocation.textContent = ""
                    resultCondition.textContent = ""
                    resultTemperature.textContent = ""
                    resultFeelslike.textContent = ""
                    resultMessage.className = 'text-info'
                    resultMessage.textContent = "Searching..."
                    setTimeout(() =>{
                        if(data.error){
                            resultMessage.className = 'text-danger'
                            resultMessage.textContent = data.error    
                        }else{
                            resultMessage.textContent = ""
                            resultLocation.textContent = "Location: " + data.location
                            resultCondition.textContent = "Condition: " + data.condition
                            resultTemperature.textContent = "Temperature: " + data.temperature
                            resultFeelslike.textContent = "Feelslike: " + data.feelslike
                        }
                    }, 1000)
            })
        })
})
