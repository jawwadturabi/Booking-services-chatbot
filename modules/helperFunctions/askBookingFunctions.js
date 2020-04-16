const quick_replies = require("./quickReplies");
const createContext = require("./context").createContext;
require("datejs")

function car_book(agent) {
    let [pickup, dropoff, pickdate, picktime, dropdate, droptime] = [agent.parameters['pickup'], agent.parameters['dropoff'], agent.parameters['pickdate'].split('T')[0], agent.parameters['picktime'].split('T')[1], agent.parameters['dropdate'].split('T')[0], agent.parameters['droptime'].split('T')[1]]
    pickup = (pickup['street-address'] ? pickup['street-address'] + "," : "") + (pickup['city'] ? pickup['city'] + "," : "") + (pickup['country'] ? pickup['country'] + "," : "")
    dropoff = (dropoff['street-address'] ? dropoff['street-address'] + "," : "") + (dropoff['city'] ? dropoff['city'] + "," : "") + (dropoff['country'] ? dropoff['country'] + "," : "")
    let fields = [{ pickup, dropoff, pickdate, picktime, dropdate, droptime }]

    createContext(agent, "car_book_detail", fields)

    dropdate = new Date(dropdate).toString("dd MMMM, yyyy")
    pickdate = new Date(pickdate).toString("dd MMMM, yyyy")

    agent.add("Thanks for being with us.")
    agent.add(`Your booking details are below:\n\nPickup = ${pickup}\nDropoff = ${dropoff}\nPickdate = ${pickdate}\nPicktime = ${picktime}\nDropdate = ${dropdate}\nDroptime = ${droptime}`)

    quick_replies.quick_reply(agent)
}

function flight_book(agent) {
    let [adults, children, infants, depart_date, from, to, f_class] = [agent.parameters['adult'], agent.parameters['child'], agent.parameters['infants'], agent.parameters['departure'], agent.parameters['from'], agent.parameters['to'], agent.parameters['class']]
    let fields = [{ adults, children, infants, depart_date, from, to, f_class }]
    console.log("adults : ", adults)
    if (!from) {
        agent.add("Please tell me your departure city")
    }
    else if (!to) {
        agent.add("Great Now Kindly tell me your destination city")
    }
    else if (!depart_date) {
        agent.add("What will be your departure date?")

    }
    else if (!adults) {
        agent.add("Can you share with me how many adults are flying? (e.g. 1,2,3..)")

    }
    else if (!children) {
        agent.add("And Number of childs flying in this trip?(e.g. 0,1,..)")

    }
    else if (!infants) {
        agent.add("Is there any infants travelling with you in this trip. If yes then tell me how many infants will be?")

    }
    else if (!f_class) {
        let text = "Please select category from below options:";
        let items = ["First Class", "Business", "Economy"]
        quick_replies.custom_quick_reply(agent, text, items)

    }
    else if (adults && children && infants && depart_date && from && to && f_class) {
        createContext(agent, "flight_book_detail", fields)
        depart_date = new Date(depart_date).toString("dd MMMM, yyyy")
        agent.add("Thanks for being with us.")
        agent.add(`Your booking details are below:\n\nDeparture from = ${from.toUpperCase()}\nTo Destination = ${to.toUpperCase()}\nDeparture date = ${depart_date}\nCategory = ${f_class}\nNo. of Adults = ${adults}\nNo. of Childerns = ${children}\nNo. of Infants = ${infants}`)

        quick_replies.quick_reply(agent)
    }
}

function hotel_book(agent) {
    let [location, check_in, check_out, adults, childs, rooms] = [agent.parameters['location'], agent.parameters['check-in'], agent.parameters['check-out'], agent.parameters['adults'], agent.parameters['childs'], agent.parameters['rooms']]
    location = (location['street-address'] ? location['street-address'] + "," : "") + location['city'] + "," + location['country']
    let fields = [{ location, check_in, check_out, adults, childs, rooms }]

    createContext(agent, "hotel_book_detail", fields)

    check_in = new Date(check_in).toString("dd MMMM, yyyy")
    check_out = new Date(check_out).toString("dd MMMM, yyyy")

    agent.add("Thanks for being with us.")
    agent.add(`Your booking details are below:\n\nHotel location = ${location}\nCheck-in date: ${check_in}\nCheck-out date: ${check_out}\nNo. of Adults: ${adults}\nNo. of childs: ${childs}\nNo. of rooms: ${rooms}`)

    quick_replies.quick_reply(agent)
}

function holiday_book(agent) {
    let [country, packages, duration, budget] = [agent.parameters['country'], agent.parameters['packages'], agent.parameters['duration'], agent.parameters['budget']]
    let fields = [{ country, packages, duration, budget }]
    if (!country) {
        agent.add("Please tell me the country in which you want to spent your holidays.")
    }
    else if (!packages) {
        let text = "Great place to visit. Can you please select your preference from the below options 👇"
        let reply = ["Season Packages", "Holiday Packages", "Honeymoon Packages", "Summer Vacation"]
        quick_replies.custom_quick_reply(agent, text, reply)
    }
    else if (!duration) {
        let text = "Now please select your duration in days for your " + packages;
        let reply = ["1-3 days", "4-7 days", "8-12 days", "12+ days"]
        quick_replies.custom_quick_reply(agent, text, reply)
    }
    else if (!budget) {
        let text = "Cool! Would you like to tell me your budget for this awesome trip"
        let reply = ["$100-500", "$500-1000", "$1000-5000", "$5000+"]
        quick_replies.custom_quick_reply(agent, text, reply)
    }
    else if (country && packages && duration && budget) {

        createContext(agent, "holiday_book_detail", fields)
        agent.add("Thanks for being with us.")
        agent.add(`Your booking details are below:\n\nCountry : ${country.toUpperCase()}\nPackage : ${packages}\nDuration : ${duration}\nBudget : ${budget}`)

        quick_replies.quick_reply(agent)
    }
}

module.exports = {
    car_book, flight_book, hotel_book, holiday_book
}