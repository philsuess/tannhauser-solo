# Mostly components and a little containers

Now it's time to add all relevant files and meat that will actually take care of the View (that's the
component) and coupling that with the functionality of the React/Redux machinery (that's the job for the
container). Let's start with all the files (copy-paste!!).

If you want, you can only focus on the TodoAdd parts here and come back later to do the others.

1.  Add `Todo.tsx` to the folder `components/` (create it first)
2.  Add `TodoContainer.ts` to the folder `components/`
3.  Add `TodoList.tsx` to the folder `components/`
4.  Add `TodoListContainer.ts` to the folder `components/`
5.  Add `TodoAdd.tsx` to the folder `components/` (create it first)
6.  Add `TodoAddContainer.ts` to the folder `components/`

Also copy the `styles.css` files to make it work. Worry about graphical design later...

That's all we are doing with the containers here for now, we'll implement the Views first, and worry about
the containers in the next step.

## Views

We now define the interface for the Views. These are _properties_ of the components and they are
declared here via typescript _interfaces_ (we've seen those when we defined the state earlier). These
interfaces specify which variable fields the View should receive to arrange its display as well as the
functions that it will call to allow interaction with it. As a reminder, here is the data from our
design session:

![todoItem](todoItem)

![todoState](todoState)

And here is the interaction for the TodoAdd (which is the first component we will implement)

![todoAdd_interactions](todoAdd_interactions)

1.  In `components/TodoAdd.tsx`, define the interface `TodoAddProps`. This View
    needs the data `currentTodoInput: string;` and it also needs the interactions

    - `input_changed: (newInput: string) => any;`
    - `add: () => any;`

    These are just function declarations indicating they take several or no argument and they return
    anything, we don't care about their return values here. With `input_changed`, we want to trigger
    an action that will take the new string as soon as it's altered and update the global state.

2.  Now implement the component! Rename it to `TodoAdd` first, if you have copied things from the
    reference implementation! Have fun with the html and check out how to get the fields from the props
    using the inline code (anything within `{` and `}` is typescript code,
    so `{currentTodoInput}` results in the value currently stored
    in `currentTodoInput` printed on the screen). Also check out how clicks are handled in buttons.
    Hint: changing the input in input fields typically triggers `onChange`, which will pass along
    an _event_. The current value of the input can then be retrieved by `event.target.value`.
    Look it up in the reference implemetation and google this if you're curious.
3.  Repeat these two steps for all components, or ...
4.  once a component is implemented, you want to see what it looks like, right? To do this, just skip the
    remaining components for now and skip ahead to the next step, and only do the steps for the TodoAdd there.
    Then skip the others again and proceed until the end. In the final step, it is shown how to integrate the
    app in the entire "App". So go on. Skip ahead. I'll wait here.
