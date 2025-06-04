import  axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY_WEATHER
const URL = "https://api.openweathermap.org/data/2.5/weather"
const URL7DAYS = "https://api.openweathermap.org/data/2.5/forecast"
export async function fetchWeather(city:string): Promise<any> {
    try{
        // @ts-ignore
        const response = await axios.get(URL,{
            // @ts-ignore
            params:{
                q:city,
                appid:API_KEY,
                units:'metric',
                lang:"en"
        }
        })
        //console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err.message)
    }
}

export const fetchWeatherWeekly= async(city:string) =>{
    try{
        const responce = await axios.get(URL7DAYS,{
            params:{
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'en',

            }
        })
        console.log(responce.data);
        const list = responce.data.list
        const groupedByDay = list.reduce((acc: Record<string, any>, item: any) => {
            const date = item.dt_txt.split(' ')[0];
            if (!acc[date]) {
                acc[date] = {
                    date,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    temp_sum: item.main.temp,
                    count: 1,
                    weather: item.weather[0],
                };
            } else {
                acc[date].temp_min = Math.min(acc[date].temp_min, item.main.temp_min);
                acc[date].temp_max = Math.max(acc[date].temp_max, item.main.temp_max);
                acc[date].temp_sum += item.main.temp;
                acc[date].count += 1;
            }
            return acc;
        }, {});

        const dailyForecast = Object.values(groupedByDay).map(day => ({
            dt: new Date(day.date).getTime() / 1000,  // UNIX timestamp в секундах
            temp: {
                day: Math.round(day.temp_sum / day.count),
                min: Math.round(day.temp_min),
                max: Math.round(day.temp_max),
            },
            weather: [day.weather],
        }));
        return dailyForecast;
    }
    catch(err){
        console.log(err.message)
        return null;
    }
}