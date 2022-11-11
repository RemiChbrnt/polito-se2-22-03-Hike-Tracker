# List of API

Version: 1.0

Date: 10 Nov 2022

## INDEX
[Hikes](#hikes)

[User](#user)

## Hikes

### GET

#### **/api/hikes**

- **Returns an array containing all Hikes**.
- **Request body**: none.
- **Response**: `200 OK` (success); body: An array of objects, each describing (id, title, length, expTime, ascent, difficulty, startPt, endPt, description) of a Hike. StartPt and endPt are single location objects (id, name, latitude, longitude, country, province, town, address, altitude). While referencePoints is a list of location objects, formatted as before.

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
                "province": "TO",
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
                "province": "TO",
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
                    "province": "TO",
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
                    "province": "TO",
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
                    "province": "TO",
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
