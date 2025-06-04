import Container from "../Container/Container.tsx";
import cs from "./FilterBar.module.scss"
const FIlterBar = () => {
    return (
        <Container style={{marginTop:30, marginBottom:30}}>
            <div>
                <button className={cs.tabButton}>Today</button>
                <button className={cs.tabButton}>Tomorrow</button>
                <button className={`${cs.tabButton} ${cs.activeTab}`}>Next 7 days</button>
            </div>
        </Container>
    );
};

export default FIlterBar;