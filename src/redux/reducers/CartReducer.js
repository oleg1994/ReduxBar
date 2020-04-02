const initialState = [];

const CartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let randomPriceGenerator = Math.floor(1 + Math.random() * 5);

  switch (type) {
    case "ADD_DRINK":
      let foundIndex = state.findIndex(x => x.id === payload.id);
      if (foundIndex !== -1) {
        state[foundIndex].amount = state[foundIndex].amount + 1;
        state[foundIndex].total = state[foundIndex].price * state[foundIndex].amount;
        return [...state];
      } else {
        return [
          ...state,
          {
            id: payload.id,
            name: payload.name,
            img: payload.img,
            amount: 1,
            price: randomPriceGenerator,
            total: randomPriceGenerator * 1
          }
        ];
      }
    case "DELETE_DRINK":
      const copyState = [...state];
      //find id of object to remove
      const i = copyState.findIndex(x => x.id === payload.id);
      copyState.splice(i, 1);
      return [...copyState];

    case "MODIFY_DRINK_AMOUNT":
      let modifyIndex = state.findIndex(x => x.id === payload.id);
      if (modifyIndex !== -1) {
        if (payload.modify === "minus" && state[modifyIndex].amount !== 1) {
          //remove one from amount
          state[modifyIndex].amount = state[modifyIndex].amount - 1;
          //update total price of the cocktails, drink amount*drink price
          state[modifyIndex].total =
            state[modifyIndex].amount * state[modifyIndex].price;
          return [...state];
        }
        if (payload.modify === "plus") {
          //add one to amount
          state[modifyIndex].amount = state[modifyIndex].amount + 1;
          //update total price of the cocktails, drink amount*drink price
          state[modifyIndex].total =
            state[modifyIndex].amount * state[modifyIndex].price;
          return [...state];
        } else {
          return state;
        }
      }
      break;
    case "CLEAR_CART":
      if (payload.cart === "clear") {
        return (state = []);
      }
      break;
    default:
      return state;
  }
};

export default CartReducer;
