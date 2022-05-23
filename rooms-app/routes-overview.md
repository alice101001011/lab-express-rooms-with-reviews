**ROUTES**


**INDEX**

Route                    |   HTTP Verb   |   Description                 |   View
-------------------------------------------------------------------------------------------------------
/                        |   GET         |   show home page              |   index



**AUTH**

Route                    |   HTTP Verb   |   Description                 |   View
-------------------------------------------------------------------------------------------------------
/auth/signup             |   GET         |   show signup form            |   auth > signup
------------------------------------------------------------------------------------------------------
/auth/signup             |   POST        |   check input, save user to db|   redirect to auth > login if successful
-------------------------------------------------------------------------------------------------------
/auth/login              |   GET         |   show login form             |   auth > login
-------------------------------------------------------------------------------------------------------
/auth/login              |   POST        |  check credentials, login user|   redirect to index if successful
-------------------------------------------------------------------------------------------------------
/auth/logout             |   POST        |   logout user                 |   redirect to index



**ROOMS**

Route                    |   HTTP Verb   |   Description                 |   View
-------------------------------------------------------------------------------------------------------
/rooms                   |   GET         |   show all rooms              |   rooms > rooms-list
-------------------------------------------------------------------------------------------------------
/rooms/create            |   GET         |   show form to create room    |   rooms > create-room
-------------------------------------------------------------------------------------------------------
/rooms/create            |   POST        |   save room to db             |   redirect to users > user-profile
-------------------------------------------------------------------------------------------------------
/rooms/:id/edit          |   GET         |   show form to edit room      |   rooms > edit-room
-------------------------------------------------------------------------------------------------------
/rooms/:id/edit          |   POST        |   save edited room to db      |   redirect to users > user-profile
-------------------------------------------------------------------------------------------------------
/rooms/:id/delete        |   POST        |   delete room                 |   redirect to users > user-profile
-------------------------------------------------------------------------------------------------------
/rooms/:id               |   GET         |   show single room details    |   rooms > room-details



**REVIEWS**

Route                    |   HTTP Verb   |   Description                 |   View
-------------------------------------------------------------------------------------------------------
/reviews/:id/review      |   GET         | show form for creating review |   reviews > create-review
-------------------------------------------------------------------------------------------------------
/reviews/:id/review      |   POST        |   save review to db           |   redirect to room-details



**USERS**

Route                    |   HTTP Verb   |   Description                 |   View
-------------------------------------------------------------------------------------------------------
/profile                 |   GET         | show user profile             |   users > user-profile