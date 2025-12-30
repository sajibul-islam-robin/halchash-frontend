import React from 'react';
import StaticPage from '../components/common/StaticPage';

const About = () => {
  return (
    <StaticPage title="About Us" subtitle="Our heritage, mission and commitment to farmers">
      <div className="grid gap-6">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold">Halchash.com — Heritage & Mission</h2>
          <p className="mt-3 text-gray-700">Halchash.com (হালচাষ.কম) is an authentic Bengali-origin e-commerce platform bringing traditional, local and quality products to modern customers.</p>
          <p className="mt-3 text-gray-700">We value the role of agriculture and farmers. For every sale on Halchash, we pledge ৳1 (One Taka) to initiatives that support farmers and sustainable agriculture.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold">Our Values</h3>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-1">
              <li>Support local producers</li>
              <li>Quality and authenticity</li>
              <li>Sustainable agriculture</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="font-semibold">What We Do</h3>
            <p className="mt-3 text-gray-700">We curate products rooted in Bengali tradition and connect them with customers via a trusted online marketplace.</p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-r from-amber-100 to-orange-50">
          <h3 className="font-semibold">Community Impact</h3>
          <p className="mt-2 text-gray-800">Your purchases directly help support community and agricultural programs. Thank you for empowering local livelihoods.</p>
        </div>
      </div>
    </StaticPage>
  );
};

export default About;
