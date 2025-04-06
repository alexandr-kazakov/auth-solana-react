import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: #9945ff; 
  color: #fff; 
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a37cc; 
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;