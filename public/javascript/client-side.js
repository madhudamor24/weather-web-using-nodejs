console.log('Client side javascript file is loaded!!')

const Form = document.querySelector('form')
const search = document.querySelector('#loc')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')

Form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    msg1.textContent = 'Loading....'
    msg2.textContent = ''
    msg3.textContent = ''
    msg4.textContent = ''
    msg5.textContent = ''
    msg6.textContent = ''
    msg7.textContent = ''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
            }
            else{
                msg1.textContent = data.location +"\n"
                msg2.textContent = "Weather : "+data.weather
                msg3.textContent = "Temperature : "+data.temperature+"°C "
                msg4.textContent = "Rainfall : "+data.precipitation+" mm"
                msg5.textContent = "Humidity : "+data.humidity+ "%"
                msg6.textContent = "Wind Speed : "+data.wind_speed+ " kmph"
                msg7.textContent = "Pressure : "+data.pressure+" mb"
            }
        })
    })
})
