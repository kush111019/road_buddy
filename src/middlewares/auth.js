const jwt = require('jsonwebtoken');
const { verifyRefreshToken, generateAccessToken } = require('../utils/generateToken');

const authMiddleware = async (req, res, next) => {
  // Get the token from the request headers
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Add user information to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    // If the access token is expired, try to refresh it
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.headers['x-refresh-token'];

      try {
        // Verify the refresh token
        const decodedRefreshToken = await verifyRefreshToken(refreshToken);

        // Generate a new access token
        const newAccessToken = generateAccessToken(decodedRefreshToken.user);

        // Add user information to the request object
        req.user = decodedRefreshToken.user;

        // Attach the new access token to the response headers
        res.setHeader('Authorization', newAccessToken);
        next();
      } catch (refreshErr) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid access token' });
    }
  }
};

module.exports = {authMiddleware};
