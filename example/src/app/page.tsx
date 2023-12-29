'use client';

import { DetailtsView, LastNews } from '../../../lib';

export default function Home() {
  return (
    <div className="w-full">
      <LastNews
        textHatColor={'#f00 !important'}
        textColor={'#f00 !important'}
        key={0}
        // {...block.props}
        lastNews={[
          {
            hat: 'Oi',
            title: 'Oi denovo',
            slug: 'oi',
            link: 'as',
          },
        ]}
        sendLike={async (e: any) => {}}
        errorSrc={''}
      />
    </div>
  );
}
