import "./style.css";
const URL = "https://deelly.com/api/nearby_deals/";

async function getData() {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const res = await response.json();
        console.log(`Fetched ${res.data.length} records.`);
        return res.data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const center = { lat: 31.520, lng: 74.358 };
    const map = new Map(document.getElementById("map"), {
        zoom: 10,
        center,
        mapId: "4504f8b37365c3d0",
    });

    const restaurants = await getData();
    for (const restaurant of restaurants) {

        const name = restaurant ? restaurant.store?.name || "Restaurant" : "Restaurant";

        const position = {
            lat: parseFloat(restaurant.location.lat),
            lng: parseFloat(restaurant.location.lng)
        };

        const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            content: buildContent(restaurant),
            position,
            title: name,
        });

        marker.addListener("click", () => {
            toggleHighlight(marker, restaurant);
        });
    }

}



function toggleHighlight(markerView, property) {
    if (markerView.content.classList.contains("highlight")) {
        markerView.content.classList.remove("highlight");
        markerView.zIndex = null;
    } else {
        markerView.content.classList.add("highlight");
        markerView.zIndex = 1;
    }
}

function buildContent(restaurant) {
    const content = document.createElement("div");
    const name = restaurant ? restaurant.store?.name || "Restaurant" : "Restaurant";

    content.classList.add("restaurent");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa-solid fa-hotel" title="${name}"></i>
          <span class="fa-sr-only">${name}</span>
      </div>
      <div class="details">
          <div class="price">${name}</div>
          <div class="address">${name}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${name}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${name}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${name} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
}
initMap();

const counterSection = document.getElementById('counter-section');


const startAnimation = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    counters.forEach(counter => {
        const animate = () => {
            debugger;
            const value = +counter.getAttribute('till');
            const data = +counter.innerText;

            const time = value / speed;
            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = `${value}+`;
            }
        };

        animate();
    });
};

const checkVisibility = () => {
    if (counterSection.getBoundingClientRect().top < window.innerHeight) {
        startAnimation();
        window.removeEventListener('scroll', checkVisibility);
    }
};


window.addEventListener('scroll', checkVisibility);


