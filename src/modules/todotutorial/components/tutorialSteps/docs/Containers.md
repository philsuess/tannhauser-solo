# Functionality Next

Now that the components are finished and the actions defined, we need to couple them with the rest of
our framework. This happens in the containers. We want to map the State object (data) and the actions
to the properties of the components.

In the file `components/TodoAddContainer.ts`,

1.  define `mapStateToProps`. It is a function mapping the application State to the specific
    properties (only the data!) of our component. So:

    ```typescript
    const mapStateToProps = (state: any) => ({
      currentTodoInput: state[NAME].currentTodoInput
    });
    ```

    "Take the state, and create another object containing a field
    called `currentTodoInput` and assign it the value `state[NAME].currentTodoInput`".

    Remember to include appropriate `import` statements at the top.

    The reference implementation contains a slight indirection by calling another function. This indirection
    is done to ensure that the correct types are passed around here, and it achieves this by defining the type
    of the local state that is expected to be in `state[NAME]`. Ponder this when you have time. For
    now, let's continue with the interactions.

2.  define `mapDispatchToProps`. Actions are _dispatched_ and handled elsewhere, hence
    the name "Dispatch". We only combine things here, so the following is simple:
    ```typescript
    const mapDispatchToProps = {
      input_changed: actions.todoInputChanged,
      add: actions.todoAdd
    };
    ```
    This assumes that you have imported the actions as in the reference implementation.
3.  Finally, import and export the container in an index file in the `components` folder. This
    is convenient to be able to access them from outside our module later on. Also now in the
    module's `index.ts` you can `import * as components from './components';` and export
    them as well. This is used in the very last step of this tutorial.
4.  Do this for all containers, or skip to the next step, if you are in _depth-first exploration mode_.
