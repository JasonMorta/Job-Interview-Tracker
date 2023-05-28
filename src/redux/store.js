// Importing the `configureStore` function from the `@reduxjs/toolkit` package
import { configureStore } from '@reduxjs/toolkit';

// Importing the `counterReducer` from the "./crudSlice" file
import tableReducer from './crudSlice.js';

// Creating a Redux store using the `configureStore` function

export default  configureStore({
    // Configuring the reducer for the store
    reducer: {
        // Assigning the `tableReducer` to the `crud` slice of the store
        crud: tableReducer
    }
});


/* 
In Redux, a reducer is a pure function that takes the current state and an action as input and produces a new state. 
It "reduces" the previous state and the dispatched action to compute the new state of the application.

The name "reducer" may seem a bit misleading since it doesn't necessarily perform mathematical reduction operations. 
Instead, it captures the idea of taking the current state and an action and reducing them to produce a new state. 
The reducer function embodies the logic for updating the state based on the action type and payload
*/