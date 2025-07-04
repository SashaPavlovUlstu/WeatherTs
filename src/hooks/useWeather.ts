import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeather must be used within a WeatherContext");
    }
    return context;
};