import { motion, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ImageSlider = ({ images, className }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const dragX = useMotionValue(0);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -80 && imgIndex < images?.length - 1) {
      setImgIndex((prevIndex) => prevIndex + 1);
    } else if (x >= 80 && imgIndex > 0) {
      setImgIndex((prevIndex) => prevIndex - 1);
    }
  };

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className={cn(
        "group relative aspect-square h-full w-full overflow-hidden rounded-lg",
        className,
      )}
      onClick={stopPropagation}
    >
      <div className="pointer-events-none absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-5">
        <button
          style={imgIndex === 0 ? { opacity: 0 } : {}}
          className="pointer-events-auto h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (imgIndex > 0) {
              setImgIndex((prevIndex) => prevIndex - 1);
            }
          }}
        >
          <ChevronLeft className="stroke-neutral-600" size={20} />
        </button>
        <button
          style={imgIndex === images?.length - 1 ? { opacity: 0 } : {}}
          className="pointer-events-auto h-fit w-fit rounded-full bg-white/80 p-2 opacity-0 transition-all group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (imgIndex < images?.length - 1) {
              setImgIndex((prevIndex) => prevIndex + 1);
            }
          }}
        >
          <ChevronRight className="stroke-neutral-600" size={20} />
        </button>
      </div>
      <div className="pointer-events-none absolute bottom-2 z-10 flex w-full items-center justify-center">
        <div className="flex w-9 items-center justify-center rounded-md bg-black/80 p-0.5 text-xs text-white opacity-0 transition-all group-hover:opacity-100">
          <div>
            {imgIndex + 1}/{images?.length}
          </div>
        </div>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: -((images?.length - 1) * 100), right: 0 }}
        dragMomentum={false}
        style={{ x: dragX }}
        animate={{ x: `-${imgIndex * 100}%` }}
        onDragEnd={onDragEnd}
        transition={{
          damping: 18,
          stiffness: 90,
          type: "spring",
          duration: 0.2,
        }}
        className="flex h-full cursor-grab items-center"
      >
        {images?.map((src, i) => (
          <motion.div
            key={i}
            className="h-full w-full shrink-0 overflow-hidden"
          >
            <img
              src={src}
              alt={`Slide ${i}`}
              className="h-full w-full object-cover"
              onClick={stopPropagation}
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageSlider;
