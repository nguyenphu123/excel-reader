/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    systemID: 2,
    AUTHORIZATION: "PS-Auth",
    key: "59a9088d5e25c7e272ad68ffd9dab994f62405182d59d70d0a18e82d1988ecebb9a8b1e8ed541235f91b901b1ac31b72573906ece3db07e4d8613cb02360c3e9",
    runas: "btadmin",
    pwd: "Huynhvanhau@123",
    HOST: "https://172.16.1.174/",
  },
};

export default nextConfig;
