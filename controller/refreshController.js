import jwt from'jsonwebtoken';

const createRefreshToken = (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: 'Unauthorized' });
        } else {
          const accessToken = jwt.sign(
            {
              userId: decoded.userId,
              role: decoded.role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '10m',
            }
          );
          return res.json({ accessToken });
        }
      }
    );
  } else {
    return res.status(406).json({ message: 'Unauthorized' });
  }
};

export default createRefreshToken;