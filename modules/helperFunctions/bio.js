const createContext = require("./context").createContext;

exports.bio = (agent) => {
    const recipient_id = agent.originalRequest.payload.data ? agent.originalRequest.payload.data.recipient.id : undefined
    return new Promise((resolve, reject) => {
        let [booking_categ, name, email, phone_no] = [agent.parameters['booking-categ'], agent.parameters['person'].name, agent.parameters['email'], agent.parameters['phone-number']]
        let fields = [{ name, email, phone_no, booking_categ, recipient_id }]
        createContext(agent, "bio_detail", fields)

        if (booking_categ == "Holiday") {
            agent.setFollowupEvent("holiday");
            resolve();
        }
        else if (booking_categ == "Flight") {
            agent.setFollowupEvent("flight");
            resolve();
        }
        else if (booking_categ == "Hotel") {
            agent.setFollowupEvent("hotel");
            resolve();
        }
        else if (booking_categ == "Car") {
            agent.setFollowupEvent("car");
            resolve();
        }
        else {
            console.log("else triggered")
        }
    })
}
