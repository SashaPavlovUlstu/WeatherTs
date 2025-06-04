import {useEffect, useMemo} from 'react';
import Container from "../Container/Container.tsx";
import cs from "./WeatherDashboard.module.scss"
import icon from "../../assets/icon.png"
import humidity from "../../assets/humidity.png"
import UV from "../../assets/UV.png"
import status from "../../assets/Status.png"
import {useWeather} from "../../hooks/useWeather.ts";
import WeatherDashboardItem from "./WeatherDashboardItem.tsx";

const WeatherDashboard = () => {
    const { weatherData} = useWeather();
    const cities = useMemo(()=>["Moscow","Ulyanovsk","California","Tokyo"],[])
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const { singleCity, fetchSingleCity } = useWeather();
    console.log(JSON.stringify(singleCity, null, 2));
    useEffect(()=>{
        fetchSingleCity(cities)
    },[cities,fetchSingleCity]);
    const cardsData = [
        {
            title: "Wind Status",
            imgSrc: status,
            values: [
                { text: weatherData?.wind.speed + " KM", className: cs.supTitle },
                { text: time, className: cs.lowSup },
            ],
        },
        {
            title: "UV Indesx",
            imgSrc: UV,
            values: [{ text: "5.50 UV", className: cs.supTitle }],
        },
        {
            title: "Humidity",
            imgSrc: humidity,
            values: [
                { text: weatherData?.main.humidity + " %", className: cs.supTitle },
                { text: "The dew point is 270 right now", className: cs.lowSup },
            ],
        },
        {
            title: "Visibility",
            imgSrc: icon,
            values: [
                { text: (weatherData?.visibility) / 1000 + " KM", className: cs.supTitle },
                { text: "Haze is affecting visibility", className: cs.lowSup },
            ],
        },
    ];


    useEffect(()=>{
        if(weatherData){
            console.log(weatherData);
        }
    },[weatherData]);
    return (
        <Container style={{ paddingBottom: 26 }} >
            <div className={cs.wrapper}>
                <div className={cs.leftSection}>
                    {cardsData.map(({ title, imgSrc, values }, index) => (
                        <div className={cs.card} key={index}>
                            <h1 className={cs.title}>{title}</h1>
                            <img
                                className={
                                    title === "Wind Status"
                                        ? [cs.img, cs.status].join(" ")
                                        : cs.img
                                }
                                src={imgSrc}
                                alt={title}
                            />
                            <div className={cs.low}>
                                {values.map(({ text, className }, i) =>
                                        className === cs.supTitle ? (
                                            <h1 key={i} className={className}>
                                                {text}
                                            </h1>
                                        ) : (
                                            <span key={i} className={className}>
                {text}
              </span>
                                        )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cs.mainSection}>
                    <p>Explore global map of wind
                        weather and ocean condition </p>
                        <button>Get started</button>
                </div>
                <div className={cs.rightSection}>
                    {
                        singleCity?.map(cityData =>
                            (
                            <WeatherDashboardItem key={cityData.id} weatherData={cityData}/>
                        ))
                    }
                </div>
            </div>


        </Container>
    );
};

export default WeatherDashboard;