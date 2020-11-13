import React, { useRef, useEffect, forwardRef } from "react";
import styled from "styled-components";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { Image } from "@/components/style";

const Ref = forwardRef((props: any, ref: any) => (
  <div {...props} ref={ref}>
    {props.children}
  </div>
));

const SwiperContainer = styled(Ref)``;

const SwiperWrapper = styled(Ref)``;

const SwiperSlide = styled(Ref)`
  position: relative;
  width: 520px;
`;

const SwiperTag = styled.span`
  position: absolute;
  font-size: 12px;
  color: white;
  background-color: ${props => props.color};
  bottom: 0;
  right: 0;
  padding: 2px 8px;
  border-radius: 6px;
`;

const SwiperNavigation = styled(Ref)`
  position: absolute;
  z-index: 10000;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;
`;

const SwiperNavigationImgBox = styled(Ref)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
  position: relative;

  img {
    width: 18px;
    position: absolute;
    left: 50%;
    top: 12px;
  }
`;

const SwiperPagination = styled(Ref)`
  .swiper-pagination-bullet {
    background-color: #fff;
    opacity: 1;

    &.swiper-pagination-bullet-active {
      background-color: #1890ff;
    }
  }
`;

const SwiperButtonPrev = styled(SwiperNavigation)`
  left: 50px;
  img {
    transform: translate(-50%) rotate(0);
  }
`;

const SwiperButtonNext = styled(SwiperNavigation)`
  right: 50px;
  img {
    transform: translate(-50%) rotate(180deg);
  }
`;

const App: React.FC<{ data?: any[] }> = props => {
  const { data } = props;
  const prevRef = useRef<HTMLDivElement>();
  const nextRef = useRef<HTMLDivElement>();
  // swiper 配置

  useEffect(() => {
    if (data) {
      const mySwiper = new Swiper(".swiper-container", {
        init: false, // 是否立即初始化
        speed: 300, // 速度
        watchSlidesProgress: true, // 开启这个参数来计算每个slide的progress(进度、进程)
        grabCursor: true, // 鼠标覆盖 Swiper 时指针会变成手掌形状
        // 自动播放
        autoplay: {
          disableOnInteraction: false
        },
        loop: true, // 循环模式选项
        parallax: true, // 开启视差效果。
        preloadImages: true, // 是否强制加载所有图片
        updateOnImagesReady: true, // 所有的内嵌图像（img标签）加载完成后 Swiper 会重新初始化。因此需要设置为 true
        spaceBetween: -286, // slider 之间的距离
        slidesPerView: "auto", // 每页显示数量
        slidesPerGroup: 1, // 定义 slides 的数量多少为一组
        centeredSlides: true, // 默认 active slide 居左，设置为 true 后居中
        observer: true, // 修改 swiper 自己或子元素时，自动初始化 swiper
        observeParents: true, // 修改 swiper 的父元素时，自动初始化 swiper

        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev"
        },

        // 回调函数
        on: {
          setTranslate() {
            const arr: HTMLElement[] = Array.from(mySwiper.slides);
            arr.forEach((slide: any) => {
              slide.style.opacity = "";
              slide.style.background = "";
              slide.style.zIndex = `${10 - Math.abs(slide.progress)}`;
              slide.style.transform = `scale(${1 - Math.abs(slide.progress / 8)})`;
            });
          }
        }
      });
      (mySwiper as any).init();
      mySwiper.el.onmouseover = () => {
        if (prevRef.current) {
          prevRef.current.style.opacity = "1";
        }
        if (nextRef.current) {
          nextRef.current.style.opacity = "1";
        }
      };
      mySwiper.el.onmouseout = () => {
        if (prevRef.current) {
          prevRef.current.style.opacity = "0";
        }
        if (nextRef.current) {
          nextRef.current.style.opacity = "0";
        }
      };
    }
  }, [data]);

  return (
    <SwiperContainer className="swiper-container">
      <SwiperWrapper className="swiper-wrapper">
        {data?.map(item => (
          <SwiperSlide className="swiper-slide" key={item.imageUrl}>
            <Image src={item.imageUrl} shape="square" size={{ width: "520px", height: "auto" }} alt="" />
            <SwiperTag color={item.titleColor}>{item.typeTitle}</SwiperTag>
          </SwiperSlide>
        ))}
      </SwiperWrapper>
      {/* 分页器 */}
      <SwiperPagination className="swiper-pagination" />
      {/* 导航按钮 */}
      <SwiperButtonPrev className="button-prev" ref={prevRef}>
        <SwiperNavigationImgBox>
          <img src={require("@/assets/navigation.png")} alt="" />
        </SwiperNavigationImgBox>
      </SwiperButtonPrev>
      <SwiperButtonNext className="button-next" ref={nextRef}>
        <SwiperNavigationImgBox>
          <img src={require("@/assets/navigation.png")} alt="" />
        </SwiperNavigationImgBox>
      </SwiperButtonNext>
    </SwiperContainer>
  );
};

export const SlideShow = App;
