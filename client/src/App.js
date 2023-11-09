import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const recieveMessage = (msg) => {
      setChat([...chat, msg]);
    };

    socket.on("textMessage", recieveMessage);

    return () => {
      socket.off("textMessage", recieveMessage);
    };
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("textMessage", message);
    setChat([
      ...chat,
      {
        body: message,
        from: "Me",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-stone-700 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-stone-900 max-h-full py-10 px-1 rounded-lg relative min-w-auto">
        <ul className="mx-2 w-80 h-80 overflow-auto">
          {chat.map((message, i) => (
            <li
              className="first:mt-4"
              key={`${message.body}${i}${message.from}`}
            >
              <p className={`mb-2 p-2 rounded clear-both ${message.from === 'Me' ? 'float-right bg-sky-600' : 'float-left bg-sky-800'}`}>
                {message.from.substring(0,3)}: {message.body}
              </p>
            </li>
          ))}
        </ul>
        <div className="absolute top-0 left-0 right-0">
        <input
          className="text-stone-90 border-1 rounded-l-lg p-2 text-stone-950 w-3/4"
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button className="w-1/4 py-2 rounded-l-sm rounded-r-lg bg-lime-600 border-2 border-lime-600 px-6">
          Send
        </button>
        </div>
      </form>
    </div>
  );
}

export default App;
