## github-repositories-explorer
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Technology stack
* react
* typescript
* apollo-grapphql
* jest
* enzyme
* styled-components
* prettier
* eslint
* material-ui

## Commit message convention

All the commits should follow conventional commit format. [Trello board](https://trello.com/invite/b/ONN2wfwV/2bb6be32afeeaccf77bc1cc04a93ccf5/github-repositories-explorer) which I used to track progress and generate a commit messages.

### Format

The commit message should be structured as follows:
```
story/story-number: Subject
```

If there's no related JIRA story: 
```
tech/optional-scope: Subject
```

If there's related JIRA bug:
```
bug/story-number: Subject
```

### Subject

The subject contains a succinct description of the change:

* Use the imperative mood in the subject line
* Capitalize the subject line
* Limit the subject line to 50 characters
* Don't use dot (.) at the end

A properly formed Git commit subject line should always be able to complete the following sentence:

If applied, this commit will **your subject line here**
For example:

* If applied, this commit will **refactor subsystem X for readability**
* If applied, this commit will **update getting started documentation**
* If applied, this commit will **remove deprecated methods**
* If applied, this commit will **release version 1.0.0**
* If applied, this commit will **merge pull request #123 from user/branch**

Notice how this doesn’t work for the other non-imperative forms:

* If applied, this commit will ~~fixed bug with Y~~
* If applied, this commit will ~~changing behavior of X~~
* If applied, this commit will ~~more fixes for broken stuff~~
* If applied, this commit will ~~sweet new API methods~~

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
At this stage, the coverage for all files is more than 90%.

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
        * `index.ts`
* `apollo`
    * `client.ts`
    * `index.ts`  
* `components`
    *  `repositories-search-input`
       * `__tests__`
       * `repositories-search-input.styled.tsx`
       * `repositories-search-input.tsx`
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
        * `home.styled.tsx`
        * `index.ts`
* `utils`
    * `format-repositories.ts`
    * `prepare-search-params.ts`
    * `format-users.ts`
    * `index.ts`