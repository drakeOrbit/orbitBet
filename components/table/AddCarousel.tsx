'use client';
import Image from 'next/image';
// Import Swiper React components
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';

import { useLocale } from 'next-intl';

type Props = {
  border: string;
};

const PostAddCarousel = ({ border }: Props) => {
  const locale = useLocale();
  return (
    <div
      style={{ border: `2px solid #${border}` }}
      className="rounded-xl p-4 h-[377px] glow-hover border-mini-glow "
    >
      <Swiper
        modules={[Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          800: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1110: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 1,
          },
          1550: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mt-4"
      >
        {carouselContent.map((content) => (
          <SwiperSlide key={content.id} className=" ">
            <p className="text-center text-white text-base lg:text-lg font-medium mb-4 h-[40px] ">
              {content.title}
            </p>
            <div className="w-[80%] h-[120px] lg:h-[160px] mx-auto  rounded-xl mb-6">
              <Image
                className="object-contain"
                src={content.image}
                width={750}
                height={750}
                alt="google/blue"
              />
            </div>
            <Link
              target="_blank"
              href={content.link}
              className="mt-16 w-[90%] text-sm lg:text-base lg:w-[60%] block mx-auto text-center glow-purple-hover-btn text-white bg-orbitPurple  p-2 rounded-xl font-semibold "
            >
              {locale === 'tr' ? 'İncele' : 'Review'}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostAddCarousel;

const carouselContent = [
  {
    id: 1,
    title: 'Promosyon Kalem',
    link: 'https://ekartvizit.co/urun/promosyon-kalem/',
    image: '/adds/kartvizit1.jpg',
  },
  {
    id: 2,
    title: 'Kartvizit',
    link: 'https://ekartvizit.co/urun/standart-kartvizit/',
    image: '/adds/kartvizit2.jpg',
  },
  {
    id: 3,
    title: 'Yelken Bayrak',
    link: 'https://ekartvizit.co/urun/yelken-bayrak/',
    image: '/adds/kartvizit3.jpg',
  },
];
