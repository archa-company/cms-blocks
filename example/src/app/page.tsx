'use client';

import { DetailtsView, LastNews, CategoriesHeader, PostView, NewsLetterView } from '../../../lib';

let newsBlock = {
  name: 'fbg-plugin/newsletter',
  props: {
    content: 'Receba as melhores notícias sobre arquitetura e design também no seu e-mail. Cadastre-se!',
    title: 'Newsletter',
    button: 'Cadastrar',
    url: 'https://search-revistahaus-cms-ij5ce3bp6lmybg6mbsmhlct3xu.us-east-1.es.amazonaws.com/newsletter/_doc',
    image:
      'https://cms-revista-haus.s3.amazonaws.com/revistahaus/2024/01/09173546/99396ee2f10da92fbe0779d1e225be03-1.png',
    termsOfUse: 'https://revistahaus.com.br/termos-de-uso/',
    color: '#ffffff',
    backgroundColor: '#000000',
  },
  content: '<div class="wp-block-fbg-plugin-newsletter"></div>',
};

export default function Home() {
  return (
    <div className="w-full">
      <NewsLetterView
        alignment={''}
        list={[]}
        buttonColor={'#f00'}
        buttonClass="text-black"
        {...newsBlock.props}
        domain={'revistahaus'}
        formSubmit={async (url: any, z: any) => {
          await sendDataElastic(url, z);
        }}
      ></NewsLetterView>
    </div>
  );
}

// ELASTICSEARCH_USER=root
// ELASTICSEARCH_PASS=+Y&]62E3X)6Xieo}nj8t

const sendDataElastic = async (url: string, body: any) => {
  try {
    return await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        'Access-Control-allow-headers': 'X-Requested-With,X-Auth-Token,Content-Type,Content-Length',
        Accept: 'application/json',
        Authorization:
          'Basic ' +
          toBase64(
            'root' +
              ':' +
              ('+Y&]62E3X)6Xieo}nj8t' as string).replaceAll('/', '#').replaceAll(')', ';').replaceAll('"', ''),
          ),
      },
      body: JSON.stringify(body),
      next: {
        revalidate: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

export function toBase64(str: string) {
  return typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
}
