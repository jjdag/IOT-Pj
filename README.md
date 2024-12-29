# IOT-Pj
Responsive eco-housing IoT device management website using Express.js, EJS, and TailwindCSS

Backend is built upon a custom REST API relying on a sqlite3 database.
Said REST API is written entirely in JavaScript, more precisely using Express.js as it is currently among the most popular backend tools in the industry.

HTML and CSS (mixed with Tailwind for nicer smoother visuals, UI, and responsiveness) are rendered via templating using EJS.

To run, clone repository and cd into it from a terminal, then run "npm run start".

Server should launch immediately on port 3000 by default (if none other specified in devEnv).

Go to "http://localhost:3000/logement" for the main page of the web application.

NB : Some features are still incomplete or not unanimously served on the app (ex : page for creating other Pieces, Capteurs, etc.), although the relevant backend material and support is already completed. This is but a rudimentary exhibit of what this web app could eventually grow to be, as well as an opportunity for me to immerse myself in the proper learning of fullstack development using industry-approved JS methods and libraries, a must-have skill for any aspiring amateur or professional in the field.

Further ideas:
- integrating SVG into the frontend to render maps and diagrams of the houses (hence the room coordinates)
- making the web app more organized and secure by requiring authentication at first, which then redirects to the user's logements only
- the obvious i.e. improving upon the robustness of the already existing pages and routes and adding those relevant to creating new capteurs, pieces, etc. (+ actually activating the search feature (by linking the search bar input to a GET request for each relevant page/table))
