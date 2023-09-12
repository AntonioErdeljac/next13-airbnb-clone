/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     appDir: true
    // },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com"
        ]
    },
    // experimental: {
    //     serverActions: true,
    // },
    // headers: () => [
    //     {
    //         source: '/listings/[listingId]',
    //         headers: [
    //             {
    //                 key: 'Cache-Control',
    //                 value: 'no-store',
    //             },
    //         ],
    //     },
    //     {
    //         source: '/trips',
    //         headers: [
    //             {
    //                 key: 'Cache-Control',
    //                 value: 'no-store',
    //             },
    //         ],
    //     },
    // ],
    // async headers() {
    //     return [
    //         {
    //             source: '/listings/[listingId]',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'no-store, max-age=0',
    //                 },
    //             ],
    //         },
    //         {
    //             source: '/trips',
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'no-store, max-age=0',
    //                 },
    //             ],
    //         },
    //     ];
    // },
}

module.exports = nextConfig
