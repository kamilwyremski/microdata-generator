import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>Microdata online generator</title>

      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />

      <meta name="description" content="Generator online danych strukturalnych które możesz dodać do swojej strony www"/>

      <meta name='application-name' content='Microdata online generator' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Microdata online generator' />
      <meta name='description' content='Microdata online generator' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-TileColor' content='#2B5797' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#000000' />
                
      <link rel='apple-touch-icon' sizes='512x512' href='/icons/icon-512x512.png' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='shortcut icon' href='/icons/icon-512x512.png' />
          
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://microdata.wyremski.pl/' />
      <meta name='twitter:title' content='Microdata online generator' />
      <meta name='twitter:description' content='Microdata online generator' />
      <meta name='twitter:image' content='/icons/icon-512x512.png' />
      <meta name='twitter:creator' content='@KamilWyremski' />

      <meta property='og:type' content='website' />
      <meta property='og:title' content='Microdata online generator' />
      <meta property='og:description' content='Microdata online generator' />
      <meta property='og:site_name' content='Microdata online generator' />
      <meta property='og:url' content='https://microdata.wyremski.pl/' />
      <meta property='og:image' content='https://microdata.wyremski.pl/icons/icon-512x512.png' />

    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
