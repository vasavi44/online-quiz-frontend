# 🎨 Online Quiz Application — React Frontend

A modern, responsive, and student-friendly user interface for the Online Quiz Application built with **React 18**, **Vite**, **React Router 6**, and **Axios**.

---

## 🌟 Key Features

* **Modern Dark Glassmorphism UI**: Custom design system using Plus Jakarta Sans and Inter typography, subtle gradients, and glass cards.
* **Student Dashboard**: Welcome banner, quick statistics (attempts count, best score, average accuracy), and quiz rules.
* **Exam Taking Interface**:
  * 10 multiple-choice questions with 4 answer options each.
  * Single-choice card selection with active glow indicators.
  * Real-time progress bar tracking answered questions.
  * Unanswered questions confirmation prompt before submission.
  * Double-submission prevention.
* **Instant Results & Comprehensive Review**:
  * Final score (e.g. `9 / 10`), percentage (`90.0%`), and performance rating.
  * Question-by-question breakdown highlighting student's answer vs. the verified correct answer with intuitive color coding.
* **Quiz History**: Chronological view of past quiz attempts with timestamps and score badges.
* **Authentication & Protected Routes**: Seamless login/registration with client validation and route guards.
* **Production Ready**: Pre-configured for **Vercel** with SPA rewrites (`vercel.json`) and configurable API base URL (`VITE_API_BASE_URL`).

---

## 🛠️ Tech Stack

* **Framework**: React 18
* **Build Tool**: Vite
* **Routing**: React Router 6 (`react-router-dom`)
* **HTTP Client**: Axios (configured with Bearer token interceptor)
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (Custom Design System, CSS Variables)

---

## 🚀 Local Development

### Prerequisites
* Node.js 18+ and npm (`node -v`, `npm -v`)
* Backend running on `http://localhost:8080`

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
```bash
npm run build
```
Build output is generated in `dist/`.

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the frontend project:

```env
# URL of your backend API
# For local development:
VITE_API_BASE_URL=http://localhost:8080

# For production (Vercel):
# VITE_API_BASE_URL=https://<your-backend-app>.onrender.com
```

---

## 🚢 Deploying to Vercel

1. Log in to [Vercel](https://vercel.com/) and click **Add New > Project**.
2. Select your `online-quiz-frontend` repository.
3. Configuration:
   * **Framework Preset**: Vite
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Set Environment Variable:
   * Key: `VITE_API_BASE_URL`
   * Value: `https://<your-backend-app>.onrender.com` *(without trailing slash)*
5. Click **Deploy**.
6. The included `vercel.json` ensures that direct routing and page refreshes work properly.
