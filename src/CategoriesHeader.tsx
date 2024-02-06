'use client';

import React from 'react';
import styled from 'styled-components';

interface ICategoriesHeader {
  allCategories: boolean;
  image: string;
  color?: string;
  backgroundColor?: string;
  categories: {
    id: number;
    name: string;
    url: string;
    description: string;
    slug: string;
  }[];
  lineBarColor?: string;
  textMore?: string;
  buttonMobileColor?: string;
}

export default function CategoriesHeader({
  categories,
  allCategories,
  image,
  color,
  backgroundColor,
  lineBarColor,
  textMore,
  buttonMobileColor,
}: ICategoriesHeader) {
  let [open, setOpen] = React.useState(false);

  return (
    <CategoriesHeaderHolderBlock backgroundColor={backgroundColor}>
      <CategoriesHeaderBlock>
        <LogoHeaderBlock>
          <a href="/">
            <img src={image}></img>
          </a>
        </LogoHeaderBlock>
        {categories?.length > 0 && (
          <MenuHeaderBlock>
            <MenuBlock>
              <div className="desk">
                {categories?.slice(0, 3).map((x, y) => {
                  return (
                    <MenuHeaderItemBlock
                      as="a"
                      href={x.url}
                      continue={y != categories.length - 1}
                      fontColor={color}
                      lineBarColor={lineBarColor}
                    >
                      {x.name}
                    </MenuHeaderItemBlock>
                  );
                })}
                {categories?.length > 3 && (
                  <>
                    <MenuGroupButton
                      opended={open}
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                          d="M17 14l-5-5-5 5z"
                          className="cls-1"
                          data-name="Caminho 221"
                          fill={lineBarColor ?? 'white'}
                        ></path>
                      </svg>
                    </MenuGroupButton>
                    <MenuGroupBlock opended={open} backgroundColor={backgroundColor}>
                      {categories.slice(3, categories.length).map((x, y) => {
                        return (
                          <MenuHeaderItemBlock
                            continue={false}
                            as="a"
                            href={x.url}
                            fontColor={color}
                            lineBarColor={lineBarColor}
                          >
                            {x.name}
                          </MenuHeaderItemBlock>
                        );
                      })}
                    </MenuGroupBlock>
                  </>
                )}
              </div>
              <div className="mobile">
                {categories.length > 0 && (
                  <>
                    <MenuGroupButton
                      opended={open}
                      onClick={() => {
                        setOpen(!open);
                      }}
                      haveContentLeft
                      buttonMobileColor={buttonMobileColor}
                    >
                      <span style={{ color }}>{textMore ?? 'Mais'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                        <path
                          d="M17 14l-5-5-5 5z"
                          className="cls-1"
                          data-name="Caminho 221"
                          fill={lineBarColor ?? 'white'}
                        ></path>
                      </svg>
                    </MenuGroupButton>
                    <MenuGroupBlock opended={open} backgroundColor={backgroundColor}>
                      {categories.map((x, y) => {
                        return (
                          <MenuHeaderItemBlock
                            continue={false}
                            as="a"
                            href={x.url}
                            fontColor={color}
                            lineBarColor={lineBarColor}
                          >
                            {x.name}
                          </MenuHeaderItemBlock>
                        );
                      })}
                    </MenuGroupBlock>
                  </>
                )}
              </div>
            </MenuBlock>
          </MenuHeaderBlock>
        )}
      </CategoriesHeaderBlock>
    </CategoriesHeaderHolderBlock>
  );
}

const CategoriesHeaderHolderBlock = styled.div<{ backgroundColor?: string }>`
  position: relative;
  height: auto;
  margin: 0 auto;
  padding: 15px;
  background-color: ${(props) => props.backgroundColor ?? 'var(--primary-color)' ?? 'black'};

  /* &::after {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid black;
    content: '';
    height: 0;
    left: calc(50% - 8px);
    position: absolute;
    top: 100%;
    width: 0;
  } */
`;

const CategoriesHeaderBlock = styled.div<{ color?: string }>`
  height: auto;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1147px) {
    max-width: 1024px;
  }

  @media screen and (min-width: 1148px) {
    max-width: 1148px;
  }
`;

const LogoHeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    height: 50px;
    width: auto;
  }
`;

const MenuBlock = styled.div`
  .desk {
    display: flex;
    position: relative;
  }

  .mobile {
    display: none;
    position: relative;
  }
  @media screen and (max-width: 650px) {
    .desk {
      display: none;
      position: relative;
    }

    .mobile {
      display: block;
      position: relative;
    }
  }
`;

const MenuHeaderBlock = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuHeaderItemBlock = styled.div<{ continue?: boolean; fontColor?: string; lineBarColor?: string }>`
  position: relative;
  color: ${(props) => props?.fontColor ?? 'black'};
  font-size: 1rem;
  font-weight: bold;
  padding: 0 15px;
  line-height: 125%;

  &:hover {
    text-decoration: underline;
  }

  &:after {
    content: '';
    width: 1px;
    height: 18px;
    float: left;
    margin-right: 10px;
    display: ${(props) => (props.continue ? 'flex' : 'none')};
    background-color: ${(props) => (!!props.lineBarColor ? props.lineBarColor : 'white')};
    margin-right: 0;
    margin-top: -10px;
    position: absolute;
    right: 0;
    top: 10px;
  }
`;

const MenuGroupButton = styled.div<{ opended: boolean; haveContentLeft?: boolean; buttonMobileColor?: string }>`
  cursor: pointer;
  margin-left: 10px;
  transition: all 0.3s ease;
  display: flex;
  ${(prop) =>
    prop.haveContentLeft
      ? `
        background: ${prop.buttonMobileColor ?? 'white'};
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        border: 0;
        color: #ffffff;
        border-radius: 6px;
        text-align: center;
        margin: 0;
        padding: 0 0px 0 10px;
        `
      : `transform: rotate(${prop.opended ? '0deg' : '180deg'});`}

  ${(prop) =>
    prop.haveContentLeft
      ? `
        & svg {
            transition: all 0.3s ease;
            transform: rotate(${prop.opended ? '0deg' : '180deg'});
        }
      `
      : ``}
`;

const MenuGroupBlock = styled.div<{ opended: boolean; backgroundColor?: string }>`
  position: absolute;
  overflow-y: scroll;
  max-height: calc(100vh / 2);
  transition: transform 0.1s ease-out;
  transform: scaleY(${(props) => (props.opended ? '1' : '0')});
  ${(props) => (props.opended ? 'height: auto;' : '')}
  transform-origin: top;
  padding: 15px 0;
  top: 100%;
  right: 0;
  background-color: ${(props) => props.backgroundColor ?? 'var(--primary-color)' ?? 'black'};
  border: 1px solid #2a2a2a;
  width: 300px;
  z-index: 9;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
