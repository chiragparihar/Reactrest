import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItems/MealItem'
import {useEffect,useState} from 'react'

const AvailableMeals = () =>{
  const [meals,setMeals] = useState([]) 
  const [error,setError] = useState();
  const [load,setLoad] = useState(true);
  useEffect(()=>{
    const fetchMeals = async () =>{
      const response = await fetch('https://reactmeals-e0a9d-default-rtdb.firebaseio.com/meals.json')
      
      const resData = await response.json();
      let loadedMeals = [];
      for( const key in resData){
        loadedMeals.push({
          id:key,
          ...resData[key]
        })
      }
      setMeals(loadedMeals)
      setLoad(false)
    }
    
      fetchMeals().catch((err)=>{
        setError(err.message)
        setLoad(false)
      })
    
    
  },[])
  //fetch('https://reactmeals-e0a9d-default-rtdb.firebaseio.com/Items.json').then(res => res.json()).then(data =>console.log(data))
  
 
  if(load){
    return(
      <section className = {classes.MealsLoading}>
        <p>Loading ..</p>
      </section>
    )
  }  
  if(error){
    return(
      <p className= {classes.mealsError}>{error}</p>
    )
  }
  const mealsList = meals.map((meal)=>{
        return <MealItem key={meal.id} id ={meal.id} name= {meal.name} description = {meal.description} price = {meal.price}/>
    })
    return(
    
        <section className = {classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
    
}

export default AvailableMeals;