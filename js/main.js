const btnPeople = document.querySelector('.aside__people')
const btnShip = document.querySelector('.aside__ship')
const btnPlanet = document.querySelector('.aside__species')
const mainItem = document.querySelector('.main_item')
const toPlanet = document.querySelector('.main__badge')
const btnExit = document.querySelector('.bt.aside__exit')
const PlanetBtnExit = document.querySelector('.bt.main__planet-exit')

let historyStack = []
let currentHomeworldUrl = null


if(toPlanet){toPlanet.addEventListener('click', planetCardInfo)
}
btnPeople.addEventListener('click', ()=> {fetchData('people'); addToHistory('people')})
btnShip.addEventListener('click', ()=> {fetchData('starships');addToHistory('starships')})
btnPlanet.addEventListener('click', ()=>  {fetchData('species');addToHistory('species')} )

const url = 'https://swapi.dev/api/'
const url_people = 'people/'
const url_starships = 'starships/'
const url_species = 'species/'

init()
function init(){
    load()
    fetchData('people')
}

async function fetchData(fetchType){

let myUrl
load()

if(fetchType === 'people'){
    myUrl = url + url_people
}
else if(fetchType === 'starships'){
    myUrl = url + url_starships
}
else if(fetchType === 'species'){
    myUrl = url + url_species
}
    await fetch(myUrl)
    .then((response) => {

        return response.json()
    })
    .then((data) => {
        document.querySelector('.main__content').innerHTML = ''
        data.results.forEach(card => addCard(card,myUrl))
      })
    

      .catch(error => {
        console.error('Ошибка:', error);
    })
        finishLoad()
    }



    async function addCard(data,myUrl){
    if(myUrl === url + url_people){

    const homeworldName = await fetchPlanet(data)

    const card = document.createElement('div')
    card.className = 'main__item'
    card.innerHTML =`
     <a class="main__badge">${homeworldName}</a>
    <div class="main__info">
    name:${data.name}
    height:${data.height}
    hair:${data.hair_color}
    skin:${data.skin_color}
    eye:${data.eye_color}
    birth:${data.birth_year}
    gender:${data.gender}
    mass:${data.mass}
    </div>
                <div class="main__btn">
                    <a data-front="vehicles" data-back="Info" class="btn main__vehicles"></a>
                    <a data-front="films" data-back="Info" class="btn main__films"></a>
                    <a data-front="starships" data-back="Info" class="btn main__starships"></a>
                </div>`

  document.querySelector('.main__content').append(card)

  document.querySelector('.main__content').append(card)
  card.querySelector('.main__badge').addEventListener('click', () => {
    planetCardInfo(data.homeworld)
})
    }
  else     
if(myUrl === url + url_starships){

    const card = document.createElement('div')
    card.className = 'main__item'
    card.innerHTML =`<div class="main__info">
    name:${data.name}
    model:${data.model}
    manufacturer:${data.manufacturer}
    credits:${data.cost_in_credits}
    length:${data.length}
    speed:${data.max_atmosphering_speed}
    crew:${data.crew}
    passengers:${data.passengers}
    capacity:${data.cargo_capacity}
    consumables:${data.consumables}
    rating:${data.hyperdrive_rating}
    MGLT:${data.MGLT}
    class:${data.starship_class}
    </div>`

  document.querySelector('.main__content').append(card)
  
    }
    if(myUrl === url + url_species){
        
        const homeworldName = await fetchPlanet(data)
        const card = document.createElement('div')
        card.className = 'main__item'
        card.innerHTML =`
        <a class="main__badge">${homeworldName}</a>
        <div class="main__info">
        name:${data.name}<br>
        classification:${data.classification}<br>
        designation:${data.designation}<br>
        average-height:${data.average_height}<br>
        skin-colors:${data.skin_colors}<br>
        hair-colors:${data.hair_colors}<br>
        eye-colors:${data.eye_colors}<br>
        lifespan:${data.average_lifespan}<br>
        language:${data.language}<br>
        </div>`
      document.querySelector('.main__content').append(card)
      card.querySelector('.main__badge').addEventListener('click', () => {
        planetCardInfo(data.homeworld)
    })
        }

}


async function fetchPlanet(data) {

    if (data.homeworld) {
        currentHomeworldUrl = data.homeworld
        const response = await fetch(data.homeworld)
        const homeworldData = await response.json()
        return homeworldData.name
    }
    return 'Unknown'
}
async function planetCardInfo(homeworldUrl) {
    load()

    const response = await fetch(homeworldUrl)
    const homeworldData = await response.json()
    document.querySelector('.main__content').innerHTML = ''

    const card = document.createElement('div')
    card.className = 'main__item-planet'
    card.innerHTML = `
    
        <div class="main__planet-info">
            Name: ${homeworldData.name}<br>
            Climate: ${homeworldData.climate}<br>
            Terrain: ${homeworldData.terrain}<br>
            Population: ${homeworldData.population}<br>
            Diameter: ${homeworldData.diameter}<br>
        <a href="#" class="bt main__planet-exit">exit</a>
        </div>`

    document.querySelector('.main__content').append(card)

        finishLoad()
    
}

// load()
// function load(){
// document.body.onload = function(){
//     setTimeout(()=>{
//          const preloader = document.querySelector('.preloader')
//          if(!preloader.classList.contains('done')){
//             preloader.classList.add('done')
//          }
//     },1000)
// }
// }

function load() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.remove('done')
    }
}

function finishLoad() {
    const preloader = document.querySelector('.preloader')
    if (preloader) {
        preloader.classList.add('done')
    }
}


// btnExit.addEventListener('mousemove', (e) => {
//     GoBack ()

//     const button = e.currentTarget
//     x = e.offsetX
//     y = e.offsetY
//     button.style.setProperty('--mouse-x', x + "px")
//     button.style.setProperty('--mouse-y', y + "px")
// })



function addToHistory(state) {
    historyStack.push(state)
}

if (btnExit) {
    btnExit.addEventListener('click', goBack)
}
if (PlanetBtnExit) {
    PlanetBtnExit.addEventListener('click', goBack)
}

function goBack() {
    if (historyStack.length > 0) {
        const lastState = historyStack.pop()

        if (lastState === 'people') {
            fetchData('people')
        } else if (lastState === 'starships') {
            fetchData('starships')
        } else if (lastState === 'species') {
            fetchData('species')
        } else if (lastState === 'planetCard') {
            planetCardInfo(currentHomeworldUrl) 
        }
    } else {
        console.log('История пуста.');
    }
}

