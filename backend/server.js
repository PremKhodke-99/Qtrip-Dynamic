const express = require('express');
const cors = require('cors');
const lowDb = require('lowdb');
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require('body-parser');
const { nanoid, customAlphabet } = require("nanoid");
var dayjs = require("dayjs");
const db = lowDb(new FileSync("db.json"));
const app = express();
const random_data = require("./random_data");
var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8082;
/* 
[GET API] used here to fetch data for all cities
the respones is an [array] of cities with each having the following structure:
{
    "id":"<city-id>",
    "city": "<city-name>",
    "description" : "<random-description>",
    "image": "<image-url>"
}
data is sourced from "cities" array in db.json file
*/
app.get("/cities", (req, res) => {
    const data = db.get('cities').value();
    return res.json(data);
});

/*
[GET API] used here to fetch all adventures for a given city
the response is an [array] of adventures with each having following structure:
{
    "id": "9232482123",
    "name": "adventure name",
    "costPerHead": "cost of per adventure",
    "currency" : "INR",
    "image": "image-url",
    "duration": hrs,
    "category": "category-name"
}
data is sourced from "adventures array in db.json file"
*/
app.get("/adventures", (req, res) => {
    const data = db.get("adventures").value();
    let response = (data.find((item) => item.id === req.query.city) || []).adventures;
    if (response)
        return res.json(response);
    else
        return res.status(400).send({
            message: `Adventure not found for ${req.query.city}!`,
        });
});
