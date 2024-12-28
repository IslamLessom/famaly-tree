import styled from "styled-components";

export const LegendContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  width: 150px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  backdrop-filter: blur(5px);
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export const LegendImage = styled.img`
  width: 200px;
  height: 70px;
`;

export const LegendText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;
