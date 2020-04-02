import React, { useState } from "react";
import "./Cart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Cart() {
  const CartDrinks = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [purchased, setpurchased] = useState(false);

  const removeDrink = id => {
    dispatch({
      type: "DELETE_DRINK",
      payload: {
        id: id
      }
    });
  };
  const clearCart = () => {
    setpurchased(false);
    dispatch({
      type: "CLEAR_CART",
      payload: {
        cart: "clear"
      }
    });
  };
  const modifyDrinkAmount = (id, modification) => {
    dispatch({
      type: "MODIFY_DRINK_AMOUNT",
      payload: {
        id: id,
        modify: modification
      }
    });
  };
  return (
    <div className="cartWrapper">
      <div className="cartDrinks">
        {CartDrinks.length ? (
          CartDrinks.map(drink => {
            return (
              <div className="drinkCart" key={drink.id}>
                <img
                  src={drink.img}
                  alt={drink.name}
                  className="cocktailImg"
                  draggable={false}
                ></img>
                <div className="drinkName">{drink.name}</div>
                <div className="drinkPrice">
                  {drink.price * drink.amount + "$"}
                </div>
                <div className="drinkAmount">
                  <div
                    onClick={() => {
                      modifyDrinkAmount(drink.id, "minus");
                    }}
                    className="modifySymbol"
                    style={
                      drink.amount === 1 ? { cursor: "not-allowed" } : null
                    }
                  >
                    -
                  </div>
                  {drink.amount}
                  <div
                    onClick={() => {
                      modifyDrinkAmount(drink.id, "plus");
                    }}
                    className="modifySymbol"
                  >
                    +
                  </div>
                </div>
                <div
                  onClick={() => {
                    removeDrink(drink.id);
                  }}
                  className="removeButton"
                >
                  REMOVE
                </div>
              </div>
            );
          })
        ) : (
            <div>
              You didn't select any drinks mate, what are you doing here
            </div>
          )}
      </div>
      <div className="cartSummary">
        <h1>Total</h1>
        <div>US ${CartDrinks.reduce((a, { total }) => a + total, 0)}</div>
        <div
          className="redButton"
          onClick={() => {
            setpurchased(true);
          }}
        >
          PURCHASE
        </div>
      </div>
      {purchased ? (
        <div className="purchasedWrapper">
          <div className="purchaseSuccess">
            {CartDrinks.length === 0
              ? "The cart is empty!"
              : "Thanks for purchasing those mock cocktails!"}
            <div
              onClick={() => {
                clearCart();
              }}
              className="redButton"
            >
              OK
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
