const express = require('express');
const router = express.Router();

const ideas = [
    {
        id: 1,
        text: 'Positive Newsletter, a newsletter that only shared positive, uplifting news',
        tag: 'Technology',
        username: 'TonyStark',
        date: '2022-01-02',
    },
    {
        id: 2,
        text: 'Milk cartons that turn a different color the older your milk is getting',
        tag: 'Inventions',
        username: 'SteveRogers',
        date: '2022-01-02',
    },
    {
        id: 3,
        text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
        tag: 'Software',
        username: 'BruceBanner',
        date: '2022-01-02',
    },
];

// Get all ideas
router.get('/', (_, res) => {
    res.json({ success: true, data: ideas });
})

// Get idea by id
router.get('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res
            .status(404)
            .json({ success: false, error: 'Resource not found' });
    } else {
        res.json({ success: true, data: idea });
    }
})

// Add an idea
router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0, 10)
    };
    
    ideas.push(idea);
    
    res.status(201).json({ success: true, data: idea });
})

module.exports = router;