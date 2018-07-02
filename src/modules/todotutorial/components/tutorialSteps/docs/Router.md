# Take me home, country roads ...

By now you have a all necessary parts to send your web app to the browser. The simplest way is to include
it in this app's routing (that's the little navigation section above). You can find the code
in `main/App/index.ts`. Copy-paste all relevant parts there to display your container.
To only display the TodoAdd stuff, add the following:
- at top of file: `import mytodo from '../../modules/mytodo';`
- Declare the container to show: `const MyTodoAdd = mytodo.components.default;`
- in the `nav` section:
  ```
  <span><Link to="/MyTodoAdd">My awesome TodoAdd container!</Link></span>
  ```
- in the list below the nav section:
  ```
  <Route exact path="/MyTodoAdd" render={() => <MyTodoAdd />} />
  ```

Now another navigation entry should appear, and you should see your work. Or an error. Have fun!
