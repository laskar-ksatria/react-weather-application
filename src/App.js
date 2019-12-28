import React from 'react';

import Weather from './app_component/weather.component';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'

import 'weather-icons/css/weather-icons.css'

import Form from './app_component/form.component'

//api.openweathermap.org/data/2.5/weather?q=London

const API_KEY = '99a7db8ce1c413291bc66fac408570e3'



class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      city: null,
      country: null,
      icon: null,
      main: null,
      celcius: null,
      temp_min: null,
      temp_max: null,
      description: "",
      error: false,
      
    }
    

    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Dizzle: 'wi-sleet',
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    }

  }

  calCelcius(temp) {
    let cell = Math.floor(temp-273.15)
    return cell;
  }

  get_WeatherIcon = async (icons, rangeId) => {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Dizzle})
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain})
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow})
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere})
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Clear})
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Clouds})
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds})
    }
  }

  getWeather = async (e) => {
    e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
      const response = await api_call.json();
    
    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      temp_min: this.calCelcius(response.main.temp_min),
      temp_max: this.calCelcius(response.main.temp_max),
      celcius: this.calCelcius(response.main.temp),
      description: response.weather[0].description,
      
    })
    this.get_WeatherIcon(this.icon, response.weather[0].id);
    }else {
      this.setState({error: true})
    }

    
  }

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather}
          error={this.state.error}
        />
        <Weather 
        city={this.state.city} 
        
        temp_celcius={this.state.celcius} 
        minTemp={this.state.temp_min}
        maxTemp={this.state.temp_max}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    )
  }


}



export default App;
