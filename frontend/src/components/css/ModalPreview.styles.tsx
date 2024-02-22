import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 60%;
  height: 80%;
  background-color: #fff;
  border-radius: 10px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;

  .space {
    visibility: hidden;
  }

  .title {
    h1 {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Form = styled.div`
  max-width: 95%;
`;

export const Label = styled.div`
  margin-bottom: 30px;

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.div`
  width: 150px;
  border: 1px solid #001d7e;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 1.05rem;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;

  .disabled {
    background-color: #aaa;
    color: #fff;
    border: transparent;
  }

  .allowed {
    background-color: #efd64b;
    color: #001d7e;
    border: 2px solid transparent;

    &:hover {
      border: 2px solid #001d7e;
    }
  }
`;
