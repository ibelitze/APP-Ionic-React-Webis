import React, { useState } from "react";
import ReactDOM from "react-dom";


interface Message {
  text: string;
  createdAt: Date;
}


const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage: Message = {
      text: message,
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((message: Message) => (
          <li key={message.text}>
            {message.text + message.createdAt}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Escribe un mensaje"
        value={message}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(event.target.value)
        }
      />
      <button>Enviar</button>
    </div>
  );
};

export default Chat;
