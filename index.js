/*
Cake Shop:

Entities: 

Me --> wanna buy cake;
store --> store full of cakes.
shelf --> A place which stores a list of cakes.
cake --> a single cake in a list of cakes.
intention --> buying a cake;
shopkeeper --> helps me by a cake by managing the store for me.


STEPs: 1> I must pass an action --> BUY_CAKE to the shopkeeper;
       2> The shopkeeper --> Gets me a cake, issues a bill that states one cake is gone from the shelf.
       3> The store is now updated. (One of the cakes is now gone and the fact is known to the store).
*/

import redux, { combineReducers } from "redux";
const BUY_CAKE = "BUY_CAKE";

// this is our initial cake;
const initialState = {
  NoOfCakes: 10,
};

// action creator == returns an action.
function buyCake() {
  // This is the action. it consists of a type (and usually, a payload as well)
  return {
    type: BUY_CAKE,
    info: "CAKE--",
  };
}

// This is a reducer, a reducer takes the current state and an action
// and it spits out a changed state that is used to update the store

const cakeReducer = (state = initialState, action) => {
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

// we initialize a store. This is our global object that holds all the states.
const store = redux.createStore(cakeReducer);
console.log("initial state", store.getState());

// store.subscribe is used to attach a listner to the global store.
// A listner oversees changes in the global state.
// It is called everytime an action is dispatched.
// The subscribe function returns an unsubscribe function.
//  unsubscribe is used to remove the current listner.

const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();
