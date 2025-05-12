import db from '../models/index.js';
import { compare } from 'bcrypt';
import { name } from 'ejs';
import jwt from 'jsonwebtoken';

const { User } = db;

export const createAccessToken = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({where:{ email }});
        if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı!" });
        
        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Şifre hatalı!" });
        const accessToken = jwt.sign({ 
            id: user.getDataValue("id"),
            role: user.getDataValue("role"),
            name: user.getDataValue("first_name") + " " + user.getDataValue("last_name"),
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });

        const refreshToken = jwt.sign({
            id: user.getDataValue("id"),
            role: user.getDataValue("role"),
            name: user.getDataValue("first_name") + " " + user.getDataValue("last_name"),

        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        // Assigning refresh token in http-only cookie 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'lax', secure: false, // geliştirme ortamı için yeniden düzenlendi ...
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ accessToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Bir hata oluştu!" });
    }
}
