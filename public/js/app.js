const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url  = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = 'Loading data'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
        
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = 'Error: ' + data.error
                messageTwo.textContent = ''
                console.log(data.error)
            } else{
                messageOne.textContent = 'Location : ' + data.location
                messageTwo.textContent = data.forecast
                console.log('Location: ' + data.location);
                console.log(data.forecast  );
            }
        
        })
    })
})
