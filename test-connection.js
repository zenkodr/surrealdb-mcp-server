// Import the Surreal class from the installed package
const { Surreal } = require('surrealdb');

// Connection details from project brief
const DB_ENDPOINT = 'ws://localhost:8000';
const DB_USER = 'root';
const DB_PASS = 'root';
// Note: For a real application, especially the MCP server,
// these should come from environment variables or a secure config.

async function testSurrealConnection() {
  // Instantiate the Surreal client
  const db = new Surreal();

  try {
    console.log(`Attempting to connect to SurrealDB at ${DB_ENDPOINT} with NS/DB/Auth...`);
    // Connect providing NS, DB, and Auth directly in options (as per docs)
    await db.connect(DB_ENDPOINT, {
      namespace: 'n8n',
      database: 'AIWorld',
      auth: {
        username: DB_USER, // Using username/password as shown in connect auth example
        password: DB_PASS,
      },
    });
    console.log('Connection established and authenticated.');

    // No separate .use() or .signin() needed when provided in connect options

    console.log('Executing query: SELECT * FROM test_table LIMIT 1;');
    // Execute a simple query
    const result = await db.query('SELECT * FROM test_table LIMIT 1;');
    console.log('Query executed successfully.');

    // Log the result
    console.log('--- Query Result ---');
    console.log(JSON.stringify(result, null, 2)); // Pretty print the JSON result
    console.log('--------------------');

  } catch (e) {
    // Log any errors that occur during connection, signin, or query
    console.error('--- ERROR ---');
    console.error('An error occurred:', e.message || e);
    if (e.stack) {
        console.error(e.stack);
    }
    console.error('-------------');
  } finally {
    // Ensure the connection is closed regardless of success or failure
    console.log('Closing database connection...');
    await db.close();
    console.log('Connection closed.');
  }
}

// Run the test function
testSurrealConnection();
