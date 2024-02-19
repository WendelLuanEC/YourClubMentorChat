import styled from "styled-components";

export const Container = styled.div`
  max-height: 100vh;
  max-width: 100%;
  overflow-y: hidden;
  display: flex;
`;

export const Sidebar = styled.div`
  width: 22vw;
  height: 100vh;
  background-color: #001d7e;

  img {
    width: 70px;
    margin: 20px 0px 20px 10px;
  }

  .list__chats {
    ul {
      flex-direction: column;

      li {
        border-bottom: 1px solid #aaa;
        color: #eee;
        font-size: 1.05rem;
        line-height: 3;
        background-color: #062897;
        padding: 5px 20px;
        display: flex;
        align-items: center;
        transition: 0.2s all;

        .icon__chat {
          margin-right: 10px;
        }

        &:hover {
          cursor: pointer;
          background-color: #0c30a6;
        }
      }
    }
  }
`;

export const ChatContainer = styled.div`
  width: 78vw;
  height: 100vh;
  position: relative;
  background-color: #f6f6f6;
`;

export const Writer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

export const Label = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  textarea {
    resize: none;
    height: 30px;
    width: 100%;
    border: 1px solid #aaa;
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 1.05rem;
    outline: transparent;
  }

  .send__box {
    background-color: #aaa;
    border-radius: 10px;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const ChatContent = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  overflow-y: auto;
`;

export const NoMessages = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    margin-top: 30px;
    margin-left: 15px;
    color: #333;
  }
`;

export const MessagesContainer = styled.div`
  overflow-y: auto;
<<<<<<< HEAD
=======
  position: relative;
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
`;

export const LayoutMessages = styled.div`
  overflow-y: auto;
  padding: 20px 30px;
`;

export const MessageItem = styled.div`
  padding: 20px 0px;
  border-bottom: 1px solid #ddd;

  p {
    font-size: 1.05rem;
  }
`;

export const MessageQuestion = styled.div`
  margin-bottom: 20px;
  display: flex;

  .image {
    margin-right: 15px;

    .no__img {
      width: 40px;
      height: 40px;
      background-color: #aaa;
      border-radius: 50%;
      border-radius: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .message {
    h2 {
      font-size: 1.15rem;
      color: #333;
      font-weight: 600;
    }

    p {
      font-size: 1.05rem;
      text-align: left;
    }
  }
`;

export const MessageResponse = styled(MessageQuestion)``;
<<<<<<< HEAD
=======

export const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #001d7e;
  transition: 0.2s all;
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(-100%, -200%);
  z-index: 10;
  opacity: 0.5;

  &:hover {
    cursor: pointer;
    background-color: #011a6b;
    opacity: 0.8;
  }
`;
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
