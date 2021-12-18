import Head from 'next/head'
import React from 'react'

const HeadComponent: React.FC = () => (
  <Head>
    <title>eighteen</title>
    <link rel="shortcut icon" href="/favicons/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="msapplication-TileColor" content="#CBD5E0" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="viewport" content="initial-scale=1, viewport-fit=cover, width=device-width" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="Description" content="十八番アプリ eighteen" />
  </Head>
)

export default HeadComponent
