import { useState } from "react";
import axios from "axios";
import { extractErrorMessage } from "../../Components/CustomError/error";
import { ToastContainer, toast } from "react-toastify";

const JobOpening = () => {

  /** States for the forms and emails  */
  const [companyName, setCompanyName] = useState("");
  const [subject, setSubject] = useState("");
  const [hrName, setHrName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [emails, setEmails] = useState([]); // Array of objects { name, email }
  const [resumeFile, setResumeFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);
  const [emailPreview, setEmailPreview] = useState("");
  const [loading, setLoading] = useState("");
  const [isSending, setIsSending] = useState(false);

  /** Functions for the validation and sending emails */
  const addEmail = () => {
    if (!hrName.trim()) {
      alert("Please enter the HR name.");
      return;
    }

    if (!validateEmail(hrEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newEntry = { name: hrName, email: hrEmail };
    if (!emails.some((entry) => entry.email === hrEmail)) {
      setEmails((prevEmails) => [...prevEmails, newEntry]);
      setHrName(""); // Clear input after adding
      setHrEmail("");
    }
  };


  const validateEmail = (email) => {
    const check =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return check.test(String(email).toLowerCase());
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };


  // Handle file selection for resume
  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // Handle file selection for template
  const handleTemplateUpload = (e) => {
    setTemplateFile(e.target.files[0]);
  };


  // Send Email Handler
  const sendEmail = async () => {
    try {
      if (emails.length === 0) {
        alert("Please enter at least one HR name and email.");
        return;
      }

      if (!resumeFile || !templateFile) {
        alert("Please upload both a resume and an email template.");
        return;
      }


      const body = {
        companyName : companyName,
        subject : subject,
        hrEmails : emails,
        resume : resumeFile,
        template: templateFile,
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      setIsSending(true);

      const response = await axios.post("/api/sendJobOpeningEmail", body, config);
      console.log(response.data);

      if(response.data.success) {

        const emailBody = response.data.emailBody;
        setEmailPreview(emailBody);
        toast.success("Email sent successfully to Emails.");
        setIsSending(false);
      }

    } 
    catch (error) {
      console.error("Error => ", error);
      console.log(error);

      const err = extractErrorMessage(error.response.data);
      toast.error(err);
    }
    finally {
      setIsSending(false);
    }
  };

  // Fetch Email Preview
  const fetchEmailPreview = async() => {

    try {

      if (!templateFile) {
        alert("Please upload both a resume and an email template.");
        return;
      }

      setLoading(true);

      const body = {
        template: templateFile,
        companyName : companyName,
        hrEmails : emails,
      };
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      
      const response = await axios.post("/api/getEmailPreview", body, config);

      console.log(response);

      if(response.data.success) {

        const emailBody = response.data.emailBody;
        setEmailPreview(emailBody);
        toast.success("Email preview generated successfully.");
      }

    } 
    catch (error) {
      console.log(error);

      const err = extractErrorMessage(error.response.data);
      toast.error(err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

    {/* Toast Container */}
    <div>
      <ToastContainer 
        position="top-right" 
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>

    

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Job Opening Form</h1>

      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-4 md:space-y-0 md:space-x-6">

        {/* Form Section */}
        <div className="flex-1">

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              HR Name
            </label>
            <input
              type="text"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
              placeholder="Enter HR name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              HR Email
            </label>
            <input
              type="email"
              value={hrEmail}
              onChange={(e) => setHrEmail(e.target.value)}
              placeholder="Enter HR email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addEmail}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Contact
            </button>
          </div>

          {/* Upload Resume */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

          {/* Upload Email Template */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Email Template (Word Document)
            </label>
            <input
              type="file"
              accept=".doc,.docx"
              onChange={handleTemplateUpload}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
          </div>

        </div>

        {/* Email List Section */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Added Contacts</h2>
          {emails.length > 0 ? (
            <ul className="space-y-2">
              {emails.map((entry, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow"
                >
                  <span>
                    {index + 1}. {entry.name} ({entry.email})
                  </span>
                  <button
                    onClick={() => removeEmail(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No contacts added yet.</p>
          )}
        </div>

      </div>

      {/* Send Email Section */}
      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={sendEmail}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Send Email
        </button>
        {
          isSending && (
          <div className="mt-4">
            <div
              className="h-2 bg-gray-300 rounded"
              style={{
                width: "100%",
                backgroundColor: "#f3f4f6",
              }}
            >
              <div
                className="h-2 bg-green-600 rounded"
                style={{
                  width: `0%`,
                  transition: "width 0.2s ease-in-out", // Smooth transition
                }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-gray-500">{`Progress: 100%`}</p>
          </div>
        )}

      </div>


      <div className="mt-6 w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <button
          onClick={fetchEmailPreview}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Show Email Preview
        </button>

        {
          loading && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )
        }

        {emailPreview && (
          <div className="border border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Email Preview:</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: emailPreview.replace(
                  /<a /g,
                  '<a class="text-blue-600 hover:text-blue-800 underline" '
                )
              }}
              className="prose max-w-none"
            ></div>
          </div>
        )}
      </div>

    </div>
  );
};

export default JobOpening;
