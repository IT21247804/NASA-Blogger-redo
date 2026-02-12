

# NASA-BLogger 🚀
Student: Baddewithana P (IT21247804)

A React app that uses NASA public APIs to explore space imagery and lets users authenticate and manage posts. 🌌

## Quick Start ⚡
1. Go to the client app.
```bash
cd client
```
2. Install dependencies.
```bash
npm install
```
3. Start the dev server.
```bash
npm start
```

## Build 🛠️
```bash
npm run build
```

## Tests 🧪
1. Checkout the test branch.
2. Run tests.
```bash
npm run test
```

## Features ✨
- Sign up and log in with Firebase Auth.
- Create, view, and delete posts.
- Explore NASA images through curated views and filters.

## NASA APIs Used 🛰️
API docs: [NASA API](https://api.nasa.gov/)

### APOD (Astronomy Picture of the Day) 🌟
Shows a daily image with title and description. Users can pick a date and view one image at a time.

Challenge: No images for dates too far in the past or in the future.
Solution: Date picker is constrained between `2000-01-01` and today.

### Earth Imagery 🌍
Fetches a satellite image by longitude, latitude, and date.

Challenge: Many inputs return no images due to coverage limits.
Solution: Display a clear error message when no image is available.

### Mars Rover Photos 🛞
Fetches photos by date and camera type.

Challenge: Large image sets can be heavy to render.
Solution: Use Material UI Image List with pagination.

## Tech Stack 🧰
- React
- Firebase Auth
- Firestore
- Tailwind CSS
- Material UI
- Vercel
- NASA Public APIs

## Live Demo 🔗
View: [nasa-blogging](https://nasa-blogging.vercel.app)

## Contact 📬
Email: IT21247804@my.sliit.lk

