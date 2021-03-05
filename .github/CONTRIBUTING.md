# Searchbox Contribution Guide 🔍

Welcome to the contribution guide! We welcome all contributions. You can see the list of open issues over [here](https://github.com/appbaseio/searchbox/issues). If you're interested in picking up something, feel free to start a discussion 😺

The searchbox monorepo contains the code for the headless core and the searchbox UI components for React, Vue and vanilla JavaScript. Project specific README files are available inside each package.

## Initial setup

1. Fork the repository in order to send PRs

2. Clone the repo from your profile, use SSH if possible. Read more about it over [here](https://help.github.com/articles/connecting-to-github-with-ssh/).

3. `cd` into the project directory

4. Checkout the `master` branch (should be default)

5. You can then install the dependencies, we recommend `yarn`. Run this from the project root:

```bash
yarn
```

## Searchbase

- You can run the following command from `searchbox` project's root directory which will start the watchers for the `searchbase` package located under the `packages` directory. This will let you make changes to the searchbase package on the fly and the changes you make will be transpiled live:

```bash
yarn watch
```

- You can try the examples for the `searchbase` package by going to `packages/searchbase/examples` directory.

## Searchbox

- You can run the following command from `searchbox` project's root directory which will start the watchers for `searchbase` and `searchbox` packages located under the `packages` directory. This will let you make changes to these projects on the fly and the changes you make will be transpiled live:

```bash
yarn dev:js
```

- You can try the examples for the `searchbox` inside `packages/searchbox/examples` directory.

## React Searchbox

- You can run the following command from `searchbox` project's root directory which will start the watchers for `searchbase` and `react-searchbox` packages located under the `packages` directory. This will let you make changes to these projects on the fly and the changes you make will be transpiled live:


```bash
yarn dev:react
```

- You can try the examples for the `react-searchbox` inside `packages/react-searchbox/examples` directory.

## React Searchbox

- You can run the following command from `searchbox` project's root directory which will start the watchers for `searchbase` package located under the `packages` directory. This will let you make changes to these projects on the fly and the changes you make will be transpiled live:


```bash
yarn watch
```

- You can try the examples for the `react-native-searchbox` inside `packages/native/examples` directory.

## Vue Searchbox

- You can run the following command from `searchbox` project's root directory which will start the watchers for `searchbase` and `vue-searchbox` packages located under the `packages` directory. This will let you make changes to these projects on the fly and the changes you make will be transpiled live:


```bash
yarn dev:vue
```

- You can try the examples for the `vue-searchbox` inside `packages/vue-searchbox/examples` directory.

**Note:** If you see any errors about missing dependencies, please try running `yarn` inside the example's directory that you're trying to run.

<hr />
