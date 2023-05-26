<Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation={true}
      className="graphsSlider min-h-[1300px]"
    >
      <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:grap-[30px]">
        {allGraphs.map((graph, index) => {
          return (
            <SwiperSlide>
              <div className="border hover:border-accent rounded-[18px] w-full max-w-[285px] h-full max-h-[292px] flex items-center justify-center mb-[15px] relative transition">
                <img src={graph.img} alt="a" />
                <div className="absolute bottom-4 right-[22px] bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition">
                  <HiPlus className="text-xl text-primary" />{" "}
                </div>
                <div className="font-semibold lg:text-xl">{graph.alt}</div>
              </div>
            </SwiperSlide>
          );
        })}