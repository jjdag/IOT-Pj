const express = require('express');
const mainRouter = express.Router();
const axios = require('axios'); // instead of fetch, better practice bc is simpler to use and has more features but not acc necessary ill prob get rid of it



mainRouter.get("/", async(req, res) => {
    // res.render('house'); // render house.ejs file

    try {
        console.log("or in router");
        const myAPI = await axios.get(`http://localhost:3000/`);
        // console.log(myAPI.data);
        res.render('house', {lgmtdata : myAPI.data})
    } catch (error) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            console.log(err.request);
        } else { console.error('Error', err.message)}
    }
})


module.exports = mainRouter;