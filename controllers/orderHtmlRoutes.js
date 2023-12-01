const { Order, User, Listing } = require('../models')
const router = require('express').Router();
router.get('/:id', async (req, res) => {
    try {
        const orderData = await Order.findAll({

            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
            include: [User, Listing]
        });
        if (!orderData) {
            return res.status(404).json({ message: 'Orders Empty' });
        }
        const order = orderData.map((o) => o.get({ plain: true }));
        console.log(order)
        res.render('orders', {
            order, logged_in: req.session.logged_in
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error finding Orders' });
    }
}
);

module.exports = router;