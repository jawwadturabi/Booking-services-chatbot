
exports.createContext = (agent, name, params) => {

    agent.setContext({
        name,
        lifespan: 5,
        parameters: params[0]
    })
}
exports.get_bio_context = (agent) => {
    let bio_context = agent.getContext('bio_detail');
    let [name, email, phone_no, booking_categ, recipient_id] = [bio_context.parameters['name'], bio_context.parameters['email'], bio_context.parameters['phone_no'], bio_context.parameters['booking_categ'], bio_context.parameters['recipient_id']];
    let params1 = [name, email, phone_no, booking_categ, recipient_id,];
    return params1;
} 