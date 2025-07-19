// handler.js
const { calcHandler } = require('./calc');

function requestHandler(req, res) {
  const url = req.url.toLowerCase();
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(homePage());
    return res.end();
  }
  if (url === '/calculator') {
    res.setHeader('Content-Type', 'text/html');
    res.write(calculatorPage());
    return res.end();
  }
  if (url === '/calculator-sum' && req.method === 'POST') {
    return calcHandler(req, res);
  }
  // 404
  res.writeHead(404, {'Content-Type':'text/html'});
  res.end(notFoundPage());
}

function homePage() {
  return `
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Welcome</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeo..."
        crossorigin="anonymous"
      />
    </head>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height:100vh">
      <div class="card text-center shadow" style="max-width:360px;width:100%">
        <div class="card-body">
          <h1 class="mb-3">Calculator</h1>
          <a href="/calculator" class="btn btn-primary">Open Calculator</a>
        </div>
      </div>
    </body></html>
  `;
}

function calculatorPage() {
  return `
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Calculator</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeo..."
        crossorigin="anonymous"
      />
    </head>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height:100vh">
      <div class="card shadow" style="max-width:400px;width:100%">
        <div class="card-body">
          <h2 class="text-center mb-4">Advanced Calculator</h2>
          <form action="/calculator-sum" method="POST" class="row g-3">
            <div class="col-6">
              <input name="first" type="number" class="form-control" placeholder="First" required>
            </div>
            <div class="col-6">
              <input name="second" type="number" class="form-control" placeholder="Second" required>
            </div>
            <div class="col-12">
              <select name="operation" class="form-select" required>
                <option value="add">Add (+)</option>
                <option value="subtract">Subtract (−)</option>
                <option value="multiply">Multiply (×)</option>
                <option value="divide">Divide (÷)</option>
              </select>
            </div>
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-success w-100">Compute</button>
            </div>
          </form>
        </div>
      </div>
    </body></html>
  `;
}

function notFoundPage() {
  return `
    <!DOCTYPE html><html lang="en">
    <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>404</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet" integrity="sha384-ENjdO4Dr2bkBIFxQpeo..." crossorigin="anonymous"/>
    </head>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height:100vh">
      <div class="text-center">
        <h1 class="text-danger">404</h1>
        <p>Page not found</p>
        <a href="/" class="btn btn-outline-primary">Home</a>
      </div>
    </body></html>
  `;
}

module.exports = { requestHandler };
