# BinGO 🌱
A mobile application built with Expo and React Native that helps users properly categorize and dispose of waste following Canadian waste management standards.

## 📱 Core Features

- **Smart Waste Classification**: ML-powered identification of materials
- **Disposal Guidance**: Context-aware disposal instructions via Google Gemini API
- **User Authentication**: Secure account management with Supabase

## 🛠 Tech Stack
- **Frontend**: React Native (Expo)
- **Authentication**: Supabase Auth
- **ML Integration**: TensorFlow.js
- **AI Guidance**: Google Gemini API
- **State Management**: React Context API/Redux
- **Database**: Supabase 

## 📋 Waste Categories
- Metal
- Glass
- Biological
- Paper
- Battery
- Trash
- Cardboard
- Shoes
- Clothes
- Plastic

## 🔄 App Flow

### 1. Authentication
- Welcome Screen
- Sign Up/Login options
- Supabase authentication integration

### 2. Main Dashboard
- Camera/upload interface
- Usage instructions
- Navigation to other features

### 3. Image Processing
- Image capture/upload
- ML model classification
- Gemini API processing

### 4. Results Display
- Material classification
- Disposal instructions
- Action options (retake/return)

### 5. User Profile
- Profile management
- History viewing
- Settings configuration

## 💡 Future Enhancements
- [ ] Offline classification mode
- [ ] Gamification system
- [ ] Local disposal site integration
- [ ] Multi-language support

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the Expo development server
cd main
npm start

# Start the FastAPI backend server
cd server 
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 👥 Contributors

1. [@NamDo8467](https://github.com/NamDo8467)
2. [@ngnamquoc](https://github.com/ngnamquoc)
3. [@tramanhvong](https://github.com/tramanhvong)
4. [@tranguv](https://github.com/tranguv)


