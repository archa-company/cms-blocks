/* eslint-disable @next/next/no-img-element */
'use client';

import { PostNews } from './types/Post';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ImageComponent from './Image';
import { setCookie, getCookie } from 'cookies-next';

export interface IPostCardProps extends LastNewsOptionsProps {
  post: PostNews;
  withImage?: boolean;
  withMetas?: boolean;
  withAuthor?: boolean;
  withReadTime?: boolean;
  haveBorder?: boolean;
  mini?: boolean;
}

interface LastNewsProps extends LastNewsOptionsProps {
  lastNews?: PostNews[];
  posts?: PostNews[];
}

export interface LastNewsOptionsProps {
  addLinkToFeaturedImage?: boolean;
  categories?: any[];
  displayAuthor?: boolean;
  displayFeaturedImage?: boolean;
  displayPostContent?: boolean;
  displayPostContentRadio?: 'Excerpt' | 'Full Post';
  excerptLength?: 55 | number;
  displayPostDate?: boolean;
  featuredImageAlign?: 'none' | 'left' | 'center' | 'right';
  featuredImageSizeWidth?: number;
  featuredImageSizeHeight?: number;
  postsToShow?: 5 | number;
  selectedAuthor?: number;
  order?: 'desc' | 'asc';
  orderBy?: 'createdAt' | 'title';
  backgroundColor?: string;
  textColor?: string;
  textHatColor?: string;
  fontSize?: 'small' | 'medium' | 'large' | 'x-large';
  horizontal?: boolean;
  color?: string;
  Logo?: any;
  sendLike: (e: any) => Promise<void>;
  errorSrc: string;
}
export default function LastNews({
  lastNews,
  postsToShow,
  addLinkToFeaturedImage,
  displayAuthor,
  displayFeaturedImage,
  displayPostContent,
  displayPostContentRadio,
  excerptLength,
  featuredImageAlign,
  featuredImageSizeHeight,
  featuredImageSizeWidth,
  backgroundColor,
  textColor,
  fontSize,
  order,
  orderBy,
  categories,
  selectedAuthor,
  posts,
  errorSrc,
  horizontal,
  Logo,
  sendLike,
}: LastNewsProps) {
  if (!lastNews?.length && !posts?.length)
    return <span className="text-base underline">Não foi possível listar últimas notícias</span>;

  return posts != null && posts?.length > 0 ? (
    <div className="my-5 max-w-[1440px]">
      <div className={classNames('mt-4 flex flex-col', horizontal ? 'flex-wrap justify-center md:flex-row' : '')}>
        {posts &&
          posts.map((post: PostNews, index: number) => (
            <PostCard
              horizontal={horizontal}
              sendLike={async (e) => await sendLike(e)}
              key={post.id}
              post={post}
              withImage={false}
              withMetas={true}
              haveBorder={index != posts.length - 1}
              addLinkToFeaturedImage={true}
              displayAuthor={true}
              displayFeaturedImage={post.showThumbnail}
              displayPostContent={displayPostContent}
              displayPostContentRadio={displayPostContentRadio}
              featuredImageAlign={'left'}
              backgroundColor={backgroundColor}
              textColor={textColor}
              fontSize={fontSize}
              errorSrc={errorSrc}
              Logo={Logo}
            />
          ))}
      </div>
    </div>
  ) : (
    <div className="my-5 w-full">
      <div className={classNames('mt-4 flex flex-col', horizontal ? 'flex-wrap justify-center md:flex-row' : '')}>
        {lastNews &&
          lastNews
            .filter((x) =>
              !!categories ? x.taxonomies?.category.some((x: any) => categories.some((y) => x.id === y.id)) : true,
            )
            .filter((x) => (!!selectedAuthor ? x.taxonomies?.credit.some((x: any) => x.id === selectedAuthor) : true))
            .sort(
              order == 'asc'
                ? (objA, objB) => {
                    let a = Date.parse(objA.createdAt!),
                      b = Date.parse(objB.createdAt!);
                    return orderBy == 'title' ? objB.title.localeCompare(objA.title) : a - b;
                  }
                : (objA, objB) => {
                    let a = Date.parse(objA.createdAt!),
                      b = Date.parse(objB.createdAt!);
                    return orderBy == 'title' ? objA.title.localeCompare(objB.title) : b - a;
                  },
            )
            .slice(0, postsToShow ?? 5)
            .map((post: PostNews, index: number) => (
              <PostCard
                horizontal={horizontal}
                sendLike={async (e) => await sendLike(e)}
                key={post.id}
                post={post}
                withImage={false}
                withMetas={true}
                haveBorder={index != lastNews.length - 1}
                addLinkToFeaturedImage={addLinkToFeaturedImage}
                displayAuthor={displayAuthor}
                displayFeaturedImage={displayFeaturedImage}
                displayPostContent={displayPostContent}
                displayPostContentRadio={displayPostContentRadio}
                excerptLength={excerptLength}
                featuredImageAlign={featuredImageAlign}
                featuredImageSizeHeight={featuredImageSizeHeight}
                featuredImageSizeWidth={featuredImageSizeWidth}
                backgroundColor={backgroundColor}
                textColor={textColor}
                fontSize={fontSize}
                errorSrc={errorSrc}
                Logo={Logo}
              />
            ))}
      </div>
    </div>
  );
}

export function PostCard({
  post,
  withImage = true,
  withMetas = true,
  withAuthor = true,
  withReadTime = true,
  mini = false,
  haveBorder = true,
  addLinkToFeaturedImage,
  displayAuthor,
  displayFeaturedImage,
  displayPostContent,
  displayPostContentRadio,
  excerptLength,
  featuredImageAlign,
  featuredImageSizeHeight,
  featuredImageSizeWidth,
  backgroundColor,
  textColor,
  textHatColor,
  fontSize,
  horizontal,
  Logo,
  sendLike,
  errorSrc,
}: IPostCardProps) {
  const [stateDocument, setStateDocument] = useState(false);
  let [postData, setPostData] = useState(post);
  const category = 'conteudo-publicitario';

  const getCookies = () => (stateDocument ? getCookie('likes') : '[]'),
    sendData = async (x: any) => {
      const l = JSON.parse(getCookies() || '[]'),
        postId = x;
      sendLike({
        postId,
        siteId: process.env.HERMES_DOMAIN_ID || 'gazzconecta',
        like: !l.includes(postId),
      });
      if (!!l.includes(postId)) l.splice(l.indexOf(postId), 1);
      else l.push(postId);
      setLikes(l);
      setCookie('likes', JSON.stringify(l));
      return false;
    },
    router = useRouter(),
    [likes, setLikes] = useState<number[]>([]),
    [likesData, setLikesData] = useState(likes);

  const fontSizeOb = {
    small: '!text-sm',
    medium: '!text-base',
    large: '!text-lg',
    'x-large': '!text-xl',
  };

  useEffect(() => {
    if (document != undefined) {
      setStateDocument(true);
      let cookiesData = getCookie('likes');
      let cookiesLike = cookiesData ? JSON.parse(cookiesData) : [];
      setLikes(cookiesLike);

      if (cookiesLike.includes(postData.id || postData.externalId!)) {
        setPostData({ ...postData, isSelected: true });
      }
    }
  }, []);

  const image = (
    <div
      className={classNames(
        'relative mr-1 flex-shrink-0 overflow-hidden rounded-md bg-purple-700 group-open:h-28 md:mr-0',
        !featuredImageSizeWidth && !featuredImageSizeHeight
          ? horizontal
            ? 'post-last-news-img-h'
            : 'post-last-news-img'
          : '',
      )}
      style={
        featuredImageSizeWidth || featuredImageSizeHeight
          ? {
              height: featuredImageSizeHeight ?? (horizontal ? 138 : 295),
              width: featuredImageSizeWidth ?? (horizontal ? 80 : 175),
            }
          : {}
      }
    >
      <ImageComponent
        src={postData.thumbnail || postData.image || ''}
        fill
        alt={postData.title}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
        onError={(e: any) => {
          e.currentTarget.srcset = errorSrc;
        }}
        objectFit="cover"
        placeholder="blur"
        blurDataURL={errorSrc}
      />
    </div>
  );

  function VerticalType() {
    return (
      <div className={classNames(horizontal ? 'flex w-full flex-col md:max-w-[365px] md:flex-row' : 'flex flex-col')}>
        <div
          className={classNames('flex flex-col', backgroundColor ? '' : 'bg-white')}
          style={
            backgroundColor
              ? {
                  backgroundColor: backgroundColor,
                }
              : {}
          }
        >
          <div
            className={classNames(
              'md-mw:flex-wrap my-2 flex w-full max-w-full flex-1 items-center sm-mw:!flex-col sm-mw:!items-start',
              horizontal ? '!items-start md:!flex-row' : '',
              featuredImageAlign == 'right'
                ? 'flex-row-reverse items-center'
                : featuredImageAlign == 'center'
                ? 'flex-col items-center'
                : featuredImageAlign == 'left'
                ? 'flex-row items-center'
                : 'flex-col items-start',
            )}
          >
            {displayFeaturedImage && (postData.thumbnail || postData.image) && (
              <>
                {addLinkToFeaturedImage ? (
                  <a href={postData.uri || postData.link || ''} className="flex flex-col sm-mw:w-full">
                    {image}
                  </a>
                ) : (
                  image
                )}
              </>
            )}
            <a href={postData.uri || postData.link || ''} className="flex flex-col">
              <div className={'md-mw:mt-2 flex flex-1 flex-col justify-between p-0 group-open:p-4 md:px-6'}>
                {!postData?.taxonomies?.category?.some((x: any) => x.slug == category) &&
                  postData &&
                  !postData.hat &&
                  !postData?.category &&
                  postData?.taxonomies?.category?.map((x: any) => {
                    if (x.name != 'conteudo-publicitario')
                      return (
                        <div className="mb-2" key={x.id}>
                          <span
                            className={classNames('text-sm font-light', !!fontSize ? fontSizeOb[fontSize!] : '')}
                            style={{
                              color: textHatColor,
                            }}
                          >
                            {x.name == 'Sem categoria' ? 'GazzConecta' : x.name}
                          </span>
                        </div>
                      );
                  })}

                {!postData?.hat && postData && postData?.category && (
                  <div className="mb-2">
                    <span
                      className={classNames('text-sm font-light', !!fontSize ? fontSizeOb[fontSize!] : '')}
                      style={{
                        color: textHatColor,
                      }}
                    >
                      {postData?.category == 'Sem categoria' ? 'GazzConecta' : postData?.category}
                    </span>
                  </div>
                )}

                {postData?.hat && (
                  <div className="mb-2">
                    <span
                      className={classNames('text-sm font-light text-black', !!fontSize ? fontSizeOb[fontSize!] : '')}
                      style={{
                        color: textHatColor ?? '',
                      }}
                    >
                      {postData?.hat}
                    </span>
                  </div>
                )}
                <div
                  className={classNames(
                    'flex-1 text-xl font-semibold ',
                    !textColor ? 'text-gray-900' : '',
                    !!fontSize ? fontSizeOb[fontSize!] : '',
                  )}
                  style={{
                    color: textColor ?? '',
                  }}
                >
                  {postData.title}
                </div>
                {postData?.excerpt && (
                  <p
                    className={classNames(
                      'mt-6 text-base',
                      !textColor ? 'text-gray-500' : '',
                      !!fontSize ? fontSizeOb[fontSize!] : '',
                    )}
                    style={{
                      color: textColor ?? '',
                    }}
                  >
                    {postData?.excerpt}
                  </p>
                )}

                {!horizontal && displayAuthor && (
                  <div
                    className={
                      horizontal
                        ? classNames('mt-4 flex items-center justify-between')
                        : classNames('mt-1 flex items-center')
                    }
                  >
                    <div
                      className="flex cursor-default items-center"
                      style={{
                        color: textColor ?? '',
                      }}
                    >
                      {!postData?.taxonomies?.category?.some((x: any) => x.slug == category) &&
                        postData?.taxonomies?.credit?.length === 1 && (
                          <div className="mr-2 overflow-hidden" style={{ height: 27, width: 27 }}>
                            {postData?.taxonomies?.credit[0]?.url ? (
                              <ImageComponent
                                src={postData?.taxonomies?.credit[0]?.url}
                                alt={postData?.taxonomies?.credit[0]?.name as string}
                                width={27}
                                height={27}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  objectPosition: 'center',
                                }}
                                className="overflow-hidden rounded-full"
                                onError={(e: any) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.srcset = errorSrc;
                                  e.currentTarget.src = errorSrc;
                                }}
                              />
                            ) : (
                              <>{Logo}</>
                            )}
                          </div>
                        )}
                      <div className="flex items-center">
                        {postData?.taxonomies?.category?.some((x: any) => x.slug == category) && (
                          <div
                            className={classNames(
                              'mr-1 flex items-center justify-center rounded-md text-sm font-normal ',
                              !textColor ? 'text-white' : '',
                              !!fontSize ? fontSizeOb[fontSize!] : '',
                            )}
                            style={{
                              backgroundColor: '#6C6C6C',
                              width: '104px',
                              height: '23px',
                              color: textColor ?? '',
                            }}
                          >
                            {'Patrocinado'}
                          </div>
                        )}
                        {withAuthor && (
                          <div
                            className={classNames(
                              'cursor-default flex-row gap-2 text-sm font-light',
                              !!fontSize ? fontSizeOb[fontSize!] : '',
                            )}
                            style={{ color: textColor ?? '#6c6c6c' }}
                          >
                            {postData.credit
                              ? postData?.credit?.map((x: any, y: any) => (
                                  <span
                                    className="text-base font-light"
                                    key={x.id}
                                    style={{
                                      color: textColor ?? '',
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: textColor ?? '',
                                      }}
                                    >
                                      {x.name}
                                    </span>
                                    <br />
                                  </span>
                                ))
                              : postData?.taxonomies?.credit?.map((x: any, y: any) => (
                                  <span
                                    key={x.id}
                                    className="text-base font-light"
                                    style={{
                                      color: textColor ?? '',
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: textColor ?? '',
                                      }}
                                    >
                                      {x.name}
                                    </span>
                                    <br />
                                  </span>
                                ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {!postData?.taxonomies?.category?.some((x: any) => x.slug == category) && (
                      <div>
                        <div className="mx-12 flex items-center">
                          {postData?.likes != null && postData?.likes >= 5 && (
                            <p
                              className="mr-1.5 cursor-default"
                              style={{
                                color: textColor ?? '',
                              }}
                            >
                              {postData?.likes || 0}
                            </p>
                          )}
                          <button
                            onClick={async (e) => {
                              let postCopy = postData;
                              postData.isSelected = true;
                              setPostData({ ...postCopy });
                              await sendData(postData?.id ?? postData?.externalId ?? 0);
                            }}
                          >
                            {postData.isSelected ||
                            (postData.id != null || postData.externalId != null
                              ? likes.includes(postData.id || postData.externalId!)
                              : false) ? (
                              <BsHandThumbsUpFill></BsHandThumbsUpFill>
                            ) : (
                              <BsHandThumbsUp></BsHandThumbsUp>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </a>
          </div>
          {horizontal && displayAuthor && (
            <div
              className={
                horizontal ? classNames('mt-4 flex items-center justify-between') : classNames('mt-1 flex items-center')
              }
            >
              <div
                className="flex cursor-default items-center"
                style={{
                  color: textColor ?? '',
                }}
              >
                {!postData?.taxonomies?.category?.some((x: any) => x.slug == category) &&
                  postData?.taxonomies?.credit?.length === 1 && (
                    <div className="mr-2 overflow-hidden" style={{ height: 27, width: 27 }}>
                      {postData?.taxonomies?.credit[0]?.url ? (
                        <ImageComponent
                          src={postData?.taxonomies?.credit[0]?.url}
                          alt={postData?.taxonomies?.credit[0]?.name as string}
                          width={27}
                          height={27}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                          }}
                          className="overflow-hidden rounded-full"
                          onError={(e: any) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.srcset = errorSrc;
                            e.currentTarget.src = errorSrc;
                          }}
                        />
                      ) : (
                        <div>{Logo}</div>
                      )}
                    </div>
                  )}
                <div className="flex items-center">
                  {postData?.taxonomies?.category?.some((x: any) => x.slug == category) && (
                    <div
                      className={classNames(
                        'mr-1 flex items-center justify-center rounded-md text-sm font-normal ',
                        !textColor ? 'text-white' : '',
                        !!fontSize ? fontSizeOb[fontSize!] : '',
                      )}
                      style={{
                        backgroundColor: '#6C6C6C',
                        width: '104px',
                        height: '23px',
                        color: textColor ?? '',
                      }}
                    >
                      {'Patrocinado'}
                    </div>
                  )}
                  {withAuthor && (
                    <div
                      className={classNames(
                        'cursor-default flex-row gap-2 text-sm font-light',
                        !!fontSize ? fontSizeOb[fontSize!] : '',
                      )}
                      style={{ color: textColor ?? '#6c6c6c' }}
                    >
                      {postData.credit
                        ? postData?.credit?.map((x: any, y: any) => (
                            <span
                              className="text-base font-light"
                              key={x.id}
                              style={{
                                color: textColor ?? '',
                              }}
                            >
                              <span
                                style={{
                                  color: textColor ?? '',
                                }}
                              >
                                {x.name}
                              </span>
                              <br />
                            </span>
                          ))
                        : postData?.taxonomies?.credit?.map((x: any, y: any) => (
                            <span
                              key={x.id}
                              className="text-base font-light"
                              style={{
                                color: textColor ?? '',
                              }}
                            >
                              <span
                                style={{
                                  color: textColor ?? '',
                                }}
                              >
                                {x.name}
                              </span>
                              <br />
                            </span>
                          ))}
                    </div>
                  )}
                </div>
              </div>
              {!postData?.taxonomies?.category?.some((x: any) => x.slug == category) && (
                <div>
                  <div className="mx-12 flex items-center">
                    {postData?.likes != null && postData?.likes >= 5 && (
                      <p
                        className="mr-1.5 cursor-default"
                        style={{
                          color: textColor ?? '',
                        }}
                      >
                        {postData?.likes || 0}
                      </p>
                    )}
                    <button
                      onClick={async (e) => {
                        let postCopy = postData;
                        postData.isSelected = true;
                        setPostData({ ...postCopy });
                        await sendData(postData?.id ?? postData?.externalId ?? 0);
                      }}
                    >
                      {postData.isSelected ||
                      (postData.id != null || postData.externalId != null
                        ? likes.includes(postData.id || postData.externalId!)
                        : false) ? (
                        <BsHandThumbsUpFill></BsHandThumbsUpFill>
                      ) : (
                        <BsHandThumbsUp></BsHandThumbsUp>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {displayPostContent && (
            <div className={classNames('group-open:p-4 md:px-6', !!fontSize ? fontSizeOb[fontSize!] : '')}>
              <p
                style={{
                  color: textColor ?? '',
                }}
              >
                {displayPostContentRadio == 'Full Post'
                  ? postData.seoDescription
                  : postData.seoDescription?.substring(0, excerptLength ?? 55) + '...'}
              </p>
            </div>
          )}
        </div>
        {haveBorder && (
          <div
            className={classNames(horizontal ? 'my-3 h-px w-full md:mx-4 md:h-full md:w-px' : 'my-3 h-px w-full')}
            style={{
              backgroundColor: '#00000033',
            }}
          ></div>
        )}
      </div>
    );
  }

  return VerticalType();
}
