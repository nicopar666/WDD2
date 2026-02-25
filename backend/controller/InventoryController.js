import Inventory from '../models/Inventory.js';

// Get all inventory items
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { productName, description, quantity, price } = req.body;

  if (!productName || !quantity || !price) {
    return res.status(400).json({ 
      message: "Product name, quantity, and price are required" 
    });
  }

  try {
    const newProduct = new Inventory({
      productName,
      description: description || "",
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { getInventory, addProduct };
