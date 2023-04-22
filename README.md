# PixelPal

PixelPal is a web application inspired by Discord that allows users to create servers where they can interact in real time with other users in their communities. This project aims to replicate Discord's ease of use and the ability to share content with other PixelPal clients running at the same time instantaneously through the use of WebSockets. PixelPal is built with a Python/Flask backend and a React/Redux frontend for responsiveness.

[Click here to view PixelPal's Live Site](https://pixelpal.onrender.com/)


## Navigate to:

[User Stories](https://github.com/ryangoggin/PixelPal/wiki/User-Stories)\
[Feature List](https://github.com/ryangoggin/PixelPal/wiki/PixelPal-Features-List)\
[Database Schema](https://github.com/ryangoggin/PixelPal/wiki/PixelPal-Database-Schema)\
[Backend Routes](https://github.com/ryangoggin/PixelPal/wiki/Backend-Routes)

## Technologies/Frameworks Used:

### Frontend:
![JavaScript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-676E77?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend:
![Python](https://img.shields.io/badge/Python-4081B3?style=for-the-badge&logo=python&logoColor=ffe66a)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/-SQLAlchemy-D71F00?style=for-the-badge)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)


### Deployment:
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)



# Features:

## Demo User Implementation:

* Feel free to test the site features through clicking the "Demo User" button which will directly log you in
* There are exactly TWO different guest logins built for users looking to test the real-time messaging capabilities of PixelPal

![demo-user](https://user-images.githubusercontent.com/47682357/233805175-c08c0fad-2a5c-49b0-8ce4-a2848550ac1b.gif)

![demo-user](https://user-images.githubusercontent.com/47682357/233805234-93ea9d85-540f-4178-b560-683a4708b6de.gif)


## Sign up a User:

* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as username length requirements, valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out




**Home Page**
* Signup
* Login
* Demo Login

**User Menu**
* Logout

**Servers**
* Create, Read, Update & Delete Server

**Channels**
* Create, Read, Update & Delete Channel

**Messages**
* Create & Read Messages

**Reactions**
* Create, Read & Delete Reactions



## Features Coming Soon:

* AWS for File Uploads
* Updating User Profile Pictures
* Adding Members to a Server
* Live Friend DMs 
