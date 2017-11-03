// add script tag
const scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=' + googleAPIKey ;
const script = document.createElement('script');
script.src = scriptSrc;
document.getElementsByTagName('body')[0].appendChild(script);