import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const devtoolsCompose = composeWithDevTools({
  shouldCatchErrors: true,
  maxAge: 200,
});

const composeEnhancers: typeof compose =
  (process.env.NODE_ENV !== "production" && devtoolsCompose) || compose;

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

export default function configureStore() {
  const store = createStore(rootReducer, {}, enhancer);
  if (module.hot) {
    module.hot.accept("./reducers", () =>
      store.replaceReducer(require("./reducers").default)
    );
  }
  return store;
}
