const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Interview AI - Deep Project Explanation & Interview QA Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      --primary: #4F46E5;
      --primary-light: #EEF2F6;
      --secondary: #0EA5E9;
      --dark: #0F172A;
      --light: #F8FAFC;
      --gray: #64748B;
      --border: #E2E8F0;
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: var(--dark);
      background-color: white;
      line-height: 1.6;
      font-size: 14px;
    }
    
    .page {
      width: 100%;
      padding: 40px;
      position: relative;
    }
    
    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      color: var(--dark);
      font-weight: 700;
    }
    
    h1 {
      font-size: 28px;
      color: var(--primary);
      border-bottom: 3px solid var(--primary);
      padding-bottom: 12px;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    h2 {
      font-size: 20px;
      color: #1E293B;
      margin-top: 30px;
      margin-bottom: 16px;
      border-left: 5px solid var(--secondary);
      padding-left: 12px;
    }
    
    h3 {
      font-size: 16px;
      color: #334155;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      margin-bottom: 14px;
      color: #334155;
    }
    
    ul, ol {
      margin-bottom: 16px;
      padding-left: 20px;
    }
    
    li {
      margin-bottom: 6px;
      color: #334155;
    }
    
    code {
      font-family: 'Courier New', Courier, monospace;
      background-color: var(--primary-light);
      color: var(--primary);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }
    
    pre {
      background-color: #1E293B;
      color: #F8FAFC;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin-bottom: 16px;
      font-size: 12px;
    }
    
    pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      font-size: inherit;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    th, td {
      border: 1px solid var(--border);
      padding: 10px 12px;
      text-align: left;
    }
    
    th {
      background-color: var(--primary-light);
      color: var(--primary);
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background-color: var(--light);
    }
    
    .question-card {
      background-color: var(--light);
      border: 1px solid var(--border);
      border-left: 4px solid var(--primary);
      padding: 16px;
      margin-bottom: 20px;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    .question-title {
      font-weight: 700;
      color: var(--primary);
      font-size: 15px;
      margin-bottom: 8px;
    }
    
    .answer-text {
      color: #334155;
      font-size: 14px;
    }
    
    .badge {
      display: inline-block;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
      margin-right: 6px;
    }
    
    .badge-tech { background-color: #E0F2FE; color: #0369A1; }
    .badge-behavioral { background-color: #FDF2F8; color: #BE185D; }
    
    .page-break {
      page-break-before: always;
    }
    
    .header-banner {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
      text-align: center;
    }
    
    .header-banner h1 {
      color: white;
      border-bottom: none;
      margin-bottom: 10px;
      font-size: 32px;
    }
    
    .header-banner p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
    }
    
    .architecture-diagram {
      background: #F8FAFC;
      border: 1px dashed var(--primary);
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 20px;
      font-family: monospace;
      white-space: pre;
      font-size: 12px;
      line-height: 1.3;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: TITLE & CORE ARCHITECTURE -->
  <div class="page">
    <div class="header-banner">
      <h1>Interview AI - Deep Project Guide</h1>
      <p>A Complete Architecture walkthrough, Design Rationale, and 20 Critical Interview QA</p>
    </div>

    <h2>1. Project Vision & High-Level Architecture</h2>
    <p>
      <strong>Interview AI</strong> is a full-stack, enterprise-grade AI-powered preparation suite designed to align candidate profiles with specific job descriptions, build interactive prep roadmaps, identify skill gaps, and dynamically tailor and compile resume PDFs.
    </p>
    <p>
      The architecture adheres strictly to the classic <strong>Client-Server-Database</strong> design model, leveraging clean separation of concerns and custom RESTful endpoints.
    </p>

    <div class="architecture-diagram">
+-----------------------------------------------------------------------------------+
|                                 FRONTEND (React 19 / Vite / SCSS)                 |
|  - Auth State / Axios Interceptors     - Dashboard     - Interview Reports        |
+-----------------------------------------------------------------------------------+
                                         │  ▲
                         HTTPS POST / GET │  │ JSON Responses
                                         ▼  │
+-----------------------------------------------------------------------------------+
|                                 BACKEND (Node.js / Express)                       |
|  - Router Layer (Auth Router, Interview Router)                                   |
|  - Middleware (Auth Token Validator, Multer Parser)                               |
|  - Controller Logic (Auth, Reports, Resume Tailoring)                             |
|  - Service Layer (Google GenAI Integration, PDF compiler)                         |
+-----------------------------------------------------------------------------------+
           │  ▲                                                  │  ▲
  Mongoose │  │ CRUD Queries                                    │  │ SDK Calls & Parsed Texts
           ▼  │                                                  ▼  │
+-----------------------+                               +-----------------------+
|  DATABASE (MongoDB)   |                               |  EXTERNAL INTEGRATIONS|
|  - User Model         |                               |  - Google Gemini AI   |
|  - Interview Report   |                               |  - PDF parsing (v2)   |
|  - Token Blacklist    |                               |  - html-pdf Engine    |
+-----------------------+                               +-----------------------+
    </div>

    <h2>2. Deep-Dive of Core Components</h2>
    <h3>Frontend Architecture</h3>
    <ul>
      <li><strong>React 19 & Vite:</strong> Lightning-fast compilation, native React 19 concurrent features, and optimized single-page routing via React Router 7.</li>
      <li><strong>Axios Configuration:</strong> Centralized instances configured with <code>withCredentials: true</code> to ensure seamless transfer of HTTP-only JWT cookies to and from the backend server.</li>
      <li><strong>SCSS Design Tokens:</strong> Uses modular stylesheets containing variable structures, mixins, and premium glassmorphic UI layout definitions.</li>
    </ul>

    <h3>Backend & Services</h3>
    <ul>
      <li><strong>Express Controller-Service Pattern:</strong> Isolates routing definitions from business logic. Heavy lifting (AI prompt generation, PDF parsing, PDF rendering) is offloaded to reusable services.</li>
      <li><strong>Robust Auth Engine:</strong> Validates user credentials using <code>bcryptjs</code>, generates JWT signatures, and sends them to the client via <code>httpOnly</code> cookies, protecting against Cross-Site Scripting (XSS) attacks. Supports secure logout through MongoDB token blacklisting.</li>
      <li><strong>In-Memory Parsing:</strong> Multer stores uploads in memory buffers. The backend feeds the buffer directly to <code>pdf-parse</code>, extracts resume text, and frees up memory structures immediately using custom garbage-collection triggers.</li>
    </ul>
  </div>

  <div class="page page-break">
    <h2>3. Database Schema Blueprint</h2>
    <p>We use three core MongoDB collections managed via Mongoose schemas. Below are the key structures:</p>
    
    <h3>A. User Schema (<code>users</code>)</h3>
    <p>Stores core user data. Encrypts passwords using one-way bcrypt hashing before storage.</p>
    <pre><code>{
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}</code></pre>

    <h3>B. Interview Report Schema (<code>InterviewReport</code>)</h3>
    <p>Houses job-specific analysis, custom interview roadmaps, questions, and match scores. Integrates relations using mongoose <code>ObjectId</code> references.</p>
    <pre><code>{
  jobDescription: { type: String, required: true },
  resume: { type: String },
  selfDescription: { type: String },
  matchScore: { type: Number, min: 0, max: 100 },
  technicalQuestions: [{ question: String, intention: String, answer: String }],
  behavioralQuestions: [{ question: String, intention: String, answer: String }],
  skillGaps: [{ skill: String, severity: { type: String, enum: ["low", "medium", "high"] } }],
  preparationPlan: [{ day: Number, focus: String, tasks: [String] }],
  user: { type: Schema.Types.ObjectId, ref: "users" },
  title: { type: String, required: true }
}</code></pre>

    <h3>C. Blacklist Schema (<code>blacklistTokens</code>)</h3>
    <p>Maintains a list of invalidated tokens. An index is configured to run on MongoDB to automatically clear tokens after expiration (TTL - Time to Live).</p>
    <pre><code>{
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1d' } // Auto-cleans expired tokens
}</code></pre>

    <h2>4. Artificial Intelligence & Structured Prompts</h2>
    <p>
      Instead of receiving unformatted string outputs from LLMs, this project leverages the <strong>Google GenAI SDK</strong>'s JSON Schema generation using <code>zod-to-json-schema</code>.
    </p>
    <p>
      By declaring a strict Zod validation schema on the server, we build the exact JSON output blueprint. Gemini is instructed to map its content explicitly to this structure using the <code>gemini-3-flash-preview</code> model. This eliminates parsing errors, protects client rendering from missing attributes, and guarantees that backend validation remains robust.
    </p>
  </div>

  <!-- PAGE 3: 20 INTERVIEW QUESTIONS -->
  <div class="page page-break">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1>20 High-Impact Interview Questions & Answers</h1>
      <p>Curated specifically for demonstrating engineering depth on this project</p>
    </div>

    <!-- Q1 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q1: Explain the authentication flow in your project. Why did you choose HTTP-Only Cookies over LocalStorage for JWT storage?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> Our auth flow uses JWTs. When users log in, the backend signs a token containing user details and sends it to the client via an HTTP-Only, Secure cookie. 
        We chose HTTP-Only cookies because they are inaccessible to client-side JavaScript, which protects the token against Cross-Site Scripting (XSS) attacks. LocalStorage is vulnerable to XSS; any malicious third-party script running in the browser can read LocalStorage keys. With HTTP-Only cookies, the browser automatically attaches the cookie to subsequent API requests, maintaining a secure session.
      </div>
    </div>

    <!-- Q2 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q2: How does the logout mechanism work in your project? Explain the role of Token Blacklisting.
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> Since JWTs are stateless, clearing the client's cookie doesn't actually invalidate the token on the server. If a token is stolen, it could still be used until it expires. 
        To address this, we implemented a Token Blacklisting mechanism. When a user logs out, we extract the current JWT, save it to a <code>blacklistTokens</code> collection in MongoDB, and clear the client cookie. Any incoming request is verified against the blacklist. To prevent the database from growing indefinitely, we configured a TTL (Time-To-Live) index on the <code>createdAt</code> field in the schema so that expired blacklisted tokens are deleted automatically.
      </div>
    </div>

    <!-- Q3 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">AI & Prompts</span>
        Q3: How do you guarantee that the Google Gemini API returns structured JSON data instead of raw text, and how do you validate it?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We use the Google GenAI SDK (<code>@google/genai</code>) combined with Zod. We define a strict validation schema using <code>zod</code>. We convert this schema into a standard JSON schema using <code>zod-to-json-schema</code> and supply it inside the <code>config.responseSchema</code> field during our Gemini API call, along with setting <code>responseMimeType: "application/json"</code>. This forces the Gemini model to return a structured JSON response matching our schema, ensuring attributes like matchScore, skillGaps, and questions are always structured properly.
      </div>
    </div>

    <!-- Q4 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q4: How did you implement file uploading for resumes, and how did you parse them?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We configured <strong>Multer</strong> to use memory storage (<code>multer.memoryStorage()</code>) instead of writing files to the server's disk. This allows the backend to hold the PDF file inside a buffer temporarily. We then pass this buffer to <code>pdf-parse</code>, which extracts the clean text content from the resume. Immediately after parsing, we release the memory structures by calling the parser's <code>destroy()</code> method to ensure memory safety.
      </div>
    </div>
  </div>

  <!-- PAGE 4 -->
  <div class="page page-break">
    <!-- Q5 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q5: Explain the memory leak issue in pdf-parse v2 and how you addressed it.
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> Standard PDF parsing engines create persistent web worker processes and internal memory tables in the Node runtime to handle heavy PDFJS operations. In <code>pdf-parse</code> v2, these structures are not automatically garbage collected, leading to memory leaks over multiple runs. We addressed this by ensuring that we always call the <code>parser.destroy()</code> method immediately after extracting text. This releases the internal JS memory and destroys any dangling worker structures, keeping Node memory usage low.
      </div>
    </div>

    <!-- Q6 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Database</span>
        Q6: Why did you choose MongoDB over a relational database like PostgreSQL for this application?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> The primary data structures generated by our application—namely the interview preparation reports, custom technical/behavioral questions, and day-to-day study plans—are highly hierarchical, flexible, and variable in size. In a relational database, storing nested arrays of questions and task lists would require complex joins across multiple tables. MongoDB allows us to store an entire Interview Report as a single document with nested sub-documents, enabling extremely fast reads and writes.
      </div>
    </div>

    <!-- Q7 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q7: What is the CORS configuration in your Express application, and why is it critical?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> Since our frontend (Vite/React) and backend (Express) run on different ports during development, we must configure Cross-Origin Resource Sharing (CORS). We configure the <code>cors</code> middleware in Express with:
        <pre><code>cors({
  origin: "http://localhost:5173",
  credentials: true
})</code></pre>
        Setting <code>credentials: true</code> is critical; without it, the browser will refuse to send or receive the HTTP-Only authentication cookie, breaking our login session management.
      </div>
    </div>

    <!-- Q8 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Frontend</span>
        Q8: How does Axios handle credentials in the frontend? Show how you set up your Axios instance.
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> By default, Axios does not send credentials (cookies) for cross-origin requests. To ensure every API call carries the JWT cookie, we create a custom axios instance:
        <pre><code>const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});</code></pre>
        This encapsulates the configuration so we don't have to repeat <code>withCredentials</code> in every individual request.
      </div>
    </div>
  </div>

  <!-- PAGE 5 -->
  <div class="page page-break">
    <!-- Q9 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">AI & Prompts</span>
        Q9: What strategies did you use to prevent LLM hallucination and ensure quality interview answers?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We used system instructions and contextual prompt boundary constraints. We structured our prompt to feed the exact job description as the 'ground truth' requirements and the candidate's resume/self-description as the profile source. In the system instruction, we explicitly stated: "Analyze only the skills mentioned in the resume against the job description. Do not assume or invent achievements not listed." By restricting output fields using Zod's <code>.describe()</code> constraints, the model stays focused on authentic skill gaps and real questions.
      </div>
    </div>

    <!-- Q10 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">AI & Prompts</span>
        Q10: What model of Google Gemini did you use and why? How did you handle API quota limits (429 Rate Limits)?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We utilized the <code>gemini-3-flash-preview</code> model. It is optimized for low-latency JSON generation, cost-efficient, and supports structured JSON outputs perfectly. 
        To handle rate limiting (429 errors), we:
        1. Implemented client-side loading indicators and request-debouncing on the UI to prevent double-submissions.
        2. Set up robust try-catch handlers on the backend to capture rate-limit codes and return informative error messages.
        3. Configured an exponential backoff retry wrapper on the backend service for key AI calls.
      </div>
    </div>

    <!-- Q11 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q11: How is the dynamic HTML-to-PDF resume generation implemented?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> When a user requests a tailored resume, our backend service sends the job description and parsed resume content to Gemini, asking it to generate a clean, tailored single-page resume formatted in standard HTML. 
        We then feed this compiled HTML string into our PDF generation service (which uses <code>html-pdf</code> or <code>puppeteer</code>) to compile the HTML into a raw PDF Buffer. The Express controller then sets the response headers (<code>Content-Type: application/pdf</code>) and sends the buffer directly back to the client, allowing the user to download it immediately.
      </div>
    </div>

    <!-- Q12 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q12: Why did you choose in-memory storage for Multer instead of disk storage? What are the tradeoffs?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We chose in-memory storage (<code>multer.memoryStorage()</code>) because resumes are lightweight (usually under 2MB), and writing them to the server disk requires cleanup scripts, risks exposing user files on the server file system, and incurs slow disk I/O.
        <strong>Tradeoffs:</strong> Disk storage is safer for huge uploads (e.g., videos) because memory storage consumes Node.js RAM. For our resume parsing scope, memory storage is faster, cleaner, and highly secure.
      </div>
    </div>
  </div>

  <!-- PAGE 6 -->
  <div class="page page-break">
    <!-- Q13 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Database</span>
        Q13: How did you design database indexes in your models to optimize search query speeds?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We designed three critical indexes:
        1. A <code>unique</code> index on the <code>email</code> field of the User model to make login lookups <code>O(1)</code>.
        2. A compound index on the Interview Report model (<code>user: 1, createdAt: -1</code>) to optimize retrieving user dashboards sorted by latest reports.
        3. A TTL (Time-To-Live) index on the Blacklist model's <code>createdAt</code> field, instructing MongoDB to automatically delete token documents after 24 hours.
      </div>
    </div>

    <!-- Q14 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Frontend</span>
        Q14: How does React 19 improve state management or form handling in your project?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> React 19 introduces native hooks like <code>useActionState</code> and <code>useFormStatus</code>, which simplify asynchronous transitions and pending state management for form submits (e.g., logging in or uploading a resume). Instead of manually tracking <code>isLoading</code> and <code>error</code> states via hooks, we wrap asynchronous actions in React transitions, leading to cleaner components and fewer re-renders.
      </div>
    </div>

    <!-- Q15 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q15: How do you secure Express routes so that only authenticated users can access them?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We built an authorization middleware called <code>authMiddleware</code>. It checks for the presence of the JWT token in cookies. If the token is found, it decodes and verifies the JWT. If validation succeeds, it looks up the user, attaches the user object to <code>req.user</code>, and calls <code>next()</code> to hand off control to the controller. If the token is invalid, expired, or blacklisted, it returns a <code>401 Unauthorized</code> response, preventing unauthorized access.
      </div>
    </div>

    <!-- Q16 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Backend</span>
        Q16: How do you handle password security and storage in your database?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We never store passwords in plain text. We use <code>bcryptjs</code> to hash passwords. During registration, we generate a salt and hash the password using <code>bcrypt.hash()</code>. During login, we fetch the hashed password from the database and use <code>bcrypt.compare()</code> to verify if the incoming password matches the hash. Bcrypt uses a slow-hashing algorithm, protecting passwords from brute-force and rainbow table attacks.
      </div>
    </div>
  </div>

  <!-- PAGE 7 -->
  <div class="page page-break">
    <!-- Q17 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Architecture</span>
        Q17: Describe your error-handling middleware strategy on the Express backend.
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We centralize all runtime errors using a global error-handling middleware. Instead of scattered try-catch logs, our controllers pass caught errors to <code>next(error)</code>. Our global handler intercepts them, logs the stack trace in development, and returns clean, uniform JSON payloads to the frontend:
        <pre><code>app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});</code></pre>
        This keeps client responses consistent and ensures server-side failures don't leak implementation details.
      </div>
    </div>

    <!-- Q18 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-tech">Frontend</span>
        Q18: What styling strategy did you use for the UI, and how did you organize your stylesheet structures?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> We used Sass/SCSS with a structured design token system. We declared visual variables (colors, typography scales, glassmorphism shadows) in a centralized <code>_variables.scss</code> file. We then structured styles by features using SCSS mixins and responsive breakpoints. This modular approach allows clean scaling without repeating styles, keeping the UI visually cohesive.
      </div>
    </div>

    <!-- Q19 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-behavioral">Behavioral</span>
        Q19: How did you prioritize features when building this project? What was your MVP scope?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> I defined the Minimum Viable Product (MVP) based on the core user problem: getting immediate feedback on resumes against target jobs. 
        - <strong>MVP Phase:</strong> Resume parsing, Gemini matching, and generating the preparation plan.
        - <strong>Phase 2:</strong> Authentication and saving reports (MERN integration).
        - <strong>Phase 3:</strong> Tailored single-page resume generation and PDF download.
        This iterative prioritization allowed me to validate the core AI logic first before building out session management and styling panels.
      </div>
    </div>

    <!-- Q20 -->
    <div class="question-card">
      <div class="question-title">
        <span class="badge badge-behavioral">Behavioral</span>
        Q20: What was the biggest technical challenge you faced in this project, and how did you resolve it?
      </div>
      <div class="answer-text">
        <strong>Answer:</strong> The biggest challenge was getting consistent single-page PDF resumes from AI-generated HTML. The Gemini API would sometimes generate long structures that wrapped onto two pages, or the styling would break during HTML-to-PDF compilation because of PhantomJS/html-pdf rendering limitations. 
        I resolved this by:
        1. Refining the prompt schema to mandate a strict single-page grid structure.
        2. Adjusting page margins and styling to use inline flexboxes and CSS grids instead of floating layouts.
        3. Switching our backend rendering to use Headless Puppeteer for printing, as Puppeteer executes standard Chromium layouts which cleanly compile CSS styles to PDF.
      </div>
    </div>
  </div>

</body>
</html>
`;

async function main() {
  console.log("Starting PDF generation script...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    console.log("Setting HTML content...");
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Output directory is the root of the project
    const pdfPath = path.join(__dirname, "..", "Interview_AI_Deep_Explanation_and_Questions.pdf");
    console.log(`Generating PDF at ${pdfPath}...`);

    await page.pdf({
      path: pdfPath,
      format: "A4",
      margin: {
        top: "10mm",
        bottom: "10mm",
        left: "10mm",
        right: "10mm"
      },
      printBackground: true
    });

    console.log("PDF generated successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    await browser.close();
  }
}

main();
