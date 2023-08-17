# API Documentation: Cultural Facts API

This documentation outlines the endpoints and functionality of the **Cultural Facts API** – a RESTful API that allows you to manage and retrieve cultural facts stored in a MongoDB database.

## Base URL
https://fast-gorge-30794-8b2624f5e76f.herokuapp.com

## List of Endpoints

| Endpoint                    | HTTP Method | Description                                           | Rate Limiting             | Example Request                                      | Example Response                                     |
|-----------------------------|-------------|-------------------------------------------------------|---------------------------|------------------------------------------------------|------------------------------------------------------|
| `/cultural-facts`           | GET         | Fetches all cultural facts stored in the database.   | Applied (max 100 requests per 15 minutes) | `GET /cultural-facts`                               | ```json\n[{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "Sample fact 1.",\n "country": "Sample country 1."},\n ...]```  |
| `/random-cultural-fact`     | GET         | Retrieves a random cultural fact from the database.  | Applied (max 100 requests per 15 minutes) | `GET /random-cultural-fact`                         | ```json\n{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "Sample fact 1.",\n "country": "Sample country 1."}``` |
| `/cultural-facts`           | POST        | Adds a new cultural fact to the database.            | Applied (max 100 requests per 15 minutes) | `POST /cultural-facts`\n ```json\n{\n  "culturalFact": "New fact.",\n  "country": "New country."\n}```| ```json\n{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "New fact.",\n "country": "New country."}``` |
| `/cultural-facts/:id`       | GET         | Retrieves a specific cultural fact by its ID.        | Applied (max 100 requests per 15 minutes) | `GET /cultural-facts/61522a9e2bb1820015dcecb7`    | ```json\n{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "Sample fact 1.",\n "country": "Sample country 1."}``` |
| `/cultural-facts/:id`       | PUT         | Updates a specific cultural fact by its ID.          | Applied (max 100 requests per 15 minutes) | `PUT /cultural-facts/61522a9e2bb1820015dcecb7`\n ```json\n{\n  "culturalFact": "Updated fact.",\n  "country": "Updated country."\n}``` | ```json\n{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "Updated fact.",\n "country": "Updated country"}``` |
| `/cultural-facts/:id`       | PATCH       | Updates specific fields of a cultural fact by its ID.| Applied (max 100 requests per 15 minutes) | `PATCH /cultural-facts/61522a9e2bb1820015dcecb7`\n ```json\n{\n  "culturalFact": "Updated fact."\n}``` | ```json\n{"_id": "61522a9e2bb1820015dcecb7",\n "culturalFact": "Updated fact.",\n "country": "Sample country 1."}``` |
| `/cultural-facts/:id`       | DELETE      | Deletes a specific cultural fact by its ID.          | Applied (max 100 requests per 15 minutes) | `DELETE /cultural-facts/61522a9e2bb1820015dcecb7` | ```json\n{"message": "Cultural fact deleted successfully."}``` |

Please note that the API uses rate limiting to ensure a controlled number of requests within a specific timeframe. Additionally, validation and sanitization are applied to input data to enhance data integrity. Make sure to replace placeholders like `:id` with actual values when making requests.
