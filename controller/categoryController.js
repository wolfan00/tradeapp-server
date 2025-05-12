import db from '../models/index.js';

const { Category } = db;

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getCategoriesById = async (req,res) =>{
  try {
    const categoryName = await Category.findByPk(req.params.id)
    res.status(200).json(categoryName)
  } catch (error) {
    console.error(error)
    res.status(500).json({message : "Server ERROR"})
  }
} 