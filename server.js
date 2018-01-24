const express = require('express');
const path = require("path");
const axios = require("axios");

const app = express();


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});


app.get("/signin", (req, res) => {
    const google_url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:8080/oauth/callback&scope=https://www.googleapis.com/auth/calendar&access_type=offline&response_type=code`;
    res.redirect(google_url);
});


app.get("/oauth/callback", (req, res) => {

    const code = req.param("code");
    axios({
        url: `https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=http://localhost:8080/oauth/callback&grant_type=authorization_code`,
        method: "POST"
    })
        .then((response) => {
            console.log("Response: ", response.data);
            res.json({ msg: "Ok" });

        })
        .catch((err) => {
            console.log("Error: ", err.response.data);
            res.json({ error: "Error" });

        });


});


app.listen(8080, () => {
    console.log("Server is starting...");
});