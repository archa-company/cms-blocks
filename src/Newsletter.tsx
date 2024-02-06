'use client';
import classNames from 'classnames';
import Link from 'next/link';
// import { sendDataElastic } from './functions'
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface INewsLetterList {
  name: string;
  default: string;
  type: string;
}
export interface INewsLetterView {
  content: string;
  title: string;
  alignment: string;
  list: Array<INewsLetterList>;
  button: string;
  url: string;
  image: string;
  termsOfUse: string;
  backgroundColor: string;
  color: string;
  buttonColor?: string;
  buttonClass?: string;
  formSubmit: (url: string, z: any) => Promise<void>;
  domain: string;
}
export default function NewsLetterView({
  content,
  title,
  alignment,
  list,
  button,
  url,
  image,
  termsOfUse,
  backgroundColor,
  color,
  buttonColor,
  buttonClass,
  formSubmit,
  domain,
}: INewsLetterView) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const mask = {
      zeroFix: (s: string, n: number): string => Array(n - s.length + 1 > 0 ? n - s.length + 1 : 0).join('0') + s,
      cpf: (i: any): string =>
        i === null
          ? i
          : i
              .toString()
              .replace(/\D/g, '')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d{1,2})/, '$1-$2')
              .replace(/(\-\d{2})\d+?$/, '$1'),
      cnpj: (i: any): string =>
        i === null
          ? i
          : i
              .toString()
              .replace(/\D/g, '')
              .replace(/(\d{2})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1.$2')
              .replace(/(\d{3})(\d)/, '$1/$2')
              .replace(/(\d{4})(\d{1,2})/, '$1-$2')
              .replace(/(\-\d{2})\d+?$/, '$1'),
      phone: (i: any): string =>
        i === null
          ? i
          : i
              .toString()
              .replace(/\D/g, '')
              .substr(0, 11)
              .replace(/^(.)/, '($1')
              .replace(/^(.{3})(.)/, '$1) $2')
              .replace(/(\d)(\d{8})$/, '$1 $2')
              .replace(/(\d{4})(\d{4})$/, '$1-$2'),
      url: (i: string): string => (i === null ? i : i.toString().replace(/[^a-z0-9\._%+&=\-@:\/]/, '')),
      decimal: (i: string | number): string =>
        i === null
          ? '0'
          : i
              .toString()
              .replace(/[^0-9\.,\-]/g, '')
              .replace(/,/g, '.')
              .replace(/(?!^)-/, '')
              .replace(/(\..*)\./g, '$1'),
      money: (i: string): string =>
        `R$ ${
          i === null
            ? '0'
            : (+i.toString().replace(/\D/g, '')).toString().length < 3
            ? `0,${mask.zeroFix((+i.toString().replace(/\D/g, '')).toString(), 2)}`
            : (+i.toString().replace(/\D/g, ''))
                .toString()
                .replace(/^(\d+)(\d{2})$/g, '$1,$2')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }`,
      email: (i: string): string =>
        i === null
          ? i
          : i
              .toString()
              .toLowerCase()
              .replace(/[^a-z0-9\._%+\-@]/, '')
              .replace(/(@.*)@/g, '$1'),
      set: (n: string, s: string) => (!!(mask as any)[n] ? (mask as any)[n](s) : s),
    },
    sendData = async (x: FormData) => {
      if (!isLoading) {
        setIsLoading(true);
        if (!!x.get('checkNew')) {
          const z = { siteId: domain || 'gazzconecta' };
          x.forEach((x, y) => {
            if (y !== 'checkNew') (z as any)[y] = x;
          });
          await formSubmit(url, z);
        }
        setTimeout(() => {
          setIsLoading(false);
          setIsSended(true);
          toast.success('Dados enviados!');
        }, 2000);
        //toast
        return 'OI';
      }
    };
  return (
    <div
      className={`top-newsletter my-8 flex flex-col p-4 ${
        !!alignment && alignment !== 'none' ? 'text-' + alignment : ''
      }`}
      style={{
        backgroundImage: `url(${image || ''})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: color || 'black',
        backgroundColor: backgroundColor || 'silver',
      }}
    >
      <p>{title || 'NewsLetter'}</p>
      {isSended ? (
        <div className="top-newsletter-sended">
          <p>Obrigado por se cadastrar na nossa newsletter!</p>
        </div>
      ) : (
        <form
          onSubmit={async (x) => {
            x.preventDefault();
            await sendData(new FormData(x.currentTarget));
          }}
        >
          <div>
            <p className="my-4">{content || 'Mensagem'}</p>
            {(
              list || [
                { name: 'name', default: 'Nome', type: 'text' },
                { name: 'email', default: 'Email', type: 'email' },
              ]
            ).map((x) => (
              <input
                key={x.name}
                className="my-3 h-11 w-full rounded bg-white p-2 text-black"
                type={['text', 'password', 'number', 'date', 'time'].includes(x.type) ? x.type : 'text'}
                name={x.name}
                onChange={(e) => (e.target.value = mask.set(x.name, e.target.value))}
                placeholder={x.default}
              ></input>
            ))}
            <div className="mx-2 my-3 mb-6">
              <div className="round mr-2 inline">
                <input id="checkbox" type="checkbox" name="checkNew" />
                <label htmlFor="checkbox"></label>
              </div>
              <label htmlFor="checkbox" className="inline text-sm">
                Declaro que li e concordo com os{' '}
                <Link href={termsOfUse ?? ''}>
                  <b className="underline-bold">Termos de uso</b>
                </Link>
              </label>
            </div>
            <div
              className={`flex justify-${
                !!alignment && alignment !== 'none'
                  ? { left: 'start', center: 'center', right: 'end' }[alignment]
                  : 'center'
              } items-center`}
            >
              <button
                className={classNames('rounded px-10 py-1 font-semibold text-black', buttonClass)}
                style={{ backgroundColor: buttonColor ?? color ?? 'var(--primary-color)' }}
                type="submit"
                disabled={isSended}
              >
                {isLoading ? 'Enviando' : isSended ? 'Enviado!' : button ?? 'Enviar'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
