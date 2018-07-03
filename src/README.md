# Web-Frontend Template Source Code

Structure of the code in this boilerplate.

## General

All our typescript code is in the `src` folder.

- [index.html](index.html): the HTML file that is sent to the browser
- [index.tsx](index.tsx): the entry point for all javascript/typescript code executed by the browser
- [main](main): the application entry point and routing logic
- [modules](modules): individual [*modules*](#modules), or *features*, of the boilerplate
- [shared](shared): code shared between multiple modules
- [redux](redux): Redux setup code; not needed for redux-free apps.

The layout roughly follows [this guideline](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

## Modules

Each module has the following entries:

- `components`: All views go in this folder. The main view should be in index.ts.
- `actions.ts`: All interaction logic is stored here (redux only)
- `global.ts`: Our modules might make themselves (or parts of themselves) known by names to other modules or the main app, and assume certain things about the layout of the global state (redux only). These things are defined here.
- `model.ts`: Our state definitions and other interfaces or types we want to use internallyare defined here. This is typically not something we want to share with other modules.
- `reducer.ts`: Redux magic: this contains update mechanisms how the interactions transform the state.
- `index.ts`: The public interface. Exports stuff needed by other modules and/or the main app.
