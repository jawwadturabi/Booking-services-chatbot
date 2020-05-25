# Introduction
This bot will make booking in four services. It will then store user data in mysql database and create an event in user's google calendar, also send booking confirmation email. The four booking services are:

- Flight Booking
- Car Booking
- Holidays trip Booking
- Hotel Booking

## Video Demonstration/Interaction

[![Image](https://user-images.githubusercontent.com/47825998/82844886-a4f94180-9efb-11ea-979c-afa4edf6b05a.png)](https://vimeo.com/user115896954/review/422577691/20e51c3c6a)

## Setting up Dialogflow Console

Sign-in to [Dialogflow](https://dialogflow.cloud.google.com/) and Create a new agent. Import the zip file from this repository to the agent.


## Installation

```bash
npm install
```

## Setting up SQL DATABASE
Set up your SQL DB and provide credentials, create tables and rows according to the query written in sql.js.

## Setting up Google Calendar event

Follow the official documentation of [Google Calendar API](https://developers.google.com/calendar/overview) and Generate your client id, client secret and OAuth2.0 token for your Dialogflow agent. Put these credentials in the calendar.js file.

## Setting up Postmark Email Service
Sign-in to [Postmark](https://account.postmarkapp.com/). Set up your mail server and verify the sender signatures. Follow the official documentation of [Postmark Setup](https://postmarkapp.com/support/article/1002-getting-started-with-postmark). Generate the ServerClient key for your account and paste it into email.js.

## Deployment

Sign-in to the [Heroku](https://www.heroku.com/) console. Create an app and follow the steps to deploy your app to Heroku. Get the URL of your App and paste it in Fulfillment tab of your Dialogflow agent

Note: Make sure to place the correct route to the url.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
