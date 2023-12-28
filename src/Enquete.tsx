'use client';
import { useState } from 'react';
import styled from 'styled-components';

export interface IEnquenteView {
  content: string;
  title: string;
  alignment: string;
  list: string[];
  button: string;
  url: string;
  color?: string;
  backgroundColor: string;
  id: string;
  formSubmit: (url: string, { id, siteId, choice }) => Promise<any[]>;
  siteId: string;
}
export default function EnquenteView({
  content,
  title,
  alignment,
  list,
  button,
  url,
  color,
  backgroundColor,
  id,
  formSubmit,
  siteId,
}: IEnquenteView) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [listInputs, setListInputs] = useState(list?.map((x) => ({ enqueteLabel: x, total: 0, percent: '0' })) ?? []);

  const sendData = async (x: FormData) => {
    if (!isLoading) {
      try {
        let enquetes = await formSubmit(url, { id, siteId: siteId, choice: x.get('choice')?.toString() || '' });
        setIsLoading(false);
        setIsSended(true);
        setListInputs([
          ...listInputs?.map((x) => {
            if (enquetes?.findIndex((y) => y.enqueteLabel == x.enqueteLabel) != -1) {
              return enquetes[enquetes?.findIndex((y) => y.enqueteLabel == x.enqueteLabel)];
            } else {
              return x;
            }
          }),
        ]);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  return (
    <TopEnqueteBlock
      className={`top-enquete my-8 flex flex-col ${!!alignment && alignment !== 'none' ? 'text-' + alignment : ''}`}
      style={{
        color: color || 'black',
        backgroundColor: backgroundColor || 'silver',
      }}
    >
      <p>{title || 'Enquete'}</p>
      {isSended ? (
        <div className="my-3 px-2">
          <p className="text-base">{content || 'Pergunta?'}</p>
          <div
            className={`my-4 flex flex-col gap-3 ${
              !!alignment && alignment !== 'none'
                ? 'items-' + { left: 'start', center: 'center', right: 'end' }[alignment]
                : ''
            }`}
          >
            {listInputs?.map((x) => {
              return (
                <div className="flex flex-col" key={x.enqueteLabel}>
                  <div className="mb-1 inline">
                    <span className="font-medium">{x.enqueteLabel}</span> ({x.percent}%)
                  </div>
                  <div
                    style={{
                      width: (Number(x.percent) / 100) * 342,
                      minWidth: 20,
                      borderRadius: '20px',
                      background: color ?? 'var(--primary-color)',
                      border: '0.5px solid #000',
                      height: 18,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <form
          onSubmit={async (x) => {
            x.preventDefault();
            await sendData(new FormData(x.currentTarget));
            return;
          }}
        >
          <div className="my-3 px-2">
            <p className="text-base">{content || 'Pergunta?'}</p>
            <div
              className={`my-4 flex flex-col gap-3 ${
                !!alignment && alignment !== 'none'
                  ? 'items-' + { left: 'start', center: 'center', right: 'end' }[alignment]
                  : ''
              }`}
            >
              {listInputs?.map((x, y) => {
                return (
                  <div className="flex items-center" key={x.enqueteLabel}>
                    <input
                      id={y.toString()}
                      type="radio"
                      name="choice"
                      className="boxradio mr-2 inline"
                      value={x.enqueteLabel}
                    />
                    <label htmlFor={y.toString()} className="inline text-sm">
                      <p className="inline">{x.enqueteLabel}</p>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`flex justify-${
              !!alignment && alignment !== 'none'
                ? { left: 'start', center: 'center', right: 'end' }[alignment]
                : 'center'
            } px-3`}
          >
            <button disabled={isSended} type="submit" className="rounded bg-black px-10 py-1 text-white">
              {isLoading ? 'Enviando' : isSended ? 'Enviado!' : button ?? 'Enviar'}
            </button>
          </div>
        </form>
      )}
    </TopEnqueteBlock>
  );
}

const TopEnqueteBlock = styled.div`
  padding: 0 5px 20px;
  width: 100%;
  max-width: 100%;
  min-height: 100px;
  border-radius: 5px;
  max-height: 433px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;

  & > p {
    font-size: 27px;
    line-height: 29px;
    font-weight: 700;
    margin-top: -20px;
  }
`;

const TopEnqueteBox = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
