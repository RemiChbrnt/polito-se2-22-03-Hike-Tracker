# List of API

Version: 1.0

Date: 10 Nov 2022

## INDEX
[Hikes](#hikes)

[User](#user)

## Hikes



### `/api/hikes`

#### GET

- **Returns an array containing all Hikes**.
- **Request body**: none.
- **Response**: `200 OK` (success); body: An array of objects, each describing (id, title, length, expTime, ascent, difficulty, startPt, endPt, description) of a Hike. StartPt and endPt are single location objects (id, name, latitude, longitude, country, region, town, address, altitude). While referencePoints is a list of location objects, formatted as before.

    ```
    [
        {
            "id": 1,
            "title": "Sentiero per il Rocciamelone",
            "length": 9,
            "expTime": 6.5,
            "ascent": 1353,
            "difficulty": "pro",
            "startPt": {
                "id": 1,
                "name": "Rifugio La Riposa",
                "type": "hut",
                "latitude": 45.17880975856355,
                "longitude": 7.08152295397762,
                "country": "Italy",
                "region": "Piemonte",
                "town": "Mompantero",
                "address": "Frazione La Riposa",
                "altitude": 2185
            },
            "endPt": {
                "id": 2,
                "name": "Rocciamelone",
                "type": "generic",
                "latitude": 45.203883238657625,
                "longitude": 7.076990054701778,
                "country": "Italy",
                "region": "Piemonte",
                "town": "Usseglio",
                "address": null,
                "altitude": 3538
            },
            "description": "Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti).",
            "referencePoints": [
                {
                    "id": 1,
                    "name": "Rifugio La Riposa",
                    "type": "hut",
                    "latitude": 45.17880975856355,
                    "longitude": 7.08152295397762,
                    "country": "Italy",
                    "region": "Piemonte",
                    "town": "Mompantero",
                    "address": "Frazione La Riposa",
                    "altitude": 2185
                },
                {
                    "id": 2,
                    "name": "Rocciamelone",
                    "type": "generic",
                    "latitude": 45.203883238657625,
                    "longitude": 7.076990054701778,
                    "country": "Italy",
                    "region": "Piemonte",
                    "town": "Usseglio",
                    "address": null,
                    "altitude": 3538
                },
                {
                    "id": 3,
                    "name": "Punto inventato #1",
                    "type": "parkinglot",
                    "latitude": 45.19880975856355,
                    "longitude": 7.078090054701778,
                    "country": "Italy",
                    "region": "Piemonte",
                    "town": "fakeTown",
                    "address": null,
                    "altitude": 2500
                }
            ]
        },
        ... other hikes
    ]

    ```


- **Permissions allowed**:  Anyone (visitor)
- **Error responses**: `500 Internal Server Error` (generic error).

#### POST 

- **Creates a new entry in the Hikes table.**
- **Request body:** a JSON item representing the new hike. The item shold have the following fields:
    - `title`: the title of the hike
    - `length`: the length of the hike, expressed in kms
    - `expTime`: the expected time to complete the hike, expressed in hours
    - `ascent`: the heigth difference between the hike's starting point and end point
    - `difficulty`: the suggested difficulty for the hike, which should be a string containing either "tourist", "hiker" or "pro"
    - `description`: an optional field containing a textual description of the hike
    - `author`: the email of the user that created the hike

- **Permissions allowed**: registered users (Hikers)

- **Responses**
    - `201 Created`: the hike was correctly created and is now in the database.
        - **Body**: none
- **Error responses**
    - `400 Bad request`: the hike was not created
        - **Body**: none


## User

### Post

#### **/api/login**
- **Request body**: Json object containing email and password.
    ```
   {
        "email":"test@mail.it",
        "password":"password",
   }

    ```
- **Response header**:  `200 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Anyone (visitor)
- **Error responses**: `500 Internal Server Error` (generic error).

