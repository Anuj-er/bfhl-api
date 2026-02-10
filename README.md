# 🚀 BFHL API - Bajaj Finserv Health Qualifier

**A Production-Grade REST API for Mathematical Operations & AI Integration**

---

## 📋 About

BFHL API is a robust REST API built with **Express.js** that performs mathematical operations (Fibonacci, Prime filtering, LCM, HCF) and integrates **Groq AI** for intelligent question answering.

**Developed by:** Anuj Kumar  
**Email:** anuj1699.be23@chitkara.edu.in  
**Institution:** Chitkara University

---

## ✨ Features

### 🔢 Mathematical Operations
- **Fibonacci Generator**: Generate Fibonacci sequences (max 1,000 elements)
- **Prime Filtering**: Extract prime numbers from arrays
- **LCM Calculator**: Compute Least Common Multiple with overflow protection
- **HCF/GCD Calculator**: Find Greatest Common Divisor

### 🤖 AI Integration
- **Groq AI API**: Single-word intelligent responses (Llama 3.3 70B)
- **Free Tier**: Generous free usage limits
- **Error handling**: Graceful fallback on AI failures
- **Security**: Prompt injection prevention
- **No Geographic Restrictions**: Works globally

### 🔒 Security Features
- **Input Validation**: Comprehensive type and range checking
- **Rate Limiting**: 100 requests per minute per IP
- **CORS Configuration**: Configurable allowed origins
- **Prompt Injection Prevention**: 8+ malicious pattern detection
- **XSS & SQL Injection Blocking**: Security guardrails
- **Overflow Protection**: Safe integer operations

---

## 🛠️ Tech Stack

- **Runtime**: Node.js 20.x
- **Framework**: Express.js 5.x
- **AI Model**: Llama 3.3 70B (Groq)
- **Middleware**: CORS, Dotenv

---

## 📦 Installation

### Prerequisites
- Node.js v14+
- npm v6+
- Groq API Key ([Get it FREE here](https://console.groq.com))

### Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/bfhl-api
cd bfhl-api

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your actual values
```

### Environment Variables

Create a `.env` file:

```env
PORT=3000
OFFICIAL_EMAIL=anuj1699.be23@chitkara.edu.in
GROQ_API_KEY=your_actual_groq_api_key
ALLOWED_ORIGINS=*
```

### Start Server

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

✅ Server running at `http://localhost:3000`

---

## 📡 API Endpoints

### 1️⃣ Health Check

```http
GET /health
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in"
}
```

### 2️⃣ Main API Endpoint

```http
POST /bfhl
Content-Type: application/json
```

---

## 🎯 Operation Examples

### Fibonacci

**Request:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### Prime Filtering

**Request:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 4, 7, 9, 11]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

### LCM Calculator

**Request:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "data": 72
}
```

### HCF/GCD Calculator

**Request:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24, 36, 60]}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "data": 12
}
```

### AI Endpoint

**Request:**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of India?"}'
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "data": "Delhi"
}
```

---

## ⚠️ Error Handling

### Error Response Structure

```json
{
  "is_success": false,
  "official_email": "anuj1699.be23@chitkara.edu.in",
  "error": "Error message description"
}
```

### Common HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 400 | Bad Request (invalid input) |
| 403 | Forbidden (malicious content detected) |
| 429 | Too Many Requests (rate limit exceeded) |
| 500 | Internal Server Error |

---

## 🔒 Input Validation Rules

| Operation | Input Type | Min | Max | Notes |
|-----------|------------|-----|-----|-------|
| `fibonacci` | Integer | 0 | 1,000 | Generates n numbers |
| `prime` | Integer Array | 1 element | 1,000 elements | Each ≤ 10M, non-negative |
| `lcm` | Integer Array | 1 element | 1,000 elements | Positive integers ≤ 10M |
| `hcf` | Integer Array | 1 element | 1,000 elements | Positive integers ≤ 10M |
| `AI` | String | 1 char | 500 chars | No injection patterns |

---

## 🛡️ Security Features

### Rate Limiting
- **100 requests per minute** per IP address
- Returns HTTP 429 when exceeded

### Prompt Injection Prevention
Automatically blocks patterns like:
- `ignore previous instructions`
- `system prompt`
- `api key`
- `<script>`, `javascript:`
- `DROP TABLE`, `DELETE FROM`
- `repeat X 1000 times`

### CORS Configuration
- Configurable via `ALLOWED_ORIGINS` environment variable
- Default: Allow all origins (`*`)
- Production: Set specific domains

---

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Railway

```bash
npm install -g railway
railway up
```

### Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

**Environment Variables Required:**
- `PORT`
- `OFFICIAL_EMAIL`
- `GROQ_API_KEY`
- `ALLOWED_ORIGINS` (optional)

---

## 📝 Project Structure

```
bfhl-api/
├── src/
│   ├── server.js          # Express app & middleware
│   ├── routes/
│   │   └── api.js         # API endpoints
│   └── utils/
│       ├── utils.js       # Math operations
│       └── ai.js          # Groq AI integration
├── .env                   # Environment variables
├── .env.example           # Example configuration
├── package.json           # Dependencies
└── README.md              # Documentation
```

---

## 📋 Requirements Met

- ✅ All 5 operations implemented (fibonacci, prime, lcm, hcf, AI)
- ✅ Strict API response structure
- ✅ Correct HTTP status codes
- ✅ Robust input validation
- ✅ Graceful error handling (no crashes)
- ✅ Security guardrails
- ✅ Boundary condition handling
- ✅ Production-ready code quality

---

## 👨‍💻 Author

**Anuj Kumar**  
📧 Email: anuj1699.be23@chitkara.edu.in  
🎓 Institution: Chitkara University  
🏆 Challenge: Bajaj Finserv Health Qualifier 2026

---

## 📄 License

MIT License - Free to use for educational purposes.

---

## 🙏 Acknowledgments

- Groq for fast AI inference with free tier
- Meta for Llama 3.3 model
- Express.js community
- Chitkara University

---