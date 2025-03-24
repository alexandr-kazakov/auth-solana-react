import { styled } from "styled-components";

export const Disconnected: React.FC = () => {
  return (
    <DisconnectedSection>
      <div>React демо-приложение.</div>
      <div>Аутентификация через криптокошелек Solana.</div>
      <div>Пожалуйста, подключите ваш Solana-кошелёк, чтобы продолжить.</div>
    </DisconnectedSection>
  );
};

const DisconnectedSection = styled.div`
  line-height: 1.8;
  padding-top: 50px;
`


