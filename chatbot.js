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

      async function showData(agent) {
        const userData = db.collection(lineUid).doc("UserData");
        const data = await userData.get();
        const name = data.data().Name;
        const salary = data.data().Salary;
        if (data.exists) {
          agent.add(`You're ${name}.\n Your salary is ${salary} `);
        } else {
          agent.add("No Data");
        }
      }

      async function startRecord(agent) {
        const name = agent.parameters["name"];
        const salary = agent.parameters["salary"];
        const userData = {
          Name: name,
          Salary: salary,
        };
        if (lineUid.length > 0) {
          db.collection(lineUid).doc("UserData").set(userData);
        }
        // await agent.add(`Im receive ${name} and Your have ${salary}`);
        await agent.add("Start to good Passive Income!");
      }

      const intentMap = new Map();

      intentMap.set("Show Data", showData);
      intentMap.set("Start Record", startRecord);
      agent.handleRequest(intentMap);
    });
