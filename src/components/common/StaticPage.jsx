import React from 'react';
import { Button } from '../ui/button';

const StaticPage = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="rounded-xl overflow-hidden mb-8 shadow-2xl">
          <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white p-8 md:p-12">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-emerald-100/80">Home / <span className="font-semibold text-white">{title}</span></div>
                <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                  {title}
                </h1>
                {subtitle && <p className="mt-2 text-emerald-100/90 max-w-2xl">{subtitle}</p>}
              </div>
              <div className="hidden md:block">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90">Contact Support</Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl p-6 md:p-10 prose max-w-none">
            {children}
          </div>
        </main>

        <div className="mt-8 flex justify-center md:justify-end">
          <Button size="md" className="bg-emerald-600 hover:bg-emerald-700 text-white">Need Help? Contact Us</Button>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
