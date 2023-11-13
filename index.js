const express = require('express')
const app = express()
const port = 3032

app.get('/', (req, res) => {
    res.send('Hell Everyone')
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})