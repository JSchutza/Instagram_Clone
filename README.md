# Instagram Clone
This application is an instagram clone showcasing its main features of being able to follow users, create posts, and like those posts.

Technologies used: React, Redux, Flask, SQLAlchemy, AWS, CSS


The goal of this project was to have Instagram's core functionalities:
- Creating posts - any logged in user can create a post
- Likes - any logged in user can like a post
- Comments - any logged in user can create a comment
- Followers - users can follow one another to display their post in their feed
- Search - users may search for other users 

### Splash/Signin Page
When a logged out user first lands on our app this is the first page they will see.  
Here they can either login or signup to gain access to the sites features.
<img src="https://i.ibb.co/tbjcjY3/Screen-Shot-2021-05-19-at-3-21-29-PM.png"  />

### Feed Page
Once the user has logged in they will be brought to their feed page.
This is where all the posts from the users they follow will be displayed.
From here they can navigate to their profile page, logout, create a post, or post a comment.
Posting a photo will bring up a modal that allows the user to take a local image and upload it
powered by AWS.  
<img src="https://i.ibb.co/YD5jcvN/Screen-Shot-2021-05-19-at-3-38-05-PM.png" />

### Profile Page
This page displays all of the users posts.  They may click on each post to open a modal that gives them the option
to delete or edit the post. 

<img src="https://i.ibb.co/mbHBkfB/Screen-Shot-2021-05-19-at-3-40-49-PM.png" />

### Search Feature
Users may also search for other users to find more users to follow.  Clicking on
the user will take them to the user's profile page that will display their post, 
and give the option to follow that user. 
<img src="https://i.ibb.co/MgLjLr0/Screen-Shot-2021-05-19-at-3-44-44-PM.png" />

To view the live project click <a href="https://instagram--me.herokuapp.com/">here</a>
