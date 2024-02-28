import ImageComponent from './Image';
import classNames from 'classnames';

interface ISponsor {
  classData?: string;
  categorie?: string;
  imageStaticUrl?: string;
  type?: 'clear' | 'all';
}

export default async function Sponsors({ classData, categorie, imageStaticUrl, type = 'all' }: ISponsor) {
  const taxo = await getAllSponsors(categorie || '');

  if (!taxo) return;

  if (taxo?.meta?.sponsorships?.length == 0) return;

  return (
    <div className={classNames('relative my-4', classData)}>
      {type == 'all' && (
        <>
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
                        imageStaticUrl={imageStaticUrl}
                      ></ImageComponent>
                    </div>
                    <div className="text-center">{x?.name_sponsorship}</div>
                  </a>
                </div>
              );
            })}
          </div>
        </>
      )}

      {type == 'clear' &&
        taxo?.meta?.sponsorships?.map((x: any, y: number) => {
          return (
            <div
              className="h-auto w-full"
              key={y}
              style={{
                columnGap: '6px',
                rowGap: '6px',
              }}
            >
              <a href={x?.url_sponsorship} target="_blank" rel="noopener noreferrer" className="h-full w-full">
                <div className="min-h-20 relative h-full w-full  bg-white object-cover">
                  <img src={x?.image_sponsorship} alt={x?.name_sponsorship} className="h-auto w-full" />
                </div>
              </a>
            </div>
          );
        })}
    </div>
  );
}

async function getAllSponsors(categorie: string) {
  let sponsors = await fetch(
    `https://${process.env.HERMES_S3_BUCKET}.s3.amazonaws.com/${process.env.HERMES_S3_PREFIX}/json/routes${
      categorie.startsWith('/category') ? '' : '/category'
    }${categorie.endsWith('/') ? categorie.slice(0, categorie.length - 1) : categorie}.json`,
  );

  if (sponsors.ok) {
    try {
      return await sponsors.json();
    } catch (error) {
      return;
    }
  }
}
