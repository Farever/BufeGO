import MonthlyRatingChart from "../components/MontlyRatingChart";
import MonthlyIncomeChart from "../components/MonthlyIncomeChart";
import CurrentRatingCard from "../components/CurrentRatingCard";
import BestSellingProducts from "../components/BestSellingProducts";

import React, {useContext } from 'react';
import { AdminBufeContext } from '../Contexts';
import PeakTime from "../components/PeakTime";
import { Col, Row } from "react-bootstrap";


function StatisticsPage()
{
    const {adminBufe} = useContext(AdminBufeContext);
    return(
        <>
            <h1 className='mx-2'>Statisztika</h1>
            <Row>
                <Col>
                    <CurrentRatingCard bufeId={adminBufe.id}></CurrentRatingCard>
                </Col>
                <Col>
                    <PeakTime bufeId={adminBufe.id}></PeakTime>
                </Col>
            </Row>
            <Row>
                <MonthlyRatingChart bufeId={adminBufe.id}></MonthlyRatingChart>
                <MonthlyIncomeChart bufeId={adminBufe.id}></MonthlyIncomeChart>
            </Row>
            <Row>
                <h1 className='text-center m-4'>Legtöbbet eladott (elmúlt 1 hónap adata)</h1>
                <BestSellingProducts bufeId={adminBufe.id}></BestSellingProducts>
            </Row>
        </>
    )
}

export default StatisticsPage;