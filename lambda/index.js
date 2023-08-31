var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const sns_arn = process.env.SNS_TOPIC_ARN;
const sns = new AWS.SNS();
const secretsManager = new AWS.SecretsManager();

module.exports.handler = async (event, context) => {
  if (event.httpMethod === "GET" && event.path === "/status") {
    console.log(event);
    const response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "The API is up and running!" }),
    };
    return response;
  }

  if (event.httpMethod === "POST" && event.path === "/user") {
    try {
      const requestBody = JSON.parse(event.body);
      const secretName = requestBody.email;
      let secret;
      try {
        const secretData = await secretsManager
          .getSecretValue({ SecretId: secretName })
          .promise();
        console.log(secretData);
        secret = JSON.parse(secretData.SecretString);
      } catch (error) {
        console.error("Error retrieving the secret:", error);
        return {
          statusCode: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ message: "Secret not found." }),
        };
      }
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: secret.email,
          password: secret.password,
          username: secret.username,
        }),
      };
      return response;
    } catch (error) {
      console.error("Error processing the request:", error);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Cannot add data without any body.",
          error: error,
        }),
      };
    }
  }

  if (event.httpMethod === "PATCH" && event.path === "/user") {
    try {
      const requestBody = JSON.parse(event.body);
      const secretName = requestBody.email;
      const secretData = await secretsManager
        .getSecretValue({ SecretId: secretName })
        .promise();
      const existingSecret = JSON.parse(secretData.SecretString);
      if (requestBody.username) {
        existingSecret.username = requestBody.username;
      }
      if (requestBody.password) {
        existingSecret.password = requestBody.password;
      }
      await secretsManager
        .updateSecret({
          SecretId: secretName,
          SecretString: JSON.stringify(existingSecret),
        })
        .promise();
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Secret updated successfully." }),
      };
      return response;
    } catch (error) {
      console.error("Error updating the secret:", error);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Error updating the secret.",
          error: error,
        }),
      };
    }
  }

  if (event.httpMethod === "PUT" && event.path === "/user") {
    try {
      const requestBody = JSON.parse(event.body);
      const secretName = requestBody.email;
      const secretPayload = {
        email: requestBody.email,
        username: requestBody.username,
        password: requestBody.password,
      };
      const secretValue = JSON.stringify(secretPayload);
      await secretsManager
        .createSecret({
          Name: secretName,
          SecretString: secretValue,
        })
        .promise();
      const snsTopicARN = "YourSNSTopicARN";
      await sns
        .subscribe({
          Protocol: "email",
          TopicArn: sns_arn,
          Endpoint: requestBody.email,
        })
        .promise();
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "SecretKey created successfully." }),
      };
      return response;
    } catch (error) {
      console.error("Error creating secretKey:", error);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Error creating secretKey.",
          error: error,
        }),
      };
    }
  }

  if (event.httpMethod === "DELETE" && event.path === "/user") {
    try {
      const requestBody = JSON.parse(event.body);
      const secretName = requestBody.email;
      await secretsManager
        .deleteSecret({
          SecretId: secretName,
          ForceDeleteWithoutRecovery: true,
        })
        .promise();
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "SecretKey deleted successfully." }),
      };
      return response;
    } catch (error) {
      console.error("Error deleting the secret:", error);
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "Error deleting the secret.",
          error: error,
        }),
      };
    }
  }

  if (event.httpMethod === "PUT" && event.path === "/bmi") {
    try {
      const requestBody = JSON.parse(event.body);
      const { email, bmi } = requestBody;
      if (!email || !bmi) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Both email and BMI are required fields.",
          }),
        };
      }
      const params = {
        TableName: "bmiDetails",
        Item: {
          email: { S: email },
          bmi: { S: bmi.toString() },
        },
      };
      await dynamoDB.putItem(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "BMI data stored successfully." }),
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Cannot add BMI data.", error: error }),
      };
    }
  }

  if (event.httpMethod === "POST" && event.path === "/bmi") {
    const requestBody = JSON.parse(event.body);
    if (!requestBody.email) {
      const response = {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Missing required parameter: email" }),
      };
      return response;
    }
    const params = {
      TableName: "bmiDetails",
      Key: {
        email: { S: requestBody.email },
      },
    };
    try {
      const data = await ddb.getItem(params).promise();
      if (!data.Item) {
        const response = {
          statusCode: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ message: "Item not found" }),
        };
        return response;
      }
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data.Item),
      };
      return response;
    } catch (err) {
      console.error("Error", err);
      const response = {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "Cannot fetch BMI data", err: err }),
      };
      return response;
    }
  }
};
