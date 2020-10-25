import React from "react";
import "./App.css";
import Weather from "./components/Weather.jsx";
import Form from "./components/Form.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

//test api call:
//api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_Key = "b06ca37a6a6f13ebeaf5ae4e7ea80dd0";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp_now: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
      Stars: "wi-stars",
    };
  }

  get_WeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: icons.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeID >= 700 && rangeID <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeID >= 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Stars });
    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country || city) {
      const api_call = await fetch(
        `HTTPS://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        temp_now: response.main.temp,
        temp_max: response.main.temp_max,
        temp_min: response.main.temp_min,
        description: response.weather[0].description,
        error: false,
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          weatherIcon={this.state.icon}
          temp_now={this.state.temp_now}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
