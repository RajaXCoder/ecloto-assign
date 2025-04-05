import styled from "styled-components";

export const ProgressBar = styled.div`
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
  border-radius: 10px;
`;

export const ProgressLabel = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #333;
  font-weight: bold;
  font-size: 12px;
  z-index: 1;
`;
