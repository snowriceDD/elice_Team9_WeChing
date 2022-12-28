import * as S from './styled';
import { useState } from 'react';
import axios from 'axios';
import { isClicked } from '../../../myPostSlice';
import { useAppDispatch, useAppSelector } from '../../../store/config';

export const Modal: React.FC<S.reviewId> = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isClick = useAppSelector((state) => {
    return state.myPost.isClicked;
  });
  const clickedReview = useAppSelector((state) => {
    return state.myPost.clickedReview;
  });
  console.log(clickedReview);
  const reportHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const reviewContent = target.content.value;
    const reportType = target.reportType.value;
    const reportBtn = target.querySelector('button');

    const type = reportType;
    console.log(reportType);
    if (reviewContent.length === 0) {
      setIsError(true);
      return;
    } else {
      reportBtn?.setAttribute('disabled', 'disabled');
    }
    setIsError(false);
    try {
      await axios
        .post(
          `/api/report/${clickedReview}`,
          { type, content: reviewContent },
          {
            headers: {
              authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJlbWFpbCI6ImxrZzcwMDA3QGdtYWlsLmNvbSIsInN0YXR1cyI6MCwiaWF0IjoxNjcyMDE5NjAzLCJleHAiOjE2NzIxMDI0MDN9.TP3Bm4cESdiUqOSwVrCU3ftHkbcNcQbsnz5WRygGX4E`,
            },
          }
        )
        .then((res) => {
          alert('해당 신고가 접수되었어요.');
          dispatch(isClicked(false));
          console.log(res.data);
        });
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      {isClick && (
        <S.M_Container>
          <S.M_Background onClick={() => dispatch(isClicked(false))} />
          <S.M_ModalBox>
            <S.M_Modal>
              <S.M_Form onSubmit={reportHandler}>
                <S.M_Fieldset>
                  <S.M_Legend>신고</S.M_Legend>
                  <S.M_SelectBox name="reportType">
                    <option value="cussWord" defaultChecked>
                      욕설
                    </option>
                    <option value="adv">광고</option>
                    <option value="etc">기타</option>
                  </S.M_SelectBox>
                  <S.M_Textarea
                    name="content"
                    id="3"
                    cols={25}
                    rows={5}
                    maxLength={100}
                    isError={isError}
                    placeholder="어떤 이유로 신고하는지 적어주세요. 최대 100자"
                  ></S.M_Textarea>
                  {isError && (
                    <S.M_TextLabel>내용을 적어주셔야 해요.</S.M_TextLabel>
                  )}
                  <S.M_Button>신고하기</S.M_Button>
                </S.M_Fieldset>
              </S.M_Form>
            </S.M_Modal>
          </S.M_ModalBox>
        </S.M_Container>
      )}
    </>
  );
};
