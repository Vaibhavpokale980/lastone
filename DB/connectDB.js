import mongoose from 'mongoose';

// connecting to database
const connectDB = async () => {
    const connectionUrl = process.env.DB_URI;
    mongoose.connect('mongodb+srv://careerhub:Vaibhav%401234@cluster0.2vvul.mongodb.net/careerhub?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
    mongoose.set('strictQuery', false);
};

export default connectDB;
