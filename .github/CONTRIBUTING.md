# Searchbase Contribution Guide 🔍

Welcome to the contribution guide! We welcome all contributions. A list of issues is present [here](https://github.com/appbaseio/searchbase/issues). If you're interested in picking up something, feel free to start a discussion 😺

The searchbase monorepo contains the code for headless core. Project specific readme files are available inside each package.

## Initial setup

Currently the initial setup is a bit manual which we're planning to improve. We also recommend to have [SSH setup](https://help.github.com/articles/connecting-to-github-with-ssh/) for GitHub.

1. Fork the repo in order to send PRs

2. Clone the repo from your profile, use SSH if possible

3. `cd` into the project directory

4. Checkout the `master` branch (should be default)

5. You can then install the dependencies, we recommend `yarn`. Run this from the project root:

```bash
yarn
```

## Web

1. You can run the following command from `searchbase` root which will start the watchers inside `/searchbase`. This will let you make changes to these projects on the fly and the files will be transpiled and updated instantly:

```bash
yarn dev:watch
```

Alternatively the manual approach would be to open the sub-projects for `/searchbase` and start the watchers inside their respective directories.

2. You can try the examples for the `searchbase` inside `/packages/searchbase/examples` which will also pick the updated code as and when you make changes to the `/packages/searchbase/src` files.

**Note:** If you see any errors about missing dependencies, please try running `yarn` inside the sub-directory you're at.

<hr />

If you run into any problems please feel free to reach out to us 🙂
