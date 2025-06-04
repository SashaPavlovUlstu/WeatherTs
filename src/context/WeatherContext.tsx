import React, { createContext, type FC, useCallback, useState } from 'react';
import { useWeatherFetch } from "../hooks/useWeatherFetch.ts";

interface WeatherContextType {
    weatherData: any | null;
    weeklyForecast: any[] | null;
    city: string;
    setCity: (city: string) => void;
    refetchWeather: () => void;
    singleCity: any[] | null;
    fetchSingleCity: (cityNames: string[]) => Promise<void>;
}

// 1. Именованный экспорт самого объекта контекста (имя WeatherContext)
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// 2. Именованный экспорт компонента-провайдера (имя WeatherProvider)
export const WeatherProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [city, setCity] = useState<string>("london");

    const { weatherData,weeklyForecast, fetchWeather: fetchWeatherFromHook,fetchWeeklyForecast,singleCity,fetchSingleCity } = useWeatherFetch(city);

    const refetchWeather = useCallback(() => {
        fetchWeatherFromHook(city);
        fetchWeeklyForecast(city);
    }, [city, fetchWeatherFromHook,fetchWeeklyForecast]);

    const contextValue: WeatherContextType = {
        weatherData,
        weeklyForecast,
        city,
        setCity,
        refetchWeather,
        singleCity,
        fetchSingleCity:fetchSingleCity ?? (async () => {})
    };

    return (
        <WeatherContext.Provider value={contextValue}>
            {children}
        </WeatherContext.Provider>
    );
};
