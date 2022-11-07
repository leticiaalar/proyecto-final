//url
const API = `https://api.openweathermap.org/data/2.5/weather?q=Paraguay&appid=5dffa6cb770a10c8f7e64eab8ba5a960`;
//Capturar los nodos
const temperaturaValor = document.getElementById('temperatura-valor');
const temperaturaDescripcion = document.getElementById('temperatura-descripcion');
const ubicacion = document.getElementById('ubicacion');
const icono = document.getElementById('icono');
const velocidadViento = document.getElementById('viento-velocidad');
const buscadorDiv = document.getElementById('buscardor');
const botonBuscar = document.getElementById('boton-buscar')
const textInput = document.getElementById('buscar');
const mensajeError = document.getElementById('error-input');
const iconBtn = document.getElementById('icon-location');
const temperaturaMin = document.querySelector('.min');
const temperaturaMax = document.querySelector('.max');

//Peticion a API 
const peticionAPI = (API) => {
    fetch(API)
    .then(response => response.json())
    .then(data => {
      const temperatura = Math.round(data.main.temp);
      const temperaturaGrados = temperatura - 273;
      temperaturaValor.innerHTML = `${temperaturaGrados} °C`;
      const tempMin = Math.round((data.main.temp_min) - 273);
      temperaturaMin.innerHTML = `Min: ${tempMin}°C <i class="ri-temp-hot-fill"></i>`;
      const tempMax = Math.round((data.main.temp_max) - 273);
      temperaturaMax.innerHTML = `Max: ${tempMax} °C <i class="ri-temp-hot-fill"></i>`;
      const descripcion = data.weather[0].description;
      temperaturaDescripcion.innerHTML = descripcion.toUpperCase();
      const ubicacionActual = data.name;
      ubicacion.innerHTML = ubicacionActual;
      const viento = data.wind.speed;
      velocidadViento.innerHTML = `Wind: ${viento} m/s`; 
      agregarIconos(data.weather[0].main);   
    })
}
//Clima por defecto 
peticionAPI(API);
//Evento click 
botonBuscar.addEventListener('click', () => {
    if(textInput.value != ""){
      const texto = textInput.value.toUpperCase();
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${texto}&appid=5dffa6cb770a10c8f7e64eab8ba5a960`;
      peticionAPI(API).catch(error => {
        console.log(error);
      });
    } else {
      mensajeError.innerHTML = 'Please enter a city or country ';
      mensajeError.style.color = 'red';
    }
    setTimeout(() => {
      mensajeError.innerHTML = '';
      mensajeError.style.color = '';
      textInput.value = '';
    }, 5000);
})

// Consultar clima por geolocalizacion
iconBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(posicion => {
      //guardar la longitud y latitud
      const latitude = posicion.coords.latitude;
      const longitude = posicion.coords.longitude;
      //url de la api
      const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5dffa6cb770a10c8f7e64eab8ba5a960`;
      peticionAPI(API);
  }, error => {
      location.reload();
  })
  setTimeout(() => {
    textInput.value = '';
  }, 5000);
})

//Funcion para agregar iconos
const agregarIconos = (data) => {
    switch (data) {
      case 'Clear': icono.src = 'icon/day.svg'
        break;
      case 'Clouds': icono.src = 'icon/cloudy-day-1.svg'
        break;
      case 'Thunderstorm': icono.src='icono/thunder.svg'
        break;
      case 'Drizzle': icono.src='icono/rainy-2.svg'
        break;
      case 'Rain': icono.src='icono/rainy-7.svg'
        break;
      case 'Snow': icono.src='icono/snowy-6.svg'
        break; 
      case 'Atmosphere': iconoAnimado.src='icono/weather.svg'
        break;  
      case 'Clouds': iconoAnimado.src='icono/cloudy-day-1.svg'
        break;  
      default: iconoAnimado.src='icono/cloudy-day-1.svg'
    }
} 





