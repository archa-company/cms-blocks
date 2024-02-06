'use client';
import styled from 'styled-components';
import { PostNews } from './types/Post';
import classNames from 'classnames';

export interface IRecentsView {
  title: string;
  color: string;
  backgroundColor: string;
  alignment: 'none' | 'center' | 'left' | 'right';
  length: number;
  days: number;
  posts: PostNews[];
  lineColor?: string;
  lineHeight?: string | number;
  leftBallFunc?: (index: number) => React.ReactNode;
  titleClass?: any;
  titleChildClass?: any;
  postBlockClass?: string;
}

export default function RecentsView({
  title,
  color,
  backgroundColor,
  alignment = 'none',
  posts,
  lineColor,
  lineHeight,
  leftBallFunc,
  titleClass,
  titleChildClass,
  postBlockClass,
}: IRecentsView) {
  return (
    <TopRecentsBlock
      className={`top-recents md-mw:w-full my-8 flex flex-col ${
        !!alignment && alignment !== 'none' ? 'text-' + alignment : ''
      }`}
      style={{
        backgroundColor: backgroundColor || 'var(--primary-color)',
      }}
    >
      <p>{title || 'Mais recentes da semana'}</p>
      <TopRecentsBox className="top-recents-box flex w-full flex-col">
        {posts?.map((x, y) => (
          <div key={y}>
            <a href={x.uri || x.link} key={y}>
              <div className={classNames('my-5 flex flex-auto', postBlockClass)}>
                <div className="inline-block">
                  {leftBallFunc != null ? (
                    leftBallFunc(y + 1)
                  ) : (
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-center font-bold text-white">
                      <p className=" m-auto p-0 text-center">{y + 1}</p>{' '}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    backgroundColor: backgroundColor || 'var(--primary-color)',
                    marginLeft: '-11px',
                    padding: '0px 8px',
                    ...titleClass,
                  }}
                >
                  <p
                    className="text-[22px] font-semibold sm:text-lg"
                    style={{ color: color || 'black', ...titleChildClass }}
                    dangerouslySetInnerHTML={{
                      __html: x.title,
                    }}
                  ></p>
                  {x.author && <p>{x.author.name}</p>}
                </div>
              </div>
            </a>
            {y !== posts.length - 1 ? (
              <div className="flex justify-center">
                <div
                  style={{
                    width: '90%',
                    height: lineHeight ?? '3px',
                    backgroundColor: lineColor ?? 'var(--second-color)',
                  }}
                ></div>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </TopRecentsBox>
    </TopRecentsBlock>
  );
}

const TopRecentsBlock = styled.div`
  padding: 0 10px;
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  height: 433px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`;

const TopRecentsBox = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
