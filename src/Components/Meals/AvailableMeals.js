import React, { useEffect, useState } from "react";
import Card from "../UI/Card";

// Importing Components
import MealItem from "./MealItem/MealItem";

// Importing styles
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    setIsLoading(true);
    // function to fetch the meals from the API starts
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-app-2022-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went Worng");
      }

      const responseDate = await response.json();
      const loadedMeals = [];
      console.log(responseDate);
      for (const key in responseDate) {
        loadedMeals.push({
          id: key,
          title: responseDate[key].name,
          description: responseDate[key].description,
          price: responseDate[key].price,
        });
      }
      console.log(loadedMeals);
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // function to fetch the meals from the API ends

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading...</p>;
  }

  if (httpError) {
    return <p className={classes.MealsError}>{httpError}</p>;
  }

  const mealslist = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.title}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealslist}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
