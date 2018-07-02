import * as redux from 'redux';

// currently needed to support redux4 in redux-devtools-extensions
declare module "redux" {
    export type GenericStoreEnhancer = redux.StoreEnhancer;
}
