import React from 'react';

const KigaliRabbitAIReport = () => {
  const report = {
    thumbnail: '/images/rabbit-ai-thumbnail.jpg', // ✅ stored in /public
    title: 'Pilot Implementation of Rabbit Artificial Insemination (AI) System in Rwanda',
    org: 'KIGALI RABBIT FARM LTD',
    date: '15 June 2025',
    location: 'Nyarugenge, Nyamirambo, Rwanda',
    projectPeriod: 'January 2025 – June 2025',
    pdfLink: '/docs/Rabbit_AI_Report_2025.pdf', // ✅ stored in /public
  };

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
      <div className="grid md:grid-cols-3 gap-0">
        {/* Image */}
        <div className="md:col-span-1">
          <img
            src={report.thumbnail}
            alt="Rabbit AI Report"
            className="w-full h-full object-cover aspect-[4/5] rounded-l-2xl"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mb-3">
              REPORT 2025
            </div>
            <h2 className="text-xl font-bold text-gray-800 leading-snug">
              {report.title}
            </h2>

            <ul className="mt-4 text-sm text-gray-600 space-y-1">
              <li>
                <strong>Implementing Organization:</strong> {report.org}
              </li>
              <li>
                <strong>Report Date:</strong> {report.date}
              </li>
              <li>
                <strong>Project Period:</strong> {report.projectPeriod}
              </li>
              <li>
                <strong>Location:</strong> {report.location}
              </li>
            </ul>
          </div>

          {/* Download button */}
          <div className="mt-6">
            <a
              href={report.pdfLink}
              download
              className="inline-flex items-center gap-2 bg-[#056715] hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              📄 Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KigaliRabbitAIReport;
