const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { WebhookClient } = require('dialogflow-fulfillment');
const bio_intent = require("./modules/helperFunctions/bio");
const askBook = require("./modules/helperFunctions/askBookingFunctions");
const confirmBook = require("./modules/helperFunctions/confirmBookingFunctions");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", function (request, response) {
    const _agent = new WebhookClient({ request, response });

    function Bio(agent) {

        bio_intent.bio(agent)

    }

    function car_booking(agent) {

        askBook.car_book(agent)

    }

    function car_book_yes(agent) {

        confirmBook.carBookYes(agent)

    }

    function flight_booking(agent) {

        askBook.flight_book(agent)

    }

    function flight_book_yes(agent) {

        confirmBook.flightBookYes(agent)

    }

    function hotel_booking(agent) {

        askBook.hotel_book(agent)

    }

    function hotel_book_yes(agent) {

        confirmBook.hotelBookYes(agent)

    }

    function holiday_booking(agent) {

        askBook.holiday_book(agent)

    }

    function holiday_book_yes(agent) {

        confirmBook.holidayBookYes(agent)

    }

    let intents = new Map();
    intents.set("user_details", Bio)
    intents.set("Cars book", car_booking);
    intents.set("Cars book - yes", car_book_yes)
    intents.set("Flight book", flight_booking);
    intents.set("Flight book - yes", flight_book_yes)
    intents.set("Hotels book", hotel_booking);
    intents.set("Hotels book - yes", hotel_book_yes)
    intents.set("Holidays book", holiday_booking);
    intents.set("Holidays book - yes", holiday_book_yes)
    _agent.handleRequest(intents)
})
app.listen(process.env.PORT || 4000, () => {
    console.log("server running")
})