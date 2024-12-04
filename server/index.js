import app from "./src/app.js";
import dotenv from "dotenv";


dotenv.config({
   path: "./.env"
})

const PORT = process.env.PORT;


/**
   Use the promises for the async operations
*/

// Promise.resolve(
//    app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//    })


// ).catch((error) => {
//    console.error("Error starting server:", error);
// })


try {
   app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
   })
} 
catch (error) {
   console.error("Error starting server:", error);
   process.exit(1);
}