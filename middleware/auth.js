import jwt from "jsonwebtoken";
const { verify } = jwt;

export const auth = (req, res, next) => {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized - Token yok' });
    }

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token' });
        }

        req.user = decoded; // { userId, role }
        next(); 
    });
};
// Yetkilendirme: sadece admin erişimi
export const authAdmin = (req, res, next) => {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Token yok' });
    }

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Geçersiz token' });
        }

        if (decoded.role !== 'Admin') {
            return res.status(403).json({ message: `Bu işlem için admin yetkisi gerekli! Senin rolün: ${decoded.role}` });
        }

        req.user = decoded;
        next();
    });
};


