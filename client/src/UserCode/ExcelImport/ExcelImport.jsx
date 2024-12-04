import  { useState } from "react";
import * as XLSX from "xlsx";

const ExcelImport = () => {
   const [data, setData] = useState([]);
 
   // Function to handle file upload
   const handleFileUpload = (event) => {
     const file = event.target.files[0]; // Get the uploaded file
     if (!file) return;
 
     const reader = new FileReader();
     reader.onload = (e) => {
       const data = new Uint8Array(e.target.result); // Read file as array buffer
       const workbook = XLSX.read(data, { type: "array" }); // Parse the file using XLSX
       const sheetName = workbook.SheetNames[0]; // Get the first sheet
       const sheet = workbook.Sheets[sheetName];
       const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert the sheet to JSON
       setData(jsonData); // Set the JSON data to state
     };
     reader.readAsArrayBuffer(file);
   };
 
   return (
     <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
       <h1 className="text-2xl font-bold text-gray-800 mb-6">
         Import Excel Data
       </h1>
       <div className="w-full max-w-md bg-white p-4 shadow-lg rounded-lg">
         <input
           type="file"
           accept=".xlsx, .xls"
           onChange={handleFileUpload}
           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
         />
       </div>
       {data.length > 0 && (
         <div className="mt-6 w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
           <h2 className="text-lg font-bold text-gray-700 mb-4">Excel Data:</h2>
           <table className="table-auto w-full border-collapse border border-gray-300">
             <thead>
               <tr className="bg-gray-200">
                 {Object.keys(data[0]).map((key) => (
                   <th
                     key={key}
                     className="border border-gray-300 px-4 py-2 text-left"
                   >
                     {key}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody>
               {data.map((row, index) => (
                 <tr key={index} className="hover:bg-gray-100">
                   {Object.values(row).map((value, i) => (
                     <td
                       key={i}
                       className="border border-gray-300 px-4 py-2 text-left"
                     >
                       {value}
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       )}
     </div>
   );
 };
 

 export default ExcelImport;