const { Card } = require("dialogflow-fulfillment");

exports.createCard = (agent) => {
    agent.add("Great! Your service has booked.");
    agent.add("You'll hear back from our team very soon");
    agent.add(
        new Card
            ({
                title: "Thanks for using our services",
                text: "For more detail visit our website",
                buttonText: "Click here",
                buttonUrl: "https://www.farenow.com/"
            })
    )
}