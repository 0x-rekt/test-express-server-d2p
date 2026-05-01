// This file contains intentional OWASP vulnerabilities for security scanning

import express from 'express';

export function createVulnerableEndpoints(app: express.Express) {
  // OWASP: SQL Injection vulnerability
  app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    // Dangerous: User input directly in query without parameterization
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    console.log("Executing query:", query);
    res.json({ message: "User fetched" });
  });

  // OWASP: Hardcoded credentials
  app.post('/api/authenticate', (req, res) => {
    const USERNAME = 'admin';
    const PASSWORD = 'Password123!'; // Hardcoded password - OWASP A02
    
    if (req.body.username === USERNAME && req.body.password === PASSWORD) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hardcoded.token';
      res.json({ token });
    }
  });

  // OWASP: Insecure direct object references
  app.get('/api/data/:userId', (req, res) => {
    // No authorization check - direct access to user data
    const userData = {
      id: req.params.userId,
      email: 'user@example.com',
      ssn: '123-45-6789' // Exposing sensitive data
    };
    res.json(userData);
  });

  // OWASP: Path traversal vulnerability
  app.get('/api/file/:filename', (req, res) => {
    const filename = req.params.filename;
    // Dangerous: No validation of filepath
    const filepath = `/app/files/${filename}`;
    console.log("Reading file:", filepath);
    res.json({ file: "content" });
  });
}

// API Key exposed in code
export const SECRET_API_KEY = 'sk-live-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u';
export const DATABASE_URI = 'mongodb+srv://admin:password123@db.mongodb.net/myapp?retryWrites=true&w=majority';
