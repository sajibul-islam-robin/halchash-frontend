import React from 'react';
import StaticPage from '../components/common/StaticPage';

const Shipping = () => {
  return (
    <StaticPage title="Shipping Info" subtitle="Delivery times, charges and tracking">
      <div className="grid gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Delivery Timeframe</h3>
          <p className="mt-2 text-gray-700">Inside Dhaka: 2–3 working days. Outside Dhaka: 3–5 working days. Times may vary during holidays or disruptions.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Delivery Charges</h3>
          <p className="mt-2 text-gray-700">Standard Local Charge: BDT 80. Standard National Charge: BDT 130. Additional charges may apply for special services.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Tracking & Failed Delivery</h3>
          <p className="mt-2 text-gray-700">You will receive tracking by SMS/email when your order is confirmed. If delivery fails, re-delivery may incur courier charges.</p>
        </div>
      </div>
    </StaticPage>
  );
};

export default Shipping;
