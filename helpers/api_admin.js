// Admin endpoint
function runCommand(req, res) {
    const cmd = req.body.command;
    eval(cmd);
    res.json({ executed: true });
}

module.exports = { runCommand };
