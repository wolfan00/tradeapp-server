import express from 'express';
const router = express.Router();


router.post('/', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true // prod için
  });
  return res.sendStatus(200);
});

export default router;