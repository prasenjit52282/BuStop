// feature : {position, type}
// position: new google.maps.LatLng(lat, long)
const addMarker = (coords, iconColor) => {
  console.log("In addMarker functions");
  let marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(coords.lat, coords.long),
    title: `(${coords.lat}, ${coords.long})`,
    icon: `http://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`
  });
  return marker;
};

const initialize = (coords, element) => {
  let markLAT = coords.lat;
  let markLNG = coords.long;

  let map = new google.maps.Map(element, {
    center: new google.maps.LatLng(markLAT, markLNG),
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  return map;
};