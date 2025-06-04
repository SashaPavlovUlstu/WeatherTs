import './App.scss'
import Header from "./components/Header/Header.tsx";
import FIlterBar from "./components/FilterBar/FIlterBar.tsx";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast.tsx";
import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard.tsx";
import TodaysOverview from "./components/TodaysOverview/TodaysOverview.tsx";
import { WeatherProvider } from "./context/WeatherContext.tsx";
function App() {
    return (
        <div className="app">
            <WeatherProvider>
                <Header />
                <FIlterBar/>
                <WeatherForecast  />
                <TodaysOverview/>
                <WeatherDashboard/>
            </WeatherProvider>
        </div>
    )
}

export default App