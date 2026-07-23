const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, "..", "Interview_AI_Deep_Explanation_and_Questions.pdf");

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Interview AI - Complete Project Guide & Interview Preparation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    h1, h2, h3, h4 {
      color: #0f172a;
      font-weight: 700;
    }
    
    h1 {
      font-size: 32px;
      border-bottom: 2px solid #3b82f6;
      padding-bottom: 12px;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    
    h2 {
      font-size: 22px;
      color: #1e3a8a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    
    h3 {
      font-size: 16px;
      color: #2563eb;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      margin-top: 0;
      margin-bottom: 16px;
      font-size: 14px;
      color: #334155;
    }
    
    ul, ol {
      margin-top: 0;
      margin-bottom: 16px;
      padding-left: 24px;
    }
    
    li {
      margin-bottom: 8px;
      font-size: 14px;
      color: #334155;
    }
    
    .question-box {
      background-color: #f8fafc;
      border-left: 4px solid #3b82f6;
      padding: 16px;
      margin-bottom: 24px;
      border-radius: 0 8px 8px 0;
      page-break-inside: avoid;
    }
    
    .question-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 15px;
      margin-bottom: 8px;
    }
    
    .answer-text {
      font-size: 14px;
      color: #334155;
    }
    
    .answer-text strong {
      color: #1e293b;
    }
    
    .header-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 40px;
      text-align: center;
    }
    
    .header-banner h1 {
      color: white;
      border-bottom: none;
      margin-top: 0;
      margin-bottom: 10px;
      font-size: 36px;
      font-weight: 800;
    }
    
    .header-banner p {
      color: #93c5fd;
      font-size: 16px;
      margin-bottom: 0;
    }
    
    .tech-pill {
      display: inline-block;
      background-color: #e0f2fe;
      color: #0369a1;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
      margin-right: 6px;
      margin-bottom: 6px;
    }
    
    .tech-container {
      margin-bottom: 20px;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 13px;
    }
    
    table, th, td {
      border: 1px solid #cbd5e1;
    }
    
    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 600;
      text-align: left;
      padding: 10px;
    }
    
    td {
      padding: 10px;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-banner">
      <h1>Interview AI</h1>
      <p>Smart Interview Preparation & Tailored Resume Builder</p>
      <div style="margin-top: 15px; font-size: 12px; color: #cbd5e1;">Comprehensive Technical Documentation & Interview Cheat-Sheet</div>
    </div>
    
    <h2>1. Project Deep Dive Explanation</h2>
    <p>
      <strong>Interview AI</strong> is a full-stack, enterprise-grade MERN web application built to address the critical friction job candidates experience when preparing for technical and behavioral interviews. By utilizing advanced Large Language Models (LLMs) via the <strong>Google Gemini API</strong>, the platform analyzes job descriptions, parses candidate resumes, highlights technical and behavioral gaps, outputs a day-by-day learning plan, and generates highly polished, single-page, ATS-optimized resume PDFs tailor-made for targeted jobs.
    </p>
    
    <h3>Key Architecture & System Workflow</h3>
    <ol>
      <li><strong>User Session & Security:</strong> Users register and authenticate securely via JSON Web Tokens (JWT) stored in HTTP-only, secure cookies. This prevents common Cross-Site Scripting (XSS) token extraction. Out-of-session requests are checked against a Redis/MongoDB-backed Token Blacklist to invalidate tokens upon logout.</li>
      <li><strong>Resume Processing:</strong> Candidates upload their resumes in PDF or DOCX format. The backend handles the file upload in-memory using <code>Multer</code> to bypass disk read/write overhead and security risks. The document parser uses <code>pdf-parse</code> to extract clean text.</li>
      <li><strong>AI Report Generation:</strong> The extracted text, along with the user's self-description and the target job description, is wrapped in a system prompt. Using Zod validation and <code>zod-to-json-schema</code>, the application instructs <code>gemini-3-flash-preview</code> to return structured JSON. This ensures that the response perfectly complies with the structure needed by the frontend without causing parsing errors.</li>
      <li><strong>Resume Tailoring Engine:</strong> Upon request, the system prompts the AI to generate a custom HTML resume optimized for applicant tracking systems (ATS). The backend then takes this HTML and compiles it into an A4 PDF buffer using <code>Puppeteer</code> or <code>html-pdf</code>, streaming the download response back to the client.</li>
    </ol>
    
    <h3>Core Tech Stack & Ecosystem</h3>
    <div class="tech-container">
      <span class="tech-pill">React 19</span>
      <span class="tech-pill">Vite</span>
      <span class="tech-pill">React Router 7</span>
      <span class="tech-pill">Node.js</span>
      <span class="tech-pill">Express</span>
      <span class="tech-pill">MongoDB & Mongoose</span>
      <span class="tech-pill">Google GenAI SDK</span>
      <span class="tech-pill">Zod & Zod-to-Json-Schema</span>
      <span class="tech-pill">JWT & Bcrypt</span>
      <span class="tech-pill">Multer & PDF-Parse</span>
      <span class="tech-pill">Puppeteer</span>
      <span class="tech-pill">SCSS / SASS</span>
    </div>
    
    <h2>2. API Architecture Reference</h2>
    <table>
      <thead>
        <tr>
          <th>Method</th>
          <th>Endpoint</th>
          <th>Access</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>POST</td>
          <td>/api/auth/register</td>
          <td>Public</td>
          <td>Creates a new user profile with hashed password.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/api/auth/login</td>
          <td>Public</td>
          <td>Validates user; issues secure HTTP-Only JWT Cookie.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/api/auth/logout</td>
          <td>Private</td>
          <td>Clears client cookie; blacklists current JWT token in DB.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/api/interview/</td>
          <td>Private</td>
          <td>Extracts resume file text; generates AI alignment analysis report.</td>
        </tr>
        <tr>
          <td>GET</td>
          <td>/api/interview/report/:interviewId</td>
          <td>Private</td>
          <td>Retrieves metadata and full question banks for an interview.</td>
        </tr>
        <tr>
          <td>POST</td>
          <td>/api/interview/resume/pdf/:interviewReportId</td>
          <td>Private</td>
          <td>Generates tailored A4 resume PDF based on target job description.</td>
        </tr>
      </tbody>
    </table>

    <div class="page-break"></div>
    
    <h2>3. Top 20 Technical Interview Questions & Model Answers</h2>
    <p style="margin-bottom: 30px; font-style: italic;">Use these detailed answers to showcase deep technical execution and architectural decisions during your interviews.</p>
    
    <!-- Q1 -->
    <div class="question-box">
      <div class="question-title">Q1: Walk me through the end-to-end data flow when a user uploads a resume and gets an interview preparation report.</div>
      <div class="answer-text">
        <strong>Answer:</strong>
        <ol>
          <li>The user fills out the form (job description, self-description) and attaches their resume (PDF) in the React frontend.</li>
          <li>Axios submits a <code>multipart/form-data</code> request to the Express backend (<code>POST /api/interview/</code>).</li>
          <li>The request passes through the <strong>authMiddleware</strong> (verifying the JWT from the HTTP-only cookies) and the <strong>Multer</strong> upload middleware (which loads the file into memory as a buffer).</li>
          <li>In the controller, the resume buffer is parsed into raw text using <code>pdf-parse</code>.</li>
          <li>The controller calls <code>generateInterviewReport</code> from the AI service, feeding it the resume text, self-description, and job description.</li>
          <li>The AI service interacts with the Google GenAI SDK using <code>gemini-3-flash-preview</code>. It uses Zod to define a strict response schema, converting it to a JSON schema using <code>zod-to-json-schema</code> to guarantee the response matches the required format.</li>
          <li>Gemini processes the prompt and returns a structured JSON payload containing the match score, question banks, skill gaps, and preparation road map.</li>
          <li>The controller saves this data in MongoDB under the <code>InterviewReport</code> collection linked to the user's ID, and sends the created document back to the client.</li>
        </ol>
      </div>
    </div>
    
    <!-- Q2 -->
    <div class="question-box">
      <div class="question-title">Q2: Why did you choose to store the JWT inside an HTTP-only cookie instead of localStorage?</div>
      <div class="answer-text">
        <strong>Answer:</strong> Storing JWTs in <code>localStorage</code> makes the application highly vulnerable to <strong>Cross-Site Scripting (XSS)</strong> attacks. If an attacker manages to run malicious JavaScript on your page (for example, through a compromised third-party package or an unescaped input fields), they can easily extract token keys using <code>localStorage.getItem('token')</code>. By storing the JWT in an <strong>HTTP-only cookie</strong>, the browser automatically attaches the cookie to outgoing requests but forbids client-side JavaScript from accessing it (via <code>document.cookie</code>). This completely eliminates the threat of XSS-based token theft.
      </div>
    </div>
    
    <!-- Q3 -->
    <div class="question-box">
      <div class="question-title">Q3: How does JWT blacklisting work on logout, and why is it necessary?</div>
      <div class="answer-text">
        <strong>Answer:</strong> Since JWTs are stateless, clearing the cookie on the client-side does not prevent the token from being used if an attacker has intercepted it. To solve this, we implemented a <strong>Token Blacklist</strong>. When a user calls the logout endpoint, we extract the JWT token, identify its remaining time-to-live (TTL), and store it in a <code>Blacklist</code> model in MongoDB. When requests hit our authenticated routes, the auth middleware checks if the incoming token exists in the blacklist database. If it does, we immediately reject the request. We also configure a MongoDB TTL index on the blacklist schema so that blacklisted tokens are automatically deleted once they naturally expire.
      </div>
    </div>
    
    <!-- Q4 -->
    <div class="question-box">
      <div class="question-title">Q4: Explain how you generated structured JSON responses from the Gemini API and why this is important.</div>
      <div class="answer-text">
        <strong>Answer:</strong> Traditional natural language prompting can be unpredictable; AI models might return markdown formatting, conversational text, or dynamic JSON keys, causing the backend parser to throw errors. In this project, we enforced structural compliance using the <strong>Google GenAI SDK</strong> by passing the <code>responseMimeType: "application/json"</code> configuration parameter alongside a JSON schema. We defined this schema using <code>Zod</code> and translated it into a compliant JSON schema via <code>zod-to-json-schema</code>. This forces the Gemini model to return a response that strictly adheres to our structured JSON keys (such as `matchScore`, `technicalQuestions`, etc.), eliminating validation failures.
      </div>
    </div>

    <div class="page-break"></div>

    <!-- Q5 -->
    <div class="question-box">
      <div class="question-title">Q5: How did you configure Multer for file uploads, and why did you choose memory storage over disk storage?</div>
      <div class="answer-text">
        <strong>Answer:</strong> We configured Multer to use <code>multer.memoryStorage()</code>. Memory storage processes the uploaded file as a raw Node.js Buffer, holding it in RAM. We chose memory storage over disk storage for two key reasons:
        <ol>
          <li><strong>Performance:</strong> Resumes are small documents (typically under 2MB). Parsing files in-memory avoids expensive disk I/O operations, ensuring faster response times.</li>
          <li><strong>Security & Cleanliness:</strong> Writing uploaded files to disk requires managing file cleanup, dealing with path traversal vulnerabilities, and ensuring temporary directories have the correct permissions. Memory storage ensures the file naturally disappears when the request ends.</li>
        </ol>
      </div>
    </div>

    <!-- Q6 -->
    <div class="question-box">
      <div class="question-title">Q6: What is pdf-parse v2, and why does the codebase call `parser.destroy()` after parsing a PDF?</div>
      <div class="answer-text">
        <strong>Answer:</strong> `pdf-parse` v2 is a modern JavaScript utility used to parse PDF files. Under the hood, it loads the PDF's binary structures using PDFJS web workers. In Node.js, these worker structures and canvas representations remain cached in memory even after text extraction is complete. Calling <code>await parser.destroy()</code> is critical to prevent memory leaks in production, as it explicitly instructs PDFJS to release memory resources, close internal workers, and free up RAM.
      </div>
    </div>

    <!-- Q7 -->
    <div class="question-box">
      <div class="question-title">Q7: Explain the PDF generation process for the tailored resume. Why did you choose an HTML-to-PDF compilation approach?</div>
      <div class="answer-text">
        <strong>Answer:</strong> Constructing highly formatted PDF documents programmatically (e.g., using low-level canvas APIs like pdfkit) is extremely tedious and hard to maintain. Instead, we used a dynamic HTML-to-PDF compilation workflow.
        <ol>
          <li>We instruct Gemini to output clean, semantic HTML structure containing tailored candidate information optimized for an ATS.</li>
          <li>The backend passes this HTML string to <code>Puppeteer</code> or <code>html-pdf</code>.</li>
          <li>The compilation engine renders the HTML page in a headless browser env and prints it to an A4-sized PDF buffer.</li>
          <li>This buffer is sent directly to the client with the <code>Content-Type: application/pdf</code> header, causing the browser to download the file directly. This makes modifying the layout as simple as updating HTML/CSS templates.</li>
        </ol>
      </div>
    </div>

    <!-- Q8 -->
    <div class="question-box">
      <div class="question-title">Q8: How does the application handle React routing, and how did you implement route guards?</div>
      <div class="answer-text">
        <strong>Answer:</strong> We use <strong>React Router 7</strong>. Routes are declared dynamically in `app.routes.jsx`. We protect authenticated pages (like dashboards and report views) using a custom <code>ProtectedRoute</code> component. This component references an <code>AuthContext</code> provider. If the user's authentication state is loading, it displays a loading spinner. If the state completes and the user is authenticated, it renders the child pages (using <code>&lt;Outlet /&gt;</code>); otherwise, it redirects the user to the login page using the <code>&lt;Navigate to="/login" replace /&gt;</code> component.
      </div>
    </div>

    <div class="page-break"></div>

    <!-- Q9 -->
    <div class="question-box">
      <div class="question-title">Q9: Explain the mongoose schemas of this project. What collections are stored, and how are they linked?</div>
      <div class="answer-text">
        <strong>Answer:</strong> The project defines three main MongoDB collections:
        <ul>
          <li><strong>User:</strong> Stores basic user info (username, email, hashed password).</li>
          <li><strong>InterviewReport:</strong> Houses the reports generated by the AI. It features a reference field <code>user: { type: Schema.Types.ObjectId, ref: 'User', required: true }</code> linking it to the user. It also stores the match score, raw resume content, self-description, job description, technical questions array, behavioral questions array, skill gaps array, and the day-wise preparation plan array.</li>
          <li><strong>Blacklist:</strong> Stores blacklisted JWT tokens with the token value and an expiration date. It uses MongoDB's <code>expireAfterSeconds</code> index to automate document self-destruction once a token has expired.</li>
        </ul>
      </div>
    </div>

    <!-- Q10 -->
    <div class="question-box">
      <div class="question-title">Q10: What is CORS, and how is it configured in your Express application?</div>
      <div class="answer-text">
        <strong>Answer:</strong> <strong>Cross-Origin Resource Sharing (CORS)</strong> is a browser security mechanism that restricts cross-origin HTTP requests. Since our React frontend runs on <code>http://localhost:5173</code> and the Express backend runs on <code>http://localhost:3000</code>, the browser blocks requests unless CORS is explicitly allowed. We configure it using the <code>cors</code> middleware:
        <pre style="background: #e2e8f0; padding: 10px; border-radius: 4px; font-size: 12px; margin: 8px 0;">
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));</pre>
        Setting <code>credentials: true</code> is essential so that the browser allows sending and receiving secure cookies across different origins.
      </div>
    </div>

    <!-- Q11 -->
    <div class="question-box">
      <div class="question-title">Q11: Why did you choose React 19 and Vite for the frontend build instead of Create React App (CRA)?</div>
      <div class="answer-text">
        <strong>Answer:</strong> Vite offers a significantly faster development workflow compared to Create React App. CRA uses Webpack, which bundles the entire application before starting the dev server. Vite uses native ES Modules (ESM) to serve source files directly, performing lightning-fast Hot Module Replacement (HMR) regardless of project size. React 19 brings performance improvements, streamlined form handling features (like the new actions API), and optimized rendering loops, ensuring high performance for our dashboard and report sections.
      </div>
    </div>

    <!-- Q12 -->
    <div class="question-box">
      <div class="question-title">Q12: How do you handle password security in your database?</div>
      <div class="answer-text">
        <strong>Answer:</strong> We never store passwords in plaintext. We use the <strong>Bcryptjs</strong> library to hash passwords. During registration, we salt and hash the password (using a salt cost factor of 10) before saving the user document:
        <pre style="background: #e2e8f0; padding: 10px; border-radius: 4px; font-size: 12px; margin: 8px 0;">
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);</pre>
        During login, we compare the submitted password against the stored hash using <code>bcrypt.compare()</code>. Bcrypt is intentionally slow and computationally intensive, protecting hashed passwords from brute-force attacks.
      </div>
    </div>

    <div class="page-break"></div>

    <!-- Q13 -->
    <div class="question-box">
      <div class="question-title">Q13: How does the application handle server-side errors, and how are they reported to the client?</div>
      <div class="answer-text">
        <strong>Answer:</strong> The backend wraps API controller logic in <code>try/catch</code> blocks. In case of unexpected database failures, Gemini API outages, or file parser errors, the exception is caught, logged on the server (using <code>console.error</code>), and returned to the client as a clean JSON payload:
        <pre style="background: #e2e8f0; padding: 10px; border-radius: 4px; font-size: 12px; margin: 8px 0;">
res.status(500).json({
  message: "Internal server error occurred",
  error: err.message
});</pre>
        On the client-side, Axios interceptors or try/catch blocks catch these non-2xx HTTP responses, extracting the message to display user-friendly toast notifications.
      </div>
    </div>

    <!-- Q14 -->
    <div class="question-box">
      <div class="question-title">Q14: Explain the difference between `gemini-3-flash-preview` / `gemini-3-flash` and larger LLMs for this use-case.</div>
      <div class="answer-text">
        <strong>Answer:</strong> Generating comprehensive reports (which require parsing massive resumes and job descriptions) is a token-heavy task. Larger models (like Gemini Pro or GPT-4) offer higher reasoning capabilities but suffer from higher latency and high API costs. `gemini-3-flash` is a lightweight, multimodal model designed for high-speed, cost-efficient, and low-latency tasks. It supports large context windows and handles structured JSON schema generation perfectly, making it the ideal choice for generating real-time, responsive interview guides and resume HTML.
      </div>
    </div>

    <!-- Q15 -->
    <div class="question-box">
      <div class="question-title">Q15: What design patterns were followed for structuring the frontend styles with SCSS?</div>
      <div class="answer-text">
        <strong>Answer:</strong> We avoided ad-hoc styling and utility bloat by organizing SCSS files modularly. We defined global variables (design tokens for colors, typography, border-radius, shadows, and transitions) in <code>src/style/</code>. We structured our pages using standard CSS grid layouts and flexbox. Dashboard components use CSS variables for active styling, implementing glassmorphism, responsive grid layouts, and smooth transition animations to achieve a premium aesthetic.
      </div>
    </div>

    <!-- Q16 -->
    <div class="question-box">
      <div class="question-title">Q16: How would you scale the PDF compilation service if it becomes a bottleneck?</div>
      <div class="answer-text">
        <strong>Answer:</strong> Headless PDF compilation (whether via Puppeteer or PhantomJS) is highly memory and CPU intensive. Running it synchronously on the main Express event loop can degrade server performance. To scale it:
        <ol>
          <li><strong>Separate Worker Service:</strong> Move PDF generation to a dedicated microservice.</li>
          <li><strong>Message Queue:</strong> When a PDF is requested, push the task to a message queue (like BullMQ with Redis). Dedicated worker containers consume these tasks, compile the PDFs, save them to an S3 bucket, and notify the user via WebSockets when the download link is ready.</li>
          <li><strong>Caching:</strong> Store compiled PDFs in a CDN or S3 bucket, caching them by report ID. Re-downloads can then bypass the compilation step entirely.</li>
        </ol>
      </div>
    </div>

    <div class="page-break"></div>

    <!-- Q17 -->
    <div class="question-box">
      <div class="question-title">Q17: How does your frontend manage global state (e.g. login credentials)?</div>
      <div class="answer-text">
        <strong>Answer:</strong> We use React's <strong>Context API</strong> (specifically <code>AuthContext</code>) to manage authentication state globally. Upon mounting, the <code>AuthProvider</code> issues a request to <code>/api/auth/get-me</code>. If the HTTP-only cookie contains a valid JWT, the backend returns user data, which is populated into the React state. This user object and its loading state are shared with the entire component tree, allowing protected route guards and navigation bars to react to authentication changes without prop drilling.
      </div>
    </div>

    <!-- Q18 -->
    <div class="question-box">
      <div class="question-title">Q18: What are MongoDB TTL indexes, and where are they used in this project?</div>
      <div class="answer-text">
        <strong>Answer:</strong> A Time-To-Live (TTL) index is a special single-field index that MongoDB uses to automatically remove documents from a collection after a certain amount of time. In our project, it's used in the <code>Blacklist</code> model. The schema defines a <code>createdAt</code> field with an expire index:
        <pre style="background: #e2e8f0; padding: 10px; border-radius: 4px; font-size: 12px; margin: 8px 0;">
const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' }
});</pre>
        This automatically removes blacklisted tokens from the database after 24 hours, preventing the database from growing indefinitely.
      </div>
    </div>

    <!-- Q19 -->
    <div class="question-box">
      <div class="question-title">Q19: How do you prevent SQL Injection and NoSQL Injection in this application?</div>
      <div class="answer-text">
        <strong>Answer:</strong>
        <ul>
          <li><strong>NoSQL Injection Prevention:</strong> We use <strong>Mongoose</strong> for database interactions. Mongoose models enforce strict schemas, ensuring that query parameters are cast to the correct data types. This prevents attackers from passing malicious queries (like MongoDB operator objects <code>{ "$gt": "" }</code>) to bypass authentication fields.</li>
          <li><strong>Input Validation:</strong> Using <strong>Zod</strong> on the backend enables us to validate and sanitize incoming payloads before passing them to the database.</li>
        </ul>
      </div>
    </div>

    <!-- Q20 -->
    <div class="question-box">
      <div class="question-title">Q20: What are the main benefits of using Vite for development vs production builds?</div>
      <div class="answer-text">
        <strong>Answer:</strong>
        <ul>
          <li><strong>Development:</strong> Vite performs lightning-fast hot reloading by using browser ESM. It resolves modules on-demand, saving significant build time compared to Webpack, which bundles the entire dependency graph upfront.</li>
          <li><strong>Production:</strong> Vite uses Rollup under the hood, enabling optimizations like tree shaking (removing unused code), CSS splitting, and chunking, resulting in smaller bundles and faster page load speeds.</li>
        </ul>
      </div>
    </div>

  </div>
</body>
</html>
`;

async function main() {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  console.log("Setting HTML content...");
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  console.log("Generating PDF file...");
  await page.pdf({
    path: outputPath,
    format: "A4",
    margin: {
      top: "15mm",
      bottom: "15mm",
      left: "15mm",
      right: "15mm",
    },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size: 8px; color: #94a3b8; width: 100%; text-align: center; font-family: Inter, sans-serif;">Page <span class="pageNumber"></span> of <span class="totalPages"></span> | Interview AI Technical Guide</div>',
  });

  console.log(`PDF successfully generated at: ${outputPath}`);
  await browser.close();
}

main().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
