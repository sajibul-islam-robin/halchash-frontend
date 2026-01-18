import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Headphones, CreditCard, Phone, Mail, MapPin, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const Footer = () => {
  const { categories } = useProducts();
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Anywhere in Bangladesh'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: 'Within 7 days for an exchange'
    },
    {
      icon: Headphones,
      title: '24/7 Best Support',
      description: 'Within 30 days money return'
    },
    {
      icon: CreditCard,
      title: 'Cash On Delivery',
      description: 'Pay after receiving the product'
    }
  ];

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Wishlist', to: '/wishlist' }
  ];

  const information = [
    { label: 'Delivery Policy', to: '/delivery-policy' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Return Policy', to: '/returns' },
    { label: 'About Us', to: '/about' }
  ];

  return (
    <footer className="bg-gray-100 mt-16">
      {/* Features Section */}
      <div className="bg-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs opacity-90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-2">Halchash</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Halchash is a leading online pharmacy and healthcare store, offering a wide range of medicines, supplements, and wellness products. We ensure authentic products, competitive pricing, and reliable delivery across Bangladesh.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>1024, SOUTH MANDA, MUGDA, DHAKA</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span>01911880502</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span>Halchashdaily@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">QUICK LINK</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">INFORMATION</h4>
              <ul className="space-y-2">
                {information.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">CATEGORIES</h4>
              <ul className="space-y-2">
                {categories?.slice(0, 8).map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/products?category=${category._id}`}
                      className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Shipping Partners */}
      <div className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Systems */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Payment System:</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">bKash</div>
                <div className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-medium">Nagad</div>
                <div className="bg-purple-500 text-white px-3 py-1 rounded text-sm font-medium">Rocket</div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">Visa</div>
              </div>
            </div>

            {/* Shipping Partners */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Shipping Partner:</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">Pathao</div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">RedX</div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">Steadfast</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm">Our Social Links:</span>
              <div className="flex space-x-3">
                <a href="https://facebook.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-pink-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" className="text-gray-400 hover:text-red-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/18HKCEPaca/" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Halchash.com © all rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

