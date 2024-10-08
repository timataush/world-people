const btnPeople = document.querySelector('.aside__people')
const btnShip = document.querySelector('.aside__ship')
const btnPlanet = document.querySelector('.aside__species')
const mainItem = document.querySelector('.main_item')
const toPlanet = document.querySelector('.main__badge')
const btnExit = document.querySelector('.bt.aside__exit')
const btnNext = document.querySelector('.btnpg.main__next')
const btnPrev = document.querySelector('.btnpg.main__prev')
const links = document.querySelectorAll('.main__items')
const pagination = document.querySelector('.main__pagination')

const buttonsAside = document.querySelectorAll('.button')


btnNext.addEventListener('click', nextBtn)
btnPrev.addEventListener('click', backBtn)


if (btnExit) {btnExit.addEventListener('click', goBack)}
if(toPlanet){toPlanet.addEventListener('click', planetCardInfo)}

btnPeople.addEventListener('click', ()=>{
    paginatorLink = url + url_people;
    fetchData( url + url_people);
    countFetch(url + url_people);

 })
btnShip.addEventListener('click', ()=>{
    paginatorLink = url + url_starships;
    fetchData(url + url_starships);
    countFetch(url + url_starships);


 })
btnPlanet.addEventListener('click', ()=>{ 
    paginatorLink = url + url_species;
    fetchData(url + url_species);
    countFetch(url + url_species);


 })

const url = 'https://swapi.dev/api/'
const url_people = 'people/'
const url_starships = 'starships/'
const url_species = 'species/'
const page = '?page='
let paginatorLink = ''
let quantityPage = ''




init()
function init(){
    load()
    fetchData(url + url_people)
    paginatorLink = url + url_people
    isVisibleYellowBtn ()
    btnPeople.classList.add('active')

}

async function fetchData(myUrl){
load()

    await fetch(myUrl)
    .then((response) => {

        return response.json()
    })
    .then((data) => {
        document.querySelector('.main__content').innerHTML = ''
        data.results.forEach(card => addCard(card,myUrl))
        btnExit.classList.remove('exit-off')
        // isVisibleYellowBtn ()

        const itemsPerPage = 10
        currentValue = 1

        quantityPage = Math.ceil(data.count / itemsPerPage)
        updatePagination(quantityPage)
       
        
      })
    
      .catch(error => {
        console.error('Ошибка:', error)
    })
        load()
    }

    async function countFetch(myUrl) {
        const response = await fetch(myUrl)
        const data = await response.json()

            
        
    }
    

    function updatePagination(totalPages) {
        const ul = document.querySelector('.main__ul')
        ul.innerHTML = ''
            
           
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('li')
            pageLink.className = 'main__items'
            pageLink.setAttribute('data-value', i)
            pageLink.textContent = i
            
            if (i === 1) {
                pageLink.classList.add("active")
                
            }
            pageLink.addEventListener('click', activeLink)
            ul.append(pageLink)
        }
    
    }
    

    async function addCard(data,myUrl){
       load()

    if(myUrl.includes(url_people)){

    const homeworldName = await fetchPlanet(data)

    const card = document.createElement('div')
    card.className = 'main__item'
    card.innerHTML =`
     <a class="main__badge">${homeworldName}</a>
    <div class="main__info">
    <div><strong>name:</strong>${data.name}</div>
    <div><strong>height:</strong>${data.height}</div>
    <div><strong>hair:</strong>${data.hair_color}</div>
    <div><strong>skin:</strong>${data.skin_color}</div>
    <div><strong>eye:</strong>${data.eye_color}</div>
    <div><strong>birth:</strong>${data.birth_year}</div>
    <div><strong>gender:</strong>${data.gender}</div>
    <div><strong>mass:</strong>${data.mass}</div>
    </div>
                <div class="main__btn">
                    <a data-front="vehicles" data-back="Info" class="btn main__vehicles"></a>
                    <a data-front="films" data-back="Info" class="btn main__films"></a>
                    <a data-front="starships" data-back="Info" class="btn main__starships"></a>
                </div>`

  document.querySelector('.main__content').append(card)

    const btnVehicles =  card.querySelector('.btn.main__vehicles')
    const btnFilms = card.querySelector('.btn.main__films')
    const btnStarships = card.querySelector('.btn.main__starships')

  btnVehicles.addEventListener('click', ()=>buttonCard(data.vehicles, 'vehicles'))
  btnFilms.addEventListener('click', ()=>buttonCard(data.films, 'films'))
  btnStarships.addEventListener('click',()=>buttonCard(data.starships, 'starships'))


  card.querySelector('.main__badge').addEventListener('click', () => {
    planetCardInfo(data.homeworld)


})
btnExit.classList.add('exit-off')

}
if(myUrl.includes(url_starships)){

    const card = document.createElement('div')
    card.className = 'main__item'
    card.innerHTML =`<div class="main__info">
    <div><strong>name:</strong>${data.name}</div>
    <div><strong>model:</strong>${data.model}</div>
    <div><strong>manufacturer:</strong>${data.manufacturer}</div>
    <div><strong>credits:</strong>${data.cost_in_credits}</div>
    <div><strong>length:</strong>${data.length}</div>
    <div><strong>speed:</strong>${data.max_atmosphering_speed}</div>
    <div><strong>crew:</strong>${data.crew}</div>
    <div><strong>passengers:</strong>${data.passengers}</div>
    <div><strong>capacity:</strong>${data.cargo_capacity}</div>
    <div><strong>consumables:</strong>${data.consumables}</div>
    <div><strong>rating:</strong>${data.hyperdrive_rating}</div>
    <div><strong>MGLT:</strong>${data.MGLT}</div>
    <div><strong>class:</strong>${data.starship_class}</div>
    </div>`

  document.querySelector('.main__content').append(card)

    }
    if(myUrl.includes(url_species)){
        const card = document.createElement('div')
        card.className = 'main__item'
        card.innerHTML =`
        <div class="main__info">
        <div><strong>name:</strong>${data.name}</div>
        <div><strong>classification:</strong>${data.classification}</div>
        <div><strong>designation:</strong>${data.designation}</div>
        <div><strong>height:</strong>${data.average_height}</div>
        <div><strong>skin:</strong>${data.skin_colors}</div>
        <div><strong>hair:</strong>${data.hair_colors}</div>
        <div><strong>eye:</strong>${data.eye_colors}</div>
        <div><strong>lifespan:</strong>${data.average_lifespan}</div>
        <div><strong>language:</strong>${data.language}</div>
        </div>`
      document.querySelector('.main__content').append(card)
    
        }

        load()

}

async function buttonCard(url,type) {
    document.querySelector('.main__content').innerHTML = ''
    btnExit.classList.remove('exit-off')
    isVisiblePagination ()
    if(!url.length){
            console.log('DDDDDD')
            document.querySelector('.main__content').innerHTML = ''
            const card = document.createElement('div')
            card.className = 'main__warning'
            card.innerHTML = `<div> Ничего не найдено, братан</div>`
            document.querySelector('.main__content').append(card)
            return
         }

//   await url.forEach(async (link) => {
//             const response = await fetch(link)
//             const data = await response.json()
        
        for (const link of url) {
        const response = await fetch(link)
        const data = await response.json()
            
    if(type === 'vehicles'){
        const card = document.createElement('div')
        card.className = 'main__item'
        card.innerHTML = `
            <div class="main__info">
                 <div><strong>name:</strong>${data.name}</div>
                 <div><strong>model:</strong>${data.model}</div>
                 <div><strong>manufacturer:</strong>${data.manufacturer}</div>
                 <div><strong>credits:</strong>${data.cost_in_credits}</div>
                 <div><strong>length:</strong>${data.length}</div>
                 <div><strong>speed:</strong>${data.max_atmosphering_speed}</div>
                 <div><strong>crew:</strong>${data.crew}</div>
                 <div><strong>passengers:</strong>${data.passengers}</div>
                 <div><strong>capacity:</strong>${data.cargo_capacity}</div>
                 <div><strong>consumables:</strong>${data.consumables}</div>
                 <div><strong>class:</strong>${data.vehicle_class}</div>
            </div>`
        document.querySelector('.main__content').append(card)
      }

      if(type === 'films'){
        const card = document.createElement('div')
        card.className = 'main__item'
        card.innerHTML = `
            <div class="main__info">
                 <div><strong>title:</strong>${data.title}</div>
                 <div><strong>episode:</strong>${data.episode_id}</div>
                 <div><strong>director:</strong>${data.director}</div>
                 <div><strong>producer:</strong>${data.producer}</div>
                 <div><strong>release:</strong>${data.release_date}</div>
            </div>`
        document.querySelector('.main__content').append(card)
      }


      if(type === 'starships'){

        const card = document.createElement('div')
        card.className = 'main__item'
        card.innerHTML = `
            <div class="main__info">
                 <div><strong>name:</strong>${data.name}</div>
                 <div><strong>model:</strong>${data.model}</div>
                 <div><strong>manufacturer:</strong>${data.manufacturer}</div>
                 <div><strong>credits:</strong>${data.cost_in_credits}</div>
                 <div><strong>length:</strong>${data.length}</div>
                 <div><strong>speed:</strong>${data.max_atmosphering_speed}</div>
                 <div><strong>crew:</strong>${data.crew}</div>
                 <div><strong>passengers:</strong>${data.passengers}</div>
                 <div><strong>capacity:</strong>${data.cargo_capacity}</div>
                 <div><strong>consumables:</strong>${data.consumables}</div>
                 <div><strong>rating:</strong>${data.hyperdrive_rating}</div>
                 <div><strong>MGLT:</strong>${data.MGLT}</div>
                 <div><strong>class:</strong>${data.starship_class}</div>
            </div>`
        document.querySelector('.main__content').append(card)
      }

    
    }
// )
}


async function fetchPlanet(data) {

        const responsePl = await fetch(data.homeworld)
        const homeworldData = await responsePl.json()
        return homeworldData.name

}



async function planetCardInfo(homeworldUrl) {

    load()
    isVisiblePagination ()
    const responsePl = await fetch(homeworldUrl)
    const homeworldData = await responsePl.json()

    document.querySelector('.main__content').innerHTML = ''

    const card = document.createElement('div')
    card.className = 'main__item-planet'
    card.innerHTML = `
        <div class="main__planet-info">
        Name:${homeworldData.name}
        Climate: ${homeworldData.climate}
        Terrain: ${homeworldData.terrain}
        Population:${homeworldData.population}
        Diameter:${homeworldData.diameter}
        <a href="#" class="bt main__planet-exit">exit</a>
        </div>`

    document.querySelector('.main__content').append(card)
    
    btnExit.classList.add('exit-off')
    const planetBtnExit = document.querySelector('.bt.main__planet-exit')
    planetBtnExit.addEventListener('click', goBack)
    
    load()
    
}



function load() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.toggle('done')
    }
}



function goBack() {
    fetchData(url + url_people)
    isVisiblePagination()
    isVisibleYellowBtn()
    
    buttonsAside.forEach(btn => btn.classList.remove('active'))
    btnPeople.classList.add('active')
}




let currentValue = 1

links.forEach(link => {
    link.addEventListener('click', activeLink)
})

function activeLink(event) {
    const currentLinks = document.querySelectorAll('.main__items')
    currentLinks.forEach(l => {
        l.classList.remove("active")
    })
    event.target.classList.add("active")
    currentValue = parseInt(event.target.getAttribute('data-value'), 10)
    fetchPage(paginatorLink + page + currentValue)
}


function backBtn() {
    if (currentValue > 1) {
    console.log(currentValue)
        currentValue--
        updateActivePage()

        fetchPage(paginatorLink + page + currentValue)
    }
}

function updateActivePage(){

    load()
    const currentLinks = document.querySelectorAll('.main__items')
        currentLinks.forEach(l => l.classList.remove('active'))
        const newActive = document.querySelector(`.main__items[data-value="${currentValue}"]`)
        if (newActive) newActive.classList.add('active')
}

function nextBtn() {
    // if (currentValue < links.length) {
    //     links.forEach(l => {
    //         l.classList.remove("active")
    //     })
        // currentValue++
        // links[currentValue - 1].classList.add("active")
      if(quantityPage > currentValue){
        currentValue++
        updateActivePage()
        fetchPage(paginatorLink + page + currentValue)
      }
}


async function fetchPage(myUrl) {
    load()

    await fetch(myUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        document.querySelector('.main__content').innerHTML = ''
        data.results.forEach(card => addCard(card, myUrl))
        btnExit.classList.remove('exit-off')
    })
    .catch(error => {

        console.error('Ошибка:', error)
    })
    load()
}

function isVisiblePagination (){
    pagination.style.display = pagination.style.display === 'none' ? 'block' : 'none'
}
function isVisibleYellowBtn (){
buttonsAside.forEach(button => {
    button.addEventListener('click', () => {
      buttonsAside.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')
    })

  })
}

