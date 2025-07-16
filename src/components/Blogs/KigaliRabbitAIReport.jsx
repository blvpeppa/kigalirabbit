import React from 'react';

const KigaliRabbitAIReport = () => {
  const report = {
    thumbnail: '/images/rabbit-ai-thumbnail.jpg', // ✅ valid in public folder
    title: 'Pilot Implementation of Rabbit Artificial Insemination (AI) System in Rwanda',
    org: 'KIGALI RABBIT FARM LTD',
    date: '15 June 2025',
    location: 'Nyarugenge, Nyamirambo, Rwanda',
    projectPeriod: 'January 2024 – June 2024',
    pdfLink: '/docs/Rabbit_AI_Report_2025.pdf',     // ✅ valid in public folder
    docxLink: '/docs/Rabbit_AI_Report_2025.docx',   // ✅ valid in public folder
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Thumbnail Image */}
        <img
          src={report.thumbnail}
          alt="Rabbit AI Report"
          className="w-full md:w-64 h-auto rounded-lg shadow-md object-cover"
        />

        {/* Report Info */}
        <div className="flex-1 text-slate-800">
          <h2 className="text-xl md:text-2xl font-bold text-[#056715] leading-snug">
            {report.title}
          </h2>

          <div className="mt-3 space-y-1 text-sm text-gray-700">
            <p><strong>Implementing Organization:</strong> {report.org}</p>
            <p><strong>Report Date:</strong> {report.date}</p>
            <p><strong>Project Period:</strong> {report.projectPeriod}</p>
            <p><strong>Location:</strong> {report.location}</p>
          </div>

          {/* Download Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <a
              href={report.pdfLink}
              download
              className="bg-[#056715] hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition shadow-md"
            >
              📄 Download PDF
            </a>
            <a
              href={report.docxLink}
              download
              className="bg-slate-700 hover:bg-slate-900 text-white text-sm font-medium px-5 py-2 rounded-lg transition shadow-md"
            >
              📃 Download DOCX
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KigaliRabbitAIReport;
