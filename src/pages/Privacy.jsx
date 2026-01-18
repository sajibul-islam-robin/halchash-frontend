import React from 'react';
import { Shield, Database, Lock, Eye, Globe, FileText, Mail } from 'lucide-react';
import StaticPage from '../components/common/StaticPage';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <StaticPage 
      title="Privacy Policy" 
      subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
    >
      <div className="space-y-8">
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Commitment to Your Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                At Halchash.com (হালচাষ.কম), we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Section I: Information We Collect */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">I. Information We Collect</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">A</span>
                <span>Information You Provide Directly</span>
              </h3>
              <ul className="list-disc list-inside ml-8 space-y-1 text-gray-700">
                <li><strong>Identification Data:</strong> Name, email address, phone number</li>
                <li><strong>Transactional Data:</strong> Delivery address, order preferences, and feedback</li>
                <li><strong>Account Information:</strong> Profile details, payment methods (stored securely), and wishlist items</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <span className="bg-red-100 text-red-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">B</span>
                <span>Automatic Data Collection (Cookies & Tracking)</span>
              </h3>
              <ul className="list-disc list-inside ml-8 space-y-1 text-gray-700">
                <li><strong>Technical Data:</strong> Device type, browser details, IP address, and location</li>
                <li><strong>Usage Data:</strong> Referral URLs, pages visited, session durations, and mobile device identifiers</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2 ml-8">
                <strong>Note:</strong> You may disable cookies at any time through your browser settings, though some features may not function properly.
              </p>
            </div>
          </div>
        </section>

        {/* Section II: Use of Information */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">II. Use of Information</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">We use the collected information for the following purposes:</p>
            <ul className="grid md:grid-cols-2 gap-3 list-none space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Fulfill and manage orders</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Personalize your shopping experience</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Send updates and promotions (with your consent)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Enhance website performance</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Prevent fraud and ensure security</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-600 mt-1">✓</span>
                <span className="text-gray-700">Comply with legal requirements</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section III: Disclosure and Sharing */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">III. Disclosure and Sharing</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-gray-800 font-medium">
                <strong className="text-green-700">We do not sell or rent your personal information to third parties for marketing purposes.</strong>
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">When We May Share Your Information:</h3>
              <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
                <li>To comply with legal obligations and court orders</li>
                <li>To enforce our Terms of Service and policies</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>To prevent fraud and verify transactions</li>
                <li>With service providers who assist in operations (under strict confidentiality agreements)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section IV: Your Control Over Your Data */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">IV. Your Control Over Your Data</h2>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">View, Update, or Edit Your Profile</h3>
                <p className="text-gray-700">You can access and modify your personal information anytime through your account settings.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Request Data Deletion</h3>
                <p className="text-gray-700">
                  You may request deletion of your account and personal data by contacting us at{' '}
                  <a href="mailto:Halchashdaily@gmail.com" className="text-red-600 hover:underline">Halchashdaily@gmail.com</a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Remove Social Media Logins</h3>
                <p className="text-gray-700">You can unlink social media accounts from your profile at any time through account settings or by contacting support.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bengali Section */}
        <section className="space-y-4 mt-10">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">গোপনীয়তা নীতি</h2>
            <p className="text-gray-800 mb-4 leading-relaxed">
              হালচাষ.কম-এ আমরা আপনার আস্থা ও গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিই। আপনার তথ্য সুরক্ষিত রাখা আমাদের অঙ্গীকার।
            </p>
            
            <div className="space-y-3 text-gray-800">
              <div>
                <h3 className="font-semibold mb-1">১. আমরা যে তথ্য সংগ্রহ করি:</h3>
                <p className="text-sm">পরিচিতি ডেটা, লেনদেন ডেটা, কুকিজ ও ট্র্যাকিং ডেটা ইত্যাদি।</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">২. তথ্য ব্যবহারের উদ্দেশ্য:</h3>
                <p className="text-sm">অর্ডার পরিচালনা, ব্যক্তিগতকরণ, আপডেট পাঠানো, নিরাপত্তা ও আইনি প্রয়োজন।</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">৩. প্রকাশ ও অংশীদারিত্ব:</h3>
                <p className="text-sm">বিপণনের উদ্দেশ্যে তৃতীয় পক্ষকে ডেটা বিক্রি করা হয় না।</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-1">৪. আপনার নিয়ন্ত্রণ:</h3>
                <p className="text-sm">প্রোফাইল আপডেট/মুছুন অনুরোধ ইত্যাদি করার পূর্ণ অধিকার আপনার রয়েছে।</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8">
          <h3 className="font-semibold text-gray-900 mb-2">Questions About Privacy?</h3>
          <p className="text-gray-700 mb-3">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-1 text-gray-700">
            <p><strong>Email:</strong> <a href="mailto:Halchashdaily@gmail.com" className="text-red-600 hover:underline">Halchashdaily@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:01911880502" className="text-red-600 hover:underline">01911880502</a></p>
            <p><strong>Address:</strong> 1024, SOUTH MANDA, MUGDA, DHAKA</p>
          </div>
          <Link to="/contact" className="inline-block mt-4 text-red-600 hover:underline font-medium">
            Visit Contact Page →
          </Link>
        </div>
      </div>
    </StaticPage>
  );
};

export default Privacy;
