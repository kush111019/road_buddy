const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
  return accessToken;
};

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    return refreshToken;
  };

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { generateAccessToken, verifyRefreshToken,generateRefreshToken };
