'use client';

import React, { FC, useEffect, useState } from 'react';
import { wrap } from 'popmotion';
import { AnimatePresence, motion } from 'framer-motion';
import ImageComponent from './Image';

interface IBannerSlide {
  posts: {
    id: number;
    externalId: number;
    uri: string;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
    credit: {
      id: number;
      name: string;
      slug: string;
      url: string;
    }[];
    createdAt: string;
    showThumbnail: boolean;
  }[];
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function BannerSlide(props: IBannerSlide) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, props.posts.length, page);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timerId;
    if (!paused) {
      timerId = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
      console.log(timerId);
    }

    return function cleanup() {
      console.log(`Clearing ${timerId}`);
      clearInterval(timerId);
    };
  }, [paused]);

  useEffect(() => {
    if (duration == 10) {
      setDuration(0);
      paginate(1);
    }
  }, [duration]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="click-tm group relative flex h-screen max-h-[600px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className=" absolute top-0 left-0 right-0 h-full w-full"
          key={page}
          custom={direction}
          variants={{
            enter: (direction: number) => {
              return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
                objectFit: 'cover',
                objectPosition: 'center',
              };
            },
            center: {
              zIndex: 1,
              x: 0,
              opacity: 1,
              objectFit: 'cover',
              objectPosition: 'center',
            },
            exit: (direction: number) => {
              return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
                objectFit: 'cover',
                objectPosition: 'center',
              };
            },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onClick={(e) => {
            // console.log(isMoving);
            if (isMoving) return;
            var rect = (e.target as any).getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            if (x <= 80) {
              paginate(-1);
              setDuration(0);
            } else if (x >= e.currentTarget.offsetWidth - 80) {
              paginate(1);
              setDuration(0);
            } else if (x >= 50 && x <= e.currentTarget.offsetWidth - 80) {
              window.open(props.posts[imageIndex].uri, '_self');
            }
          }}
          onDrag={(e: any) => {
            e.target.style.cursor = 'grabbing';
            setIsMoving(true);
          }}
          onDragEnter={() => {
            setIsMoving(true);
          }}
          onDragEnd={(e: any, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
              setDuration(0);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
              setDuration(0);
            }
            setIsMoving(false);
            e.target.style.cursor = 'pointer';
          }}
        >
          <div className="absolute z-30 flex h-full w-full justify-between">
            <div className="absolute bottom-2 flex h-full max-w-xl flex-col justify-end px-4 pb-2 sm:max-h-40">
              <div className="text-xl font-bold text-white drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]">
                {props.posts[imageIndex].category}
              </div>
              <div className="my-2"></div>
              <div className=" overflow-ellipsis text-2xl font-bold text-white drop-shadow-[0_2px_1px_rgba(0,0,0)]">
                {props.posts[imageIndex].title}
              </div>
              <div className="my-2"></div>
              <div className="flex gap-2">
                {props.posts.map((x, i) => (
                  <div
                    className="flex overflow-hidden transition-all"
                    style={{
                      borderRadius: 10,
                      width: `calc(100% / ${props.posts.length})`,
                      height: '10px',
                      backgroundColor: '#ffffff30',
                    }}
                  >
                    {imageIndex == i || imageIndex > i ? (
                      <div
                        className="transition-all"
                        style={{
                          width: imageIndex == i ? `calc((100% * ${duration}) / 10)` : '100%',
                          height: '100%',
                          backgroundColor: 'white',
                        }}
                      ></div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute left-0 right-0 top-0 z-20 h-full w-full bg-image"></div>
          <ImageComponent
            src={props.posts[imageIndex].thumbnail}
            alt={''}
            fill
            className="absolute top-0 left-0 right-0 z-10 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          ></ImageComponent>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
