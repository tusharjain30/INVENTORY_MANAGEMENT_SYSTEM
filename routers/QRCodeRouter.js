import express from "express"
import { deleteQRCode, getAllQRCodes, getSingleData, QRCodeGenerator, updateDispatchQrDetails, updateQrDetails } from "../controllers/QrFormController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router()

router.route("/generateQrCode").post(isAuthenticated, QRCodeGenerator);
router.route("/getQrCodes").get(getAllQRCodes);
router.route("/getSingleData/:id").get(getSingleData);
router.route("/updateQrCode/:id").put(isAuthenticated, updateQrDetails);
router.route("/updateDispatchQr").put(updateDispatchQrDetails);
router.route("/deleteQrCode/:id").delete(isAuthenticated, deleteQRCode);

export default router;