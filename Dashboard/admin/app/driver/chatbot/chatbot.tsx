import { useState, useEffect } from "react";
import {
  FaMessage,
  FaArrowRight,
  FaArrowLeft,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi" | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    ) {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      if (language === "hindi") {
        recognitionInstance.lang = "hi-IN";
      } else {
        recognitionInstance.lang = "en-US";
      }

      setRecognition(recognitionInstance);
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setInputText(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, [recognition]);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    "" //API KEY
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const generateResponse = async (prompt: string) => {
    try {
      setIsLoading(true);

      // Fallback to Gemini API if no predefined response
      const contextPrompt =
        language === "hindi"
          ? `आप एक बुद्धिमान कचरा प्रबंधन और रिपोर्टिंग कंपनी के विशेषज्ञ चैटबॉट हैं। आप पहचान, रिपोर्टिंग और निगरानी प्रथाओं में विशेषज्ञ हैं। कृपया GPS सिस्टम का उपयोग करने के निर्देश ("चरण 1: अपने डैशबोर्ड के दाईं ओर मैप देखें (रंग: नीली मार्ग)।\n", "चरण 2: मैप पर या 'स्थान' कॉलम में स्थान पिन पर टैप करें (छोटा नीला पिन)। यह सीधे नेविगेशन सिस्टम खोलेगा।\n", "चरण 3: अपने गंतव्य तक पहुंचने के लिए नीली रेखाओं में दिखाए गए मार्ग का पालन करें।"), डैशबोर्ड टास्क अपडेट नहीं हो रहे हैं ("चरण 1: ऊपर की ओर हरे बॉक्स देखें (जैसे, 'लंबित रिपोर्ट' या 'समाधान की गई रिपोर्ट')।\n", "चरण 2: यदि संख्याएं नहीं बदल रही हैं, तो ब्राउज़र के रीफ्रेश आइकन पर क्लिक करें (शीर्ष-बाएं या कीबोर्ड F5)। यदि अभी भी फंसा हुआ है, तो शीर्ष बाएं में अपनी प्रोफ़ाइल तस्वीर पर क्लिक करके लॉग आउट करें। फिर से लॉग इन करें और जांचें।\n", "चरण 3: यदि अभी भी काम नहीं कर रहा है, तो अपने पर्यवेक्षक को कॉल करके समस्या की रिपोर्ट करें (पर्यवेक्षक संपर्क देखें)।"), वाहन खराबी (संदर्भ के लिए GPS मैप का उपयोग करके अपना वर्तमान स्थान बताएं।), और पर्यवेक्षक संपर्क (भरत सिंह 8764389872) के बारे में विस्तृत जानकारी प्रदान करें। जानकारीपूर्ण लेकिन संवादात्मक रहें, और व्यावहारिक समाधानों पर ध्यान दें। प्रश्न: ${prompt}`
          : `You are an expert chatbot for a intelligent waste management and reporting company. You specialize in detection, reporting, and monitoring practices. Please provide detailed, Instructions on using the GPS system("Step 1: Look at the map on the right side of your dashboard (color: blue routes).\n",
        "Step 2: Tap on the location pin on the map or in the 'Location' column (small blue pin). It will open the navigation system directly.\n",
        "Step 3: Follow the route shown in blue lines to reach your destination."), Dashboard isn't updating tasks("Step 1: Check the green boxes at the top (e.g., 'Pending Reports' or 'Resolved Reports').\n",
        "Step 2: If the numbers are not changing, click the browser's refresh icon (top-left or keyboard F5). If still stuck, log out by clicking your profile picture in the top left. Log back in and check again.\n",
        "Step 3: If still not working, report the issue by calling your supervisor (see Supervisor Contact)."), Vehicle Breakdown(Mention your current location (use GPS map for reference).), and Supervisor Contact(Bharat Singh 8764389872). Be informative yet conversational, and focus on practical solutions. Question: ${prompt}`;

      const result = await model.generateContent(contextPrompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [
        ...prev,
        {
          text: prompt,
          isUser: true,
          timestamp: new Date(),
        },
        {
          text,
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      setInputText("");
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg =
        language === "hindi"
          ? "माफ़ कीजिये, एक त्रुटि हुई। कृपया पुनः प्रयास करें।"
          : "Sorry, there was an error. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          text: errorMsg,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      generateResponse(inputText);
    }
  };

  const handleBack = () => {
    if (messages.length > 0) {
      setMessages([]);
    } else if (language) {
      setLanguage(null);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 mb-4 overflow-hidden">
          <div className="bg-[#2e7d32] p-4">
            <div className="flex justify-between items-center mb-4">
              {(language || messages.length > 0) && (
                <button
                  onClick={handleBack}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Go back"
                >
                  <FaArrowLeft size={16} />
                </button>
              )}
              <h3 className="text-lg font-semibold text-white">
                Ask Zonal Head
              </h3>
            </div>
            {!language ? (
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={() => setLanguage("english")}
                  className="py-2 px-4 bg-white text-[#2e7d32] rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage("hindi")}
                  className="py-2 px-4 bg-white text-[#2e7d32] rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  हिंदी
                </button>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto mt-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 ${
                      msg.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${
                        msg.isUser
                          ? "bg-green-100 text-gray-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="text-center text-gray-500">
                    {language === "hindi" ? "प्रतीक्षा करें..." : "Loading..."}
                  </div>
                )}
              </div>
            )}
          </div>

          {language && (
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    language === "hindi"
                      ? "अपना संदेश टाइप करें..."
                      : "Type your message..."
                  }
                  className="flex-1 p-2 border rounded text-gray-900"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#2e7d32] hover:bg-[#1b5e20]"
                  } text-white transition-colors`}
                  disabled={!recognition}
                >
                  {isListening ? (
                    <FaMicrophoneSlash size={20} />
                  ) : (
                    <FaMicrophone size={20} />
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#2e7d32] text-white px-4 rounded hover:bg-[#1b5e20] disabled:opacity-50"
                >
                  <FaArrowRight />
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="Ask Zonal Head"
      >
        <FaMessage size={20} />
      </button>
    </div>
  );
};

export default ChatBot;
