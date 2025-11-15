const { NextJsFederation } = require('@module-federation/nextjs-mf');

module.exports = {
  webpack: (config, options) => {
        // Use environment variables for dynamic remote addresses in production
        const seatBookingUrl = process.env.SEAT_BOOKING_URL || 'http://localhost:3002';
        const librarianPortalUrl = process.env.LIBRARIAN_PORTAL_URL || 'http://localhost:3000';
        const publicCatalogUrl = process.env.PUBLIC_CATALOG_URL || 'http://localhost:3003';

        if (!options.isServer) {
    config.plugins.push(
      new NextJsFederation({
        name: 'hostShellMfe',
        // Define remotes to load later (e.g., LibrarianPortal)
        remotes: {
          librarianPortal: `librarianPortal@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
          // Define other MFEs here (PublicCatalog, SeatBooking)
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          // ADD the shared component package:
          'shared-ui-components': {
            singleton: true,
            requiredVersion: false,
            eager: true // Load immediately for core elements like Header
          },
        },
        filename: 'static/chunks/remoteEntry.js',
      })
    );
  }
    return config;
  },
  // Ensure we can run on a different port than the default 3000
  async rewrites() {
    return [
      {
        source: '/_next/:path*',
        destination: '/_next/:path*',
      },
    ];
  },
};