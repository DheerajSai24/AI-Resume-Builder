# 🤖 AI Resume Builder

A powerful AI-powered resume builder that generates personalized cover letters, optimizes resume content, provides keyword analysis, and estimates ATS (Applicant Tracking System) scores using Google's Gemini AI.

![AI Resume Builder](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF)
![Gemini AI](https://img.shields.io/badge/Gemini-2.0--flash-4285F4)

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
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Dheeraj Sai**

## 🙏 Acknowledgments

- Google Gemini AI for powerful content generation
- React team for the amazing framework
- Vite for blazing fast development experience

## 📞 Support

For support, please open an issue in the repository or contact the author.

---

**Built with ❤️ using React, Vite, and Google Gemini AI**
