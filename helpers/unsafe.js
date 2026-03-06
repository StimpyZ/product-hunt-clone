import { Router } from "express";
import expressJwt from 'express-jwt'

// F034: Predictable Math.random used for security
export const denyAll = () => expressJwt({ secret: '' + Math.random() })

function unsafe_route(req, res) {
  let key = Math.random().toString();
  res.cookie("rememberKey", key);
  res.json({ ok: true });
}

// F143: eval with untrusted input
function insec_use_of_eval(req) {
    let input = req.query.input;
    try {
        eval('alert("Your query string was ' + unescape(document.location.search) + '");');
        eval(req.query.input)
    }
    catch(err) {
        console.log(err);
    }
}

// F021: XSS - reflected
function handleSearch(req, res) {
    const query = req.query.q;
    res.send('<h1>Results for: ' + query + '</h1>');
}
