import * as React from 'react';
import { Route, Switch } from 'react-router';
import * as SoloApp from 'app/modules/tannhauser';
import { hot } from 'react-hot-loader';

const Main = (props: any) => {
  return (
    <SoloApp.App.Component 
      {...props}
    />
  );
}

export const App = hot(module)(() => (
  <Switch>
    <Route path="/" component={Main} />
  </Switch>
));
