import styled from "styled-components";

export const SpouseEditContainerStyle = styled.div`
  padding: 30px;
`;

export const SpouseContainerStyle = styled.div`
  height: 700px;
  overflow: hidden;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Для Chrome, Safari и Opera */
  }

  & {
    -ms-overflow-style: none; /* Для Internet Explorer и Edge */
    scrollbar-width: none; /* Для Firefox */
  }
`;
