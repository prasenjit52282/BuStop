map = initialize({lat: 23.68852, long:87.2564}, document.getElementById("map-canvas"));

const fileSelector = document.getElementById('file-selector');
const addMarkerButton = document.getElementById("add-marker");
const latitudeIn = document.getElementById("latitude");
const longitudeIn = document.getElementById("longitude");

addMarkerButton.onclick =  () => {
	console.log('Add Marker clicked');
	addMarker({lat: latitudeIn.value, long: longitudeIn.value}, 'green');
};


fileSelector.addEventListener('change', (event) => {
fileList = event.target.files;
console.log(fileList);
parseCSVs(fileList[0]);
});

const parseCSVs = (inputFile) => {
	Papa.parse(inputFile, {
	header: true,
	skipEmptyLines: true,
	complete: function(results) {
		results.data.forEach(obj => {
			addMarker({lat: obj.lat, long: obj.long}, 'red');
		})
	}
});
}