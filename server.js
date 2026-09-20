const express = require('express')
const { execFile } = require('node:child_process')

const app = express()
const port = 80

app.get('/run', (req, res) => {
    execFile('/usr/bin/uptime', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({
                error: error.message,
                stderr
            })
        }

        res.json({
            output: stdout.trim()
        })
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on http://0.0.0.0:${port}`)
})
