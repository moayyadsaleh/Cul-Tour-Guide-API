# API Documentation: Cultural Facts API

This documentation outlines the endpoints and functionality of this RESTful Cultural Facts API. The API allows you to manage and retrieve cultural facts stored in a MongoDB database.

# Base URL: https://fast-gorge-30794-8b2624f5e76f.herokuapp.com

# List of Endpoints:

Display All Cultural Facts

Endpoint: /cultural-facts
HTTP Method: GET
Description: Fetches all cultural facts stored in the database.
Query Parameters: None
Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: An array of cultural facts and their associated countries.
Sample Request:https://fast-gorge-30794-8b2624f5e76f.herokuapp.com/cultural-facts
Sample Response: [
  {
    "_id": "61522a9e2bb1820015dcecb7",
    "culturalFact": "Sample fact 1.",
    "country": "Sample country 1."
  },
  {
    "_id": "61522aa42bb1820015dcecb8",
    "culturalFact": "Sample fact 2.",
    "country": "Sample country 2."
  },
  ...
]

# Display a Random Cultural Fact

Endpoint: /random-cultural-fact
HTTP Method: GET
Description: Retrieves a random cultural fact from the database.
Query Parameters: None
Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: A single random cultural fact with its associated country.
Sample Request:https://fast-gorge-30794-8b2624f5e76f.herokuapp.com/random-cultural-fact
Sample Response: {
  "_id": "61522a9e2bb1820015dcecb7",
  "culturalFact": "Sample fact 1.",
  "country": "Sample country 1."
}


# Add a New Cultural Fact

Endpoint: /cultural-facts
HTTP Method: POST
Description: Adds a new cultural fact to the database.
Request Body:{
  "culturalFact": "New fact.",
  "country": "New country."
}

Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: The added cultural fact with its associated country.
Sample Request:
POST /cultural-facts
Content-Type: application/json

{
  "culturalFact": "New fact.",
  "country": "New country."
}

Sample Response:{
  "_id": "61522a9e2bb1820015dcecb7",
  "culturalFact": "New fact.",
  "country": "New country."
}

# Retrieve a Specific Cultural Fact

Endpoint: /cultural-facts/:id
HTTP Method: GET
Description: Retrieves a specific cultural fact by its ID.
Path Parameter: id (ID of the cultural fact)
Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: The cultural fact with the specified ID and its associated country.
Sample Request: GET /cultural-facts/61522a9e2bb1820015dcecb7
Sample Response:
{
  "_id": "61522a9e2bb1820015dcecb7",
  "culturalFact": "Sample fact 1.",
  "country": "Sample country 1."
}

# Update a Specific Cultural Fact

Endpoint: /cultural-facts/:id
HTTP Method: PUT
Description: Updates a specific cultural fact by its ID.
Path Parameter: id (ID of the cultural fact)
Request Body:{
  "culturalFact": "Updated fact.",
  "country": "Updated country."
}

Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: The updated cultural fact with its associated country.
Sample Request:PUT /cultural-facts/61522a9e2bb1820015dcecb7
Content-Type: application/json

{
  "culturalFact": "Updated fact.",
  "country": "Updated country."
}
Sample Response:
{
  "_id": "61522a9e2bb1820015dcecb7",
  "culturalFact": "Updated fact.",
  "country": "Updated country"}

  Update Specific Fields of a Cultural Fact

 # Endpoint: /cultural-facts/:id
HTTP Method: PATCH
Description: Updates specific fields of a cultural fact by its ID.
Path Parameter: id (ID of the cultural fact)
Request Body: A JSON object containing the fields to be updated (culturalFact and/or country).
Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: The updated cultural fact with its associated country.
Sample Request:PATCH /cultural-facts/61522a9e2bb1820015dcecb7
Content-Type: application/json

{
  "culturalFact": "Updated fact."
}

Sample Response: {
  "_id": "61522a9e2bb1820015dcecb7",
  "culturalFact": "Updated fact.",
  "country": "Sample country 1."
}

Delete a Specific Cultural Fact

Endpoint: /cultural-facts/:id
HTTP Method: DELETE
Description: Deletes a specific cultural fact by its ID.
Path Parameter: id (ID of the cultural fact)
Rate Limiting: Applied (max 100 requests per 15 minutes)
Response: A success message.
Sample Request: DELETE /cultural-facts/61522a9e2bb1820015dcecb7
Sample Response: {
  "message": "Cultural fact deleted successfully."
}

Please note that the API uses rate limiting to ensure a controlled number of requests within a specific timeframe. Additionally, validation and sanitization are applied to input data to enhance data integrity. Make sure to replace placeholders like :id with actual values when making requests.

