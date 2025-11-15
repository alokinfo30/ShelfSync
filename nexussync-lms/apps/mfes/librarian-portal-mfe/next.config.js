const { NextJsFederation } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
    config.plugins.push(
      new NextJsFederation({
        name: 'librarianPortal',
        exposes: {
          // EXPOSE the component that Host will consume
          './CheckoutScanner': './components/CheckoutScanner.tsx',
          './ScanPage': './app/scan/page.tsx', 
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
        filename: 'static/chunks/remoteEntry.js',
      })
    );
    return config;
  },
  // Librarian Portal will run on a different port (e.g., 3002)
  output: 'standalone', // Important for Docker/Microservice deployment
};