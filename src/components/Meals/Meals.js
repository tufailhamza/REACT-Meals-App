import { Fragment } from 'react';
import AvailaibleMeals from './AvailaibleMeals';
import MealsSummary from './MealsSummary'
const Meals=()=>
{
    return(
    <Fragment>
        <MealsSummary/>
        <AvailaibleMeals/>
    </Fragment>
    )
}
export default Meals;