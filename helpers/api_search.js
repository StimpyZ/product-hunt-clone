// Search endpoint
function search(req, res) {
    const term = req.query.q;
    res.send('<div class="results">You searched for: ' + term + '</div>');
}

module.exports = { search };
