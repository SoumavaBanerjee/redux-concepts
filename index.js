/*
Cake and Ice-cream Shop:

Entities: 

Me --> wanna buy cake/iceCream (or both!);
store --> store full of cakes/Ice-creams.
shelf --> A place which stores a list of cakes and iceCreams.
cake --> a single cake in a list of cakes.
IceCream --> a single iceCream in a list of iceCreams.
intention_1 --> buying a cake;
intention_2 --> buying a iceCream;
shopkeeper_1 --> helps me by a cake by managing the store for me.
shopkeeper_1 --> helps me by an IceCream by managing the store for me.


STEPs: 1> I must pass an action --> BUY_CAKE/BUY_ICECREAM to the shopkeeper;
       2> The shopkeeper --> Gets me a cake/ice-cream, issues a bill that states one cake is gone from the shelf.
       3> The store is now updated. (One of the cakes is now gone and the fact is known to the store).
    NOTE: Since there are two reducer, we need to combine them into a single reducer.
*/

import redux, { combineReducers } from "redux";
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// this is our initial cake;
const cakeState = {
  NoOfCakes: 10,
};

const iceCreamState = {
  NoOfIceCream: 20,
};

// action creator == returns an action.
function buyCake() {
  // This is the action. it consists of a type (and usually, a payload as well)
  return {
    type: BUY_CAKE,
    info: "CAKE--",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "ICE_CREAM--",
  };
}

// This is a reducer, a reducer takes the current state and an action
// and it spits out a changed state that is used to update the store

const cakeReducer = (state = cakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        NoOfCakes: state.NoOfCakes - 1,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        NoOfIceCream: state.NoOfIceCream - 1,
      };
    default:
      return state;
  }
};

// Before creating store, we will combine all the reducer into a single root-reducer

// Combine reducer takes an object, where key is a name for identification of the specific state
// and value is the corresponding reducers.

const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = redux.createStore(rootReducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
