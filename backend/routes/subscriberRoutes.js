const express = require('express');
const router = express.Router();
const { 
    createSubscriber, 
    getAllSubscribers, 
    getSubscriberById, 
    updateSubscriber, 
    deleteSubscriber, 
    unsubscribeSubscriber
} = require('../controllers/subscriberController');

router.post('/subscribe', createSubscriber);
router.get('/subscribers', getAllSubscribers);
router.get('/subscriber/:id', getSubscriberById);
router.put('/subscriber/:id', updateSubscriber);
router.delete('/subscriber/:id', deleteSubscriber);
router.post('/unsubscribe', unsubscribeSubscriber);

module.exports = router;
