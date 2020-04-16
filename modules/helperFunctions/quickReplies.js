const { Suggestion } = require("dialogflow-fulfillment");

function quick_reply(agent) {

    const quickReplies = new Suggestion({
        title: "Would you like to confirm this reservation?",
        reply: "Yes"
    })
    quickReplies.addReply_("No")
    agent.add(quickReplies)

}

function custom_quick_reply(agent, title, items) {

    const quickReplies = new Suggestion({
        title: title,
        reply: items[0]
    })

    more_replies(items, quickReplies)

    agent.add(quickReplies)

}
function more_replies(items, quickReplies) {
    items.map((v, i) => {
        if (items[i + 1] == undefined) {

        }
        else {
            quickReplies.addReply_(items[i + 1])
        }
    })
    return quickReplies;
}
module.exports = {
    quick_reply, custom_quick_reply
}