import "./style.css";

// Initialize and add the map
let map;

async function initMap() {
    // The location of Dubai
    const position = { lat: 25.219, lng: 55.407 };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at Dubai
    map = new Map(document.getElementById("map"), {
        zoom: 12,
        center: position,
        mapId: "4504f8b37365c3d0",
    });

    // The marker, positioned at Dubai
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Dubai",
    });
}

initMap();