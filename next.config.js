/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-extraneous-dependencies
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
    runtimeCaching,
    buildExcludes: [
        /\/*server\/middleware-chunks\/[0-9]*[a-z]*[A-Z]*\.js$/,
        /middleware-manifest\.json$/,
        /middleware-runtime\.js$/,
        /_middleware\.js$/,
        /^.+\\_middleware\.js$/,
    ],
    publicExcludes: ["!robots.txt"],
});
const path = require("path");
const withReactSvg = require("next-react-svg")({
    include: path.resolve(__dirname, "src/assets/svgs"),
});

module.exports = withPWA(
    withReactSvg({
        reactStrictMode: false,
        images: {
            formats: ['image/avif', 'image/webp']
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        webpack: (config, { dev, isServer }) => {
            // Only enable the ESLint plugin for development builds and only for the client-side
            // if (dev && !isServer) {
            //   config.plugins.push(
            //     new ESLintWebpackPlugin({
            //       failOnError: true, // Make ESLint errors fatal for the build process
            //       extensions: ['js', 'jsx', 'ts', 'tsx'], // Specify the file extensions you want to check
            //       context: '.', // Root directory for your source files
            //       exclude: 'node_modules', // Exclude the node_modules folder
            //     })
            //   );
            // }
        
            return config;
          },
    })
);
