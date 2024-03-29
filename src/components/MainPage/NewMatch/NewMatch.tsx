import * as S from './styled';
import { toDoReviewType } from './styled';

import Edit from '../../../assets/images/edit.png';
import Larrow from '../../../assets/images/left-arrow.png';
import Rarrow from '../../../assets/images/right-arrow.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie } from '../../Login/GoogleBtn';
import axios from 'axios';

function SampleNextArrow(props: S.arrowPropsType) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        right: '-15px',
        width: '30px',
        height: '30px',
        opacity: '0.6',
      }}
      onClick={onClick}
      src={Rarrow}
    />
  );
}

function SamplePrevArrow(props: S.arrowPropsType) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        left: '-15px',
        width: '30px',
        height: '30px',
        opacity: '0.6',
      }}
      onClick={onClick}
      src={Larrow}
    />
  );
}

export const NewMatch = () => {
  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipe: true,
    draggable: true,
    nextArrow: (
      <SampleNextArrow className={''} style={undefined} onClick={undefined} />
    ),
    prevArrow: (
      <SamplePrevArrow className={''} style={undefined} onClick={undefined} />
    ),

    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          draggable: true,
          nextArrow: (
            <SampleNextArrow
              className={''}
              style={undefined}
              onClick={undefined}
            />
          ),
          prevArrow: (
            <SamplePrevArrow
              className={''}
              style={undefined}
              onClick={undefined}
            />
          ),
        },
      },
    ],
  };

  const Cookies = getCookie('accessToken');
  const [todoReview, setToDoReview] = useState<toDoReviewType[]>([]);
  const todoReviewReq = async () => {
    try {
      Cookies &&
        (await axios
          .get(`/api/main/user`, {
            headers: {
              authorization: `Bearer ${Cookies}`,
            },
          })
          .then((res) => {
            setToDoReview(res.data.todoReview);
          }));
    } catch (err) {
      alert(`1. 예기지 못한 에러가 발생했습니다.\nERROR: ${err}`);
    }
  };

  useEffect(() => {
    todoReviewReq();
  }, []);

  return (
    <>
      <S.NewMatchTextBox>
        <S.NewMatchTitle>
          <S.Image src={Edit} />
          칭찬을 기다리고 있어요
        </S.NewMatchTitle>
        <S.StyledSlider {...settings}>
          {Cookies ? (
            todoReview &&
            todoReview.map((item) => {
              return (
                <Link to={`/reply/${item.id}`}>
                  <S.NewMatchTextContent
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></S.NewMatchTextContent>
                </Link>
              );
            })
          ) : (
            <Link to={`/login/guest/`}>
              <p>로그인이 필요한 기능입니다.</p>
            </Link>
          )}
        </S.StyledSlider>
      </S.NewMatchTextBox>
    </>
  );
};
