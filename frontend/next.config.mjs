/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
  images: {
    domains: ['*'], 
    remotePatterns: [
        {
            protocol: 'http',
            hostname: 'localhost',
            port: '8001',
            pathname: '/**'
        }
    ]
}
};

export default nextConfig;