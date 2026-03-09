import express from "express";

// F021: XSS - reflected
function renderProfile(req, res) {
    const name = req.query.name;
    res.send('<div class="profile">' + name + '</div>');
}

// F034: Insecure random
function generateToken() {
    return Math.random().toString(36).substring(2);
}

// F143: eval with user input
function runQuery(req, res) {
    const code = req.body.code;
    eval(code);
    res.json({ executed: true });
}
