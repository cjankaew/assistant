const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {WebhookClient} = require("dialogflow-fulfillment");
const db = admin.firestore();

exports.chatbot = functions
    .region("asia-east2")
    .https.onRequest((request, response) => {
      const agent = new WebhookClient({request, response});
      const lineUid =
        request.body.originalDetectIntentRequest.payload.data.source.userId;

      async function question1(agent) {
        await agent.add("Received!");
      }

      async function startRecord(agent) {
        const name = agent.parameters["name"];
        const salary = agent.parameters["salary"];
        const userData = {
          Name: name,
          Salary: salary,
          LindUid: lineUid,
        };
        if (lineUid.length > 0) {
          db.collection(name).doc("UserData").set(userData);
        }
        // await agent.add(`Im receive ${name} and Your have ${salary}`);
        await agent.add("Start to good Passive Income!");
      }

      const intentMap = new Map();

      intentMap.set("Question 1", question1);
      intentMap.set("Start Record", startRecord);
      agent.handleRequest(intentMap);
    });
