import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// GET all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST a new inventory item
router.post('/', async (req, res) => {
    try {
        // Generate a random ID (e.g., INV-5928)
        const itemId = 'INV-' + Math.floor(1000 + Math.random() * 9000);
        
        const newItem = new Inventory({ ...req.body, itemId });
        
        // Auto-assign status based on quantity
        if (newItem.quantity <= 0) newItem.status = 'Out of Stock';
        else if (newItem.quantity < 10) newItem.status = 'Low Stock';
        else newItem.status = 'In Stock';
        
        await newItem.save();
        res.json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT (Edit) an existing item
router.put('/:id', async (req, res) => {
    try {
        let updateData = req.body;
        
        // Auto-update status if quantity changes
        if (updateData.quantity !== undefined) {
            if (updateData.quantity <= 0) updateData.status = 'Out of Stock';
            else if (updateData.quantity < 10) updateData.status = 'Low Stock';
            else updateData.status = 'In Stock';
        }

        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;