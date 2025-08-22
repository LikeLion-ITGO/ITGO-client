import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/index.css";

import type { ShareImage } from "@/types/share";
type ShareImageSwiperProps = {
  imgs: ShareImage[];
};

export const ShareImageSwiper = ({ imgs }: ShareImageSwiperProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
        }}
        spaceBetween={1}
        slidesPerView={1}
        className="w-full h-full"
      >
        {imgs.length > 0 ? (
          imgs.map((img: ShareImage) => (
            <SwiperSlide key={img.seq}>
              <img
                src={img.publicUrl}
                alt={`share-image-${img.seq}`}
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            {/* 폴백 이미지/빈 상태 */}
            <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-gray-400">
              No Image
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
