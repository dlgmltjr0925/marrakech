/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/market/list',
        destination: '/market/list/1',
        permanent: true,
      },
    ];
  },
};
