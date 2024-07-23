import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import qrCodeGenerator from "../models/qrGenerateFormSchema.js";

export const QRCodeGenerator = catchAsyncErrors(async (req, res, next) => {
  const { name, date, quantity, QrImageUrl } = req.body;
  if (
    !name ||
    !date ||
    !quantity
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const QRCode = await qrCodeGenerator.create({
    name, date, quantity, status: "Pending", QrImageUrl, DateDispatched: "", PendingItems: "", defaultQuantity: null
  });

  res.status(201).json({
    success: true,
    message: "QR Code Created Successfully!",
    QRCode
  });
});

export const getAllQRCodes = catchAsyncErrors(async (req, res, next) => {
  const QRCodesDetails = await qrCodeGenerator.find()
  res.status(200).json({
    success: true,
    QRCodesDetails,
  });
});

export const deleteQRCode = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const QRCode = await qrCodeGenerator.findById(id);
  if (!QRCode) {
    return next(new ErrorHandler("QRCode not found!", 404));
  }
  await qrCodeGenerator.deleteOne();
  res.status(200).json({
    success: true,
    message: "QR Code Deleted!",
  });
});

export const updateQrDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, date, quantity, QrImageUrl } = req.body;
  let QRCode = await qrCodeGenerator.findById(id);
  if (!QRCode) {
    return next(new ErrorHandler("QRCode not found!", 404));
  }

  QRCode = await qrCodeGenerator.findByIdAndUpdate(id, { name, date, quantity, QrImageUrl }, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Blog Updated!",
    QRCode,
  });
})

export const updateDispatchQrDetails = catchAsyncErrors(async (req, res, next) => {
  let {name, date, quantity} = req.body
  if (
    !name ||
    !date ||
    !quantity
  ) {
    return next(new ErrorHandler("Qr Details Not Found!", 400));
  }

  let randomNumber = Math.floor(Math.random() * 100)
  let qrCode = await qrCodeGenerator.updateOne({name, date, quantity}, {$set: { name, date, quantity, status: "Delivered", DateDispatched: new Date().toLocaleString().slice(0,9), defaultQuantity: randomNumber, PendingItems: "" }});

  res.status(200).json({
    success: true,
    qrCode,
  });
})

export const getSingleData = catchAsyncErrors(async (req, res, next) => {
  let { id } = req.params
  let qrData = await qrCodeGenerator.findById(id)
  if (!qrData) {
    return next(new ErrorHandler("Data not found!", 404))
  }
  res.status(200).json({
    success: true,
    qrData
  })
})

