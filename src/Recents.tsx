'use client';
import styled from 'styled-components';
import { PostNews } from './types/Post';

export interface IRecentsView {
  title: string;
  color: string;
  backgroundColor: string;
  alignment: 'none' | 'center' | 'left' | 'right';
  length: number;
  days: number;
  posts: PostNews[];
  lineColor?: string;
}

export default function RecentsView({
  title,
  color,
  backgroundColor,
  alignment = 'none',
  posts,
  lineColor,
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
              <div className="my-5 flex flex-auto">
                <div className="inline-block">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-center font-bold text-white">
                    <p className=" m-auto p-0 text-center">{y + 1}</p>{' '}
                  </div>
                </div>
                <div
                  style={{
                    color: color || 'black',
                    backgroundColor: backgroundColor || 'var(--primary-color)',
                    marginLeft: '-11px',
                    padding: '5px 8px',
                  }}
                >
                  <p className="text-[22px] font-semibold sm:text-lg">{x.title}</p>
                  {x.author && <p>{x.author.name}</p>}
                </div>
              </div>
            </a>
            {y !== posts.length - 1 ? (
              <div className="flex justify-center">
                <div
                  style={{
                    width: '90%',
                    height: '3px',
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
