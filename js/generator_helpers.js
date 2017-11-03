function getCurrentPositionHelper(){
    if(!navigator.geolocation){
        generator.throw('Please allow location access');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        generator.next(position);
    }, (error)=>{
        generator.throw(new Error(error.message));
    });
};

function getLocationDetailsHelper(params){

    $.ajax({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        url: googleGeocode + '?latlng=' + params.latitude + ',' + params.longitude + '&sensor=' + params.sensor,
        success: function (successData) {
            generator.next(successData);
        },
        error: function (errorData) {
            console.log('error', errorData);
             generator.throw(errorData);
        }
    });
}

const getAddressHelper = (locationDetails) => {
    let address = '';
    if(locationDetails.results[0].formatted_address){
        address = locationDetails.results[0].formatted_address;
    }
    return address;
};