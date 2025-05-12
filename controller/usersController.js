import db  from '../models/index.js';

const { User } = db;
export const getAllUsers =  async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  export const getUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
  export const createUser = async (req, res) => {
    const {
      first_name,
      last_name,
      age,
      gender,
      email,
      password,
      phone,
      address,
    } = req.body;
  
    try {
      const newUser = await User.create({
        first_name,
        last_name,
        age,
        gender,
        email,
        password,
        phone,
        address,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Invalid input' });
    }
  }
  export const updateUser =async (req, res) => {
    const { first_name, lastname, age, gender, email, password, phone, address } =
      req.body;
  
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.first_name = first_name || user.first_name;
      user.last_name = lastname || user.last_name;
      user.age = age || user.age;
      user.gender = gender || user.gender;
      user.email = email || user.email;
      user.password = password || user.password;
      user.phone = phone || user.phone;
      user.address = address || user.address;
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Invalid input' });
    }
  }
  export const deleteUser =  async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.destroy();
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
