# Skill Exchange Platform - Complete Project Structure

## 📁 Project Organization

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Auth/            # Login & SignUp pages
│   │   ├── Dashboard/       # Main dashboard with stats
│   │   ├── Profile/         # User profile management
│   │   ├── Search/          # Search skills
│   │   ├── GetMatched/      # Skill matching
│   │   ├── ExchangeSkill/   # Exchange skill requests
│   │   ├── Followers/       # Followers/Following
│   │   ├── Calendar/        # Calendar & scheduling ⭐
│   │   ├── Settings/        # User settings
│   │   └── Layout/          # Main layout wrapper
│   ├── context/             # React Context (Auth)
│   ├── services/            # API services
│   ├── App.jsx              # Main app component
│   └── index.css            # Global styles (Professional palette: Slate + Cyan)
├── .env.local               # Local development config
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind CSS config
├── vite.config.js           # Vite build config
└── README.md
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── main/
│   │   ├── java/jar/
│   │   │   ├── model/           # Database entities
│   │   │   │   ├── User.java             # User entity + profile data
│   │   │   │   ├── Follower.java         # User relationships
│   │   │   │   └── SkillRequest.java     # Skill exchange requests
│   │   │   ├── repository/      # Spring Data JPA repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── FollowerRepository.java
│   │   │   │   └── SkillRequestRepository.java
│   │   │   ├── service/         # Business logic
│   │   │   │   ├── AuthService.java           # Authentication & OAuth
│   │   │   │   ├── UserService.java           # User operations
│   │   │   │   └── SkillRequestService.java   # Skill requests
│   │   │   ├── controller/      # REST API endpoints
│   │   │   │   ├── AuthController.java        # Auth endpoints
│   │   │   │   ├── ProfileController.java     # Profile endpoints
│   │   │   │   ├── UserController.java        # User search & matching
│   │   │   │   └── SkillRequestController.java # Skill requests
│   │   │   ├── dto/             # Data transfer objects
│   │   │   ├── security/        # Security config & JWT
│   │   │   ├── exception/       # Custom exceptions
│   │   │   ├── config/          # Spring configs
│   │   │   └── SkillExchangePlatformApplication.java
│   │   └── resources/
│   │       ├── application.properties    # App config with DB & OAuth
│   │       ├── static/
│   │       └── templates/
│   └── test/                # Tests
├── .env.local               # Local database config
├── pom.xml                  # Maven dependencies
└── README.md
```

---

## 🗄️ Database Schema

### Tables (PostgreSQL)

**users**
- id (Primary Key)
- email (Unique)
- username (Unique)
- password_hash
- full_name
- bio
- profile_image_url
- location
- created_at
- updated_at

**followers**
- id (Primary Key)
- follower_id (Foreign Key → users)
- following_id (Foreign Key → users)
- created_at

**skill_requests**
- id (Primary Key)
- sender_id (Foreign Key → users)
- receiver_id (Foreign Key → users)
- skill_offered
- skill_requested
- status (PENDING, ACCEPTED, REJECTED, COMPLETED)
- created_at
- updated_at

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /oauth2/callback` - Google OAuth callback
- `DELETE /profile` - Delete account

### Users (`/api/users`)
- `GET /search?query=...` - Search users
- `GET /:id` - Get user profile
- `PUT /:id` - Update user profile
- `GET /:id/followers` - Get followers
- `GET /:id/following` - Get following list
- `POST /:id/follow` - Follow user
- `DELETE /:id/follow` - Unfollow user
- `GET /matches` - Get matched users

### Skill Requests (`/api/skill-requests`)
- `POST /` - Create skill request
- `GET /` - Get all requests
- `GET /:id` - Get request details
- `PUT /:id` - Update request
- `DELETE /:id` - Delete request
- `POST /:id/accept` - Accept request
- `POST /:id/reject` - Reject request

### Profile (`/api/profile`)
- `GET /` - Get current user profile
- `PUT /` - Update current user profile

---

## 🎨 Frontend Features (Components)

### ✅ Completed Features

1. **Authentication**
   - Login page with email/password
   - Sign up page with form validation
   - Google OAuth2 integration
   - Session management

2. **Dashboard**
   - User stats (followers, following, matches, exchanges)
   - Quick access cards
   - Featured section with CTA

3. **Profile Management**
   - View user profile
   - Edit profile info (name, bio, skills)
   - Profile picture display
   - Member statistics

4. **Search Skills**
   - Search users by skills
   - Filter results
   - View user cards with details

5. **Get Matched**
   - Algorithm-based skill matching
   - Match cards with profiles
   - Request exchange button

6. **Exchange Skill**
   - Send skill requests
   - Manage sent/received requests
   - Accept/reject exchanges

7. **Followers/Following**
   - View follower list
   - View following list
   - Follow/unfollow users
   - Real-time updates

8. **Calendar** ⭐
   - View scheduled exchanges
   - Calendar UI for availability
   - Schedule skill sessions

9. **Settings**
   - User preferences
   - Privacy settings
   - Account settings

10. **Navigation**
    - Sidebar navigation
    - Top header with profile dropdown
    - Responsive mobile menu
    - Active route highlighting

---

## 🎨 Design System

### Professional Minimalistic Palette
- **Primary**: Slate (#1e293b) - Trust & professionalism
- **Secondary**: Cyan (#06b6d4) - Innovation & modern feel
- **Success**: Emerald (#10b981) - Growth & positive
- **Error**: Red (#ef4444) - Alerts & destructive
- **Neutral**: White & Slate grays - Clean minimalistic

### Typography
- Font: Inter (system-ui fallback)
- Weights: 300, 400, 500, 600, 700, 800

### Components
- Cards with subtle shadows
- Glass-morphism effects
- Smooth transitions (0.2-0.35s)
- Rounded corners (0.8rem)

---

## 🚀 Running Locally

### Prerequisites
- Node.js 16+
- Java 11+
- Maven
- PostgreSQL/Neon account

### Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Environment

**.env.local** (Root)
```
NEON_DATABASE_URL=postgresql://...
DB_URL=jdbc:postgresql://...
DB_USERNAME=neondb_owner
DB_PASSWORD=...
JWT_SECRET=dev-jwt-secret...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
VITE_API_BASE_URL=http://localhost:8000/api
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.local**
```
VITE_API_BASE_URL=http://localhost:8000/api
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 📦 Key Dependencies

### Frontend
- **React 18.2.0** - UI library
- **React Router 6.20.0** - Routing
- **Axios 1.6.2** - HTTP client
- **Tailwind CSS 3.3.0** - Styling
- **Lucide React 0.344.0** - Icons

### Backend
- **Spring Boot 3.x** - Framework
- **Spring Security + OAuth2** - Authentication
- **Spring Data JPA** - ORM
- **PostgreSQL Driver** - Database
- **JWT** - Token management

---

## ✅ Verification Checklist

- [x] All components created and integrated
- [x] Backend models with JPA annotations
- [x] Repositories for data access
- [x] Services for business logic
- [x] Controllers with REST endpoints
- [x] Database connection configured
- [x] OAuth2 Google integration
- [x] JWT authentication
- [x] Professional color palette applied
- [x] Responsive design (mobile ready)
- [x] Local development environment setup
- [x] Cloud database connection (Neon PostgreSQL)
- [x] API documentation
- [x] Environment file configuration

---

## 🔐 Security Features

- JWT token-based authentication
- Google OAuth2 integration
- Password hashing (Spring Security)
- CORS configuration
- SQL injection prevention (JPA)
- HTTPS ready

---

## 📝 Git Configuration

All changes are committed with:
- Color redesign to professional palette
- Sidebar positioning fix
- Local development setup
- Database persistence

**Latest commit**: `ac99acf` - Sidebar positioning fix

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add real-time notifications (WebSocket)
- [ ] Add messaging system
- [ ] Video call integration
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Rate/review system
- [ ] AI-powered matching
- [ ] Mobile app (React Native)

---

*Last Updated: March 30, 2026*
*Status: ✅ Production Ready*
