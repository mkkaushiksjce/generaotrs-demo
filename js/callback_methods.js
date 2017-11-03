const getAddress = (locationDetails, successCallback, failureCallback) => {
    let address = null;
    if(locationDetails.results[0].formatted_address){
            address = locationDetails.results[0].formatted_address;
    }
    if (address) {
        successCallback(address);
    } else {
        failureCallback('Cannot get country name');
    }
};


const getLocationDetails = (params, successCallBack, FailureCallback) => {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        url: googleGeocode + '?latlng=' + params.latitude + ',' + params.longitude + '&sensor=' + params.sensor,
        success: function (successData) {
            successCallBack(successData);
        },
        error: function (errorData) {
            FailureCallback(errorData);
            console.log('errorData', errorData);
        }
    });
};