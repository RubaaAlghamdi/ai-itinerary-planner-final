# AI Itinerary Planner ✈️

A smart AI-powered travel planning web application that generates personalized itineraries based on the user’s destination, budget, interests, and trip duration.

---

# 👩‍💻 Team Members

- Ruba Alghamdi — AI Integration & Testing
- Amani Alzahrani — Backend Developer
- Refaa Saber — Frontend Developer

---

# ✨ Features

- User Authentication (Sign Up / Sign In)
- Protected Routes for logged-in users only
- AI-powered itinerary generation using Google Gemini API
- Personalized travel plans based on:
  - Destination
  - Budget
  - Interests
  - Number of days
- Save generated trips into MySQL database
- Profile page displaying user information
- Saved Trips section
- Delete saved trips 🗑️
- Favorite trips system ⭐
- Favorite Trips Only filter
- Weather information for destinations ☀️
- Destination images using API integration 🖼️
- Responsive UI design for desktop and mobile devices

---

# 🛠️ Technologies Used

- React + Vite
- Firebase Authentication
- Google Gemini API
- OpenWeather API
- React Router DOM
- Bootstrap / CSS
- PHP
- MySQL
- XAMPP

---

# 🧪 Testing

- Sign Up → ✅ Works correctly
- Sign In → ✅ Works correctly
- Wrong password → ✅ Error message appears
- Empty fields validation → ✅ Works correctly
- Generate itinerary → ✅ AI generates structured travel plans
- Save trip → ✅ Trip saved successfully in database
- Delete trip → ✅ Trip removed successfully
- Favorite system → ✅ Favorites update correctly
- Weather API → ✅ Displays destination weather
- Protected routes → ✅ Redirects unauthorized users
- About Us page → ✅ Loads correctly
- Profile page → ✅ Displays user data and saved trips
- Mobile responsiveness → ✅ Works on small screens

---

# 📂 Project Structure

```bash
src/
 ├── assets/
 ├── backend/
 ├── components/
 ├── context/
 ├── hooks/
 ├── pages/
 ├── App.jsx
 └── main.jsx
