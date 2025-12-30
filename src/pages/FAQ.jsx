import React from 'react';
import StaticPage from '../components/common/StaticPage';

const FAQ = () => {
  return (
    <StaticPage title="FAQ" subtitle="Frequently Asked Questions">
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Orders</h3>
          <p className="mt-2 text-gray-700">How do I track my order? You will receive an SMS/email with tracking details once your order is confirmed.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Returns</h3>
          <p className="mt-2 text-gray-700">What is your return policy? Please refer to our <a className="text-orange-600" href="/returns">Returns</a> page for full details.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Shipping</h3>
          <p className="mt-2 text-gray-700">When will my order be delivered? See <a className="text-orange-600" href="/shipping">Shipping Info</a> for delivery windows and charges.</p>
        </div>
      </div>
    </StaticPage>
  );
};

export default FAQ;
