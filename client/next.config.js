/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/components/admin",
      },
      {
        source: "/sso",
        destination: "/auth/sso",
      }
    ];
  },
};
