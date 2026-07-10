# 🎯 Interview AI — Smart Interview Preparation & Tailored Resume Builder

Interview AI is a comprehensive web application designed to help job candidates prepare for interviews by analyzing target job descriptions and aligning them with the candidate's unique profile (extracted from a resume PDF/DOCX or self-description). 

By leveraging the cutting-edge **Google Gemini AI** (via the Google GenAI SDK), the application assesses profile alignment, identifies key skill gaps, generates custom technical and behavioral questions (with model answers), outputs a personalized preparation road map, and exports an ATS-friendly, single-page resume tailored directly to the target role.

---

## 🚀 Key Features

*   **Secure Authentication**: Fully functional authentication system powered by JSON Web Tokens (JWT) with HTTP-only cookies, password hashing (bcryptjs), and token blacklisting for secure logouts.
*   **Custom Interview Strategy Generation**:
    *   **Match Score**: Assessment of candidate fit (0-100%) against the job requirements.
    *   **Skill Gap Analysis**: Identifies missing skills categorized by severity (Low, Medium, High).
    *   **Curated Question Bank**: Personalized Technical and Behavioral questions, including interviewer intentions and professional model answers.
    *   **Interactive Preparation Roadmap**: A day-wise study schedule customized to the target position and candidate timeline.
*   **ATS-Optimized Resume Tailoring**: Generates a single-page resume tailored for the job, downloadable as a PDF using dynamic HTML-to-PDF compilation.
*   **Responsive, Premium UI/UX**: Crafted using modern SCSS structures with high-fidelity visual panels, interactive accordions, and glassmorphism elements.

---

## 🛠️ Technology Stack

### Frontend (Single Page Application)
*   **Core**: React 19, JavaScript (ES6+)
*   **Build Tool**: Vite (Lightning fast compilation & HMR)
*   **Routing**: React Router 7 (Declarative route configurations)
*   **HTTP Client**: Axios (configured with credentials and baseURL)
*   **Styling**: Sass / SCSS (modular styles, variable design tokens)

### Backend (RESTful APIs)
*   **Runtime**: Node.js
*   **Framework**: Express
*   **Database**: MongoDB & Mongoose (Object Data Modeling)
*   **Security & Auth**: JWT (jsonwebtoken), Cookie Parser, Bcrypt.js
*   **File Uploads**: Multer (In-memory storage for secure, quick file handling)
*   **PDF Parsing**: pdf-parse v2 (Pure JS engine to extract clean text from candidate resumes)
*   **AI Integration**: Google GenAI SDK (`@google/genai`) using the `gemini-3-flash-preview` model
*   **PDF Compilation**: html-pdf (Dynamic HTML to PDF buffer conversion)

---

## 📂 Project Directory Structure

```text
interview-ai/
├── Backend/
│   ├── src/
│   │   ├── config/             # DB connection configuration
│   │   ├── controllers/        # Express route controllers (Auth, Interview)
│   │   ├── middlewares/        # Authentication, File uploading middlewares
│   │   ├── models/             # Mongoose DB schemas (User, InterviewReport, Blacklist)
│   │   ├── routes/             # Router declarations
│   │   ├── services/           # External integration layers (Google GenAI, PDF compiling)
│   │   └── app.js              # Core app bootstrapping, CORS, and cookie parser
│   ├── .env                    # Backend environment variables
│   ├── server.js               # Entry point of the server
│   └── package.json            # Node.js dependencies and scripts
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/           # Login/Signup forms, hooks, auth providers
│   │   │   └── interview/      # Dashboard, Reports, Hooks, and API integrations
│   │   ├── style/              # Global variables, mixins, and SCSS modules
│   │   ├── App.jsx             # Main view component
│   │   ├── app.routes.jsx      # Page routes configuration
│   │   └── main.jsx            # React root mount script
│   ├── .env                    # Frontend environment variables
│   ├── index.html              # Core entry HTML
│   ├── vite.config.js          # Vite config specifications
│   └── package.json            # React project dependencies
│
└── README.md                   # This project manual
```

---

## 🔌 API Endpoint Documentation

### Authentication Router (`/api/auth`)

| Method | Endpoint | Access | Description | Request Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Registers a new user account | `{ username, email, password }` |
| `POST` | `/login` | Public | Authenticates user, stores JWT in Cookie | `{ email, password }` |
| `GET` | `/logout` | Public | Clears JWT cookie, blacklists the token | None |
| `GET` | `/get-me` | Private | Retrieves current logged-in user details | None (resolves from Cookie) |

### Interview Router (`/api/interview`)

| Method | Endpoint | Access | Description | Request Details |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/` | Private | Generates a new interview preparation report | Form-data: `jobDescription` (text), `selfDescription` (text), `resume` (file) |
| `GET` | `/` | Private | Retrieves metadata of all generated plans | None (sorted by latest) |
| `GET` | `/report/:interviewId` | Private | Retrieves a specific plan's details | URL Param: `interviewId` |
| `POST` | `/resume/pdf/:interviewReportId` | Private | Tailors and generates a single page resume PDF | URL Param: `interviewReportId` |

---

## 🤖 AI and Prompts Configuration

The app integrates with Gemini through structured JSON Schema generation via `zod-to-json-schema`. 

```javascript
// Example validation schema configured in ai.service.js
const interviewReportSchema = z.object({
  matchScore: z.number().describe("Score between 0 and 100 on job alignment"),
  technicalQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
  })),
  behavioralQuestions: z.array(z.object({
    question: z.string(),
    intention: z.string(),
    answer: z.string()
  })),
  skillGaps: z.array(z.object({
    skill: z.string(),
    severity: z.enum(["low", "medium", "high"])
  })),
  preparationPlan: z.array(z.object({
    day: z.number(),
    focus: z.string(),
    tasks: z.array(z.string())
  })),
  title: z.string().describe("Job title for the interview report")
});
```

The system sends context variables (Job Description, Resume content, Self-Description) to `gemini-3-flash-preview`, returning structured JSON matching this schema, guaranteeing reliable client-side rendering.

---

## ⚙️ Local Setup Instructions

### Prerequisites
*   Node.js (LTS version >= 20.x is recommended)
*   MongoDB Instance (MongoDB Atlas or Local MongoDB Community Server)
*   Google Gemini API Key (Generate one at [Google AI Studio](https://aistudio.google.com/))

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd interview-ai

# Install Backend Dependencies
cd Backend
npm install

# Install Frontend Dependencies
cd ../Frontend
npm install
```

### Step 2: Environment Configurations

Create a `.env` file in the **Backend** folder:
```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview-master
JWT_SECRET=your_jwt_secret_hash_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

Create a `.env` file in the **Frontend** folder:
```env
VITE_API_URL=http://localhost:3000
```

### Step 3: Start the Applications

Open two terminals and run:

**Terminal 1 (Backend Server)**
```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend Application)**
```bash
cd Frontend
npm run dev
```

Your browser should open `http://localhost:5173/`, where you can register and start building preparation roadmaps.

---

## 🛠️ Troubleshooting & Core Configuration Details

### 1. API Quota Limits (Gemini 429 Error)
If you encounter a `429 Rate Limit` or `RESOURCE_EXHAUSTED` error during generation, it means your Gemini API key has exceeded the free daily tier limit (currently 20 requests/day for `gemini-3-flash-preview`). Consider switching to a pay-as-you-go key or setting up retry mechanisms.

### 2. PDF Parsing Implementation (pdf-parse v2)
This project uses the modern TS-based `pdf-parse` v2 library. To instantiate and parse files cleanly without memory leaks, remember to always destroy the parser instance:
```javascript
const parser = new pdfParse.PDFParse({ data: Uint8Array.from(fileBuffer) });
const resumeContent = await parser.getText();
await parser.destroy(); // Always call destroy to release PDFJS memory structures!
```

### 3. PDF Compilation Environment Dependencies
`html-pdf` uses PhantomJS to compile resumes. Make sure your runtime environment (e.g., Linux on Render) has standard font configurations and library utilities installed, or configure `puppeteer` as an alternative PDF engine if PhantomJS faces compatibility blocks.
