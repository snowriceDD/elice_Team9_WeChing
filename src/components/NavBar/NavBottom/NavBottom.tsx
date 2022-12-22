import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './styled';
import { SummitContainer } from '../SummitContainer';
import {useState} from 'react';

import { IconHome, IconBookmark, IconPlus, IconUser, IconVertical, IconAlarm } from '../Mark';

const clickColor = '#8C5C32';
const nonClickColor = '#BFA78A';


export const Nav = () => {
    // const currentURL = useLocation();
    const navigate = useNavigate();

    const [activeHome, setActiveHome] = useState(true);
    const [activeBook, setActiveBook] = useState(false);
    const [activePlus, setActivePlus] = useState(false);
    const [activeUser, setActiveUser] = useState(false);
    const [activeVerti, setActiveVerti] = useState(false);
    const [activeAlarm, setActiveAlarm] = useState(false);

    return (
        <SummitContainer>
            <S.HeaderContainer>
                <S.HeaderMenuBox>
                    <IconAlarm /> 
                </S.HeaderMenuBox>
                <S.HeaderMenuBox
                    onClick={()=> {
                        navigate('/alarm');
                        setActiveHome(false);
                        setActiveBook(false);
                        setActivePlus(false);
                        setActiveUser(false);
                        setActiveVerti(false);
                        setActiveAlarm(true);
                    }} 
                >
                    <IconAlarm 
                        fill={activeAlarm ? clickColor : nonClickColor}
                        stroke={activeAlarm ? clickColor : nonClickColor}
                    />
                </S.HeaderMenuBox>
            </S.HeaderContainer>
            <S.NavBottomContainer>
                <S.NavMenuBox
                    onClick={()=> {
                        navigate('/home');
                        setActiveHome(true);
                        setActiveBook(false);
                        setActivePlus(false);
                        setActiveUser(false);
                        setActiveVerti(false);
                        setActiveAlarm(false);
                    }}                   
                    >
                <IconHome  
                    fill={activeHome ? clickColor : nonClickColor}
                    stroke={activeHome ? clickColor : nonClickColor}
                    />
                </S.NavMenuBox>
                <S.NavMenuBox
                    onClick={()=> {
                        navigate('/page2');
                        setActiveHome(false);
                        setActiveBook(true);
                        setActivePlus(false);
                        setActiveUser(false);
                        setActiveVerti(false);
                        setActiveAlarm(false);
                    }}
                >
                <IconBookmark 
                    fill={activeBook ? clickColor : nonClickColor}
                    stroke={activeBook ? clickColor : nonClickColor}
                    />
                </S.NavMenuBox>
                <S.NavMenuBox
                    onClick={()=> {
                        navigate('/post');
                        setActiveHome(false);
                        setActiveBook(false);
                        setActivePlus(true);
                        setActiveUser(false);
                        setActiveVerti(false);
                        setActiveAlarm(false);
                    }}
                >
                <S.PlusWrap>
                 <IconPlus 
                    fill={activePlus ? clickColor : nonClickColor}
                    stroke={activePlus ? clickColor : nonClickColor}
                 />
                 </S.PlusWrap>
                </S.NavMenuBox>
                <S.NavMenuBox
                    onClick={()=> {
                        navigate('/MyPage');
                        setActiveHome(false);
                        setActiveBook(false);
                        setActivePlus(false);
                        setActiveUser(true);
                        setActiveVerti(false);
                        setActiveAlarm(false);
                    }}
                >
               <IconUser 
                    fill={activeUser ? clickColor : nonClickColor}
                    stroke={activeUser ? clickColor : nonClickColor}
                />
                </S.NavMenuBox>
                <S.NavMenuBox
                    onClick={()=> {
                        navigate('/page5');
                        setActiveHome(false);
                        setActiveBook(false);
                        setActivePlus(false);
                        setActiveUser(false);
                        setActiveVerti(true);
                        setActiveAlarm(false);
                    }}
                ><IconVertical 
                    fill={activeVerti ? clickColor : nonClickColor}
                    stroke={activeVerti ? clickColor : nonClickColor}
                />
                </S.NavMenuBox>
            </S.NavBottomContainer>
        </SummitContainer>
    )

}