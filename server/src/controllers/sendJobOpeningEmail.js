import { sendOTPEmail } from "../helpers/nodemailer.js";
import { promiseWrap } from "../util/promise.wrapper.js";
import fs from 'fs/promises';
import mammoth from 'mammoth';
import path from "path";



/** Forwarding Emails from here */

const sendJobOpeningEmail = promiseWrap(async(req, res, next) => {

   try {

      const { hrEmails, companyName, subject } = req.body;
      console.log("req.body => ", req.body);

      if(!hrEmails || !companyName || !subject) {
         return res
         .status(400)
         .json({ message: "Missing required fields." });
      }


      const resume = req.files.resume[0].path;
      const template = req.files.template[0].path;

      let response = "";

      for(let i=0; i<hrEmails?.length; i++) {

         
         response = await sendOTPEmail(hrEmails[i].email, subject, resume, template, companyName, hrEmails[i].name);
         console.log("response => ", response);
      }
      

      return res
      .status(200)
      .json({
         success: true,
         message: "Email sent successfully.",
         emailBody: response
      });
      
   } 
   catch (error) {
      console.log("Error => ", error);
      next(error);
   }
   finally {
      console.log("Function executed successfully.");
   }

})



/**  Sending Email preview from here */

const sendEmailPreview = promiseWrap(async(req, res, next) => {
   try {

      const template = req?.file?.path;
      
      const {companyName, hrName} = req.body;

      console.log("companyName => ", companyName);

      if(!template) {
         return res
         .status(400)
         .json({ message: "Missing required fields." });
      }


      const templateBuffer = await fs.readFile(template);

      let { value: emailBody } = await mammoth.convertToHtml({ buffer: templateBuffer });


      if(companyName) {
         emailBody = emailBody.replace(/{{companyName}}/gi, companyName);
      }
      

      return res
      .status(200)
      .json({ 
         success: true,
         message: "Email sent successfully.", 
         emailBody 
      });
      
   } 
   catch (error) {
      console.log("Error => ", error);
      next(error);
   }
   finally {
      console.log("Function executed successfully.");
   }
})

// const fileBuffer = fs.readFileSync(filePath);
// const { value: extractedContent } = await mammoth.extractRawText({ buffer: fileBuffer });

export {
   sendJobOpeningEmail,
   sendEmailPreview
}