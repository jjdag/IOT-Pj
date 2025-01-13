# IOT-Pj

## Responsive eco-housing IoT device management website using Express.js, EJS, and TailwindCSS

Backend is built upon a custom REST API relying on a sqlite3 database.
Said REST API is written entirely in JavaScript, more precisely using Express.js as it is currently among the most popular backend tools in the industry.

HTML and CSS (mixed with Tailwind for nicer smoother visuals, UI, and responsiveness) are rendered via templating using EJS.

To run, clone repository and cd into it from a terminal, then run 

```bash
npm run start
```

Server should launch immediately on port 3000 by default (if none other specified in devEnv).

Go to "http://localhost:3000/logement" for the main page of the web application.

NB : Some features are still incomplete or not unanimously served on the app (ex : page for creating other Pieces, Capteurs, etc.), although the relevant backend material and support is already completed. This is but a rudimentary exhibit of what this web app could eventually grow to be, as well as an opportunity for me to immerse myself in the proper learning of fullstack development using industry-approved JS methods and libraries, a must-have skill for any aspiring amateur or professional in the field.

### A more detailed overview of the different files and folders:

#### root
- contains the database file house.db loaded with the tables and some dummy content to populate the website
- index.js, the core file of the REST API with the main imports and requirememts, containing the routing methods to all the different paths of the website with their various HTTP functionalities (GET, POST, etc.)
- db.js for importing the sqlite3 module into the project and mounting it with house.db for later exportation and easy use in index.js
- logement.txt containing all the commands executed to clear out, create, then populate the database, as per the requirements of the first rendu (TP1, les commandes sont ecrites dans l'ordre des questions, question 2 --> DROP DATABASE..., question 3 --> CREATE TABLE ..., etc.)
- json package files for all the dependencies used, namely nodemon (for quick launch and testing of the server), EJS (for template rendering), axios which is no longer used (was meant for a more industry-standard implemetation of HTTP requests and organization of URL routes), chart.js (for chart visualization such as the one on the factures page), and most importantly, express (web app framework, basis of the REST API)

#### src/views
Frontend and interface i.e. all the EJS files rendered upon server start:
- house.ejs --> main home interface, page d'accueil displaying the different houses using Eco-Lodge's services, rendered at /logement, offers also a button to add a new house (redirects to createLogement.ejs)
- createLogement.ejs --> entry boxes to register a new house (button.onclick sends a POST request to the db to insert said new house into it), serves as template for what all the other insertion pages should look like
- houseSingle.ejs --> rendered upon clicking on any house, displays its general main information such as address and rooms, path is the main page root concatenated with the selected house ID (href with js variables exported into ejs using ejs tags <%%> --> same method to link between back and front used across all the other pages as well, that's literally the whole entire purpose of ejs, integrating js text and vars into your usual old HTML)
- factures.ejs --> receipt and consumption page, makes use of chart.js to display the evolution of energy consumption from a particular household in bar chart form

#### src/routes
Should've been used to store routes individually each in its own file and accessing it using the afore-mentioned axios, makes for cleaner URL mapping but was eventually not used as current scale of the website does not necessitate it (although it is much recommended as standard industry best practice)

#### public/img
For local image sources such as the standard stock image house png used called upon in house.ejs and the chart png which was used as placeholder before proper dynamic and responsive chart js implementation

#### public/css
For primitive styling using the styles.css file, used once upon a time but later swapped for Tailwind CSS for aesthetic and versatility reasons (styles were thus integrated in each ejs file using the script tag to call upon tailwind cdn)

#### node_modules
bins and libs and mods and everything in between: self-explanatorily the directory containing all the dependencies required for the deployment of this web app, from the npm init down to the smallest style definition


### Further ideas
- integrating SVG into the frontend to render maps and diagrams of the houses (hence the room coordinates)
- making the web app more organized and secure by requiring authentication at first, which then redirects to the user's logements only
- the obvious i.e. improving upon the robustness of the already existing pages and routes and adding those relevant to creating new capteurs, pieces, etc. (+ actually activating the search feature (by linking the search bar input to a GET request for each relevant page/table))
