'use client';
import { CategoriesHeader } from '../../../lib';

export default function Home() {
  return (
    <div className="w-full">
      <CategoriesHeader
        categories={[
          { id: 24, name: 'GazzConecta', url: '/gazzconecta/', description: '', slug: 'gazzconecta' },
          { id: 65, name: 'Coritiba', url: '/coritiba/', description: '', slug: 'coritiba' },
          { id: 136, name: 'Bom Gourmet', url: '/bomgourmet/', description: '', slug: 'bomgourmet' },
          { id: 80, name: 'Athletico', url: '/athletico/', description: '', slug: 'athletico' },
        ]}
      ></CategoriesHeader>
    </div>
  );
}
