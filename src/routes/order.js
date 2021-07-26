const { requireSignIn, userMiddleware } = require("../shared");
const { addOrder, getOrder, getOrders } = require("../controllers/order");
const router = require("express").Router();

router.post("/addOrder", requireSignIn, userMiddleware, addOrder);
router.get("/getOrders", requireSignIn, userMiddleware, getOrders);
router.post("/getOrder", requireSignIn, userMiddleware, getOrder);

module.exports = router;