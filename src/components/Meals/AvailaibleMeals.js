import classes from './AvailaibleMeals.module.css'
import Card from '../UI/Card';
import MealItem from './Mealitem.js/MealItem';
import { useEffect, useState } from 'react';

  const AvailaibleMeals = () => {
    const [meals,setMeals] = useState([]);
    const [isLoading,setLoading] =useState(true);
    const [httpError,sethttpError] = useState(null);
    useEffect(()=>
    {
      const FetchMeals = async ()=>
      {
        const res =  await fetch('https://react-meals-4b0a7-default-rtdb.firebaseio.com/%20meals.json');
        if (!res.ok) {
          throw new Error('Something went Wrong!');
          
        }
        const data = await res.json();

        const LoadedMeals = [];
        for(const key in data)
        {
        LoadedMeals.push({
          id:key,
          name:data[key].name,
          description : data[key].description,
          price:data[key].price,
        })
        }
        
        setMeals(LoadedMeals);
        setLoading(false);
      }
      FetchMeals().catch(error =>
        {
          setLoading(false);
          sethttpError(error.message);
        });
    },[]);
    if (isLoading) {
      return <section className={classes.MealLoading}>
        <p>Loading</p>
      </section>
    }
    if (httpError) {
      return <section className={classes.MealError}>
        <p>{httpError}</p>
      </section>
    }
    const measllist= meals.map(meal=> <MealItem key={meal.id} id={meal.id} name={meal.name} price = {meal.price} description={meal.description}/>)

    return (

    <section className={classes.meals}>
         <Card>
            <ul>{measllist}</ul>
         </Card>
        
    </section>)
 }
export default AvailaibleMeals;