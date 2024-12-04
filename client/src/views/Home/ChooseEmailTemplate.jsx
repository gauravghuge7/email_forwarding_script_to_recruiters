
import { Link } from "react-router-dom";

const ChooseEmailTemplate = () => {
  const templates = [
    {
      id: "referral",
      title: "Referral Template",
      description: "Use this template to request a referral for a job position.",
      path: "/templates/referral",
    },
    {
      id: "jobOpening",
      title: "Job Opening Template",
      description:
        "Use this template to inquire about available job openings at a company.",
      path: "/templates/job-opening",
    },
    {
      id: "afterApply",
      title: "After Job Apply Template",
      description:
        "Use this template to follow up after applying for a job position.",
      path: "/templates/after-job-apply",
    },
    {
      id: "excelImport",
      title: "Excel Import Template",
      description:
        "Use this template to import data from an Excel file into your email.",
      path: "/templates/load-excel",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Email Template</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {templates.map((template) => (
          <Link to={template.path} key={template.id}>
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {template.title}
              </h2>
              <p className="text-gray-600 mb-6">{template.description}</p>
              <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Go to Template
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseEmailTemplate;
