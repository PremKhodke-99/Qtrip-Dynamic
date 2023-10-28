import config from "../conf/index.js"


async function init(){
    //fetch list of all cities along with their image and description
    let cities = await fetchCities();

    //upadate cities to DOM
    if(cities){
        cities.forEach(element => {
            addCityToDOM(element.id, element.city, element.description, element.image);
        });
    }
}

async function fetchCities(){
    //fetch cities using backend API
    try{
        let cityResponse = await fetch(config.backendEndpoint + "/cities");
        let cities = await cityResponse.json();

        return cities;
    }catch{
        return null;
    }
}

function addCityToDOM(id, city, description, image){
    //Populate the city details and insert those details into the DOM


    const data = document.getElementById('data');
    const div = document.createElement('div');
    div.className = "col-6 col-lg-3 mb-3"
    div.innerHTML = `
        <a href="pages/adventures/?city=${id}" id=${id}>
            <div class="tile">
                <img src=${image} alt=${city} />
                <div class="tile-text">
                    <h4>${city}</h4>
                    <p>${description}</p>
                </div>
            </div>
        </a>
    `

    data.appendChild(div);
}

export {init, fetchCities, addCityToDOM};