// app.js
const http = require('http');
const { requestHandler } = require('./handler');

const PORT = process.env.PORT || 3000;

http.createServer(requestHandler).listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
