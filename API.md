# List of API

Version: 1.0

Date: 10 Nov 2022

## INDEX
[Hikes](#hikes)

[User](#user)

[Locations](#locations)
## Hikes


### Get

#### **/api/hikes**
- **Returns an array containing all Hikes**.
- **Request body**: Json object with optional filters.
```
{
    "minLength": 5,
    "maxLength": 10,
    "minAscent": 100,
    "maxAscent": 500,
    "minTime": 1,
    "maxTime": 3,
    "difficulty": 'pro',
    "country": 'italy',
    "region": 'Veneto',
    "town": 'Thiene',
    "author": 'gianmarco.capo@nice.ok'
}
```

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
- **Error responses**: `422` (validation errors in the request), `500 Internal Server Error` (generic error).

#### **/api/hikeFromID**
- **Request body**: none.
- **Query parameters**: id of the hike to fetch
- **Response header**:  `200 OK` (success).
- **Response body**: Json object containing all the fields of a hike, extended with the related locations.
```
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
        }
```
- **Permissions allowed**:  Logged user (any)
- **Error responses**: `422` (validation errors in the request), `500 Internal Server Error` (generic error).

#### **/api/hikesList/:hutId/**
- **Request body**: none.
- **Response header**:  `200 OK` (success).
- **Response body**: Json object returning name, status, description of a hike linked to a hut
```
{
    id: 1,
    name: 'Sentiero per il Rocciamelone',
    status: 'closed',
    description: 'mud slide on the main bridge'
}
```
- **Permissions allowed**:  Logged user (hutworker)
- **Error responses**: `400 Bad request` (if the user is not a hutworker), `422` (validation errors in the request), `500 Internal Server Error` (generic error).

### Post
#### **/api/hikes**
- **Creates a new entry in the Hikes table.**
- **Request body:** a JSON item representing the new hike. The item shold have the following fields:
    - `title`: the title of the hike
    - `length`: the length of the hike, expressed in kms
    - `expTime`: the expected time to complete the hike, expressed in hours
    - `ascent`: the heigth difference between the hike's starting point and end point
    - `difficulty`: the suggested difficulty for the hike, which should be a string containing either "tourist", "hiker" or "pro"
    - `description`: an optional field containing a textual description of the hike
    - `author`: the email of the user that created the hike
 ```
{
    title: 'TestingInsertion',
    length: '4',
    expTime: '4',
    ascent: '2131',
    difficulty: 'tourist',
    startPt: p1.body.id,
    endPt: p2.body.id,
    description: '',
    track: null,
    author: 'antonio.fracassa@live.it'
}
```
- **Permissions allowed**: Logged user (hiker)
- **Response header**: `201 Created`: the hike was correctly created and is now in the database.
- **Response body**: Json object containing the id of the newly created hike.
```
    {
        "id":13,
    }
```
- **Error responses**: `403 Unauthorized` (if the user is not a hiker), `422` (validation errors in the request), `400 Bad request` (generic error).

#### **/api/hikesReferencePoints**
- **Request body**: Json object containing the id of the hike and the id of the reference point.
```
    {
        "id": 1,
        "locationId": 4,
    }
```
- **Response header**:  `200 OK` (success).
- **Response body**: none.
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Bad request` (if the user is not a hiker), `422` (validation errors in the request), `500 Internal Server Error` (generic error).

### Put

#### **/api/hike-startPt/:id/:startPt**
- **Request body**: Json object containing the id of the hike and the id of the start point.
```
    {
        "id": 1,
        "startPt": 23,
    }
```
- **Response header**:  `200 OK` (success).
- **Response body**: none.
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Bad request` (if the user is not a hiker), `422` (validation errors in the request), `500 Internal Server Error` (generic error).

#### **/api/hike-endPt/:id/:endPt**
- **Request body**: Json object containing the id of the hike and the id of the end point.
```
    {
        "id": 1,
        "endPt": 20,
    }
```
- **Response header**:  `200 OK` (success).
- **Response body**: none.
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Bad request` (if the user is not a hiker), `422` (validation errors in the request), `500 Internal Server Error` (generic error).

#### **/api/hikes/:hikeId/status/:hutId**
- **Request body**: Json object containing the new status and description.
```
{
    status: 'closed',
    description: 'mud slide on the main bridge'
}
```
- **Response header**:  `200 OK` (success).
- **Response body**: none.
- **Permissions allowed**:  Logged user (hutworker)
- **Error responses**: `400 Bad request` (if the user is not a hutworker), `422` (validation errors in the request), `500 Internal Server Error` (generic error).

## User
### Get

#### **/api/session/current**
- **Request body**: none.
- **Response header**:  `200 OK` (success).
- **Response body**: Json object containing email, fullName, role and the verified flag.
```
    {
        "email":"maurizio.merluzzo@donkeykong.com",
        "fullName":"Maurizio Merlo Petruzzo",
        "role":"hiker",
        "verified":1
    }
```
- **Permissions allowed**:  Logged user (any)
- **Error responses**: `500 Internal Server Error` (generic error).

#### **/api/get-pending-users**
- **Request body**: none.
- **Response header**:  `200 OK` (success).
- **Response body**: Json object a list of users in need of verification.
```
[
  {
    email: 'najejof113@dmonies.com',
    fullName: 'Unapproved Hutworker',
    role: 'hutworker',
    phoneNumber: '369852147'
  },
  {
    email: 'fiyode9163@eilnews.com',
    fullName: 'Approval Needed',
    role: 'guide',
    phoneNumber: '1597536842'
  }
]
```
- **Permissions allowed**:  Logged user (manager)
- **Error responses**: `400 Unauthorized` (if the user is not a manager), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).

#### **/api/preferences**
- **Request body**: none.
- **Response header**:  `200 OK` (success).
- **Response body**: Json object containing the email plus the preferences: ascent, duration.
```
{
    email: 'maurizio.merluzzo@donkeykong.com',
    ascent: 1000,
    duration: 2 
}
```
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `403 Unauthorized` (if the user is not a hiker), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).

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
- **Error responses**: `403 Unapproved` (The user is in need of verification by the manager), `500 Internal Server Error` (generic error).

#### **/api/singup**
- **Request body**: Json object containing email, password, fullName, role and optionally phoneNumber(only for the guide).
    ```
   {
        email: 'test@live.it',
        password: 'testPassword',
        fullName: 'test',
        role: 'guide',
        phoneNumber: '2313124214'
   }
    ```
- **Response header**:  `201 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Anyone (visitor)
- **Error responses**: `500 Internal Server Error` (generic error).

#### **/api/approve**
- **Request body**: Json object containing email to approve.
    ```
   {
        "email":"test@mail.it",
   }
    ```
- **Response header**:  `200 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Logged user (manager)
- **Error responses**: `400 Unauthorized` (if the user is not a manager), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/preferences**
- **Request body**: Json object containing the email and the preferences to insert
```
{
  ascent: '1000',
  duration: '2'
}
```
- **Response header**:  `200 OK` (success).
- **Response body**: The same Json object of the request but with the associated email of the user
```
{
  email: 'maurizio.merluzzo@donkeykong.com',
  ascent: '1000',
  duration: '2'
}
```
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `403 Unauthorized` (if the user is not a hiker), `422` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


### Put

#### **/api/preferences**
- **Request body**: Json object containing the email and the preferences to insert
```
{
  ascent: '1000',
  duration: '2'
}
```
- **Response header**:  `200 OK` (success).
- **Response body**: The same Json object of the request but with the associated email of the user
```
{
  email: 'maurizio.merluzzo@donkeykong.com',
  ascent: '1000',
  duration: '2'
}
```
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `403 Unauthorized` (if the user is not a hiker), `422` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).

### Delete

#### **/api/session/current**
- **Request body**: none.
- **Response header**: `204 OK` (success).
- **Response body**: none.
- **Permissions allowed**:  Logged user (any)
- **Error responses**: `500 Internal Server Error` (generic error).

#### **/api/approve**
- **Request body**: Json object containing email to decline, together with the role to clear the db.
    ```
   {
        "email":"test@mail.it",
        "role":"hutworker"
   }
    ```
- **Response header**:  `204 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Logged user (manager)
- **Error responses**: `400 Unauthorized` (if the user is not a manager), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).

#### **/api/preferences**
- **Request body**: none.
- **Response header**:  `204 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `403 Unauthorized` (if the user is not a hiker), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


## Hikes


### Get

#### **/api/huts**
- **Request body**: Json object with optional filters.
```
{
    "name": 'hut 1',
    "minAltitude": 10,
    "maxAltitude": 100,
    "country": 'Italy',
    "region": 'Veneto',
    "town": 'Thiene',
    "address": 'via della Mancia'
}
```
- **Response header**:  `201 OK` (success). 
- **Response body**: Json object containing all the detailed info of every hut
```
[{
    id: 115,
    name: 'hut 1',
    latitude: 45,
    longitude: 7,
    country: 'Italy',
    region: 'Veneto',
    town: 'Thiene',
    address: 'via della Mancia',
    altitude: 15,
    numberOfBeds: 50,
    food: 'buffet',
    description: 'a description',
    openingTime: '11:00',
    closingTime: '22:00',
    cost: '15',
    phone: '+39 213432121',
    email: 'antonio@live.it',
    website: 'www.documentingIsSureALotOfFun.it'
},
 ... other huts
]
```
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `400 Unauthorized` (if the user is not a hiker), `400` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/hut-by-id**
- **Request body**: none.
- **Query parameters**: id to look for.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing all the detailed info of the specific hut
```
{
    id: 115,
    name: 'hut 1',
    latitude: 45,
    longitude: 7,
    country: 'Italy',
    region: 'Veneto',
    town: 'Thiene',
    address: 'via della Mancia',
    altitude: 15,
    numberOfBeds: 50,
    food: 'buffet',
    description: 'a description',
    openingTime: '11:00',
    closingTime: '22:00',
    cost: '15',
    phone: '+39 213432121',
    email: 'antonio@live.it',
    website: 'www.documentingIsSureALotOfFun.it'
}
```
- **Permissions allowed**:  Logged user (hiker)
- **Error responses**: `400 Unauthorized` (if the user is not a hiker), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/huts-and-parking-lots**
- **Request body**: none.
- **Query parameters**: id to look for.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing all the generic info of every hut and parking lot
```
[
  {
    id: 1,
    name: 'Rifugio La Riposa',
    type: 'hut',
    latitude: 45.17880975856355,
    longitude: 7.08152295397762,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Mompantero',
    address: 'Frazione La Riposa',
    altitude: 2185
  },
  {
    id: 528,
    name: 'Test',
    type: 'parkinglot',
    latitude: 11,
    longitude: 11,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Riva presso Chieri',
    address: 'Via giacomo puccini 4',
    altitude: 1000
  },
  {
    id: 529,
    name: 'Test',
    type: 'hut',
    latitude: 11.12,
    longitude: 11.12931,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Riva presso Chieri',
    address: 'Via giacomo puccini 4',
    altitude: 1000
  },
  {
    id: 532,
    name: 'Test',
    type: 'hut',
    latitude: 11.12,
    longitude: 11.12931,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Riva presso Chieri',
    address: 'Via giacomo puccini 4',
    altitude: 1000
  },
  ...
]
```
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Unauthorized` (if the user is not a guide), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/locations**
- **Request body**: none.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing the generic info of every location
```
[
  {
    id: 1,
    name: 'Rifugio La Riposa',
    type: 'hut',
    latitude: 45.17880975856355,
    longitude: 7.08152295397762,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Mompantero',
    address: 'Frazione La Riposa',
    altitude: 2185
  },
  ... other locations
]
```
- **Permissions allowed**:  Visitor (anyone)
- **Error responses**: `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/hutsList/:userId**
- **Request body**: none.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing the detailed info of all huts created by one guide.
```
[
  {
    id: 1,
    name: 'Rifugio La Riposa',
    latitude: 45.17880975856355,
    longitude: 7.08152295397762,
    country: 'Italy',
    region: 'Piedmont',
    town: 'Mompantero',
    address: 'Frazione La Riposa',
    altitude: 2185,
    numberOfBeds: undefined,
    food: 'none',
    description: null,
    openingTime: null,
    closingTime: null,
    cost: null,
    phone: undefined,
    email: undefined,
    website: undefined,
    photos: undefined
  },
  ... other huts
]
```
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Unauthorized` (if the user is not a guide), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/locationById**
- **Request body**: none.
- **Query parameters**: id to look for.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing the info of a location by id
```
{
  name: 'Test',
  type: 'hut',
  latitude: '11.12',
  longitude: '11.12931',
  country: 'Italy',
  region: 'Piedmont',
  town: 'Riva presso Chieri',
  address: 'Via giacomo puccini 4',
  altitude: '1000',
  author: 'giacomo@live.it'
}
```
- **Permissions allowed**:  Logged user (any)
- **Error responses**: `400 Unauthorized` (if the user is not logged in), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/referencePointsByHikeId**
- **Request body**: none.
- **Query parameters**: hike id to look for.
- **Response header**:  `200 OK` (success). 
- **Response body**: Json object containing the reference points of a hike
```
[{
  name: 'Test',
  type: 'hut',
  latitude: '11.12',
  longitude: '11.12931',
  country: 'Italy',
  region: 'Piedmont',
  town: 'Riva presso Chieri',
  address: 'Via giacomo puccini 4',
  altitude: '1000',
  author: 'giacomo@live.it'
},
... other points (locations)
]
```
- **Permissions allowed**:  Logged user (any)
- **Error responses**: `400 Unauthorized` (if the user is not logged in), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/huts/myhut**
- **Request body**: none.
- **Response header**:  `200 OK` (success). 
- **Response body**: Resolves the id of the hut the logged user works in. 
```
    1
```
- **Permissions allowed**:  Logged user (hutworker)
- **Error responses**: `400 Unauthorized` (if the user is not a hutworker), `400` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).

### Post


#### **/api/locations**
- **Request body**: Json object containing the new location data: Required: (name, type, latitude, longitude). Optional: (country, region, town, address, altitude, numberOfBeds, food, description, phone, email, website). Moreover, the last three optional are only used for huts.
```
{
  name: 'Test',
  type: 'hut',
  latitude: '11.12',
  longitude: '11.12931',
  country: 'Italy',
  region: 'Piedmont',
  town: 'Riva presso Chieri',
  address: 'Via giacomo puccini 4',
  altitude: '1000',
  numberOfBeds: '10',
  food: 'none'
}
```
- **Response header**:  `201 OK` (success). 
- **Response body**: Json object containing the data of the newly inserted location.
```
{
  name: 'Test',
  type: 'hut',
  latitude: '11.12',
  longitude: '11.12931',
  country: 'Italy',
  region: 'Piedmont',
  town: 'Riva presso Chieri',
  address: 'Via giacomo puccini 4',
  altitude: '1000',
  numberOfBeds: '10',
  food: 'none',
  id: 553
}
```
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `400 Unauthorized` (if the user is not a guide), `422` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).


#### **/api/linkHut**
- **Request body**: Json object containing the location Id to be linked to the hike Id.
```
{
  locationId: 13,
  hikeId: 45,
}
```
- **Response header**:  `201 OK` (success). 
- **Response body**: Json object containing the id of the location.
```
{
  id: 13
}
```
- **Permissions allowed**:  Logged user (guide)
- **Error responses**: `403 Unauthorized` (if the user is not a guide), `422` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).



#### **/hut-photo/:id**
- **Request body**: Image file to store and link to a hut.
- **Response header**:  `201 OK` (success). 
- **Response body**: none.
- **Permissions allowed**:  Logged user (hutworker)
- **Error responses**: `403 Unauthorized` (if the user is not a hutworker), `422` (validation errors in the request), `503 Db Error` (generic db error), `500 Internal Server Error` (generic error).