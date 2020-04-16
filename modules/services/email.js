var postmark = require("postmark");

exports.email = (params1, params2, booking_categ) => {
    let userEmail = params1[1];
    let body;
    if (booking_categ == 'Car') {
        body = `Pickup : ${params2[0]} \nDropoff: ${params2[1]} \nPickdate: ${params2[2]} \nPicktime: ${params2[3]} \nDropdate: ${params2[4]} \nDroptime: ${params2[5]}`
    }
    else if (booking_categ == 'Flight') {
        body = `No.of.Adults : ${params2[0]}\nNo.of.Childs: ${params2[1]}\nNo.of.infants: ${params2[2]}\nFrom: ${params2[3]}\nTo: ${params2[4]}\nClass: ${params2[5]}\nDeparture date: ${params2[6]}\n`
    }
    else if (booking_categ == 'Hotel') {
        body = `Hotel location = ${params2[0]}\nCheck-in date: ${params2[1]}\nCheck-out date: ${params2[2]}\nNo. of Adults: ${params2[3]}\nNo. of childs: ${params2[4]}\nNo. of rooms: ${params2[5]}`
    }
    else if (booking_categ == 'Holiday') {
        body = `Country : ${params2[0]}\nPackage : ${params2[1]}\nDuration : ${params2[2]}\nBudget : ${params2[3]}`
    }
    console.log("body is : ", body)
    var client = new postmark.ServerClient(process.env.postmark_client);
    client.sendEmail({
        "From": "results@quizassisstant.online",
        "To": userEmail,
        "Subject": "Test",
        "TextBody": `One new booking\nDetails are below:\n\nName : ${params1[0].toUpperCase()}\nEmail : ${params1[1]}\nPhone number : ${params1[2]}\nBooking Category : ${params1[3]}\n${body}`
    }).then(data => {
        console.log("Email successfully sent")
    }).catch(e => {
        console.log("err is : ", e)
    });
}