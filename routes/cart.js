const express = require('express')
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../model/product')
const User = require('../model/user');

router.get('/user/:userId/cart', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        res.render('cart/showCart', { userCart: user.cart });
    }
    catch (e) {
        req.flash('error', 'Unable to Add this product');
        res.render('error');
    }
})

router.post('/user/:id/cart', isLoggedIn, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const user = req.user;

        user.cart.push(product);
        await user.save();
        req.flash('success', 'Added to cart successfully')
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch (e) {
        req.flash('error', 'Unable to get the cart at this moment');
        res.render('error');
    }
})

router.delete('/user/:userid/cart/:id', async (req, res) => {
    const { userid, id } = req.params;
    await User.findByIdAndUpdate(userid, { $pull: { cart: id } });
    req.flash('success', 'Item is Remove from your Cart')
    res.redirect(`/user/${req.user._id}/cart`);
})



//payment Routes
router.get('/cart/payment', (req, res) => {
    // req.flash('success', 'Safe and Secure Pay');
    res.render('payment/payment');
})

// contact Route
router.get('/cart/contact', (req, res) => {
    res.render('payment/contact');
})






module.exports = router;