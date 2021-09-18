# Would You Rather Project

## Overview

The project uses React to build the application and redux to store arrangement data.

## Getting Started

The project can be start with npm or yarn, so you can choose one of them and start with the following instructions.

### Installing

#### Instructions

To download the project:

```
git clone https://github.com/IslamTrabih/Would-You-Rather-Project.git
```

then

```
cd Would-You-Rather-Project
```

or download [Zip File](https://github.com/IslamTrabih/Would-You-Rather-Project)

Then install all dependencies and run The project:

```
yarn install
```

then

```
yarn start
```

or

```
npm install
```

then

```
npm run start
```

## Folder Structure

```bash
├── README.md -> This file.
├── package.json -> Package manager file.
│
├── public
│   ├── favicon.ico -> React Icon.
│   └── index.html -> Base html structure.
│   └── manifest.json -> Manifest file.
│
└── src
    ├── actions -> Redux Actions.
    │   ├── authUser.js -> actions related to authedUser.
    │   ├── questions.js -> actions related to questions.
    │   ├── shared.js -> shared actions to store.
    │   └── users.js -> actions related to users.
    │
    ├── components -> React Components.
    │   ├──Dashboard
    │   │  ├── QuestionCard.js -> contains some details about question.
    │   │  ├── QuestionForm.js -> contains option details about question to select answer bylogged in user.
    │   │  ├── QuestionResult.js -> show result of votes.
    │   │  └── UserCard.js -> show user details.
    │   │
    │   ├──leaderboard
    │   │  └── ScoreCard.js -> contains all data rank.
    │   │
    │   ├──veiws
    │   │  ├── Dashboard.js -> contains some details about users answered and unanswered questions.
    │   │  ├── Error_404.js -> show 404 error when page does not exists.
    │   │  ├── Leaderboard.js -> show user rank based on their interaction with app.
    │   │  ├── Login.js -> allow user to login with one of the registered user.
    │   │  ├── Nav.js -> contains link to different pages, logout button and logged in user.
    │   │  ├── NewQuestion.js -> allow logged in user to add new question.
    │   │  └── QuestionDetails.js -> question details based on logged in user.
    │   │
    │   └── App.js -> handles which component to render.
    │  
    ├── middleware -> Redux Middlewares.
    │   ├── index.js -> apply thunk and logger middleware.
    │   └── logger.js -> log action and new state.
    │
    ├── reducers -> Redux Reducers.
    │   ├── authUser.js -> reducer for authedUser.
    │   ├── index.js -> combine reducers.
    │   ├── questions.js -> reducer for questions.
    │   └── users.js -> reducer for to users.
    │
    ├── utils -> Utility files.
    │   ├── _DATA.js -> api for this project.
    │   └── api.js -> functions that connect with api.
    │
    ├── index.css -> Global styles.
    └── index.js -> Used for DOM rendering only.
```

## Data

There are two types of objects stored in our database:

- Users
- Questions

### Users

Users include:

| Attribute | Type   | Description                                                                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The user’s unique identifier                                                                                                                                                                                   |
| name      | String | The user’s first name and last name                                                                                                                                                                            |
| avatarURL | String | The path to the image file                                                                                                                                                                                     |
| questions | Array  | A list of ids of the polling questions this user created                                                                                                                                                       |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                             |

Your code will talk to the database via 4 methods:

- `_getUsers()`
- `_getQuestions()`
- `_saveQuestion(question)`
- `_saveQuestionAnswer(object)`

1. `_getUsers()` Method

_Description_: Get all of the existing users from the database.  
_Return Value_: Object where the key is the user’s id and the value is the user object.

2. `_getQuestions()` Method

_Description_: Get all of the existing questions from the database.  
_Return Value_: Object where the key is the question’s id and the value is the question object.

3. `_saveQuestion(question)` Method

_Description_: Save the polling question in the database.  
_Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

_Return Value_: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the question that was posted                                                                                       |
| author    | String | The id of the user who posted the question                                                                                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                                                                                       |

4. `_saveQuestionAnswer(object)` Method

_Description_: Save the answer to a particular polling question in the database.
_Parameters_: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| authedUser | String | The id of the user who answered the question                                            |
| qid        | String | The id of the question that was answered                                                |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |
