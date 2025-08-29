// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";

const Banner = () => {
  // Generate an array of 10 random image URLs
  const randomImages = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/1200/630`,
  }));

  // Array of enthusiastic texts
  const texts = [
    "Discover, Learn & Inspire!",
    "Dive into Ideas that Matter!",
    "Stay Ahead with Fresh Insights!",
    "Explore, Create, and Share!",
    "Knowledge at Your Fingertips!",
    "Boost Your Skills Today!",
    "Handpicked Blogs for You!",
    "Expand Your World of Ideas!",
    "Where Inspiration Meets Action!",
    "Read, Learn, and Grow!"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={20}
        slidesPerView={1}
        grabCursor={true}
        scrollbar={{ draggable: true, hide: false }}
        className="mySwiper"
      >
        {randomImages.map((img) => {
          // Pick a random text for each image
          const randomText = texts[Math.floor(Math.random() * texts.length)];

          return (
            <SwiperSlide key={img.id}>
              <div className="relative rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300">
                <img
                  src={img.url}
                  alt={`Slide ${img.id}`}
                  className="w-full h-[400px] object-cover"
                />
                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-center px-4">
                  <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg">
                    {randomText}
                  </h2>
                  <p className="text-white mt-2 md:text-lg drop-shadow-md">
                    "Explore the world of blogs and ideas!"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
