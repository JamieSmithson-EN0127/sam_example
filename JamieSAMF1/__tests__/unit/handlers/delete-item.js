// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TABLE_NAME;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.deleteItemHandler = async (event) => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    //const body = JSON.parse(event.body)
    const Year = event.pathParameters.Year;

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
     let params = {
    TableName : tableName,
    Key: { Year : Year },
  };
  const data = await docClient.delete(params).promise();
  //const item = data.Item;

    //const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify("Driver Deleted")
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
