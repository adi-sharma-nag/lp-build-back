// server.cjs
const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

// Serve static files from dist/
app.use(express.static(path.join(__dirname, 'dist')))

// Fallback: serve index.html for any unmatched route (SPA routing)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
