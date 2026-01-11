# YouTube Channel Id Extractor

A simple website to get a channel id from a YouTube link.

[Live website](https://youtube-channel-id-extractor.vercel.app)

## Features

- Supports a wide range of YouTube URLs formats, including those from the
  Wayback Machine
- Keeps a record of previously parsed channels in an `IndexDB` storage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## License

This project is licensed under the [GNU Affero General Public License](LICENSE).
Feel free to use, modify, and distribute it as per the license terms.
