import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
// import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function FirstSlider() {
  const slides = [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
    { id: 3, content: 'Slide 3' },
    { id: 4, content: 'Slide 4' },
  ]

  return (
    <div className="contswiper">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
        }}
        // Добавляем для дебага
        onSlideChange={(swiper) =>
          console.log('Slide index:', swiper.realIndex)
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} style={{ height: 'auto' }}>
            <div className="slide-content">{slide.content}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
