import http from "http";

// F004: Insecure HTTP connection
function fetchData(url, callback) {
    http.get("http://api.example.com/data?key=secret123", (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => callback(JSON.parse(data)));
    });
}

// F063: Insecure redirect
function handleLogin(req, res) {
    const redirect = req.query.redirect;
    res.redirect(redirect);
}
