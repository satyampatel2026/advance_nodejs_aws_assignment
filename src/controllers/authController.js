const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required",
    });
  }

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Register SELECT error:", err);
        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      try {
        const hash = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hash],
          (err, result) => {
            if (err) {
              console.error("Register INSERT error:", err);

              return res.status(500).json({
                success: false,
                message: "Database error",
              });
            }

            return res.status(201).json({
              success: true,
              message: "User registered successfully",
            });
          }
        );
      } catch (error) {
        console.error("Password hashing error:", error);

        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  db.query(
    "SELECT id, name, email, password FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err) {
        console.error("Login SELECT error:", err);

        return res.status(500).json({
          success: false,
          message: "Database error",
        });
      }

      if (rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const user = rows[0];

      try {
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES || "1d",
          }
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      } catch (error) {
        console.error("Login error:", error);
         await putMetric("5xxErrorCount");
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  );
};

module.exports = {
  register,
  login,
};
