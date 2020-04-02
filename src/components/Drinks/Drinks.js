import React, { useEffect, useState } from "react";
import "./Drinks.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Drinks() {
  const CartDrinks = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [drinks, setDrinks] = useState("");

  useEffect(() => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        setDrinks(data.drinks);
      });
  }, []);
  const addDrink = (drink, img, name) => {
    dispatch({
      type: "ADD_DRINK",
      payload: {
        id: drink,
        name: name,
        img: img
      }
    });
  };

  return (
    <div className="drinksWrapper">
      <h1 className="drinksTitle">Cocktail Selection</h1>
      <div className="drinksContent">
        {drinks
          ? drinks.map(drink => {
            return (
              <div
                className="drinkBlock"
                key={drink.idDrink}
                onClick={() => {
                  addDrink(
                    drink.idDrink,
                    drink.strDrinkThumb,
                    drink.strDrink
                  );
                }}
              >
                <div className='drinkName'>{drink.strDrink}</div>
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="cocktail"
                  draggable="false"
                ></img>
                {CartDrinks.map(drinkRedux => {
                  return (
                    <div key={drinkRedux.id} className='drinksAdded'>
                      {drinkRedux.id === drink.idDrink ? 'x' + drinkRedux.amount : null}
                    </div>
                  );
                })}
                <div className='redButton'>ADD TO CART</div>
              </div>
            );
          })
          : null}
      </div>
    </div>
  );
}

export default Drinks;
