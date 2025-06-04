import { useState, useEffect, useCallback } from 'react';
import {fetchWeather, fetchWeatherWeekly} from '../../src/Services/Service.ts';


interface UseWeatherFetchResult {
    weatherData?: any | null;
    fetchWeather?: (cityName: string) => Promise<void>;
    setCurrentCity?: (city: string) => void;
    weeklyForecast?: any[] | null;
    fetchWeeklyForecast?: (cityName: string) => Promise<void>;
    singleCity?:any[] | null;
    fetchSingleCity?: (cityName: string[]) => Promise<void>;
}

export const useWeatherFetch = (сity: string = 'London'): UseWeatherFetchResult => {
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [currentCity, setCurrentCity] = useState<string>(сity);
    const [weeklyForecast, setWeeklyForecast] = useState<any[] | null>(null);
    const [singleCity,setSingleCity] = useState<any[]>([]);
    const fetchWeatherHandler = useCallback(async(cityName:string)=>{
        try{
            const data = await fetchWeather(cityName);
            setWeatherData(data);
        }
        catch(error){
            console.log("Произошла ошибка");
        }
    },[])
    const fetchWeatherWeeklyHandler = useCallback(async(cityName:string)=>{
        try{
            const data = await fetchWeatherWeekly(cityName);
            setWeeklyForecast(data);
        }
        catch(error){
            console.log("Произошла ошибка");
        }
    },[])
    const fetchSingleHandler = useCallback(async(cityNames:string[])=>{
        try{
            const  response  = cityNames.map(city =>fetchWeather(city));
            const data  = await Promise.all(response);
            setSingleCity(data)
        }
        catch(error){
            console.log("Произошла ошибка");
        }
    },[])
    useEffect(() => {
        const handler = setTimeout(()=>{
            fetchWeatherHandler(currentCity);
            fetchWeatherWeeklyHandler(currentCity);
        }, 1000);
        return () => {
            clearTimeout(handler);
        }
    },[currentCity,fetchWeather,fetchWeatherWeekly]);
    return {weatherData,
        fetchWeather:fetchWeatherHandler,
        fetchWeeklyForecast: fetchWeatherWeeklyHandler,
        setCurrentCity,
        weeklyForecast,
        singleCity,
        fetchSingleCity:fetchSingleHandler
    };
};