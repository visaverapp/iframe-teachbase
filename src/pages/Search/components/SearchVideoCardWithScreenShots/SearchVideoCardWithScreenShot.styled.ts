import styled from 'styled-components';
import { DescriptionText, theme, Text } from '@/styles';
import {SearchInput} from "@/components/SearchInput/SearchInput";
import Button from "@/components/Button/Button";
import {
  SearchVideoCardProps
} from "@/pages/Search/components/SearchVideoCardWithScreenShots/SearchVideoCardWithScreenShot";

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  //@media screen and (max-width: 768px) {
  //  justify-content: center;
  //}
`;

export const SearchResultInput = styled(SearchInput)`
  width: 100%;
  margin-bottom: 60px;

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }

  input {
    width: 100%;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const SearchVideoCardStyled = styled.div`
    width: 1312px;
    height: 386px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    gap: 32px;
    margin-left: 14px;
    flex-direction: row;
    background-color: ${theme.colors.white};
    margin-bottom: 12px;

    //@media screen and (max-width: 768px) {
    //  flex-direction: column;
    //  align-items: center;
    //  justify-content: center;
    //}
    //@media screen and (max-width: 480px) {
    //  flex-direction: column;
    //  align-items: center;
    //  justify-content: center;
    //}
`;

export const Header = styled.div`
  width: 368px;

  //@media screen and (max-width: 480px) {
  //  padding: 10px;
  //}
`;

export const HeaderContent = styled.div<SearchVideoCardProps>`
    display: flex;
    background-image: url(${({videoInfo}) => `${videoInfo.thumbnailUrl}`});
    background-size: cover; 
    background-position: center;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 16px;

  @media screen and (max-width: 480px) {
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled(DescriptionText)`
    //padding-left: 10px;
    white-space: nowrap; /*Запрещаем перенос строк*/
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
    hyphens: manual;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    color: #1F2D3D;
    padding-bottom: 6px;

    //@media (max-width: 1024px) {
    //  font-size: 20px;
    //}
    //@media (max-width: 480px) {
    //  font-size: 17px;
    //}
`;

export const Main = styled.div`
  border-radius: 0px 0px 10px 10px;
  background: #ffffff;
  width: 100%;
  /*max-width: 910px;
  padding: 40px 0; */
`;

export const DescriptionTextS = styled.p`
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 17px;
  }
`;
export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  border-radius: 10px;
  background: #210071;
  padding: 26px 30px;
  border: 1px solid transparent;
  &:hover {
    background-color: #371190;
    border: 1px solid #e4e4ff;
  }
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 480px) {
    padding: 13px 10px;
    gap: 15px;
  }
`;
export const InfoText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;

  @media (max-width: 1024px) {
    font-size: 16px;
    line-height: 28px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 16px;
  }
`;
export const InfoTime = styled(InfoText)`
  font-weight: 700;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
`;

export const HeaderButton = styled(Button)`
  font-size: 15px;
  font-weight: 500;
  line-height: 21px;
  /* width: Hug (106px);
height: Hug (40px) */
  padding: 9px 20px 10px 20px;
  border-radius: 8px;
`;


export const PDFWrapper = styled.div`
position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
  height: 200px;
  border-radius: 10px;
`