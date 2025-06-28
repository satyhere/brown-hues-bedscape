import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const FAQ = [
  {
    q: "What products do you offer?",
    a: "We offer custom, high-quality pinewood bed pallets with multiple size and treatment options."
  },
  {
    q: "Where do you deliver?",
    a: "We deliver across Bangalore."
  },
  {
    q: "How can I place an order?",
    a: "You can configure and place your order directly on our website. If you need help, just ask!"
  },
  {
    q: "What are the payment options?",
    a: "We offer pay on delivery. You only pay when you're satisfied with the product."
  },
  {
    q: "How can I contact support?",
    a: "You can email us at info@brownhues.co or call +91 9876543210."
  },
];

const getBotResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const { q, a } of FAQ) {
    if (lower.includes(q.toLowerCase().split(" ")[0])) {
      return a;
    }
  }
  if (lower.includes("hello") || lower.includes("hi")) return "Hello! How can I help you today?";
  if (lower.includes("price") || lower.includes("cost")) return "Our bed pallets are priced based on size and treatment. Please select a size to see pricing.";
  if (lower.includes("custom")) return "Yes, we offer custom sizes. Let me know your requirements!";
  return "I'm here to help! Please ask a question or select one of the FAQs.";
};

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm your assistant. How can I help you today? Here are some FAQs:"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (text?: string) => {
    const userInput = text || input.trim();
    if (!userInput) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: userInput }]);
    setInput("");
    setTimeout(() => {
      const botReply = getBotResponse(userInput);
      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 focus:outline-none transition-all"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Chatbot" : "Open Chatbot"}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 max-w-[95vw] bg-white rounded-xl shadow-2xl border border-primary/30 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-primary text-white px-4 py-3 font-semibold flex items-center justify-between">
            <span>Chat with us</span>
            <button onClick={() => setOpen(false)} aria-label="Close Chatbot">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 px-3 py-2 overflow-y-auto max-h-72 custom-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-white ml-auto"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-3 py-2 border-t bg-gray-50 flex flex-col gap-2">
            <div className="flex gap-2 mb-1 flex-wrap">
              {FAQ.map(({ q }, idx) => (
                <button
                  key={idx}
                  className="bg-gray-200 hover:bg-primary/10 text-gray-700 hover:text-primary rounded-full px-3 py-1 text-xs mb-1 transition-all border border-transparent hover:border-primary"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                className="flex-1 rounded-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                autoFocus
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
