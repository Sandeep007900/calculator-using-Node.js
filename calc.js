// calc.js
function calcHandler(req, res) {
  const body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    const params = new URLSearchParams(Buffer.concat(body).toString());
    const a = Number(params.get('first'));
    const b = Number(params.get('second'));
    const op = params.get('operation');

    if (isNaN(a) || isNaN(b)) {
      return renderError(res, 'Please enter valid numbers.');
    }

    let result;
    switch (op) {
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) return renderError(res, 'Cannot divide by zero.');
        result = a / b;
        break;
      default: // 'add'
        result = a + b;
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <!DOCTYPE html><html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Result</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoNw7+euYJo0E2sdjz2j3z0O1p2FfjrA9pVmmDGMN5t9UJ0"
          crossorigin="anonymous"
        />
      </head>
      <body class="d-flex align-items-center justify-content-center" style="min-height:100vh; background: linear-gradient(135deg, #f0f4f8, #d9e2ec);">
  <div class="card text-center shadow-lg" style="max-width:380px; width:100%; border-radius:12px; overflow:hidden;">
    <div class="card-header bg-primary text-white py-3">
      <h2 class="h4 mb-0">Calculation Result</h2>
    </div>
    <div class="card-body py-4">
      <p class="display-3 fw-bold text-secondary mb-4" style="letter-spacing:1px;">${result}</p>
      <div class="d-flex justify-content-center gap-3">
        <a href="/calculator" class="btn btn-outline-primary px-4 py-2">Try Again</a>
        <a href="/" class="btn btn-primary px-4 py-2">Home</a>
      </div>
    </div>
</body>
</html>
    `);
    res.end();
  });
}

function renderError(res, message) {
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Error</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoNw7+euYJo0E2sdjz2j3z0O1p2FfjrA9pVmmDGMN5t9UJ0"
        crossorigin="anonymous"
      />
    </head>
    <body class="bg-light d-flex align-items-center justify-content-center" style="height:100vh">
      <div class="alert alert-danger">${message}</div>
      <div class="text-center">
        <a href="/calculator" class="btn btn-outline-secondary">Back</a>
      </div>
    </body></html>
  `);
  res.end();
}

module.exports = { calcHandler };
