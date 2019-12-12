# The Action Manager

To keep your long-range goals in mind while you accomplish your daily tasks.

## Fun for me

I especially enjoyed:
* implementing a Higher-Order Component to use a hook with a class component
* building mongoDB queries with mongoose that, sometimes, made multiple parallel queries

## JavaScript Technologies Used

* Node.js
* Express
* React
* Redux
* MongoDB
* Mongoose

## User Stories
### As a goal-oriented user...

#### Basic Application w/Drag and Drop
- [X] I can log in with Google.
- [X] I can save my work.
- [X] I can only access my my own action lists.
- [X] I can add an action to a list.
- [X] I can re-order the action list through dragging and dropping.
- [X] I can check off an action.

#### Infinitely Nestable Actions
- [X] When a particular action is active and I create an action, the new action is added to the active action's child list.
- [X] I see each parent action above the active action, to tell me why the active action is important.
- [X] The parent actions are listed in their hierarchal order. (Parent, Grandparent, Great-Grandparent, etc.)
- [X] The action I'm current on is highlighted or displayed uniquely active, so I know which action I'm on.
- [X] I can drag and drop one action into another in order to add it as a member of its childlist, grandparent list, great-grandparent list, etc.


### Run This Code

 1. cd backend
 2. npm install
 3. cd ..
 4. cd client
 5. npm install
 6. cd ..
 7. npm install
 7. npm start
