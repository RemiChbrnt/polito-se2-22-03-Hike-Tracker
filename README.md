# Hike Tracker

#### Contents

- [Screens](#screens)
  1. [Homepage for unregistered users](#1-homepage-for-unregistered-users)
     - [Browsing the hikes](#browsing-the-hikes)
     - [Filtering the hikes](#filtering-the-hikes)
  2. [Signup/Login form](#2-signuplogin-form)
  3. [Hiker homepage](#3-hiker-homepage)
  4. [Local Guide homepage](#4-local-guide-homepage)
     - [Creating a new hike](#creating-a-new-hike)
     - [Adding a parking lot or hut](#adding-a-parking-lot-or-hut)
     - [Linking a hut to a hike](#linking-a-hut-to-a-hike)
- [Available Users](#available-users)

## Screens

### 1. Homepage for unregistered users

<p align="center">
    <img src="./screenshots/homepage_unregistered.png" width="1000"/>
</p>
Upon starting the application, the first screen the user will see is the homepage for unregistered users. Here the user can browse the list of available hikes and access the login/signup form.

#### Browsing the hikes

The hikes that are stored in the database are presented to the users as cards that show:

- The name of the hike
- Its estimated duration in hours
- Its ascent from the starting point
- The recommended difficulty of the hike, which can be "Tourist" (suitable for beginners), "Hiker" (more challenging, but still manageable for intermediate hikers) or "Pro" (difficult hikes, only recommended to experts)
- The start and end points of the hike, with the name of the starting and ending locations
- An optional textual description of the hike

<p align="center">
    <img src="./screenshots/hikecard.png" width="350"/>
</p>
By clicking on a hike card, the user opens the hike view, which will, show, in addition to the previously mentioned elements, also a map with markers on the start and end points. If the hike has its own GPX file, the hike track is displayed on the map as well.

##### Filtering the hikes

The user can also filter the hikes that are displayed, by providing filters on the hikes' properties (by difficulty, province of the start point, and min/max length, ascent and expected time. Note: the filtering by region is not yet implemented).

<p align="center">
    <img src="./screenshots/filters.png" width="350"/>
</p>

### 2. Signup/Login form

An unregistered user can sign up to the app by filling the signup form. When doing so, the user must specify their role ("hiker", "Hut worker", "Local guide" or "Emergency operator"), and they will be able to access the corresponding features upon logging in.

<p align="center">
    <img src="./screenshots/signup.png" width="200"/>
</p>

After registering, a user can login with their credentials.

<p align="center">
    <img src="./screenshots/login.png" width="350"/>
</p>
A list of registered users, with their role and passwords, is available in the Available users section.

### 3. Hiker homepage

In addition to the previously mentioned features, a hiker can also access the list of available huts. So far, the huts information include their coordinates, the country, province and town, an optional address and their altitude.

<p align="center">
    <img src="./screenshots/searchhut.png" width="350"/>
</p>

A hiker can also search for specific huts via the search form.

Another feature available to hikers is the possibility to input their preferences for hikes' duration and ascent. These will be used in the future to suggest hikes to hikers.
In order to access their preferences, hikers can click on the gear icon in the top righthand corner of the navbar. This will take them to the preference page. If the hiker has no preference set yet, they will be able to input them. Once they're, they will be displayed to the hiker.

<p align="center">
    <img src="./screenshots/preferences.png" width="1000"/>
</p>

### 4. Local Guide homepage

A local guide can access their specific features (in addition to the usual ones) via the buttons in the navbar.

<p align="center">
    <img src="./screenshots/guidenavbar.png" width="1000"/>
</p>
These features are:

- creating a new hike
- adding a parking lot
- adding a hut
- link a hut to an existing hike

#### Creating a new hike

<p align="center">
    <img src="./screenshots/addhikeform.png" width="1000"/>
</p>

A guide can add a hike via the form. In it, the guide is required to input all the necessary information for the hike, such as a title, length, expected time etc. It is also required to provide a start point and end point for the hike. This can be done in three ways:

- by manually inserting the points' coordinates, name and required information
- by choosing the points from the list of existing (i.e. registered) points
- by uploading a GPX file. This will autocomplete the form with all the necessary information, as well as displaying the hike track on the map in the hike view.

#### Adding a parking lot or hut

To add a parking lot or hut, a guide can use the provided forms, which will ask to input all the required information for the two types of locations.

<p align="center">
    <img src="./screenshots/parkinglotform.png" width="250"/>
    <img src="./screenshots/hutform.png" width="250"/>
</p>

#### Linking a hut to a hike

To link a hut to a hike, the guide can click on the correspondent button in the navbar. This will take the user to the hut list, displaying all the information for each hut. For each entry in the list, the user can click on the link icon and select the hike to link the hut to it.

<p align="center">
    <img src="./screenshots/hutlist.png" width="1000"/>
</p>

## Available users

| Username                         | Password      | Role                                     |
| -------------------------------- | ------------- | ---------------------------------------- |
| maurizio.merluzzo@donkeykong.com | testPassword1 | Hiker                                    |
| antonio.fracassa@live.it         | testPassword2 | Local Guide                              |
| giulio.uzumaki@tokio.it          | testPassword3 | Manager (Not implemented yet)            |
| jen.shiro@chiocciola.it          | testPassword4 | Hut Worker (Not implemented yet)         |
| tony.stark@libero.it             | testPassword5 | Emergency Operator (Not implemented yet) |


## Docker Commands

You can run the images in two ways:

First method: Download the docker-compose.yaml and run the following command on the terminal: "docker compose up".


Second method: run the following commands on the terminal

- docker pull zhuxiaozhen/polito-se2-22-03-hike-tracker:backend_v1
- docker pull zhuxiaozhen/polito-se2-22-03-hike-tracker:frontend_v1
- docker run --publish 3001:3001 `[backend image id]`
- docker run --publish 3000:3000 `[frontend image id]`

`[backend image id]` = 5b92ac4beaf5
`[frontend image id]` = 879bd19fbb0f
