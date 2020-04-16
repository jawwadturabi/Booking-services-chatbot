const context = require('./context');
const create_card = require('./card').createCard;
const mysql = require('../services/sql').sql_queries;
const cal_event = require('../services/calendarEvent').event;
const mail = require('../services/email').email;

function carBookYes(agent) {
    let params1 = context.get_bio_context(agent);
    let car_book_context = agent.getContext('car_book_detail');
    let user_id = params1[4]
    let [pickup, dropoff, pickdate, picktime, dropdate, droptime] = [car_book_context.parameters['pickup'], car_book_context.parameters['dropoff'], car_book_context.parameters['pickdate'], car_book_context.parameters['picktime'], car_book_context.parameters['dropdate'], car_book_context.parameters['droptime']]
    let params2 = [pickup, dropoff, pickdate, picktime, dropdate, droptime, user_id];
    let startDate = pickdate + 'T' + picktime;
    let stopDate = dropdate + 'T' + droptime;

    create_card(agent)//send card response

    let booking = "Car";

    mysql(params1, params2, booking)// save data into mysql db

    cal_event(startDate, stopDate, params1[1], booking)//creating an event in user's calendar

    mail(params1, params2, booking)
}
function flightBookYes(agent) {
    let params1 = context.get_bio_context(agent);
    let user_id = params1[4]
    let flight_book_context = agent.getContext('flight_book_detail');
    let [adults, children, infants, depart_date, from, to, f_class] = [flight_book_context.parameters['adults'], flight_book_context.parameters['children'], flight_book_context.parameters['infants'], flight_book_context.parameters['depart_date'], flight_book_context.parameters['from'], flight_book_context.parameters['to'], flight_book_context.parameters['f_class']]
    let params2 = [adults, children, infants, from, to, f_class, depart_date.split('T')[0], user_id];

    create_card(agent)//send card response

    let booking = "Flight";

    mysql(params1, params2, booking)// save data into mysql db
    let endDate = new Date(depart_date).add(1).day()
    cal_event(depart_date, endDate, params1[1], booking)//creating an event in user's calendar

    mail(params1, params2, booking)
}
function hotelBookYes(agent) {
    let params1 = context.get_bio_context(agent);
    let user_id = params1[4]
    let hotel_book_context = agent.getContext('hotel_book_detail');
    let [location, check_in, check_out, adults, childs, rooms] = [hotel_book_context.parameters['location'], hotel_book_context.parameters['check_in'], hotel_book_context.parameters['check_out'], hotel_book_context.parameters['adults'], hotel_book_context.parameters['childs'], hotel_book_context.parameters['rooms']]
    let params2 = [location, check_in, check_out, adults, childs, rooms, user_id];

    create_card(agent)//send card response
    console.log("check in is : ", check_in)
    let booking = "Hotel";

    mysql(params1, params2, booking)// save data into mysql db

    cal_event(check_in, check_out, params1[1], booking)//creating an event in user's calendar

    mail(params1, params2, booking)
}
function holidayBookYes(agent) {
    let params1 = context.get_bio_context(agent);
    let user_id = params1[4]
    let holiday_book_context = agent.getContext('holiday_book_detail');
    let [country, packages, duration, budget] = [holiday_book_context.parameters['country'], holiday_book_context.parameters['packages'], holiday_book_context.parameters['duration'], holiday_book_context.parameters['budget']]
    let params2 = [country, packages, duration, budget, user_id];

    create_card(agent)//send card response

    let booking = "Holiday";

    mysql(params1, params2, booking)// save data into mysql db

    mail(params1, params2, booking)
}

module.exports = {
    carBookYes, flightBookYes, hotelBookYes, holidayBookYes
}