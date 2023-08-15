# Cul-Tour-Guide-API
Cultural Facts API Documentation
Welcome to the Cultural Facts API documentation. This API allows you to manage and retrieve cultural facts from various countries. Explore the endpoints below to interact with the API and retrieve interesting cultural insights.
Base URL: http://localhost:3000

Rate Limiting
The API enforces rate limiting to prevent abuse. Users are limited to a certain number of requests within a specified time window.

Window: 15 minutes
Max Requests per Window: 100

Endpoints
Get All Cultural Facts
Retrieves a list of all cultural facts from the database.

URL: /cultural-facts
Method: GET
Rate Limiting: Applied
Response: List of cultural facts or an error message.
Get Random Cultural Fact
Retrieves a random cultural fact from the database.

URL: /random-cultural-fact
Method: GET
Rate Limiting: Applied
Response: A random cultural fact or an error message.
Add New Cultural Fact
Adds a new cultural fact to the database.

URL: /cultural-facts
Method: POST
Rate Limiting: Applied
Request Body:
{
  "culturalFact": "The cultural fact description.",
  "country": "The country associated with the fact."
}

Response: The added cultural fact or an error message.
Get Individual Cultural Fact
Retrieves an individual cultural fact based on its ID.

URL: /cultural-facts/:id
Method: GET
Rate Limiting: Applied
Response: The requested cultural fact or an error message.
Update Individual Cultural Fact
Updates an individual cultural fact based on its ID.

URL: /cultural-facts/:id
Method: PUT
Rate Limiting: Applied
Request Body:
{
  "culturalFact": "Updated fact description.",
  "country": "Updated country."
}

Response: The updated cultural fact or an error message.
Partially Update Individual Cultural Fact
Partially updates an individual cultural fact based on its ID.

URL: /cultural-facts/:id
Method: PATCH
Rate Limiting: Applied
Request Body: Fields to update (culturalFact and/or country).
Response: The updated cultural fact or an error message.
Delete Individual Cultural Fact
Deletes an individual cultural fact based on its ID.

URL: /cultural-facts/:id
Method: DELETE
Rate Limiting: Applied
Response: Success message or an error message.
Error Handling
In case of errors, the API will provide appropriate error responses with relevant status codes and error messages. Common errors include validation errors, not found errors, and server errors.
