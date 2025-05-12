import db from '../models/index.js';
import bcrypt from 'bcrypt';

const { User } = db;

const signUpUser = async (req, res) => {
    try {
        const { first_name,last_name,email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'kullanıcı zaten kayıtlı' });
        }
        
        const hashedPassword = await bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            first_name: first_name,
            last_name: last_name,
            email:email,
            password: hashedPassword,
        });
        res.status(201).json("Kullanıcı oluşturuldu.");
    } catch (error) {
        res.status(500).json({ message: 'Server error' }+error);
    }
}

export default signUpUser;