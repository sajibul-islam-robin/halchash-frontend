import React from 'react';
import StaticPage from '../components/common/StaticPage';

const Returns = () => {
  return (
    <StaticPage title="Returns & Refunds" subtitle="Clear, fair and customer-friendly return policy">
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Eligibility</h3>
          <p className="mt-2 text-gray-700">Report issues during delivery and decline the item if damaged. After accepting and delivery agent departure, returns are not accepted without proper video evidence.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">How to claim</h3>
          <ol className="list-decimal list-inside mt-2 text-gray-700">
            <li>Record complete unboxing video showing the issue.</li>
            <li>Contact support with order details and video.</li>
            <li>We will verify and respond within 48 hours.</li>
          </ol>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Refund Timeline</h3>
          <p className="mt-2 text-gray-700">Approved refunds processed within 7–10 working days to the original payment method.</p>
        </div>
      </div>
    </StaticPage>
  );
};

export default Returns;
