import  {type FC} from 'react';
import cs from "./WeatherDashboard.module.scss";



interface WeatherDashboardProps {
    weatherData:any;
}

const WeatherDashboardItem:FC<WeatherDashboardProps> = ({weatherData}) => {

    return (
        <div className={cs.rightWrapper}>
            <div className={cs.textWrapper}>
                <h2>{weatherData?.sys?.country}</h2>
                <h1>{weatherData?.name}</h1>
                <h3>{weatherData?.weather?.[0].main}</h3>
            </div>
            <img src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} alt=""/>
        </div>
    );
};

export default WeatherDashboardItem;