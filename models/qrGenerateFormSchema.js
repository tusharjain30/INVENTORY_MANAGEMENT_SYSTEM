import mongoose from "mongoose";

const qrGenerateFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required!"],
    },
    date: {
        type: String,
        required: [true, "Date is Required!"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is Required!"],
    },
    QrImageUrl: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Delivered"]
    },
    DateDispatched: {
        type: String
    },
    PendingItems: {
        type: String
    },
    defaultQuantity: {
        type: Number
    }
});

const qrCodeGenerator = mongoose.model("QrCodeDetail", qrGenerateFormSchema)

export default qrCodeGenerator