'use client';

import React, { useEffect, useState } from 'react';
import ImageComponent from './Image';

export default function BannerView({ imageLink, classData, anchorHref }) {
  useEffect(() => {
    let itemVerify = document.querySelector(`.${classData}`);

    let elementAnchor = document.createElement('a');
    elementAnchor.href = anchorHref;
    elementAnchor.setAttribute('class', 'img');
    elementAnchor.target = '_blank';
    elementAnchor.rel = 'noopener noreferrer';

    let element = document.createElement('img');
    element.setAttribute('src', imageLink);
    element.setAttribute('width', '100%');

    elementAnchor.appendChild(element);

    if (itemVerify.childNodes.length > 2) {
      let pn = itemVerify.children[1];

      let item = itemVerify.children[1] as any;

      const scroll = () => {
        if (document.querySelector('.img')) return;

        if (item.offsetTop < window.scrollY) {
          pn.parentNode.insertBefore(elementAnchor, pn);
        }
      };

      document.removeEventListener('scroll', (e) => {
        scroll();
      });
      document.addEventListener('scroll', (e) => {
        scroll();
      });
      document.removeEventListener('scroll', (e) => {
        scroll();
      });
    }
  }, []);

  return <></>;
}
