import { Swiper, SwiperSlide } from "swiper/react";
import { allGraphs } from "../routes/allGraphs.js";
//import { HiPlus } from "react-icons/hi";
import "./GraphSlider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import "./GraphSlider.css";
import "./GraphSliderData.js";
import GraphSliderData from "./GraphSliderData.js";

import bg1 from "../images/bg1.png";

export default function GraphSlider() {
  return (
    <div className = "all" style={{ backgroundImage: 'url(' + bg1 + ')', backgroundSize: 'auto' }}>
      <div className = "header">
        <h1>Graph Creation</h1>
        <p> Choose any template that suits your data type</p>
      </div>
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={8}
      pagination={{ clickable: true }}
      navigation={true}
      className="graphsSlider min-h-[1300px]"
    >
      <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:grap-[30px]">
        {allGraphs.map((graph, index) => {
          return (
            <SwiperSlide>
              <div className="border hover:border-accent rounded-[18px] w-full max-w-[285px] h-full max-h-[292px] flex items-center justify-center mb-[15px] relative transition">
              <a href= {graph.link} className = "tripcard">
              <GraphSliderData
                link = {graph.link} 
                image = {graph.img}
                heading = {graph.alt}
                text = "/"
                alt = {graph.alt}/>
                </a>
                <div className="absolute bottom-4 right-[22px] bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-300 transition">
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
    </div>
  );
}
