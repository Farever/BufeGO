import MonthlyRatingChart from "../components/MontlyRatingChart";
import MonthlyIncomeChart from "../components/MonthlyIncomeChart";
import CurrentRatingCard from "../components/CurrentRatingCard";
import BestSellingProducts from "../components/BestSellingProducts";


function StatisticsPage()
{
    return(
        <>
            <h1 className='mx-2'>Statisztika</h1>
            <div className='row'>
                <CurrentRatingCard></CurrentRatingCard>
                <MonthlyRatingChart></MonthlyRatingChart>
                <MonthlyIncomeChart></MonthlyIncomeChart>
                <h1 className='text-center m-4'>Legtöbbet eladott (elmúlt 1 hónap adata)</h1>
                <BestSellingProducts></BestSellingProducts>
            </div>
        </>
    )
}

export default StatisticsPage;