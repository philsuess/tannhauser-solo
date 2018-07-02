# Hello World!

It's time to introduce your module to the app. To do this,

1.  Create the file `constants.ts` and write only one line in there: `export const NAME = 'myeffinawesometodo';`. This is now how our module is called on the outside - the real world.
1.  Also in the file `constants.ts`, 
    ```typescript
    import * as model from './model';
    ```
    and then declare that our state in the model will be part of the global state like this:
    ```typescript
    export interface GlobalState {
      [NAME]: model.TodoState;
    }
    ``` 
1.  Create the file `reducer.ts` and write the following in there:
    ```typescript
    import { Action } from 'redux';
    import * as model from './model';
    
    const initialState: model.TodoState = { 
      todos: [],
      currentTodoInput: '',
    };
    
    export default function reducer(state: model.TodoState, action: Action): model.TodoState {
      if (!state) {
        return initialState;
      }

      // more sensible stuff to come here later

      return state;
    }
    ```
    This does many things at once. Let's break it down:
    *  Note how we can import everything from a file in one line (by using the '*') and give it a name. Then we can access each imported element via its name, 
        separated by '.' (`model.TodoState`), kinda like if each imported element was a member of `model`. It makes the code nice and readable.
    *  Without giving away too much (we will come back to the reducer later), think of the reducer as a function mapping state onto state (that is, the state 
        of the module - our model!). It also gets an action which specifies exactly how the state should be updated. But more on that later. Right now our 
        reducer is the identity mapping of the state, once it has been initialized to its `initialState`.
1.  Create the file `index.ts` and write the following in there:
    ```typescript
    import { NAME, GlobalState } from './constants';
    import reducer from './reducer';

    export default { NAME, reducer };
    export { GlobalState };
    ```
    We will use these exports in the next step.
1.  To update the global state, open the file `state.ts` and 
    *  `import * as mytodos from 'modules/mytodos'; ` (or however you named it) at top of the file
    *  append `mytodos.GlobalState` using an '&' to the `State` type declaration
1.  In the file `redux/state.ts`,
    *  add `import mytodos from './modules/mytodos';` (or however you named it) at top of the file
    *  add `[mytodos.NAME]: mytodos.reducer,` in the `combineReducers` object (don't forget the trailing comma!). This registers our module with the global reducer 
        and our state is now a part of the global state. Go ahead and search the web how to display the state using the redux developper tools 
        in chrome and check it out. You should see your `initialState` as part of the global state now, using the `mytodos.NAME` as the identifier.
