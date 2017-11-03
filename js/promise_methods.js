const getAddressPromise = (locationDetails) => {
    let countryName = null;
    const promise = new Promise((resolve, reject) => {
       let address = '';
        if(locationDetails.results[0].formatted_address){
            address = locationDetails.results[0].formatted_address;
            resolve(address);
        }else{
            reject('Cannot get address');
        }
    });
    return promise;
};

const getLocationDetailsPromise = (params) => {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            url: googleGeocode + '?latlng=' + params.latitude + ',' + params.longitude + '&sensor=' + params.sensor,
            success: function (successData) {
                resolve(successData);
            },
            error: function (errorData) {
                reject(errorData);
            }
        });
    });
    return promise;
};

const getCurrentPositionPromise = () => {
    const promise = new Promise((resolve, reject)=>{
        if(!navigator.geolocation){
            reject("Please allow location access");
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            resolve(position);
        }, (error)=>{
            reject(error.message);
        });
    });
    return promise;
};

function hello(){
    console.log('hello');
}