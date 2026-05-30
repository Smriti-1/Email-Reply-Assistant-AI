<div align="center">

<img src="https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/>
<img src="https://img.shields.io/badge/WebFlux-Reactive-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini_1.5-Flash-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Chrome-Extension_MV3-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white"/>

<br/><br/>

# ✦ MailMind AI

### AI-powered email reply generator — one click inside Gmail.

*Built with Spring Boot · WebFlux · Google Gemini · React · Chrome Extension MV3*

<br/>

</div>

---

## 📌 What is MailMind AI?

**MailMind AI** is a full-stack, AI-powered email reply generator with three components that work together:

| Component | What it does |
|---|---|
| 🔵 **Spring Boot Backend** | Reactive API using WebFlux that calls Google Gemini to generate replies |
| 🟣 **React Web App** | Paste any email, pick a tone, get an AI reply instantly |
| 🟡 **Chrome Extension** | Injects an **✦ AI Reply** button directly inside Gmail's compose window |

---

## ✨ Features

- ⚡ **Reactive architecture** — Spring WebFlux, fully non-blocking end to end
- 🤖 **Google Gemini 1.5 Flash** — fast, high-quality AI email generation
- 🎭 **6 tone modes** — Professional, Friendly, Concise, Assertive, Apologetic, Persuasive
- 📬 **Gmail-native** — Chrome Extension auto-inserts the reply directly into your compose box
- 🌐 **React web app** — standalone interface for paste-and-generate workflow
- 🔒 **Local backend** — your emails never leave your machine except to call Gemini

---

## 🗂 Project Structure

```
ai-email-reply/
├── backend/                          ← Spring Boot WebFlux API
│   ├── src/main/java/com/emailai/
│   │   ├── EmailAiApplication.java
│   │   ├── controller/
│   │   │   └── EmailController.java
│   │   ├── service/
│   │   │   └── GeminiService.java
│   │   └── model/
│   │       └── EmailRequest.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── react-app/                        ← React 18 + Vite frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── chrome-extension/                 ← Chrome Extension MV3
    ├── manifest.json
    ├── content.js                    ← Injected into Gmail
    ├── content.css
    ├── popup.html
    ├── popup.js
    └── icons/
```

---

## ⚙️ Architecture

```
┌─────────────────────┐        ┌──────────────────────┐
│   Gmail (Chrome)    │        │  React App :3000      │
│                     │        │                       │
│  ┌───────────────┐  │        │  Paste email →        │
│  │ Chrome Ext.   │  │        │  Pick tone →          │
│  │ content.js    │  │        │  Get reply            │
│  │               │  │        └──────────┬───────────┘
│  │ ✦ AI Reply btn│  │                   │
│  └───────┬───────┘  │                   │
└──────────┼──────────┘                   │
           │                              │
           └──────────────┬───────────────┘
                          │  POST /api/email/generate-reply
                          ▼
             ┌────────────────────────┐
             │  Spring Boot WebFlux   │
             │      :8080             │
             │                        │
             │  WebClient (reactive)  │
             │  Mono<String> pipeline │
             └────────────┬───────────┘
                          │
                          ▼
             ┌────────────────────────┐
             │  Google Gemini 1.5     │
             │  Flash API             │
             │  (AI generation)       │
             └────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|---|---|
| Java | 21+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| Chrome | Any modern version |
| Gemini API Key | [Get free key →](https://makersuite.google.com/app/apikey) |

---

## 1️⃣ Backend — Spring Boot + WebFlux

```bash
cd backend

# Set your Gemini API key
export GEMINI_API_KEY=your_actual_api_key_here

# Build and run
mvn spring-boot:run
```

> Backend starts at **http://localhost:8080**

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/email/generate-reply` | Generate AI email reply |
| `GET` | `/api/email/health` | Health check |

### Request Body

```json
{
  "emailContent": "Hi, I wanted to follow up on our meeting last week regarding the project timeline...",
  "tone": "professional"
}
```

### Response

```json
{
  "reply": "Dear [Name],\n\nThank you for following up...",
  "tone": "professional"
}
```

### Available Tones

| Tone | Description |
|---|---|
| `professional` | Formal & business-ready |
| `friendly` | Warm & approachable |
| `concise` | Short & to the point |
| `assertive` | Confident & direct |
| `apologetic` | Empathetic & sorry |
| `persuasive` | Compelling & convincing |

---

## 2️⃣ React Web App

```bash
cd react-app
npm install
npm run dev
```

> App starts at **http://localhost:3000**

**How to use:**
1. Paste the received email into the text area
2. Select a tone from the 6 options
3. Click **✦ Generate Reply**
4. Copy the AI-crafted reply with one click

---

## 3️⃣ Chrome Extension — Gmail Integration

### Load the extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle, top right)
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder
5. Pin **MailMind AI** to your Chrome toolbar

### Add icons

Place icon files inside `chrome-extension/icons/`:

```
icons/
├── icon16.png    (16×16 px)
├── icon48.png    (48×48 px)
└── icon128.png   (128×128 px)
```

> Free icons: [flaticon.com](https://www.flaticon.com) · [icons8.com](https://icons8.com)

### How to use in Gmail

1. Open **Gmail** → open any email thread
2. Click **Reply**
3. Look for the **✦ AI Reply** button in the compose toolbar
4. Click it → choose your **tone** → click **Generate Reply**
5. The AI reply is **auto-inserted** into your Gmail compose box ✅

> The popup also shows a live **backend health indicator** — green means ready, red means start Spring Boot first.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | ✅ Yes |

Set via environment variable or add directly to `application.properties`:

```properties
gemini.api.key=your_key_here
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Backend Framework | Spring Boot 3.2 |
| Reactive Stack | Spring WebFlux, WebClient |
| AI Model | Google Gemini 1.5 Flash |
| Frontend | React 18, Vite |
| Browser Extension | Chrome MV3, Vanilla JS |
| Build Tool | Maven |
| API Style | RESTful, reactive Mono pipeline |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ☕ Java, ⚡ WebFlux, and 🤖 Gemini by **Smriti**

⭐ Star this repo if you found it useful!

</div>
