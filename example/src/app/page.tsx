'use client';

import { DetailtsView, LastNews } from '../../../lib';

export default function Home() {
  let data: any = {
    name: 'fbg-plugin/postslist',
    props: {
      posts: [
        {
          externalId: 5034,
          uri: '/bomgourmet/beber-agua-antes-ou-depois-do-cafe-especialista-da-the-coffee-explica-em-entrevista/',
          title: 'Beber água antes ou depois do café? Especialista da The Coffee explica em entrevista',
          slug: 'beber-agua-antes-ou-depois-do-cafe-especialista-da-the-coffee-explica-em-entrevista',
          thumbnail:
            'https://cms-bomgourmet.s3.amazonaws.com/bomgourmet%2F2023%2F12%2F21134828%2Fcoffee-1705662_1920.jpg',
          category: 'Bom Gourmet',
          credit: [
            {
              id: 98,
              name: 'Bom Gourmet',
              slug: 'bom-gourmet',
              url: '/autor/bom-gourmet/',
            },
          ],
          createdAt: '2023-12-21T16:50:04',
          showThumbnail: true,
        },
        {
          externalId: 5035,
          uri: '/bomgourmet/com-bar-e-cardapio-exclusivos-para-pets-conheca-o-restaurante-human-frendly-de-curitiba/',
          title: 'Com bar e cardápio exclusivos para pets: conheça o restaurante ‘human frendly’ de Curitiba',
          slug: 'com-bar-e-cardapio-exclusivos-para-pets-conheca-o-restaurante-human-frendly-de-curitiba',
          thumbnail:
            'https://cms-bomgourmet.s3.amazonaws.com/bomgourmet%2F2023%2F12%2F21105712%2FRECANTO-RESTO-BAR-2-INTERNA-FOTO-JULIANO-MAIA-LOSS-DIVULGACAO.jpg',
          category: 'Bom Gourmet',
          credit: [
            {
              id: 98,
              name: 'Bom Gourmet',
              slug: 'bom-gourmet',
              url: '/autor/bom-gourmet/',
            },
          ],
          createdAt: '2023-12-21T14:49:10',
          showThumbnail: true,
        },
      ],
      horizontal: true,
    },
    content:
      '<div class="wp-block-fbg-plugin-postslist"><ul><li>Beber água antes ou depois do café? Especialista da The Coffee explica em entrevista</li><li>Com bar e cardápio exclusivos para pets: conheça o restaurante ‘human frendly’ de Curitiba</li><li>Saiba como turbinar o chocotone com sorvete de doce de leite e calda de chocolate</li></ul></div>',
  };

  return (
    <div className="w-full">
      <LastNews
        textHatColor={'#000'}
        errorSrc="https://media.gazetadopovo.com.br/2020/02/04100019/og-image-bomgourmet.png"
        {...data}
        lastNews={data.props.posts ?? []}
        sendLike={async (e: any) => {}}
        fontSize="large"
        tagClass="font-medium !text-base"
        displayAuthor
        Logo={<div>Oi</div>}
        horizontal
        displayFeaturedImage
      />
    </div>
  );
}
