"use client";

import { forwardRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence, wrap } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ExoticImage = forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper(props, ref) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image {...props} ref={ref} />;
  }
);

const ImageComponent = motion(ExoticImage);

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface CarouselProps {
  images: Array<string | StaticImport>;
}

export default function Carousel({ images }: CarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="h-full relative">
      {images.length > 0 && (
        <>
          <AnimatePresence initial={false} custom={direction}>
            <ImageComponent
              fill
              priority
              alt="carousel-image"
              key={page}
              src={images[imageIndex]}
              className="absolute object-cover h-full w-full"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              // @ts-ignore
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
          <div
            className="z-10 absolute top-1/2 -translate-y-1/2 left-1 w-10 h-10 rounded-full flex justify-center items-center bg-black/50 hover:bg-black/20 cursor-pointer"
            onClick={() => paginate(1)}
          >
            <FontAwesomeIcon icon={faCaretLeft} className="w-5 h-5" />
          </div>
          <div
            className="z-10 absolute top-1/2 -translate-y-1/2 right-1 w-10 h-10 rounded-full flex justify-center items-center bg-black/50 hover:bg-black/20 cursor-pointer"
            onClick={() => paginate(-1)}
          >
            <FontAwesomeIcon icon={faCaretRight} className="w-5 h-5" />
          </div>
        </>
      )}
    </div>
  );
}
