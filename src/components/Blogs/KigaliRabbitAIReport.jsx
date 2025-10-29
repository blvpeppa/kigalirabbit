import React from 'react';

const KigaliRabbitAIReport = () => {
  const report = {
    thumbnail: '/images/rabbit-ai-thumbnail.jpg',
    title: 'Pilot Implementation of Rabbit Artificial Insemination (AI) System in Rwanda',
    org: 'KIGALI RABBIT FARM LTD',
    date: '15 June 2025',
    location: 'Nyarugenge, Nyamirambo, Rwanda',
    projectPeriod: 'January 2025 – June 2025',
    pdfLink: '/docs/Rabbit_AI_Report_2025.pdf',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-4xl mx-auto flex items-center p-6 bg-white rounded-lg shadow-md">
        {/* Image */}
        <div className="w-1/2 pr-6">
          <img
            src={report.thumbnail}
            alt="Rabbit AI Report"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Text and Button */}
        <div className="w-1/2 pl-6">
          <div className="inline-block px-4 py-1 bg-gray-200 text-black text-xs font-bold rounded-full mb-2 uppercase tracking-wide">
            REPORT 2025
          </div>
          <h2 className="text-xl font-bold text-black mb-4 font-sans tracking-tight">
            {report.title}
          </h2>
          <ul className="text-sm text-gray-800 space-y-1 mb-4">
            <li><strong>Organization:</strong> {report.org}</li>
            <li><strong>Date:</strong> {report.date}</li>
            <li><strong>Period:</strong> {report.projectPeriod}</li>
            <li><strong>Location:</strong> {report.location}</li>
          </ul>
          <a
            href={report.pdfLink}
            download
            className="inline-block bg-black text-white text-sm font-semibold px-6 py-2 rounded-full hover:bg-gray-900 transition duration-200"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default KigaliRabbitAIReport;