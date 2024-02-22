import React, { useState } from "react";
import * as styles from "./css/ModalPreview.styles";
import { X } from "phosphor-react";

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

interface TypeProps {
  handleConcludeSettings: (data: DataItems) => void;
}

const ModalPreview: React.FC<TypeProps> = ({ handleConcludeSettings }) => {
  const [data, setData] = useState<DataItems>({
    first: { basic: false, intermediate: false, advanced: false },
    second: { technician: false, informal: false },
    third: { topics: false, running_text: false },
  });

  const isDataComplete = () => {
    return (
      Object.values(data.first).includes(true) &&
      Object.values(data.second).includes(true) &&
      Object.values(data.third).includes(true)
    );
  };

  const handleFirstButtonClick = (type: keyof DataItems["first"]) => {
    setData((prevData) => ({
      ...prevData,
      first: {
        basic: false,
        intermediate: false,
        advanced: false,
        [type]: true,
      },
    }));
  };

  const handleSecondButtonClick = (type: keyof DataItems["second"]) => {
    setData((prevData) => ({
      ...prevData,
      second: { technician: false, informal: false, [type]: true },
    }));
  };

  const handleThirdButtonClick = (type: keyof DataItems["third"]) => {
    setData((prevData) => ({
      ...prevData,
      third: { topics: false, running_text: false, [type]: true },
    }));
  };

  const handleFinalizeButtonClick = () => {
    if (isDataComplete()) {
      handleConcludeSettings(data);
    }
  };

  return (
    <styles.Container onClick={(e) => e.stopPropagation()}>
      <styles.Header>
        <div className="space">
          <X size={30} color="#555" />
        </div>

        <div className="title">
          <h1>Personalize sua experiência</h1>
        </div>

        <div className="close">
          <X size={30} color="#555" />
        </div>
      </styles.Header>

      <styles.Form>
        <styles.Label>
          <h2>Seu nível de expertise sobre o tema</h2>
          <styles.InputsContainer>
            <styles.Button
              style={
                data.first.basic
                  ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                  : {}
              }
              onClick={() => handleFirstButtonClick("basic")}
            >
              Básico
            </styles.Button>
            <styles.Button
              style={
                data.first.intermediate
                  ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                  : {}
              }
              onClick={() => handleFirstButtonClick("intermediate")}
            >
              Intermediário
            </styles.Button>
            <styles.Button
              style={
                data.first.advanced
                  ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                  : {}
              }
              onClick={() => handleFirstButtonClick("advanced")}
            >
              Avançado
            </styles.Button>
          </styles.InputsContainer>
        </styles.Label>

        <styles.Label>
          <h2>Linguagem de resposta</h2>
          <styles.InputsContainer>
            <styles.Button
              style={
                data.second.technician
                  ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                  : {}
              }
              onClick={() => handleSecondButtonClick("technician")}
            >
              Técnico
            </styles.Button>
            <styles.Button
              style={
                data.second.informal
                  ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                  : {}
              }
              onClick={() => handleSecondButtonClick("informal")}
            >
              Informal
            </styles.Button>
          </styles.InputsContainer>
        </styles.Label>

        <styles.Label>
          <h2>Formatação da resposta</h2>
          <styles.InputsContainer>
            <styles.InputsContainer>
              <styles.Button
                style={
                  data.third.topics
                    ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                    : {}
                }
                onClick={() => handleThirdButtonClick("topics")}
              >
                Tópicos
              </styles.Button>
              <styles.Button
                style={
                  data.third.running_text
                    ? { backgroundColor: "#001d7e", color: "#EFD64B" }
                    : {}
                }
                onClick={() => handleThirdButtonClick("running_text")}
              >
                Texto corrido
              </styles.Button>
            </styles.InputsContainer>
          </styles.InputsContainer>
        </styles.Label>

        <styles.ButtonsContainer>
          <styles.Button
            className={isDataComplete() === false ? "disabled" : "allowed"}
            onClick={handleFinalizeButtonClick}
          >
            Finalizar
          </styles.Button>
        </styles.ButtonsContainer>
      </styles.Form>
    </styles.Container>
  );
};

export default ModalPreview;
