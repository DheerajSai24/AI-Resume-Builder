# 🤖 AI Resume Builder

A powerful AI-powered resume builder that generates personalized cover letters, optimizes resume content, provides keyword analysis, and estimates ATS (Applicant Tracking System) scores using Google's Gemini AI.

![AI Resume Builder](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF)
![Gemini AI](https://img.shields.io/badge/Gemini-2.0--flash-4285F4)

## 🌐 Live Demo

**[View Live Application](https://dheerajsai24.github.io/AI-Resume-Builder/)**

## ✨ Features

### 📝 **AI-Powered Content Generation**
- **Tailored Cover Letters**: Generate professional, customized cover letters for any company
- **Resume Optimization**: Get AI-suggested improvements for your resume summary, bullet points, and skills
- **Keyword Analysis**: Extract and match important keywords from job descriptions
- **ATS Score Estimate**: Receive an estimated ATS compatibility score (0-100)

### 🎨 **Modern UI/UX**
- Clean, professional interface with gradient backgrounds
- Blue-themed section headings with underlines
- Responsive design for all devices
- Smooth animations and hover effects
- Color-coded content sections for easy readability

### 🔧 **Smart Formatting**
- Automatic parsing of AI responses into structured sections
- Bold text support with `**text**` syntax
- Bullet points with blue arrow icons
- Numbered items highlighted in blue
- Sub-headers with special styling

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Google Gemini API Key** (Free to get)

### 🔑 How to Get Your Google Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click on **"Create API Key"** button
   - Select **"Create API key in new project"** or choose an existing project
   - Your API key will be generated instantly

3. **Copy Your API Key**
   - Click the copy button to copy your API key
   - **Important**: Keep this key secure and don't share it publicly

4. **Free Tier**
   - Gemini API offers a generous free tier
   - No credit card required for getting started
   - Check [pricing details](https://ai.google.dev/pricing) for usage limits

### 📥 Installation & Setup

#### Step 1: Clone the Repository

Using HTTPS:
```bash
git clone https://github.com/DheerajSai24/AI-Resume-Builder.git
cd AI-Resume-Builder
```

Or using SSH:
```bash
git clone git@github.com:DheerajSai24/AI-Resume-Builder.git
cd AI-Resume-Builder
```

Or download ZIP:
- Click the **"Code"** button on GitHub
- Select **"Download ZIP"**
- Extract the ZIP file
- Open terminal in the extracted folder

#### Step 2: Install Dependencies

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

#### Step 3: Set Up Your API Key

1. **Create a `.env` file** in the root directory (same level as `package.json`)

2. **Add your Gemini API key** to the `.env` file:
   ```env
   VITE_GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

3. **Example `.env` file:**
   ```env
   VITE_GEMINI_API_KEY=AIzaSyABC123xyz...YourActualKeyHere
   ```

   ⚠️ **Important Notes:**
   - Replace `YOUR_ACTUAL_API_KEY_HERE` with your actual API key from Google AI Studio
   - Don't use quotes around the API key
   - Don't add spaces before or after the `=` sign
   - The `.env` file is already in `.gitignore`, so it won't be committed to Git

#### Step 4: Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5173` (or another port if 5173 is busy)

#### Step 5: Open Your Browser

Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### ✅ Verify Installation

If everything is set up correctly:
- ✅ The app should load without errors
- ✅ You can fill in the form fields
- ✅ Clicking "Generate AI-Powered Resume & Cover Letter" should work
- ✅ AI-generated content should appear below the form

### ❌ Troubleshooting

**Problem: API Key Error**
- Make sure your `.env` file is in the root directory
- Check that the variable name is exactly `VITE_GEMINI_API_KEY`
- Verify your API key is valid (no extra spaces or quotes)
- Restart the dev server after creating/modifying `.env`

**Problem: Port Already in Use**
- Vite will automatically use the next available port
- Or manually specify a port: `npm run dev -- --port 3000`

**Problem: Dependencies Not Installing**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## 📖 Usage

1. **Fill in the Form**
   - Enter the company name you're applying to
   - Select your experience level (Fresher/Experienced)
   - Choose your preferred cover letter tone (Formal/Informal/Casual)
   - Paste the job description
   - Optionally paste your current resume

2. **Generate AI Content**
   - Click the "Generate AI-Powered Resume & Cover Letter" button
   - Wait for the AI to process your request

3. **Review Results**
   - View your tailored cover letter
   - Check optimized resume suggestions
   - Review keyword match analysis
   - See your ATS score estimate

4. **Take Action**
   - Copy content to clipboard
   - Clear results to start fresh
   - Download results (if implemented)

## 🛠️ Technologies Used

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 7.1.9
- **AI Model**: Google Gemini 2.0 Flash
- **Styling**: Custom CSS with modern gradients
- **Icons**: Emoji-based icon system

## 📁 Project Structure

```
ai-resume-builder/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css          # Main styles
│   ├── App.jsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (create this)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Styling Features

### Color Scheme
- **Primary Blue**: `#007bff` - Used for headings, bullets, and accents
- **Gradient Backgrounds**: Purple to pink hero section
- **White Cards**: Clean content containers with shadows

### Typography
- **Headings**: Blue color with underline accent
- **Body Text**: Dark gray for readability
- **Bold Text**: Automatically styled from `**text**` syntax
- **Numbered Items**: Blue color for emphasis

## 🔑 Key Components

### Content Parsing
The app intelligently parses AI responses:
- Sections numbered with `1.`, `2.`, etc.
- Markdown-style headers with `#`
- Bullet points with `*`, `-`, or `•`
- Bold text with `**text**`
- Sub-headers ending with `:`

### Response Sections
Each AI response is divided into:
1. **Tailored Cover Letter**: Personalized for the company
2. **Updated Resume Content**: Optimized suggestions
3. **Keyword Match Analysis**: Missing keywords to add
4. **ATS Score Estimate**: Compatibility rating with explanation

## 🌟 Advanced Features

- **Automatic Text Cleaning**: Removes unwanted AI closing messages
- **Format Preservation**: Maintains spacing and structure
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Copy to Clipboard**: Easy content sharing
- **Clear Results**: Quick reset functionality

## 🔒 Security

- API keys are stored in environment variables
- No sensitive data is stored on the server
- All processing happens client-side

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 🚀 Deployment

This project is configured for GitHub Pages deployment.

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

The app will be deployed to: `https://dheerajsai24.github.io/AI-Resume-Builder/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dheeraj Sai**
- GitHub: [@DheerajSai24](https://github.com/DheerajSai24)
- Repository: [AI-Resume-Builder](https://github.com/DheerajSai24/AI-Resume-Builder)

## 🙏 Acknowledgments

- Google Gemini AI for powerful content generation
- React team for the amazing framework
- Vite for blazing fast development experience

## 📞 Support

For support, please open an issue in the repository or contact the author:dheerajsai628@gmail.com

---

**Built with ❤️ using React, Vite, and Google Gemini AI**
