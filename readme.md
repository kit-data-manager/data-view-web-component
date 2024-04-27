[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Generic Data View Web Component for KIT DM applications

## Development

### How to run with Storybook

Execute both commands in parallel

```bash
npm run build-watch
```

and

```bash
npm run storybook
```

### Only run Stencil without Storybook

```bash
npm start
```

### Publishing

To publish the Web Component, simply run `npm publish` in the root directory. This will automatically run the `prepare` script which builds the component before publishing.

The React Wrapper Library should also always be published at the same time, with the same package version (not for a technical reason, rather to facilitate understanding). The generated files (`react-library/lib/*`) get generated when the `build` script is executed in the root directory, since React is one of the output targets.

- Enter the react-library directory `cd react-library`
- Run `npm publish`. Just like in the root, the `prepare` script will be called and will compile the Typescript.

## Installation

### React App

To use this Web Component in a React App, it is recommended to use the [React Wrapper Library](https://www.npmjs.com/package/data-card-react). This allows for correct Event Propagation
and passing Object & Arrays directly as Props, aswell as allowing Intellisense for the props.

- Run `npm install data-card-react`
- Use as any other React Component

### Script tag

- Put a script tag `<script type='module' src='https://unpkg.com/data-view-web-component@0.0.6/dist/data-view-web-component/data-view-web-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install data-view-web-component --save`
- Put a script tag `<script type='module' src='node_modules/data-view-web-component/data-view-web-component/data-view-web-component.esm.js'></script>` in the head of your index.html
- OR load the element at the start of the App:

```
import { applyPolyfills, defineCustomElements } from 'data-view-web-component/loader';

applyPolyfills().then(() => {
    defineCustomElements();
});
```

- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app

- Run `npm install data-view-web-component --save`
- Add an import to the npm packages `import data-view-web-component;`
- Then you can use the element anywhere in your template, JSX, html etc

## Usage

### Icons

All Icons from this list can be used:
https://icon-sets.iconify.design/

### Props

[Props & Types](src/components/data-card/readme.md)
