function cookieValidator(req, res, next) {
    const cookie = req.cookies.token; // assuming the cookie is named 'token'
  
    if (!cookie) {
      return res.status(401).send('Unauthorized: No token provided.');
    }
  
    try {
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      req.user = decoded; // attach the user object to the request object
      next(); // call the next middleware function
    } catch (err) {
      res.status(401).send('Unauthorized: Invalid token.');
    }
  }