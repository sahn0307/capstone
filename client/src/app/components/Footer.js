import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              Made by Sung-Jin Ahn
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="text-gray-400">

              <li>sahn0307@gmail.com</li>

            </ul>
          </div>

        </div>
        <hr className="my-6 border-gray-700" />

      </div>
    </footer>
  );
};

export default Footer;