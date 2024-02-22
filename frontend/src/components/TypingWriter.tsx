import React, { useState, useEffect } from "react";

interface Props {
  text: string;
}

const Typewriter: React.FC<Props> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => {
          // If the current character is a newline, push a new line to the display text
          if (text[currentIndex] === "\n") {
            return [...prevText, ""];
          }
          // Otherwise, update the last line with the new character
          const updatedText = [...prevText];
          updatedText[prevText.length - 1] += text[currentIndex];
          return updatedText;
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 15); // Typing speed (adjust as needed)

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  return (
    <div>
      {displayText.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
};

export default Typewriter;
