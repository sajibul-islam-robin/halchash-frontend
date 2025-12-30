import React from 'react';
import StaticPage from '../components/common/StaticPage';

const SizeGuide = () => {
  return (
    <StaticPage title="Size Guide" subtitle="Find the perfect fit">
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Sizing Charts</h3>
          <p className="mt-2 text-gray-700">Refer to the product-specific size chart on each product page. Measurements are provided in centimeters.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">How to Measure</h3>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Bust/Chest: Measure around the fullest part.</li>
            <li>Waist: Measure at the natural waistline.</li>
            <li>Hips: Measure around the fullest part of your hips.</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="font-semibold">Need Help?</h3>
          <p className="mt-2 text-gray-700">If you are between sizes, we suggest choosing the larger size. For further help, contact our support team.</p>
        </div>
      </div>
    </StaticPage>
  );
};

export default SizeGuide;
