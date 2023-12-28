'use client';

import styled from 'styled-components';
import { PostNews } from './types/Post';
import { PropsWithChildren, ReactNode } from 'react';

export interface IDetailtsView extends PropsWithChildren {
  summary?: string;
}

export default function DetailtsView({ summary, children }: IDetailtsView) {
  return (
    <DetailtsBlock>
      {summary && <summary>{summary}</summary>}
      {children}
    </DetailtsBlock>
  );
}

const DetailtsBlock = styled.details`
  padding: 0 10px;
  width: 100%;
  max-width: 100%;
  min-height: 100px;
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
