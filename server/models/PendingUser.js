import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

export default PendingUser;
