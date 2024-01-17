'use client';

import { DetailtsView, LastNews, CategoriesHeader } from '../../../lib';

export default function Home() {
  return (
    <div className="w-full">
      <CategoriesHeader
        allCategories={false}
        image={'https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png'}
        color={'white'}
        backgroundColor={'black'}
        categories={[
          { id: 24, name: 'GazzConecta', url: '/gazzconecta/', description: '', slug: 'gazzconecta' },
          { id: 65, name: 'Coritiba', url: '/coritiba/', description: '', slug: 'coritiba' },
          { id: 136, name: 'Bom Gourmet', url: '/bomgourmet/', description: '', slug: 'bomgourmet' },
          { id: 80, name: 'Athletico', url: '/athletico/', description: '', slug: 'athletico' },
        ]}
        lineBarColor="#f00"
        buttonMobileColor="blue"
      ></CategoriesHeader>
    </div>
  );
}
