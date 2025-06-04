
import cs from "./Header.module.scss";
import Container from "../Container/Container.tsx";
import { FaSearch } from "react-icons/fa";
import Input from "../UI/Input/Input.tsx";
import {useWeather} from "../../hooks/useWeather.ts";


const Header = () => {
    const { city, setCity, refetchWeather } = useWeather();


    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        refetchWeather();
    };


    return (
        <Container style={{ paddingTop: 30 }}>
            <header className={cs.header}>
                <div className={cs.leftSection}>
                    <span className="location">{city}</span>
                </div>
                <div className={cs.centerSection}>
                    <form onSubmit={handleSubmit} className={cs.searchForm}>
                        <FaSearch className={cs.searchIcon} onClick={refetchWeather} />
                        <Input
                            value={city}
                            onChange={changeHandler}
                            placeholder="Поиск города..."
                        />
                        <button type="submit" style={{ display: 'none' }}></button>
                    </form>
                </div>
                <div className={cs.rightSection}>
                    <h1 className={cs.weatherHeader}>Weather</h1>
                </div>
            </header>
        </Container>
    );
};

export default Header;