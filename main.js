// Here are the states for free
const states = [{"name":"Alabama","abbreviation":"AL"},{"name":"Alaska","abbreviation":"AK"},{"name":"American Samoa","abbreviation":"AS"},{"name":"Arizona","abbreviation":"AZ"},{"name":"Arkansas","abbreviation":"AR"},{"name":"California","abbreviation":"CA"},{"name":"Colorado","abbreviation":"CO"},{"name":"Connecticut","abbreviation":"CT"},{"name":"Delaware","abbreviation":"DE"},{"name":"District Of Columbia","abbreviation":"DC"},{"name":"Federated States Of Micronesia","abbreviation":"FM"},{"name":"Florida","abbreviation":"FL"},{"name":"Georgia","abbreviation":"GA"},{"name":"Guam","abbreviation":"GU"},{"name":"Hawaii","abbreviation":"HI"},{"name":"Idaho","abbreviation":"ID"},{"name":"Illinois","abbreviation":"IL"},{"name":"Indiana","abbreviation":"IN"},{"name":"Iowa","abbreviation":"IA"},{"name":"Kansas","abbreviation":"KS"},{"name":"Kentucky","abbreviation":"KY"},{"name":"Louisiana","abbreviation":"LA"},{"name":"Maine","abbreviation":"ME"},{"name":"Marshall Islands","abbreviation":"MH"},{"name":"Maryland","abbreviation":"MD"},{"name":"Massachusetts","abbreviation":"MA"},{"name":"Michigan","abbreviation":"MI"},{"name":"Minnesota","abbreviation":"MN"},{"name":"Mississippi","abbreviation":"MS"},{"name":"Missouri","abbreviation":"MO"},{"name":"Montana","abbreviation":"MT"},{"name":"Nebraska","abbreviation":"NE"},{"name":"Nevada","abbreviation":"NV"},{"name":"New Hampshire","abbreviation":"NH"},{"name":"New Jersey","abbreviation":"NJ"},{"name":"New Mexico","abbreviation":"NM"},{"name":"New York","abbreviation":"NY"},{"name":"North Carolina","abbreviation":"NC"},{"name":"North Dakota","abbreviation":"ND"},{"name":"Northern Mariana Islands","abbreviation":"MP"},{"name":"Ohio","abbreviation":"OH"},{"name":"Oklahoma","abbreviation":"OK"},{"name":"Oregon","abbreviation":"OR"},{"name":"Palau","abbreviation":"PW"},{"name":"Pennsylvania","abbreviation":"PA"},{"name":"Puerto Rico","abbreviation":"PR"},{"name":"Rhode Island","abbreviation":"RI"},{"name":"South Carolina","abbreviation":"SC"},{"name":"South Dakota","abbreviation":"SD"},{"name":"Tennessee","abbreviation":"TN"},{"name":"Texas","abbreviation":"TX"},{"name":"Utah","abbreviation":"UT"},{"name":"Vermont","abbreviation":"VT"},{"name":"Virgin Islands","abbreviation":"VI"},{"name":"Virginia","abbreviation":"VA"},{"name":"Washington","abbreviation":"WA"},{"name":"West Virginia","abbreviation":"WV"},{"name":"Wisconsin","abbreviation":"WI"},{"name":"Wyoming","abbreviation":"WY"}]

/* 
Using this will look something like: 

getCoords()
    .then(geolocationData => ...)
*/
function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
        
            resolve([lat, long]);
          });
    })
}

const breweries = "https://api.openbrewerydb.org/breweries";

fetch(breweries)
    .then(response => response.json())
    .then(renderBreweriesWithCreate)

function renderBreweriesWithInnerHTML(json) {
    const main = document.querySelector("main");
    main.innerHTML = "";
    json.forEach(brewery => {
        const div = `<div class="brewery">
            <a href="${brewery.website_url || "#"}">
                <h2>${brewery.name}</h2>
            </a>
            <p>${brewery.street}</p>
            <p>${brewery.city} ${brewery.state}, ${brewery.postal_code}</p>
            <p>${brewery.phone}</p>
        </div>`;
        main.innerHTML += div;
    })
}

function renderBreweriesWithCreate(json) {
    const main = document.querySelector("main");
    main.innerHTML = "";

    json.forEach(brewery => {
        const div = document.createElement("div");
        div.classList.add("brewery");

        const a = document.createElement("a");
        a.setAttribute("href", brewery.website_url || "#");

        const h2 = document.createElement("h2");
        h2.textContent = brewery.name;

        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");

        p.textContent = brewery.street;
        p2.textContent = brewery.city + " " + brewery.state + ", " + brewery.postal_code;
        p3.textContent = brewery.phone;

        div.prepend(a, p, p2, p3);
        a.prepend(h2);

        main.append(div);
    })
}

const stateClick = document.querySelector("#state");

for(let state of states) {
    const nameOfState = state.name;
    const stateElement = document.createElement("option");
    stateElement.setAttribute("value", nameOfState);
    stateElement.textContent = nameOfState;
    stateClick.appendChild(stateElement);
}

const searchState = document.querySelector("#state-search");
searchState.addEventListener("submit", event => {
    event.preventDefault();

    const selectedState = document.querySelector("#state")
    fetch(`https://api.openbrewerydb.org/breweries?by_state=${selectedState.value}`)
        .then(response => response.json())
        .then(renderBreweriesWithInnerHTML)
})

document.querySelector("#city-search").addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`https://api.openbrewerydb.org/breweries?by_city=${document.querySelector("#city").value}`)
        .then(response => response.json())
        .then(renderBreweriesWithInnerHTML)
})

document.querySelector("#loc-search a").addEventListener("click", (event) => {
    event.preventDefault();
    getCoords()
        .then(([lat, long]) => {
            console.log(lat, long)
            fetch(`https://api.openbrewerydb.org/breweries?by_dist=${lat},${long}`)
                .then(response => response.json())
                .then(renderBreweriesWithCreate)
        })
})