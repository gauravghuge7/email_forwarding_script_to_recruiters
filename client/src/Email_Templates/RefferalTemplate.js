

const generateEmailTemplate = ({
    name,
    graduationYear,
    internshipCompany,
    projects,
    contact,
    socialLinks,
  }) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        margin: 0 auto;
        max-width: 600px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
      }
      .header {
        text-align: center;
        font-size: 24px;
        color: #0046be;
      }
      .highlight {
        color: #007bff;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #777;
      }
      .social-links a {
        color: #007bff;
        text-decoration: none;
        margin: 0 5px;
      }
      .project-link {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="header">Hi Madam,</h1>
      <p>
        I hope you’re doing well. My name is <span class="highlight">${name}</span>, and I’m currently a Computer Science student at Dr. Babasaheb Ambedkar Marathwada University, graduating in ${graduationYear}.
      </p>
      <p>
        I am reaching out to see if you might consider referring me for a software development intern position at <b>Walmart</b>. I’m very interested in joining Walmart's development team, as I deeply admire the company’s commitment to innovation and impactful technology solutions.
      </p>
      <p>
        During my recent internship at <b>${internshipCompany}</b>, I had the opportunity to work as a Full Stack Developer, where I:
        <ul>
          <li>Developed an Employee Management System using the MERN stack.</li>
          <li>Collaborated on a Learning Management System for online education.</li>
          <li>Gained valuable skills in Node.js, React, and API integration.</li>
        </ul>
      </p>
      <p>Here are some of my recent projects:</p>
      <ul>
        ${projects
          .map(
            (project) =>
              `<li><a href="${project.link}" target="_blank" class="project-link"><b>${project.name}</b></a>: ${project.description}</li>`
          )
          .join("")}
      </ul>
      <p>
        I also actively share my insights on software development through my Hashnode blog and engage with the developer community on LinkedIn and LeetCode.
      </p>
      <p>
        If you think my background could be a good match for Walmart, please let me know. I would be very grateful for a referral.
      </p>
      <p>Thank you for considering my request.</p>
      <p>Warm regards,</p>
      <p>${name}</p>
      <p class="footer">
        Contact: ${contact.phone} | ${contact.email} <br />
        <span class="social-links">
          ${socialLinks
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank">${link.platform}</a>`
            )
            .join(" | ")}
        </span>
      </p>
    </div>
  </body>
  </html>
    `;
  };
  
  // Example Usage
  export const emailHtml = generateEmailTemplate({
    name: "Gaurav Ghuge",
    graduationYear: 2025,
    internshipCompany: "Arohi Softwares",
    projects: [
      {
        name: "Company Management System",
        link: "https://example.com/company-management-system",
        description: "A Jira-like tool for managing employees, clients, and tasks.",
      },
      {
        name: "Laptop Checker System",
        link: "https://example.com/laptop-checker-system",
        description: "A centralized platform for inventory management.",
      },
      {
        name: "Student Test Solver",
        link: "https://example.com/student-test-solver",
        description: "An automated test evaluation system.",
      },
    ],
    contact: {
      phone: "+91 8767482793",
      email: "gauravghuge737@gmail.com",
    },
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/your-profile" },
      { platform: "GitHub", url: "https://github.com/your-profile" },
      { platform: "LeetCode", url: "https://leetcode.com/your-profile" },
      { platform: "Portfolio", url: "https://your-portfolio.com" },
    ],
  });
  
  console.log(emailHtml);
  


