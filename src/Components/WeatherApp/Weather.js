import React, { useState } from 'react'
import './Weather.css';
import searchIcon from '../Assets/search.png';
import cloudIcon from '../Assets/cloud.png';
import humidity from '../Assets/humidity.png';
import wind from '../Assets/wind.png';
import clearIcon from '../Assets/clear.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
const Weather = () => {
    const [wicon,setWicon] = useState(cloudIcon);
    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        if(element[0].value === ''){
            return 0;
        }
        const api_key = 'd2a46f0d27881ec9472e25882506bbec';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
        
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            const humidity = document.getElementsByClassName('humidity-percent');
            const wind = document.getElementsByClassName('wind-percent');
            const temperature = document.getElementsByClassName('weather-temp');
            const location = document.getElementsByClassName('weather-location');

            wind[0].innerHTML = Math.floor(data.wind.speed)+' km/h';
            humidity[0].innerHTML = data.main.humidity+' %';
            temperature[0].innerHTML = Math.floor(data.main.temp)+' °C';
            location[0].innerHTML = data.name;

            if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n')
            {
                setWicon(clearIcon);
            }
            else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                setWicon(cloudIcon);
            }
            else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWicon(drizzleIcon);
            }
            else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWicon(drizzleIcon);
            }
            else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWicon(rainIcon);
            }
            else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                setWicon(rainIcon);
            }
            else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                setWicon(snowIcon);
            }
            else{
                setWicon(clearIcon);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
  return (
    <div className='container'>
      <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='search'/>
            <div className='search-icon' onClick={()=>{search()}}>
            <img src={searchIcon} alt='search '/>
            </div>
      </div>
      <div className='weather-image'>
            <img src={wicon} alt='weather'/>
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
            <div className='element'>
                <img src={humidity} alt='humidity' className='icon'/>
                <div className='data'>
                    <div className='humidity-percent'>64%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src={wind} alt='wind' className='icon'/>
                <div className='data'>
                    <div className='wind-percent'>18 km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Weather
