import React, { useState, useEffect } from "react";

interface Props {
  text: string;
}

const Typewriter: React.FC<Props> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 15); // Typing speed (adjust as needed)

    return () => clearTimeout(timer);
  }, [currentIndex, text]);

  return <div>{displayText}</div>;
};

export default Typewriter;
