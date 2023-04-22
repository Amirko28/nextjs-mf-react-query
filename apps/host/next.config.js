const { withNx } = require('@nrwl/next/plugins/with-nx');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const { dependencies } = require('../../package.json');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    domains: ['dummyjson.com', 'i.dummyjson.com'],
  },
  /**
   *
   * @param {import('webpack').Configuration} config
   * @returns {import('webpack').Configuration}
   */
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        extraOptions: {
          automaticAsyncBoundary: true,
        },
        exposes: {},
        shared: {
          'styled-components': {
            eager: true,
            singleton: true,
            requiredVersion: dependencies['styled-components'],
          },
        },
      }),
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
