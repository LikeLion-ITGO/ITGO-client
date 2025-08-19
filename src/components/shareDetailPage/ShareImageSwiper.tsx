import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "@/index.css";

import sampleBigMilk from "@/assets/images/sampleBigMilk.png";

const images = [sampleBigMilk, sampleBigMilk, sampleBigMilk, sampleBigMilk];

export const ShareImageSwiper = () => {
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
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`img${idx}`}
              className=" w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
