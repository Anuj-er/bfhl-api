import express from "express";
import { fibonacci, primes, lcm, hcf } from "../utils/utils.js";
import dotenv from "dotenv";
import { askAI } from "../utils/ai.js";

dotenv.config({ quiet: true });

const router = express.Router();
const EMAIL = process.env.OFFICIAL_EMAIL;

// GET /health
router.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// POST /bfhl
router.post("/bfhl", async (req, res) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Exactly one key required"
      });
    }

    const key = keys[0];
    const value = req.body[key];

    let data;

    switch (key) {
      case "fibonacci":
        if (!Number.isInteger(value))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: fibonacci requires an integer"
          });
        if (value < 0 || value > 1000)
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: fibonacci value must be between 0 and 1000"
          });
        data = fibonacci(value);
        break;

      case "prime":
        if (!Array.isArray(value))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: prime requires an array"
          });
        if (value.length > 1000)
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array size must not exceed 1000"
          });
        if (!value.every(n => Number.isInteger(n) && n >= 0))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: prime array must contain only non-negative integers"
          });
        if (value.some(n => n > 10000000))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array elements must not exceed 10,000,000"
          });
        data = primes(value);
        break;

      case "lcm":
        if (!Array.isArray(value))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: lcm requires an array"
          });
        if (value.length === 0 || value.length > 1000)
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array size must be between 1 and 1000"
          });
        if (!value.every(n => Number.isInteger(n) && n > 0))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: lcm array must contain only positive integers"
          });
        if (value.some(n => n > 10000000))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array elements must not exceed 10,000,000"
          });
        data = lcm(value);
        break;

      case "hcf":
        if (!Array.isArray(value))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: hcf requires an array"
          });
        if (value.length === 0 || value.length > 1000)
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array size must be between 1 and 1000"
          });
        if (!value.every(n => Number.isInteger(n) && n > 0))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: hcf array must contain only positive integers"
          });
        if (value.some(n => n > 10000000))
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: array elements must not exceed 10,000,000"
          });
        data = hcf(value);
        break;

      case "AI":
        if (typeof value !== "string")
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: AI requires a string"
          });
        if (value.length === 0 || value.length > 500)
          return res.status(400).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: question length must be between 1 and 500 characters"
          });
        // Security: Block prompt injection patterns
        const dangerousPatterns = [
          /ignore.*previous.*instruction/i,
          /system.*prompt/i,
          /api.*key/i,
          /<script/i,
          /javascript:/i,
          /on(load|error|click)=/i,
          /(drop|delete|insert|update).*table/i,
          /repeat.*\d{3,}/i  // Block "repeat X 1000 times" attacks
        ];
        if (dangerousPatterns.some(pattern => pattern.test(value)))
          return res.status(403).json({
            is_success: false,
            official_email: EMAIL,
            error: "Invalid input: potentially malicious content detected"
          });
        data = await askAI(value);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: EMAIL,
          error: "Invalid key: must be one of fibonacci, prime, lcm, hcf, or AI"
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      is_success: false,
      official_email: EMAIL,
      error: "Internal server error"
    });
  }
});

export default router;