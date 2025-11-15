/** @type {import('next').NextConfig} */
const { NextJsFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
    webpack: (config, options) => {
        if (!options.isServer) {
            config.plugins.push(
                new NextJsFederationPlugin({
                    name: 'publicCatalogMFE',
                    filename: 'static/chunks/remoteEntry.js',
                    exposes: {
                        // Expose a simple component or page for future integration if needed
                        './PublicCatalogSearch': './app/search/page.tsx',
                    },
                    remotes: {}, // This MFE is not consuming others
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