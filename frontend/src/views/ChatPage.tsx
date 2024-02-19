<<<<<<< HEAD
import { ChatCenteredText, PaperPlaneRight, User } from "phosphor-react";
import { useEffect, useState } from "react";
import axios from "axios";

import * as styles from "./css/ChatPage.styles";

import logo_square from "../assets/logo_square.png";
import logo from "../assets/logo.png";
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CaretDown,
  ChatCenteredText,
  PaperPlaneRight,
  User,
} from "phosphor-react";
import * as styles from "./css/ChatPage.styles";
import logo_square from "../assets/logo_square.png";
import logo from "../assets/logo.png";
import Typewriter from "../components/TypingWriter";
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea

interface Data {
  message: string;
}

interface Message {
  question_id: number;
  question_text: string;
  timestamp: string;
  Answers: [
    {
      answer_id: number;
      answer_text: string;
      question_id: number;
      timestamp: string;
      loading: undefined | boolean;
<<<<<<< HEAD
=======
      typewriterEffect: undefined | boolean;
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
    }
  ];
}

const ChatPage: React.FC = () => {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true);
  const [loadingSendMessage, setLoadingSendMessage] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    message: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
<<<<<<< HEAD
=======
  const [showScrollToBottom, setShowScrollToBottom] = useState<boolean>(false);
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea

  const getMessages = async (shouldntLoad: boolean) => {
    if (!shouldntLoad) {
      setLoadingRequest(true);
    }

<<<<<<< HEAD
    await axios
      .get(`http://localhost:3001/data`)
      .then((resp) => {
        if (!shouldntLoad) {
          setMessages(resp.data);
        } else {
          setMessages([...messages, resp.data[resp.data.length - 1]]);
        }
      })
      .catch((err) => {
        console.log(`erro ao pegar dados: ${err}`);
      });
=======
    try {
      const resp = await axios.get(`http://localhost:3001/data`);
      if (!shouldntLoad) {
        setMessages(resp.data);
      } else {
        setMessages([...messages, resp.data[resp.data.length - 1]]);
      }
    } catch (err) {
      console.log(`erro ao pegar dados: ${err}`);
    }
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea

    setLoadingRequest(false);
  };

  const sendMessage = async () => {
    setLoadingSendMessage(true);

<<<<<<< HEAD
    await axios
      .post(`http://localhost:3001/ask`, {
        question: data.message,
      })
      .then(() => {
        const newMessage = {
          question_id: messages[messages.length - 1].question_id + 1,
          question_text: data.message,
          timestamp: new Date().toISOString(),
          Answers: [
            {
              answer_id: messages[messages.length - 1].Answers[0].answer_id + 1,
              answer_text: "",
              question_id: messages[messages.length - 1].question_id + 1,
              timestamp: new Date().toISOString(),
              loading: true,
            },
          ],
        };

        setMessages([...messages, newMessage]);

        getMessages(true);
      })
      .catch((err) => {
        console.log(`erro ao enviar pergunta: ${err}`);
        console.log(err);

        const newMessage = {
          question_id: messages[messages.length - 1].question_id + 1,
          question_text: data.message,
          timestamp: new Date().toISOString(),
          Answers: [
            {
              answer_id: messages[messages.length - 1].Answers[0].answer_id + 1,
              answer_text:
                "Ocorreu um erro ao processar sua mensagem, tente novamente!",
              question_id: messages[messages.length - 1].question_id + 1,
              timestamp: new Date().toISOString(),
              loading: false,
            },
          ],
        };

        setMessages([...messages, newMessage]);
      });

=======
    try {
      await axios.post(`http://localhost:3001/ask`, {
        question: data.message,
      });

      const newMessage = {
        question_id: messages[messages.length - 1].question_id + 1,
        question_text: data.message,
        timestamp: new Date().toISOString(),
        Answers: [
          {
            answer_id: messages[messages.length - 1].Answers[0].answer_id + 1,
            answer_text: "",
            question_id: messages[messages.length - 1].question_id + 1,
            timestamp: new Date().toISOString(),
            loading: true,
            typewriterEffect: true,
          },
        ],
      };

      setMessages([...messages, newMessage as Message]);

      getMessages(true);
    } catch (err) {
      console.log(`erro ao enviar pergunta: ${err}`);
      console.log(err);

      const newMessage = {
        question_id: messages[messages.length - 1].question_id + 1,
        question_text: data.message,
        timestamp: new Date().toISOString(),
        Answers: [
          {
            answer_id: messages[messages.length - 1].Answers[0].answer_id + 1,
            answer_text:
              "Ocorreu um erro ao processar sua mensagem, tente novamente!",
            question_id: messages[messages.length - 1].question_id + 1,
            timestamp: new Date().toISOString(),
            loading: false,
            typewriterEffect: true,
          },
        ],
      };

      setMessages([...messages, newMessage as Message]);
    }

>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
    setData({ ...data, message: "" });
    setLoadingSendMessage(false);
  };

<<<<<<< HEAD
  useEffect(() => {
    getMessages(false);
=======
  const scrollToBottom = () => {
    try {
      const chatContainer = document.getElementById("endChatContainer");

      if (chatContainer) {
        chatContainer.scrollIntoView({ behavior: "instant", block: "end" });
      }
    } catch (e) {
      console.log(`erro ao ir para final do chat: ${e}`);
    }
  };

  useEffect(() => {
    const chatContent = document.getElementById("chatContainerId");

    const handleScroll = () => {
      const positionY = chatContent!.scrollTop;

      if (positionY >= 1 && positionY <= 10000) {
        return setShowScrollToBottom(true);
      }

      setShowScrollToBottom(false);
    };

    if (chatContent) {
      chatContent.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        chatContent.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getMessages(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
  }, []);

  return (
    <styles.Container>
      <styles.Sidebar>
        <img src={logo_square} alt="logo yourclub" />

        <div className="list__chats">
          <ul>
            <li>
              <ChatCenteredText size={26} color="#eee" className="icon__chat" />{" "}
              Novo chat
            </li>
          </ul>
        </div>
      </styles.Sidebar>

      <styles.ChatContainer>
<<<<<<< HEAD
        <styles.ChatContent>
=======
        <styles.ChatContent id="chatContainerId">
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
          {!loadingRequest && messages.length === 0 && (
            <styles.NoMessages>
              <img src={logo} alt="logo yourclub" />

              <h2>Como posso ajudar você?</h2>
            </styles.NoMessages>
          )}

          {messages.length >= 1 && (
            <styles.MessagesContainer>
              {!loadingRequest && (
                <styles.LayoutMessages>
                  {messages.map((message: Message) => {
                    return (
                      <styles.MessageItem key={message.question_id}>
                        <styles.MessageQuestion>
                          <div className="image">
                            <div className="no__img">
                              <User size={20} color="#fff" />
                            </div>
                          </div>

                          <div className="message">
                            <h2>Você</h2>
                            <p>{message.question_text}</p>
                          </div>
                        </styles.MessageQuestion>

                        <styles.MessageResponse>
                          <div className="image">
                            <img src={logo_square} alt="logo avatar ia" />
                          </div>

                          <div className="message">
                            <h2>Avatar IA</h2>
                            {message.Answers[0].loading && (
                              <p style={{ fontSize: "1.05rem" }}>...</p>
                            )}

                            {!message.Answers[0].loading && (
<<<<<<< HEAD
                              <p>{message.Answers[0].answer_text}</p>
=======
                              <>
                                {message.Answers[0].typewriterEffect && (
                                  <Typewriter
                                    text={message.Answers[0].answer_text}
                                  />
                                )}

                                {!message.Answers[0].typewriterEffect && (
                                  <p>{message.Answers[0].answer_text}</p>
                                )}
                              </>
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
                            )}
                          </div>
                        </styles.MessageResponse>
                      </styles.MessageItem>
                    );
                  })}
                </styles.LayoutMessages>
              )}
<<<<<<< HEAD
=======

              {showScrollToBottom && (
                <styles.Arrow onClick={scrollToBottom}>
                  <CaretDown size={30} color="#EFD64B" />
                </styles.Arrow>
              )}

              <div id="endChatContainer"></div>
>>>>>>> 0c51d24f70a290f74d82634afd22ccada0f9e5ea
            </styles.MessagesContainer>
          )}
        </styles.ChatContent>

        <styles.Writer>
          <styles.Label>
            <textarea
              name="message"
              id="message"
              placeholder="Digite uma mensagem..."
              value={data.message}
              onChange={(e) => setData({ ...data, message: e.target.value })}
            />

            <div
              className="send__box"
              style={
                data.message.length >= 1
                  ? { backgroundColor: "#062897" }
                  : { backgroundColor: "#aaa" }
              }
            >
              {!loadingSendMessage && (
                <PaperPlaneRight
                  onClick={() => {
                    if (data.message && !loadingSendMessage) {
                      sendMessage();
                    }
                  }}
                  size={25}
                  color={data.message.length >= 1 ? "#EFD64B" : "#fff"}
                />
              )}

              {loadingSendMessage && (
                <p style={{ color: "#fff", fontSize: "1.2rem" }}>...</p>
              )}
            </div>
          </styles.Label>
        </styles.Writer>
      </styles.ChatContainer>
    </styles.Container>
  );
};

export default ChatPage;
