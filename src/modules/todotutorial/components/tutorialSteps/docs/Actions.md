# And ... ACTION!

Before we deal with coupling our views with the global state, we first define the interactions
as *actions* and how they should be dispatched to modify the global state. The REALLY interesting happens
in the reducer (later). So let's define the *add* action for our application.

But first, if you haven't done so, create the file `actions.ts`. We will only have one file
for the whole Todo module.

## Defining Actions
1. We will use the third-party library [typescript-fsa](https://www.npmjs.com/package/typescript-fsa) to
  help us with our action definitions. This package allows type-safe actions, which is a good thing. Import
  this:
  ```typescript
  import { actionCreatorFactory } from 'typescript-fsa';
  ```
  Simple.
2. We want typescript-fsa to handle the creation of action types for us. For this we will define all our
  actions with the help of an `actionCreator`. So we need the line
  ```typescript
  const createActionCreator = actionCreatorFactory();
  ```
3. Recall that the *add* action in the component had the signature `() => any`. Now write
   ```typescript
   export const todoAdd = createActionCreator('TODO_ADD');
   ```
   `createActionCreator` is a function and it creates another function.
   The first input is a string identifying the action, and possible following inputs are arguments the
   interaction requires to a *payload* object. We don't have anything further to add now, but we will
   have parameters for actions later on.

## One More ...
Just to get another example in here, we'll also do the `input_changed` action.
This will need a string as argument. So here is how to use `createActionCreator`:
```typescript
export const todoInputChanged = createActionCreator<string>('CURRENT_INPUT_CHANGED', 
              (newCurrentInputString: string) => ({ newCurrentInputString }));
```
This ensures that the `newCurrentInputString` will be in the action's payload. We will see how to retrieve this in the reducer later.
