## github-repositories-explorer
This project allows you to search github repositories by name and/or name of its owner. The purpose of the creation is to demonstrate both knowledge in the following technology stack and system design strategies. Project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technology stack
* react
* typescript
* apollo-graphql
* jest
* enzyme
* styled-components
* prettier
* eslint
* material-ui
* recharts
* docker

## Commit messages convention

[Trello board](https://trello.com/invite/b/ONN2wfwV/2bb6be32afeeaccf77bc1cc04a93ccf5/github-repositories-explorer) which was used to generate a commit messages and track progress.


## Local usage

1. Utilize your GitHub account in order to [create YOUR_PERSONAL_ACCESS_TOKEN](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to be able to communicate with the GraphQL server.
1. Create an **.env.local** file in the root directory and declare ```REACT_APP_GH_AUTH_LOCAL_TOKEN={YOUR_PERSONAL_ACCESS_TOKEN}``` variable in it.
1. You can run apllication directly or utilize docker.
    * Directly:
        1. Install all the necessary dependencies: ```yarn```. [The yarn installation guide](https://classic.yarnpkg.com/en/docs/install).
        1. Run: ```yarn start```. 
        1. Open your browser to http://localhost:3000 and you should see the app.
    * Docker:
        1. [Install Docker](https://docs.docker.com/get-docker/)
        1. Build and tag the Docker image: ```docker build -t sample:dev .```
        1. Then, spin up the container once the build is done: ```docker run \
        -it \
        --rm \
        -v ${PWD}:/app \
        -v /app/node_modules \
        -p 3001:3000 \
        -e CHOKIDAR_USEPOLLING=true \
        sample:dev```
        1. Open your browser to http://localhost:3001 and you should see the app.


## Available Scripts

In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:coverage`

Launches the test runner in the interactive mode to see actual test coverage by each file.<br>
![test-coverage](/public/test-coverage.png)

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Project structure 
* `api` 
    * `queries`
        * `repository.quires.ts`
        * `users.queries.ts`
        * `index.ts`
* `apollo`
    * `client.ts`
    * `fragment-matcher.ts`
    * `index.ts`  
* `components`
    *  `repositories-search-input`
       * `__tests__`
       * `repositories-search-input.tsx`
       * `repositories-search-input.styled.ts`
       * `index.ts`
* `constants`
    * `deafault-pathname.constant.ts`
    * `default-debounce-timeout.constant.ts`
    * `repository-table-columns.constnant.ts`
    * `index.ts`
* `containers`
    * `application`
       * `__tests__`
       * `application.tsx`
       * `index.ts`
* `hooks`
    * `__tests__`
    *  `use-url-query.ts`
    * `index.ts`
* `pages`
    * `home`
        * `__tests__`
        * `home.tsx`
        * `home.styled.ts`
        * `index.ts`
* `utils`
    * `format-repositories.ts`
    * `prepare-search-params.ts`
    * `format-users.ts`
    * `index.ts`