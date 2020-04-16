const axios = require("axios");
let url1 = 'https://www.googleapis.com/oauth2/v4/token';
let url2 = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

let params1 = {
    "client_id": process.env.client_id,
    "client_secret": process.env.client_secret,
    "refresh_token": process.env.refresh_token,
    "grant_type": "refresh_token"
}
exports.event = (pickdate, dropdate, email, booking_categ) => {
    let summary
    if (booking_categ == 'Car') {
        summary = "Car Booked"
    }
    else if (booking_categ == 'Flight') {
        summary = "Flight Booked"
    }
    else if (booking_categ == 'Hotel') {
        summary = "Hotel Booked"
    }

    let params2 = {
        "end": {
            "dateTime": dropdate
        },
        "start": {
            "dateTime": pickdate
        },
        "attendees": [
            {
                "email": email
            }
        ],
        "summary": summary
    }


    axios({
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        data: params1,
        url: url1,
    }).then((d) => {
        axios({
            method: "POST",
            headers: {
                Authorization: `Bearer ${d.data.access_token}`,
                "content-type": "application/json"
            },
            data: params2,
            url: url2,
        }).then((d) => {

            console.log("d of refresh is : ", d.data)
        }).catch((e) => {
            console.log("e of refresh is : ", e.response.data)
        })

        console.log("d of bearer is  : ", d.data)

    }).catch((e) => {
        console.log("e of bearer is : ", e.response.data)
    })
}