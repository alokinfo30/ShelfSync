/** @type {import('next').NextConfig} */
const { NextJsFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
    webpack: (config, options) => {
        if (!options.isServer) {
            config.plugins.push(
                new NextJsFederationPlugin({
                    name: 'seatBookingMFE',
                    filename: 'static/chunks/remoteEntry.js',
                    exposes: {
                        // Crucially exposes the SeatMap component for the Host MFE
                        './SeatMap': './components/SeatMap.tsx', 
                    },
                    remotes: {},
                    shared: {
                        react: { singleton: true, requiredVersion: false },
                        'react-dom': { singleton: true, requiredVersion: false },
                        'shared-ui-components': { singleton: true, requiredVersion: false, eager: true },
                    },
                })
            );
        }
        return config;
    },
};

module.exports = nextConfig;