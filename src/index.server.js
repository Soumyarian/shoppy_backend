const express = require('express');
const path = require('path');
const app = express();
const env = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");

const adminAuthRoutes = require('./routes/admin/auth');
const userAuthRoutes = require('./routes/auth');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/products');
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const cartRoutes = require("./routes/cart");
const addressRoutes = require('./routes/address');
const orderRoutes = require("./routes/order");
const adminOrderRoutes = require("./routes/admin/order");

//env variable setup
env.config();
app.use(cors());
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userAuthRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', cartRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoutes);

mongoose.connect(`mongodb+srv://soumyaa:${process.env.MONGO_DB_PASSWORD}@cluster0.3uirl.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(() => {
    app.listen(process.env.PORT, () => {
        console.log("server is running on 8000")
    })
})