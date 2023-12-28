'use client';

import { DetailtsView, LastNews } from '../../../lib';

export default function Home() {
  let array = [
    {
      name: 'core/details',
      props: [],
      children: [
        {
          name: 'core/paragraph',
          props: {
            placeholder: 'Digite / para abrir um bloco oculto',
          },
          content:
            'Teste de HAUS Teste de HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS',
        },
        {
          name: 'core/pullquote',
          props: [],
          content:
            '<figure class="wp-block-pullquote"><blockquote><p></p><cite>Teste de HAUS Teste de HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS</cite></blockquote></figure>',
        },
        {
          name: 'core/table',
          props: [],
          content:
            '<figure class="wp-block-table"><table><tbody><tr><td>HAUS teste</td><td>HAUS teste</td><td>HAUS teste</td></tr><tr><td>2023</td><td>2023</td><td>2023</td></tr></tbody></table><figcaption class="wp-element-caption">tabela teste HAUS</figcaption></figure>',
        },
        {
          name: 'core/paragraph',
          props: [],
          content: '',
        },
        {
          name: 'core/media-text',
          props: {
            mediaId: 30186,
            mediaLink: 'https://gazzconecta.com.br/?attachment_id=30186',
            mediaType: 'image',
          },
          children: [
            {
              name: 'core/paragraph',
              props: {
                align: 'center',
              },
              content:
                '<p class="has-text-align-center">Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS</p>',
            },
          ],
          content:
            '<div class="wp-block-media-text is-stacked-on-mobile"><figure class="wp-block-media-text__media"><img src="https://cms-gazzconecta.s3.amazonaws.com/gazzconecta/2023/11/28115643/anuario-haus-2023_-1024x662.jpg" alt="" class="wp-image-30186 size-full"/></figure><div class="wp-block-media-text__content"></div></div>',
        },
      ],
      content:
        '<details class="wp-block-details"><summary>DETALHES: Header do Detalhes Teste de HAUS Teste de HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS Teste HAUS</summary></details>',
    },
  ];
  return (
    <div className="w-full">
      <DetailtsView summary={'Sumario'}>
        <p>Oi Data</p>
        <p>Adada</p>
      </DetailtsView>
    </div>
  );
}
