📚 Book Tracking App

A simple and powerful web application to track, manage, and organize your book collection!
Built using Node.js, Express, MySQL, and Multer for file uploads (PDFs). 🚀

🌟 Features
Add, edit, delete book records
Upload and preview book PDFs
Search books by title
Mark books as read/unread
Download book PDFs
User-friendly status messages

🛠️ Tech Stack
Backend: Node.js, Express.js
Database: MySQL
File Uploads: Multer
Template Engine: EJS

⚙️ Environment Setup
A. Clone the Repository
1. git clone https://github.com/yourusername/book-tracking-app.git
2. cd book-tracking-app

B. Install Dependencies
1. npm install

C. Set Up Environment Variables
Create a .env file in the root directory:
1. PORT='YOUR PORT NUMBER'
2. DATABASE_URL=mysql://USERNAME:PASSWORD@localhost:3306/DBNAME

Note:DBNAME should be 'mybook'

D. Uploads Folder
Make sure you have an uploads/ folder at the root to store uploaded PDFs.
If not, create it manually:
1. mkdir uploads

🗄️ Database Setup
A. Create the Database
Log into your MySQL server and run:
1. CREATE DATABASE your_database_name;

Note: your_database_name = 'mybook'

🚀 Running the App
Start the server
1. npm run dev
or
2. node --watch ./app.js


Visit your app
1. http://localhost:5000/

📢 Important Notes
File uploads are limited to 1MB max.
Only PDF files are allowed for upload.
Make sure MySQL server is running before starting the app.
I am using Drizzle ORM so before run the program setup generate, migration accordingly first.

🤝 Contributing
Pull requests are welcome! Feel free to open an issue or suggest improvements.

📄 License
This project is licensed under the MIT License.

💻 Happy Tracking! 🚀
