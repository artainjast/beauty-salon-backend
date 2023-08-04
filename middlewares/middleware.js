const jwt = require("jsonwebtoken");

const authenticateDashboardJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.DASHBOARD_AUTH_PRIVATE_KEY, (err, user) => {
      if (err) {
        res.status(403)
        res.send({
           backURL: '/user/login'
        });
        return;
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401)
    res.send({
      backURL:'/user/login'
    })
    return;
  }
};

const authenticateClientJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.CLIENT_AUTH_PRIVATE_KEY, (err, user) => {
      if (err) {
        res.status(403)
        res.send({
           backURL: '/user/login'
        });
        return;
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401)
    res.send({
      backURL:'/user/login'
    })
    return;
  }
};

const decodeCustomerToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_AUTH_PRIVATE_KEY);
    req.user = { customerId: decoded.customerId };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  authenticateDashboardJWT, 
  authenticateClientJWT,
  decodeCustomerToken
};