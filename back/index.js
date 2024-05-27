const express = require('express');
const app = express();
const port = 3000;

const { getAllActivities, getAllAccommodations, getAllFood, getAll } = require('./sparql');
const imageUrls = require('../front/js/imagen.json');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/v1/entity', async (req, res) => {
    try {
        const entity = await getAll();
        const entityWithImageUrls = entity.map((item, index) => ({
            ...item,
            newImageUrl: imageUrls.individual[index] 
        }));
        res.json(entityWithImageUrls);
    } catch (error) {
        console.error('Error fetching entity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/v1/activities', async (req, res) => {
    try {
        const activities = await getAllActivities();
        const activitiesWithImageUrls = activities.map((activity, index) => ({
            ...activity,
            newImageUrl: imageUrls.activities[index] 
        }));
        res.json(activitiesWithImageUrls);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/v1/accommodations', async (req, res) => {
    try {
        const accommodations = await getAllAccommodations();
        const accommodationsWithImageUrls = accommodations.map((accommodation, index) => ({
            ...accommodation,
            newImageUrl: imageUrls.accommodations[index] 
        }));
        res.json(accommodationsWithImageUrls);
    } catch (error) {
        console.error('Error fetching accommodations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/v1/food', async (req, res) => {
    try {
        const food = await getAllFood();
        const foodWithImageUrls = food.map((foodItem, index) => ({
            ...foodItem,
            newImageUrl: imageUrls.food[index] 
        }));
        res.json(foodWithImageUrls);
    } catch (error) {
        console.error('Error fetching food:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});