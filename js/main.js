const btnPeople = document.querySelector('.aside__people')
const btnShip = document.querySelector('.aside__ship')
const btnPlanet = document.querySelector('.aside__species')

btnPeople.addEventListener('click', people)
btnShip.addEventListener('click', ship)
btnPlanet.addEventListener('click', species)

async function people(){
    const url = 'https://swapi.dev/api/people'
    await fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // data.forEach(card => addCard(data))
      })
}
async function ship(){
    const url = 'https://swapi.dev/api/starships'
    await fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
      })
}
async function species(){
    const url = 'https://swapi.dev/api/species'
    await fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
      })
}

function addCard(data){
    // console.log(data)
    data = {name,height,mass,hair_color,skin_color,eye_color,birth_year,gender}
    const card = document.createElement('div')
    card.className = 'main__item'
    card.innerHTML =`<div class="main__info">
    name:${data.name}
    height:${data.height}

    </div>
                <div class="main__btn">
                    <a data-front="vehicles" data-back="Info" class="btn main__vehicles"></a>
                    <a data-front="films" data-back="Info" class="btn main__films"></a>
                    <a data-front="starships" data-back="Info" class="btn main__starships"></a>
                </div>`
}