# FullStackOpen
A repo for FullStackOpen course excercises

## Part 0
Mozilla excercises are done and even though not required the files are added to the repo.\
0.1: HTML
[index.html](part0/index.html)

0.2: CSS
[styles/style.css](part0/styles/style.css)

0.3: HTML forms
[form.html](part0/form.html)

The last three excersices comprise diagrams of signal flow when the example web page is being manipulated.\
0.4: new note
![Screenshot](part0/New_note.png?raw=true "New note")
0.5: Single page app
![Screenshot](part0/Single_page_app.png?raw=true "Single page app")
0.6: New note
![Screenshot](part0/Single_page_app-new_note.png?raw=true "New note")

## Part 1
Ex. 1.1-1.5\
[courseinfo](part1/courseinfo/)\
A page that shows course information. All logic resides in [index.js](part1/courseinfo/src/index.js).\
Ex. 1.6-1.11\
[unicafe](part1/unicafe/)\
A page that gathers feedback and provides statistics. All logic resides in [index.js](part1/unicafe/src/index.js).\
Ex. 1.12\
[anecdotes](part1/anecdotes/)\
A page that shows a random anecdote and provides voting capability. A max voted anecdoted is shown as well. All logic resides in [index.js](part1/anecdotes/src/index.js).\

## Part 2
Ex. 2.1-2.5\
[courseinfo](part2/courseinfo/)\
A page that shows course information. All logic resides in [index.js](part2/courseinfo/src/index.js).\
The part 1 code is refactored to render courses from arrays. The *Course* component is placed into a separate module [Course.js](part2/courseinfo/src/components/Course.js).

Ex. 2.6-2.11, 2.15-2.20\
[phonebook](part2/phonebook/)\
A page that shows a list of contacts. A contact card contains a name and a phone number.\
Form fields provide capability to add new contacts, change and delete existing ones and perform filtering by name.\
The data is retrieved from and put to server with RESTful API.\
Main logic resides in [App.js](part2/phonebook/src/App.js) with the *App* component expotred for use in the [index.js](part2/phonebook/src/index.js).\
Server communication is handled with [contacts.js](part2/phonebook/src/services/contacts.js) script that utilizes *axios* library.\
User notification is provided in a form of in-page element formatted with CSS.\

Ex. 2.11-2.14\
[countries](part2/countries/)\
A page loads data from https://restcountries.eu and presents it based on filter query.\
All logic resides in [App.js](part2/countries/src/App.js) with the *App* component expotred for use in the [index.js](part2/countries/src/index.js).

## Part 3
Ex. 3.1-3.8\
[phonebook_backend](part3/phonebook_backend)\
This folder contains backend for contacts app.\

Ex. 3.9-3.11\
[phonebook_backend](part3/phonebook_backend)\
The backend is ties up with frontend part and deployed to:
[deployed to heroku](https://phonebook-rv.herokuapp.com/)

Ex. 3.12-3.18
[phonebook_backend](part3/phonebook_backend)\
The backend is linked to a cloud MongoDB.\
Data is retireved from MongoDB and is served further with RESTful API.\
Database connection is made in a separate module. Node.js routes utilize MongoDB API to fetch/post/update/delet the content.

Ex. 3.19-3.22
[phonebook_backend](part3/phonebook_backend)\
*Mongoose* is configured to perform record validation before submitting is to DB.\
Code cheking is done with lint.

## Part 4
Ex. 4.1-4.22\
[bloglist_backend](part4/blog_list)\
This folder contains backend for blog list app. The app provides api with the following functionality:
- add users to the database;
- get ingormation about users;
- login (required for the actions below);
- add blog post to a list;
- get the list of blog posts;
- update an entry in the list of blog posts;
- delete blog posts.

The [tests](part4/blog_list/tests) folder contains unit tests that ensure proper functionality.

## Part 5
Ex. 5.1-5.22\
[bloglist_frontend](part5/blog_list_front)\
The frontend part of the app shows login component on start. For a logged in user a list of all blog posts in database is shown. "new blog" button shows a promt to add a new blog. "view" button reveals details of each blog in the list, where it is possible to add a like to a blog or remove it if user is the one who created it.\
Cypress library is used for end to end testing of the front-end. Multiple test cover various use cases.\
The backend from part4 is used by means of communication through REST API.

## Part 6
Ex. 6.1-6.2\
[unicafe-redux](part6/unicafe-redux)\
The frontend part of the unicafe offers three buttens to provide feedback, one more to reset it as well as shows the feedback collected so far.

Ex. 6.3-6.12\
[redux-anecdotes](part6/redux-anecdotes)\
The frontend app that shows various anecdotes. The app utilizes Redux library to store an array of anecdotes, filter query and notification text. It consists of the following components (from top to bottom):
- An initially hidden notification. Upon addition of a new anecdote or voting for a one the notification appears for 5 seconds.
- A text filter that queries for content of anecdotes and results in showing only matching ones.
- A from for adding new anecdotes.
- A list of all anecdotes in the store. A button is provided to vote for each anecdote. Anecdotes are sorted by vote number.

Ex. 6.13-6.14\
[redux-anecdotes](part6/redux-anecdotes)\
The frontend is configured to draw data from json-server.

Ex. 6.15-6.18\
[redux-anecdotes](part6/redux-anecdotes)\
Actions are supplemented with thunks to handle async calls to server.\

Ex. 6.19-6.21\
[redux-anecdotes](part6/redux-anecdotes)\
The AnecdoteList, Filter and AnecdoteForm components are modified to use redux connect function instead of hooks. The Notification component still relies on useSelector hook.\
In addition fixed the Notification behaviour:
- 'SHOW' action saves timer ID along with notification content into store;
- 'HIDE' action check its timer ID vs store and hides the notification only in case of a match.

# Part 7
Exercises 7.1-7.3
[routed-anecdotes](part7/routed-anecdotes)
The anecdotes app is reworked to utilize react-router library. The topmost element provides navigation bar and the following components are shown below based on the URL:
- AnecdoteList
- CreatNew
- About

A notification is shown when a new anecdote is created.