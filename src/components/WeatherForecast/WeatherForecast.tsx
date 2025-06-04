import  {useEffect} from 'react';
import Container from "../Container/Container.tsx";

import cs from "./WeatherForecast.module.scss"

import {useWeather} from "../../hooks/useWeather.ts";

const WeatherForecast = () => {
    const { weatherData,weeklyForecast} = useWeather();

    useEffect(()=>{
        if(weatherData){
            //console.log(weatherData);
        }
    },[weatherData]);
    useEffect(()=>{
        if(weeklyForecast){
            //console.log(weeklyForecast);
        }
    },[weeklyForecast]);

    const today = new Date().toLocaleDateString('en-En', { weekday: 'long' });
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return (
        <Container style={{ margin: 31 }} >
            <div className={cs.wrapper}>
                <div className={cs.CurrentWeather}>
                    <div className={cs.HeaderWeather}>
                            <span className={cs.day}>{today}</span>
                        <span className={cs.time}>{time}</span>
                    </div>
                    <div className={cs.mainWeather}>
                        <h1 className={cs.temperature}>{weatherData?.main.temp}</h1>
                        <img className={cs.weatherIconBig} src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} />
                    </div>
                    <div className={cs.lowWeather}>
                        <div className={cs.details}>
                            <p>Real Feel <span>{weatherData?.main?.feels_like}</span></p>
                            <p>Wind N-E <span>{weatherData?.wind.speed}</span></p>
                            <p>Pressure <span>{weatherData?.main?.pressure}</span></p>
                            <p>Humidity <span>{weatherData?.main?.humidity + " %"}</span></p>
                        </div>
                        <div className={cs.sunTimes}>
                            <p>Sunrise <span>{new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })+" AM"}</span></p>
                            <p>Sunset <span>{new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })+" PM"}</span></p>
                        </div>
                    </div>
                </div>
                {
                    weeklyForecast?.map(day=>
                        (
                                <div key={day.dt} className={cs.dayCard}>
                        <span className={cs.dayName}>
                          {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                        </span>
                                    <hr />
                                    <img
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                        alt={day.weather[0].description}
                                        className={cs.weatherIconBig}
                                    />
                                    <span className={cs.dayTemp}>{Math.round(day.temp.day)}°</span>
                                </div>
                    ))
                }

            </div>

        </Container>
    );
};

export default WeatherForecast;