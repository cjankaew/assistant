const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const {WebhookClient} = require("dialogflow-fulfillment");
// const db = admin.firestore();

exports.chatbot = functions
    .region("asia-east2")
    .https.onRequest((request, response) => {
      const agent = new WebhookClient({request, response});

      /**
     * Handler for Question 1 intent.
     * @param {WebhookClient} agent The Dialogflow agent.
     * @return {Promise<void>} A
     * Promise that resolves when the handler finishes.
     */
      async function question1(agent) {
        await agent.add("Received!");
      }

      const intentMap = new Map();

      intentMap.set("Question 1", question1);
      agent.handleRequest(intentMap);
    });
