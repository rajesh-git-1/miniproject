import express from 'express';
import Inventory from '../models/Inventory.js';
import InventoryCategory from '../models/InventoryCategory.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

const adminOnly = [auth, (req, res, next) => {
    if (req.user && req.user.role === 'Admin') return next();
    return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
}];

// ─── CATEGORY ENDPOINTS ───

router.get('/categories', auth, async (req, res) => {
    try {
        const categories = await InventoryCategory.find().sort({ createdAt: -1 });
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/categories', adminOnly, async (req, res) => {
    try {
        const newCat = new InventoryCategory(req.body);
        await newCat.save();
        res.json({ success: true, data: newCat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/categories/:id', adminOnly, async (req, res) => {
    try {
        const updatedCat = await InventoryCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updatedCat });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/categories/:id', adminOnly, async (req, res) => {
    try {
        await InventoryCategory.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─── ITEM ENDPOINTS ───

router.get('/', auth, async (req, res) => {
    try {
        const items = await Inventory.find().sort({ createdAt: -1 });
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/', adminOnly, async (req, res) => {
    try {
        const itemId = 'INV-' + Math.floor(1000 + Math.random() * 9000);
        const { quantity = 0, inUse = 0, threshold = 10, good, name, category, unit } = req.body;
        
        // When initially adding, all items are 'good' conditionally unless specified
        const newItem = new Inventory({
            itemId, name, category, unit: unit || 'pcs',
            quantity: Number(quantity),
            threshold: Number(threshold),
            inUse: Number(inUse),
            good: good !== undefined ? Number(good) : (Number(quantity) - Number(inUse)),
            bad: 0,
            maintenance: 0
        });
        
        // Status checks
        if (newItem.good <= 0) newItem.status = 'Out of Stock';
        else if (newItem.good <= newItem.threshold) newItem.status = 'Low Stock';
        else newItem.status = 'In Stock';
        
        await newItem.save();
        res.json({ success: true, data: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.put('/:id', adminOnly, async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

        const { quantity, inUse, good, bad, maintenance, threshold, name, category, unit } = req.body;

        if (name !== undefined) item.name = name;
        if (category !== undefined) item.category = category;
        if (unit !== undefined) item.unit = unit;

        if (threshold !== undefined) item.threshold = Number(threshold);
        if (quantity !== undefined) item.quantity = Number(quantity); // Strictly from user input
        if (inUse !== undefined) item.inUse = Number(inUse);
        if (good !== undefined) item.good = Number(good); // Now editable directly!
        if (bad !== undefined) item.bad = Number(bad);
        if (maintenance !== undefined) item.maintenance = Number(maintenance);

        if (item.good < 0) {
            return res.status(400).json({ success: false, message: 'Invalid condition allocation: Bad + Maintenance exceeds Total Quantity' });
        }

        // Status checks based purely on good condition items vs threshold
        if (item.good <= 0 && item.quantity > 0) item.status = 'Out of Stock'; // No good ones left
        else if (item.quantity === 0) item.status = 'Out of Stock';
        else if (item.good <= item.threshold) item.status = 'Low Stock';
        else item.status = 'In Stock';

        await item.save();
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/:id', adminOnly, async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;