import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layout from '../../components/layout';

export const config: {
  unstable_runtimeJS: boolean;
} = {
  unstable_runtimeJS: false,
};

export default (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      {<Script
        src='https://connect.facebook.net/en_US/sdk.js'
        strategy='lazyOnload'
        onLoad={() =>
          console.log('script loaded facebook SDK, window.FB has been populated')
        }
      />}
      <h1>First Post</h1>
      <h2>
        <Link href='/'>
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
};
