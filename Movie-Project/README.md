# 🎬 MovieHub - Full Stack Movie Application

This project is separated into a decoupled **Django REST Framework** backend and a full **React (Vite)** frontend.

---

## 📁 Project Structure

```
Movie-Project/
├── backend/                  # Django REST API Backend
│   ├── accounts/             # JWT Auth & User Profile API
│   ├── actors/               # Actors & Filmography API
│   ├── movies/               # Movies, Categories, Cast & Reviews API
│   ├── config/               # Django Settings & Root URL configuration
│   ├── media/                # Uploaded Posters & Actor Photos
│   ├── db.sqlite3            # SQLite Database
│   ├── manage.py             # Django CLI
│   ├── requirements.txt      # Python dependencies
│   └── venv/                 # Python Virtual Environment
│
└── frontend/                 # Decoupled React Frontend (Vite)
    ├── src/
    │   ├── api/
    │   │   └── client.js     # Axios API Client & Media URL resolver
    │   ├── context/
    │   │   └── AuthContext.jsx # JWT State, Login, Register & User persistence
    │   ├── components/
    │   │   ├── Navbar.jsx    # Responsive Navigation & Live Search
    │   │   ├── Footer.jsx    # Cinematic Dark Footer
    │   │   ├── MovieCard.jsx # Interactive Movie Cards
    │   │   ├── StarRating.jsx# 5-Star Rating component
    │   │   ├── CastCard.jsx  # Cast & Crew Card
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx       # Featured Hero Banner & Highlights
    │   │   ├── MoviesPage.jsx     # All Movies, Category Filter, Search & Sort
    │   │   ├── MovieDetailPage.jsx# Full details, Trailer Player, Cast & Reviews
    │   │   ├── AddMoviePage.jsx   # Add Movie with Poster Upload
    │   │   ├── EditMoviePage.jsx  # Edit Movie & replace poster
    │   │   ├── AddCategoryPage.jsx# Add & Manage Categories
    │   │   ├── AddCastPage.jsx    # Assign Actors/Directors/Producers to films
    │   │   ├── ActorDetailPage.jsx# Actor Bio & Full Filmography
    │   │   ├── LoginPage.jsx      # JWT Login
    │   │   └── RegisterPage.jsx   # Account Registration
    │   ├── App.jsx           # Client Routing
    │   └── index.css         # Netflix Dark Theme Design System
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Running the Project

### 1. Start the Django Backend

```powershell
cd backend
.\venv\Scripts\activate
python manage.py runserver
```

The Django API server will run at:
**`http://127.0.0.1:8000`**

### 2. Start the React Frontend

Open a second terminal window:

```powershell
cd frontend
npm run dev
```

The React application will run at:
**`http://localhost:5173`**

---

## ✨ Features

- **Full React Frontend**: Completely decoupled single-page application built with React 19 and Vite.
- **Cinematic Dark Theme**: Netflix-inspired UI with smooth transitions and responsive mobile navigation.
- **Movie Catalog & Filtering**:
  - Filter movies by genre/category tabs.
  - Live search by title, description, or genre.
  - Sort by latest release date, highest user rating, or alphabetical order.
  - Switch between category rows (Netflix style) and compact grid view.
- **Movie Details & Media**:
  - Embedded YouTube video trailer playback with automatic link parsing.
  - High-res poster display with fallback handling.
  - Synopsis, release date, and genre badges.
- **Cast & Crew System**:
  - Actors, directors, and producers breakdown with photos and character names.
  - Dedicated artist profile page showing bio and their full filmography.
  - Assign cast members to any movie.
- **Review & Rating System**:
  - Interactive 5-star rating selector with real-time feedback.
  - Automatic calculation of movie average rating and review counts.
  - Duplicate review prevention (updates user's existing review).
- **Movie Management**:
  - Add new movies with multipart poster file upload.
  - Update movie metadata or replace poster image.
  - Delete movies with confirmation.
- **JWT Authentication**:
  - Register, login, and automatic token refresh via SimpleJWT.
  - Protected routes for movie creation, editing, deletion, and cast assignment.
