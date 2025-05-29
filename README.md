🏛️ Substance I.I.M.U.N. – HR Management Web Portal
An internal HR and attendance portal built for the Substance Department of I.I.M.U.N., designed to streamline operations, manage intern leave applications, and improve visibility for the admin team.

👨‍💻 Developed and maintained by Taman Bachani, Assistant Director – Substance Department
🌐 Live demo: https://substance-iimun.onrender.com/

🚀 Key Features
👥 User (Intern) Panel
🔐 Secure login with cookie-based session management

🆔 I.I.M.U.N. ID verification at registration

📅 Leave application form with validation

📄 View your leave history & status

💬 Receive feedback/comments on rejected leaves

🛠️ Admin Panel
✅ Approve / ❌ Reject leave applications

🗃 View all intern applications by date/user

🧾 Add custom feedback to individual leave requests

📊 Dashboard-style overview for better admin control

📸 Screenshots
(Add screenshots here after uploading to assets/ folder)

Login Page	User Dashboard	Admin Panel

🎥 Demo Video
📺 Coming soon — YouTube walkthrough will be embedded here.

🛠️ Tech Stack
Frontend	Backend	Auth & State	Hosting
HTML, CSS, JS	Node.js + Express	Cookies, Sessions	Render.com
Bootstrap (UI)	MongoDB (via db.js)	Express middleware	

📦 Project Structure
bash
Copy
Edit
.
├── client/             # Frontend (static HTML/CSS/JS)
├── middleware/         # Auth and session middleware
├── models/             # Mongoose schemas or data structure logic
├── routes/             # All route controllers
├── server.js           # Entry point
├── Dockerfile.render   # Deployment config
├── render.yaml         # Render deployment config
└── .env                # Environment variables (excluded from Git)
🧪 Testing & Validation
Tested with 50+ interns across departments

Fully responsive and works across modern browsers

Handles session persistence, error handling, and edge cases like invalid IIMUN IDs

🙋‍♂️ About I.I.M.U.N.
The Indian International Model United Nations (I.I.M.U.N.) is one of the largest student-run youth organizations in the world, known for engaging thousands of high school and college students through events, conferences, and workshops.

📫 Contact
For collaborations, reuse, or access to this system for educational orgs:

📧 workwith.taman@gmail.com
🔗 LinkedIn
