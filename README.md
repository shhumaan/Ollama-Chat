# Ollama Chat Demo

This project provides a web-based chat interface to interact with locally running Ollama models. It features an improved frontend built with Next.js and Tailwind CSS, and a dedicated backend built with NestJS.

## Features

- **Modern Chat UI:** Clean and responsive interface using Shadcn UI components.
- **Local Ollama Integration:** Connects to your Ollama instance running on your machine.
- **Model Selection:** Choose from available Ollama models detected by the backend.
- **Backend API:** NestJS server handles communication with the Ollama API.
- **Dark Mode:** Theme toggling supported.
- **Chat Persistence:** Conversation is saved to browser local storage.
- **Chat Management:** Clear and save conversation options.

## Project Structure

- `/` (Root): Next.js frontend application.
- `/ollama-backend`: NestJS backend application.

## Prerequisites

- [Node.js](https://nodejs.org/) (Recommended version >= 18)
- [npm](https://www.npmjs.com/)
- [Ollama](https://ollama.ai/) installed and running locally (usually on `http://localhost:11434`). Ensure you have pulled models (e.g., `ollama run llama3.2`).

## Setup & Running

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/shhumaan/Ollama-Chat.git
    cd Ollama-Chat
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd ollama-backend
    npm install
    ```

4.  **Configure Backend (Optional):**
    - The backend looks for Ollama at `http://localhost:11434` and runs on port `4000` by default.
    - You can modify these in `ollama-backend/.env` if needed.

5.  **Run the Backend:**
    - Open a terminal window in the `ollama-backend` directory.
    - Run: `npm run start:dev`
    - Keep this terminal running.

6.  **Run the Frontend:**
    - Open another terminal window in the root project directory (`Ollama-Chat`).
    - Run: `npm run dev`

7.  **Access the Application:**
    - Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

**Frontend:**

- Next.js (React Framework)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React (Icons)
- next-themes

**Backend:**

- NestJS (Node.js Framework)
- TypeScript
- Axios (for HTTP requests)
- @nestjs/config 