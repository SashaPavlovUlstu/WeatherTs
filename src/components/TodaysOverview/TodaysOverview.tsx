import React from 'react';
import Container from "../Container/Container.tsx";
import cs from "./TodaysOverview.module.scss"
const TodaysOverview = () => {
    return (
        <Container style={{ marginBottom: 30 }}>
            <div className={cs.OverviewWrapper}>
                <h1>Today's Overview</h1>
                <div className={cs.rightText}>
                    <h2>Other Cities</h2>
                    <h3>See All</h3>
                </div>
            </div>
        </Container>
    );
};

export default TodaysOverview;