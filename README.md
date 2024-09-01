# EVS Wordle Game

EVS Wordle is an educational word-guessing game focused on environmental science terms. This project was developed as part of an Environmental Sciences Project in the 2nd semester at NFSU. It consists of a frontend web application and a backend FastAPI server.

## Disclaimer

This is an academic project created for educational purposes. The code provided here should not be used in production environments without proper review, testing, and modifications.

## Features

- Multiple words per game session (3 words)
- Timed gameplay
- Score tracking
- Leaderboard
- Responsive design

## How to Play

1. Log in with your username
2. You have 6 attempts to guess each word
3. After each guess, the color of the tiles will change:
   - Green: Correct letter in the correct position
   - Orange: Correct letter in the wrong position
   - Grey: Incorrect letter
4. Complete all three words as quickly as possible to get a high score!

## Technical Details

### Frontend

The frontend is built using HTML, CSS, and JavaScript. Key features include:

- Dynamic board generation based on word length
- Keyboard input handling (both physical and on-screen keyboard)
- Real-time feedback on guesses
- Timer functionality

### Backend

The backend is powered by a FastAPI server, which is responsible for:

- Storing and retrieving player scores
- Calculating results
- Managing the leaderboard

Key components of the backend:

- FastAPI framework for creating API endpoints
- CORS middleware to handle cross-origin requests
- Endpoints for server wake-up, posting scores, and retrieving scores
- Score calculation based on wins, guesses, and time taken

The backend provides several endpoints:
- `/wakeup`: Keeps the server running and returns a random quote
- `/postscore`: Calculates and stores a player's score
- `/getscores`: Returns all stored scores

## License

This project is licensed under the MIT License.

Copyright (c) 2024 Rudra