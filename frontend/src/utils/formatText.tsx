import React from "react";

interface Props {
  text: string;
}

const FormattedText: React.FC<Props> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index} style={{ marginBottom: 10, marginTop: 10 }}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default FormattedText;
