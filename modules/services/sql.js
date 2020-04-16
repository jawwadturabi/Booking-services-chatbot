var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
connection.connect((err, args) => {
    if (err) console.log(err, "err is =")
    else console.log("Connected with mysql DB")
})
connection.on("error", (err) => {
    console.log("error is : ", err)
})
setInterval(function () {
    connection.query('SELECT 1');
}, 60000);

exports.sql_queries = function (params1, params2, booking_categ) {
    let query1 = 'INSERT INTO `user_details`(`Name`, `Email`, `Phone_number`,`Booking_made`, `user_id`) VALUES (?,?,?,?,?)'
    let query2;

    connection.query(query1, params1, function (error, results, fields) {
        if (error) throw error;
        else console.log('One query is inserted in user details, ID: ', results.insertId);
    });

    if (booking_categ == "Car") {
        query2 = 'INSERT INTO `Car_booking_details`(`Pickup_location`, `Dropoff_location`, `Pickup_date`, `Pickup_time`, `Dropoff_date`, `Dropoff_time`, `user_id`) VALUES (?,?,?,?,?,?,?)'

    }
    else if (booking_categ == "Flight") {
        query2 = 'INSERT INTO `Flight_booking_details`(`No.of. Adults`, `No.of. Children`, `No.of. Infants`, `Departure_city`, `Destination_city`, `Category/Class`, `Departure_date`,`user_id`) VALUES (?,?,?,?,?,?,?,?)'

    }
    else if (booking_categ == "Hotel") {
        query2 = 'INSERT INTO `Hotel_booking_details`(`Destination_Hotel`, `Check_in_date`, `Check_out_date`, `No.of Adults`, `No.of Children`, `No.of Rooms`,`user_id`) VALUES (?,?,?,?,?,?,?)'

    }
    else if (booking_categ == "Holiday") {
        query2 = 'INSERT INTO `Holidays_booking_details`(`Country_to_travel`, `Package`, `Duration`, `Budget`,`user_id`) VALUES (?,?,?,?,?)'

    }

    connection.query(query2, params2, function (error, results, fields) {
        if (error) throw error;
        else console.log('One query is inserted in ' + booking_categ + ', ID: ', results.insertId);
    });
}