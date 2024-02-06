import ImageComponent from './Image';
import classNames from 'classnames';

interface ISponsor {
  classData?: string;
  categorie?: string;
}

export default async function Sponsors({ classData, categorie }: ISponsor) {
  const taxo = await getAllSponsors(categorie || '');

  if (!taxo) return;

  return taxo?.meta?.sponsorships?.length > 0 ? (
    <div className={classNames('relative', classData)}>
      <p className="relative -bottom-4 mx-4 text-[27px] font-medium ">Parceiros</p>
      <div
        className="flex h-auto min-h-[170px] w-full flex-wrap justify-around rounded-[5px] bg-[#E9E9E9] py-4 md:min-h-[189px]"
        style={{
          columnGap: '6px',
          rowGap: '6px',
        }}
      >
        {taxo?.meta?.sponsorships?.map((x: any, y: number) => {
          return (
            <div className="flex w-[109px] flex-col items-center justify-around" key={y}>
              <a href={x?.url_sponsorship} target="_blank" rel="noopener noreferrer">
                <div className="relative h-[94px] min-h-[94px] w-[94px] rounded-full bg-white object-cover">
                  <ImageComponent
                    className=" rounded-full"
                    src={x?.image_sponsorship}
                    fill
                    alt={x?.name_sponsorship}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={'/assets/miniatura_compartilhamento.png'}
                  ></ImageComponent>
                </div>
                <div className="text-center">{x?.name_sponsorship}</div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}

async function getAllSponsors(categorie: string) {
  let sponsors = await fetch(
    `https://${process.env.HERMES_S3_BUCKET}.s3.amazonaws.com/${process.env.HERMES_S3_PREFIX}/json/routes/category/${categorie}.json`,
  );

  if (sponsors.ok) {
    try {
      return await sponsors.json();
    } catch (error) {
      return;
    }
  }
}
