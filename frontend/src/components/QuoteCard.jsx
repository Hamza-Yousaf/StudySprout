import React from "react";
import quotes from "../quotes.json";

const QuoteCard = () => {
  const getQuote = (id) => {
    return [quotes[id].quote, quotes[id].author];
  };

  const rand = Math.floor(Math.random() * 50) + 1;

  return (
    <div className="w-full h-full bg-black shadow-lg rounded-2xl bg-white p-6">
      <h1 className="font-bold text-2xl mb-3">Quotes</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div>
        <h1 className="text-4xl italic text-[var(--powerBlue)] mb-8">
          {getQuote(rand)[0]}
        </h1>
        <h1 className="text-3xl font-semi-bold">
          - {getQuote(rand)[1] ? getQuote(rand)[1] : "Unknown"}
        </h1>
      </div>
    </div>
  );
};

export default QuoteCard;
