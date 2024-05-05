[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/V1F4A3D5)

# IT21247804 - Baddewithana P

## Application Setup
## Pre-requisites
recommended: make sure you have react install facility installed : 
open terminal and run command:

```javascript
npm install -g create-react-app
```

## Installation Setup:
1. Open the project in VS Code
2. change the directory to client
```javascript
cd client
```
3. Run npm installation command
```javascript
npm install
```
## Build and Run Setup
1. Run npm build command (recommended)
```javascript
npm run build
```
2. Run npm start command to start
```javascript
npm run start
```
## test setup
1. Check out to test branch.
2. Open a terminal.
3. Run npm run test command
```javascript
npm run test
```
## used Nasa Api
View Api documentaion:[NASA API](https://api.nasa.gov/).
### Apod
how to use Api: This api retreive a daily photo from nasa web site.(Astronomical picture of the day). Only one image will show at one time and user can pick a date from the given datepicker component and view the image along with a title and a discription.

challenges : cannot retrive images to a given date that is before 4 decades ago, and from future dates
Solution : date picker start date set to 2000-01-01, end date set to today

### Earth Imagery
How to use Api: This api retreive an satellite image for a given longitude and latitude and a date. only one image will be shown

challenges : for most data inputs, there will be no output images. since this satelllite images are based on United States longitudes and latitudes.
Solution : Showing an error message if the data are not retrived.

### MARS Photos 
How to use Api: This api retrive photos and details which are send from mars rovers. user can pick a date from datepicker and choose a camera type for filter out images.

challenges: hard to render all the images since lots of images are retriving at once. 
Solution : use Material UI Image list and pagination to limit the images in one page.

### other functionalities
1. User can Sign in to the web application.
2. User can login to the web application.
3. User can Create Posts.
4. User can View All posts.
5. User can delete his posts.

## used technologies
1. React
2. Google Firebase
3. Google Firestore
4. TailWind CSS
5. Material UI
6. Vercel
7. NASA Public APIs

## check live demo 
 View:[nasa-blogging](nasa-blogging.vercel.app).


If you have any concerns: mail: IT21247804@my.sliit.lk


