# Discord Clone Backend README

## Overview

This is a backend implementation for a Discord clone using Flask and SocketIO. The backend provides a RESTful API for clients to perform CRUD operations on user, channel, message, server, emoji, and friend list data models. SocketIO is used to handle real-time communication between clients and the server, such as sending and receiving chat messages. User authentication and authorization, as well as security measures to prevent attacks such as CSRF and XSS, are also implemented.

## Data Models

The following data models are defined using SQLAlchemy:

* User
* Channel
* Message
* EmojiReaction
* Server
* FriendList

## API Routes

The following API routes are defined using Flask's Blueprint feature:

* GET /users - get all users
* POST /users - create a new user
* GET /users/:id - get a specific user by ID
* PUT /users/:id - update a specific user by ID
* DELETE /users/:id - delete a specific user by ID
* GET /channels - get all channels
* POST /channels - create a new channel
* GET /channels/:id - get a specific channel by ID
* PUT /channels/:id - update a specific channel by ID
* DELETE /channels/:id - delete a specific channel by ID
* GET /messages - get all messages
* POST /messages - create a new message
* GET /messages/:id - get a specific message by ID
* PUT /messages/:id - update a specific message by ID
* DELETE /messages/:id - delete a specific message by ID
* GET /emojis - get all emoji reactions
* POST /emojis - create a new emoji reaction
* GET /emojis/:id - get a specific emoji reaction by ID
* PUT /emojis/:id - update a specific emoji reaction by ID
* DELETE /emojis/:id - delete a specific emoji reaction by ID
* GET /servers - get all servers
* POST /servers - create a new server
* GET /servers/:id - get a specific server by ID
* PUT /servers/:id - update a specific server by ID
* DELETE /servers/:id - delete a specific server by ID
* GET /friendlists - get all friend lists
* POST /friendlists - create a new friend list
* GET /friendlists/:id - get a specific friend list by ID
* PUT /friendlists/:id - update a specific friend list by ID
* DELETE /friendlists/:id - delete a specific friend list by ID


## SocketIO Event Handlers

The following SocketIO event handlers are defined in socket.py:

* connect
* disconnect
* chat

## User Authentication and Authorization
User authentication and authorization are implemented using Flask-Login and Flask-Principal. Only authenticated users can access certain API routes.

## Security Measures
Security measures are implemented to prevent attacks such as CSRF and XSS.
