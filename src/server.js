import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/api.js";

const app = express();

dotenv.config({ quiet: true });

app.use(cors());

app.use(express.json());

app.use("/", routes);

// Global error handler (NO CRASHES)
app.use((err, req, res, next) => {
  console.error(err);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: "Invalid JSON format",
    });
  }

  // Default error
  res.status(500).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL,
    error: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\n🚀 ================================');
  console.log('   BFHL API Server Started');
  console.log('================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`📧 Email: ${process.env.OFFICIAL_EMAIL || 'Not configured'}`);
  console.log(`🤖 AI: ${process.env.GROQ_API_KEY ? 'Configured ✓' : 'Not configured ✗'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n📡 Available Endpoints:');
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   POST http://localhost:${PORT}/bfhl`);
  console.log('\n✅ Server ready to accept requests');
  console.log('================================\n');
});
