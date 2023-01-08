# Hike Tracker

#### Contents

- [Screens](#screens)
  1. [Homepage for unregistered users](#1-homepage-for-unregistered-users)
     - [Browsing the hikes](#browsing-the-hikes)
     - [Filtering the hikes](#filtering-the-hikes)
  2. [Signup/Login form](#2-signuplogin-form)
  3. [Hiker homepage](#3-hiker-homepage)
     - [Viewing the Hut List](#viewing-the-hut-list)
     - [Setting preferences](#setting-preferences)
     - [Completing a hike](#completing-a-hike)
  5. [Local Guide homepage](#4-local-guide-homepage)
     - [Creating a new hike](#creating-a-new-hike)
     - [Adding a parking lot or hut](#adding-a-parking-lot-or-hut)
     - [Linking a hut to a hike](#linking-a-hut-to-a-hike)
     - [Adding a reference point to a hike](#adding-a-reference-point-to-a-hike)
- [Available Users](#available-users)

## Screens

### 1. Homepage for unregistered users

![alt homepage_unregistered](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/homepage_unregistered.PNG?raw=true)

Upon joining the website, the first screen the user will see is the homepage for unregistered users. Here the user can browse the list of available hikes and access the login/signup form.

#### Browsing the hikes

The hikes that are stored in the database are presented to the users as cards that show:

- The name of the hike
- Its estimated duration in hours
- Its ascent from the starting point
- The recommended difficulty of the hike, which can be "Tourist" (suitable for beginners), "Hiker" (more challenging, but still manageable for intermediate hikers) or "Pro" (difficult hikes, only recommended to experts)
- The start and end points of the hike, with the name of the starting and ending locations
- An optional textual description of the hike

By clicking on a hike card, the user opens the hike view which will show, in addition to the previously mentioned elements, a map with the hike's track, as well as markers for start, end and reference points. Some information concerning the hike's current state and weather may also be given.
An example of hike detail can be seen in the following screenshot.

![alt hike_detail](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/hike_detail.png?raw=true)

#### Filtering the hikes

The user can also filter the hikes that are displayed, by providing filters on the hikes' properties (by difficulty, region of the start point, and min/max length, ascent and expected time.

![alt filter](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/filter.png?raw=true)

It is also possible to filter the hikes with respect to their geographic localization, thanks to a map filter, which you can see in the following screenshot.

![alt filter_map](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/filter_map.png?raw=true)


### 2. Signup/Login form

An unregistered user can sign up to the app by filling the signup form. When doing so, the user must specify their role ("hiker", "Hut worker", "Local guide" or "Emergency operator"), and they will be able to access the corresponding features upon logging in.

![alt signup](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/signup.PNG?raw=true)

After registering, a user can login with their credentials.

![alt login](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/login.PNG?raw=true)

A list of registered users, with their role and passwords, is available in the Available users section.

### 3. Hiker homepage

#### Viewing the Hut list
In addition to the previously mentioned features, a hiker can also access the list of available huts. So far, the huts information include their coordinates, the country, region and town, an optional address and their altitude.

![alt hut_list](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/hut_list.png?raw=true)

A hiker can also search for specific huts via the search form.

#### Setting Preferences

Another feature available to hikers is the possibility to input their preferences for hikes' duration and ascent. These are then used to suggest hikes to hikers on the Home page, via the **"Suggested Hikes"** button.
In order to access their preferences, hikers have to navigate to their **"Personal Page"**. On the latter, a hiker will be able to view, input, delete or modify his preferences.

![alt personal_page](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/personal_page.png?raw=true)

#### Completing a Hike

A hiker can start any hike of his choice by simply clicking the **"Start Hike"** button, available to him in the Hike Detail page. He can terminate the hike by clicking the **"Terminate Hike"** button, available on the same page.
It is also possible for him to quickly navigate to the current hike from his personal page via the **"Go To Started Hike"** button in his personal page.
The Hiker also has a page where he can see all his completed hikes, accessible with the button **"Completed Hikes"** in the NavBar. You can see this page in the following screenshot.

![alt completed_hikes](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/completed_hikes.png?raw=true)

### 4. Local Guide homepage

A local guide can access their specific features (in addition to the usual ones) via the buttons in the navbar or the hike detail.

![alt local_guide_homepage](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/local_guide_homepage.png?raw=true)

These features are:

- Filtering the hikes to see the ones uploaded by the given local guide
- Creating a new hike
- Adding a parking lot
- Adding a hut
- Linking a hut to an existing hike
- Adding reference points to a hike

#### Creating a new hike

A guide can add a hike via the form. In it, the guide is required to input all the necessary information for the hike, such as a title, length, expected time etc. It is also required to provide a start point and end point for the hike. This can be done in three ways:

- by manually inserting the points' coordinates, name and required information
- by choosing the points from the list of existing (i.e. registered) points
- by uploading a GPX file. This will autocomplete the form with all the necessary information, as well as displaying the hike track on the map in the hike view.

#### Adding a parking lot or hut

To add a parking lot or hut, a guide can use the provided forms, which will ask to input all the required information for the two types of locations.

![alt add_hut_form](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/add_hut_form.png?raw=true)

#### Linking a hut to a hike

To link a hut to a hike, the guide can click on the correspondent button in the navbar. This will take the user to the hut list, displaying all the information for each hut. For each entry in the list, the user can click on the link icon and select the hike to link the hut to it.

![alt link_hut_hike](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/link_hut_hike.png?raw=true)

#### Adding a reference point to a hike

In order to add a reference point to a hike, the local guide has to go on the detail page of the given hike. It is mandatory for him to be the author of this hike. By simply pressing the **"Add a Reference Point"** button, he will be presented with the following form.

After completing the form, if the data is correct the reference point will be added to the hike and viewable by any user.

![alt add_reference_point](https://github.com/RemiChbrnt/polito-se2-22-03-Hike-Tracker/blob/main/screenshots/add_reference_point.png?raw=true)

## Available users

| Username                         | Password      | Role                                     |
| -------------------------------- | ------------- | ---------------------------------------- |
| maurizio.merluzzo@donkeykong.com | testPassword1 | Hiker                                    |
| antonio.fracassa@live.it         | testPassword2 | Local Guide                              |
| giulio.uzumaki@tokio.it          | testPassword3 | Manager                                  |
| jen.shiro@chiocciola.it          | testPassword4 | Hut Worker                               |
| tony.stark@libero.it             | testPassword5 | Emergency Operator (Not implemented yet) |


## Docker Commands

You can run the images in two ways:

First method: Download the docker-compose.yaml and run the following command on the terminal: "docker compose up".


Second method: run the following commands on the terminal

- docker pull zhuxiaozhen/polito-se2-22-03-hike-tracker:backend_v2
- docker pull zhuxiaozhen/polito-se2-22-03-hike-tracker:frontend_v2
- docker run --publish 3001:3001 `[backend image id]`
- docker run --publish 3000:3000 `[frontend image id]`

`[backend image id]` = 5b92ac4beaf5
`[frontend image id]` = 879bd19fbb0f
