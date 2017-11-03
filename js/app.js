const getCurrentLocationCallbackHell = () => {
    const location = {
        latitude: 0,
        longitude: 0,
        sensor: false
    };
    // get current Location
    if (navigator.geolocation) {
        // method1
        navigator.geolocation.getCurrentPosition((position) => {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            // method2
            getLocationDetails(location, (successData) => {
                // method3 
                getAddress(successData, (address) => {

                    document.getElementById('address').innerHTML = address;
                    // method4
                    // api call for get the shipments list based on current location and country name
                }, (errorData) => {
                    console.log('error', errorData)
                })
            }, (errorData) => {
                console.log('ReverseGeoCodeData-error', errorData);
            });
        }, (error) => {
            document.getElementById('address').innerHTML = error.message;
        });
    } else {
        console.log('Please allow location access');
    }

};

getCurrentLocationCallbackHell();

// continious promise chain example
const getCurrentLocationPromise = () => {
    let location = {
        latitude: 0,
        longitude: 0,
        sensor: false
    };
    let cords;
    let locationDetails;
    let address;
        // get current Location
        // method1
    getCurrentPositionPromise().then((position)=>{

        if(position && position.coords){
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
        }
        // method2;
        return getLocationDetailsPromise(location);
    }).then((locationDetails)=>{
        // method3
        return getAddressPromise(locationDetails);
    }).then((address)=>{
        document.getElementById('address').innerHTML = address;
    }).catch((error)=>{
        document.getElementById('address').innerHTML = error;
    });

};

// getCurrentLocationPromise();

function* getCurrentLocationGenerator() {

    const location = {
        latitude: 0,
        longitude: 0,
        sensor: false
    };
    try{
        // method1
        const position = yield getCurrentPositionHelper();

        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude; 
        // method2
        const locationDetails = yield getLocationDetailsHelper(location);
        // method3
        const address = getAddressHelper(locationDetails);

        document.getElementById('address').innerHTML = address;
    }catch(error){
        document.getElementById('address').innerHTML = error;
    }

}
const generator = getCurrentLocationGenerator();
// console.log('gen', generator.next().value);

