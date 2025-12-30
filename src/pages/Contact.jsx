import React from 'react';
import StaticPage from '../components/common/StaticPage';

const Contact = () => {
  return (
    <StaticPage title="Contact Us" subtitle="We're here to help — reach out anytime">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Customer Support</h3>
          <p className="mt-2 text-gray-700">Email: <a className="text-orange-600" href="mailto:halchashdaily@gmail.com">halchashdaily@gmail.com</a></p>
          <p className="mt-1 text-gray-700">Phone: <a className="text-orange-600" href="tel:01911880502">01911880502</a></p>
          <p className="mt-3 text-gray-700">For urgent queries, please call during business hours.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold">Head Office</h3>
          <p className="mt-2 text-gray-700">H#1024, Danober Goli, Manda, Mugda, Dhaka-1214</p>
          <p className="mt-3 text-gray-700">Business inquiries: <a className="text-orange-600" href="mailto:halchashdaily@gmail.com">halchashdaily@gmail.com</a></p>
        </div>
      </div>

      <div className="mt-6 bg-orange-50 p-6 rounded-lg">
        <h4 className="font-semibold">Quick Links</h4>
        <ul className="mt-3 space-y-1">
          <li><a className="text-orange-600" href="/returns">Returns</a></li>
          <li><a className="text-orange-600" href="/shipping">Shipping Info</a></li>
          <li><a className="text-orange-600" href="/faq">FAQ</a></li>
        </ul>
      </div>
    </StaticPage>
  );
};

export default Contact;
