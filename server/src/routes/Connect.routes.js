
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { sendEmailPreview, sendJobOpeningEmail } from "../controllers/sendJobOpeningEmail.js";


const emailRouter = Router();


emailRouter.route("/sendJobOpeningEmail").post(

   /**
    * Upload both resume and template
   */
   upload.fields([
      {
         name: "resume",
         maxCount: 1
      },
      {
         name: "template",
         maxCount: 1
      }
   ]),

   sendJobOpeningEmail
)


emailRouter.route("/getEmailPreview").post(

   upload.single("template"),
   sendEmailPreview
)



export default emailRouter;