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
import ModalPreview from "../components/ModalPreview";
import FormattedText from "../utils/formatText";
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
      typewriterEffect: undefined | boolean;
    }
  ];
}

interface DataItems {
  first: {
    basic: boolean;
    intermediate: boolean;
    advanced: boolean;
  };
  second: {
    technician: boolean;
    informal: boolean;
  };
  third: {
    topics: boolean;
    running_text: boolean;
  };
}

const ChatPage: React.FC = () => {
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true);
  const [loadingSendMessage, setLoadingSendMessage] = useState<boolean>(false);
  const [data, setData] = useState<Data>({
    message: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [showScrollToBottom, setShowScrollToBottom] = useState<boolean>(false);
  const [startPositionY, setStartPositionY] = useState<{
    state: boolean;
    number: number;
  }>({
    state: false,
    number: 0,
  });

  // modal preview
  const [seeModalPreview, setSeeModalPreview] = useState<boolean>(false);
  const [dataSettings, setDataSettings] = useState<DataItems>({
    first: { basic: false, intermediate: false, advanced: false },
    second: { technician: false, informal: false },
    third: { topics: false, running_text: false },
  });

  // logica inputs modal settings user
  const handleConcludeSettings = (data: DataItems) => {
    setDataSettings(data);
    localStorage.setItem("settings_preferences_user", JSON.stringify(data));
    setSeeModalPreview(false);
  };

  const verifySettingsUser = () => {
    const data = localStorage.getItem("settings_preferences_user");

    // Se não houver dados no localStorage, exiba o modal novamente
    if (!data) {
      return setSeeModalPreview(true);
    }

    if (data) {
      try {
        const parsedData = JSON.parse(data);

        // Verifique se as chaves do objeto do localStorage correspondem às chaves de DataSettings
        const isValid =
          parsedData &&
          Object.keys(parsedData).every((key) =>
            Object.keys(dataSettings as DataItems).includes(key)
          );

        if (!isValid) {
          localStorage.removeItem("settings_preferences_user");
          return setSeeModalPreview(true);
        } else {
          setDataSettings(parsedData);
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
        setSeeModalPreview(true);
      }
    }
  };

  const getMessages = async (shouldntLoad: boolean) => {
    if (!shouldntLoad) {
      setLoadingRequest(true);
    }

    try {
      const resp = await axios.get(`http://localhost:3001/data`);
      console.log(resp.data[resp.data.length - 1]);
      if (!shouldntLoad) {
        setMessages(resp.data);
      } else {
        setMessages([...messages, resp.data[resp.data.length - 1]]);
      }
    } catch (err) {
      console.log(`erro ao pegar dados: ${err}`);
    }

    setLoadingRequest(false);
  };

  const sendMessage = async () => {
    setLoadingSendMessage(true);

    try {
      let expertiseLevel;
      let languageType;
      let typeFormatted;

      if (dataSettings.first.advanced) {
        expertiseLevel = "avançado";
      } else if (dataSettings.first.basic) {
        expertiseLevel = "básico";
      } else if (dataSettings.first.intermediate) {
        expertiseLevel = "intermediário";
      }

      if (dataSettings.second.informal) {
        languageType = "informal";
      } else if (dataSettings.second.technician) {
        languageType = "técnico";
      }

      if (dataSettings.third.topics) {
        typeFormatted = "tópicos";
      } else if (dataSettings.third.running_text) {
        typeFormatted = "texto corrido";
      }

      await axios.post(`http://localhost:3001/ask`, {
        userQuestion: data.message,
        expertiseLevel: expertiseLevel,
        languageType: languageType,
        typeFormatted: typeFormatted,
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

    setData({ ...data, message: "" });
    setLoadingSendMessage(false);
  };

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

      if (startPositionY.state === false) {
        setStartPositionY({
          ...startPositionY,
          state: true,
          number: positionY,
        });
      }

      if (positionY >= 1 && positionY < startPositionY.number - 100) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getMessages(false);
    verifySettingsUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <styles.Container>
      {seeModalPreview && (
        <styles.Overlay onClick={() => setSeeModalPreview(false)}>
          <ModalPreview handleConcludeSettings={handleConcludeSettings} />
        </styles.Overlay>
      )}

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
        <styles.ChatContent id="chatContainerId">
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
                              <>
                                {message.Answers[0].typewriterEffect && (
                                  <Typewriter
                                    text={message.Answers[0].answer_text}
                                  />
                                )}

                                {!message.Answers[0].typewriterEffect && (
                                  <FormattedText
                                    text={message.Answers[0].answer_text}
                                  />
                                )}
                              </>
                            )}
                          </div>
                        </styles.MessageResponse>
                      </styles.MessageItem>
                    );
                  })}
                </styles.LayoutMessages>
              )}

              {showScrollToBottom && (
                <styles.Arrow onClick={scrollToBottom}>
                  <CaretDown size={30} color="#EFD64B" />
                </styles.Arrow>
              )}

              <div id="endChatContainer"></div>
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
