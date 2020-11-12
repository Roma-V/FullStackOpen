# FullStackOpen
A repo for FullStackOpen course excercises

Part 0:
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

Part 1:\
Ex. 1.1-1.5\
[courseinfo](part1/courseinfo/)\
A page that shows course information. All logic resides in [index.js](part1/courseinfo/src/index.js).\
Ex. 1.6-1.11\
[unicafe](part1/unicafe/)\
A page that gathers feedback and provides statistics. All logic resides in [index.js](part1/unicafe/src/index.js).\
Ex. 1.12\
[anecdotes](part1/anecdotes/)\
A page that shows a random anecdote and provides voting capability. A max voted anecdoted is shown as well. All logic resides in [index.js](part1/anecdotes/src/index.js).\

Part 2:\
Ex. 2.1-2.5\
[courseinfo](part2/courseinfo/)\
A page that shows course information. All logic resides in [index.js](part2/courseinfo/src/index.js).\
The part 1 code is refactored to render courses from arrays. The *Course* component is placed into a separate module [Course.js](part2/courseinfo/src/components/Course.js).\

Ex. 2.6-2.11, 2.15-2.18\
[phonebook](part2/phonebook/)\
A page that shows a list of contacts. A contact card contains a name and a phone number.\
Form fields provide capability to add new contacts, change and delete existing ones and perform filtering by name.\
The data is retrieved from and put to server with RESTful API.\
Main logic resides in [App.js](part2/phonebook/src/App.js) with the *App* component expotred for use in the [index.js](part2/phonebook/src/index.js).\
Server communication is handled with [contacts.js](part2/phonebook/src/services/contacts.js) script that utilizes *axios* library.\

Ex. 2.11-2.14\
[countries](part2/countries/)\
A page loads data from https://restcountries.eu and presents it based on filter query.\
All logic resides in [App.js](part2/countries/src/App.js) with the *App* component expotred for use in the [index.js](part2/countries/src/index.js).