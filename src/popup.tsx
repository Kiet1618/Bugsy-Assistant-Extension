import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Style, Input,
  ContainerCenterText, ContainerInput,
  ContainerChatHistory, BoxChatRequest,
  BoxChatResponse, ContainerChat,
  ContainerImgLogo, ContainerFooter,
  ButtonFooter, ContainerImgSpeak
} from "./styles";

import { GPT35TURBO, GPT35TURBO16K, ADA } from './api/configs';
import Markdown from 'react-markdown'
import { getResponseAzureChat } from "./api/chat";
import { getHistory, getSpeak } from "./storage/localstorage";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

type Chat = {
  request: string;
  response: string;
};

const Popup = () => {
  const [chat, setChat] = useState<Array<Chat>>([]);

  const [input, setInput] = useState<string>("");
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<string>(GPT35TURBO);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  //use Effect
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    try {
      const data = getHistory()
      if (data) {
        setChat(data);
      }
    }
    catch (err) {
      console.log(err);
    }

    try {
      const data = getSpeak()
      if (data) {
        setSpeech(data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }, []);


  // text to speech
  const [voicelist, setVoicelist] = useState([]);
  const [currLang, setCurrLang] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const updateVoicelist = () => {
      const voices: any = synth.getVoices();
      setVoicelist(voices);
    };

    synth.onvoiceschanged = updateVoicelist;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const speakfnc = (text: string) => {
    const regex = /<[^>]*>/g;
    const cleanText = text.replace(regex, '');

    // Set the maximum chunk size based on your requirements
    const maxChunkSize = 200;

    // Break down the text into chunks
    const chunks = [];
    for (let i = 0; i < cleanText.length; i += maxChunkSize) {
      chunks.push(cleanText.slice(i, i + maxChunkSize));
    }

    // Speak each chunk separately
    chunks.forEach(chunk => {
      const speakText = new SpeechSynthesisUtterance(chunk);
      speakText.voice = currLang;
      window.speechSynthesis.speak(speakText);
    });
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  }


  const [speech, setSpeech] = useState<Boolean>(false);

  // Speech Recognition

  const [loadingRecognition, setLoadingRecognition] = useState(false);


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleRecognitionStart = () => {
    setLoadingRecognition(true);
    SpeechRecognition.startListening;

  }
  const handleRecognitionStop = () => {
    setLoadingRecognition(false);
    SpeechRecognition.stopListening;
    setChat([...chat, { request: transcript, response: "Loading..." }]);
    setInput("");
    if (transcript) {
      getResponseAzureChat(transcript, model)
        .then((response: string) => {
          setChat([...chat, { request: transcript, response: response }]);
          localStorage.setItem("chat", JSON.stringify([...chat, { request: transcript, response: response }]));
          if (speech) {
            speakfnc(response)
          }
        });
    }
    else {
      setChat([...chat, { request: "", response: "I didn't hear you say anything, could you please say that again?" }]);
      if (speech) {
        speakfnc("I didn't hear you say anything, could you please say that again?")
      }
    }
  }


  return (
    <Style>
      <ContainerCenterText>
        <ContainerImgLogo>
          <img width={"100px"} src="https://i.ibb.co/6RKxZK9/download-logo.png" alt="Bugsy" />
        </ContainerImgLogo>
        <img width={"150px"} src="https://i.ibb.co/SBxCPSF/cooltext450696555749941.png" alt="Bugsy" />
      </ContainerCenterText>
      <ContainerImgSpeak>
        <ButtonFooter onClick={
          () => {
            setSpeech(!speech);
            stopSpeaking();
            localStorage.setItem("speak", JSON.stringify(!speech));
          }
        }>
          {speech ?
            <img width={"20px"} src="https://i.ibb.co/y4HMRC2/icons8-mute-50.png"></img> :
            <img width={"20px"} src="https://i.ibb.co/CVt4F2P/icons8-mute-50-1.png"></img>}
        </ButtonFooter>
      </ContainerImgSpeak>
      <ContainerChatHistory ref={chatHistoryRef}>
        {chat.map((item, index) => (
          <ContainerChat key={index}>
            {item.request ? <BoxChatRequest>  <Markdown>{item.request}</Markdown></BoxChatRequest> : null}
            {item.response ? <BoxChatResponse> <Markdown>{item.response}</Markdown></BoxChatResponse> : null}
          </ContainerChat>
        ))}
      </ContainerChatHistory>
      <ContainerInput>
        <Input
          placeholder="Type something..."
          onChange={handleInput}
          value={input}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setChat([...chat, { request: input, response: "Loading..." }]);
              setInput("");
              getResponseAzureChat(input, model)
                .then((response: string) => {
                  setChat([...chat, { request: input, response: response }]);
                  localStorage.setItem("chat", JSON.stringify([...chat, { request: input, response: response }]));
                  if (speech) {
                    speakfnc(response)
                  }
                });
            }
          }}
        />
        {!loadingRecognition ?
          <ButtonFooter onClick={handleRecognitionStart}>
            <img width={"20px"} src="https://i.ibb.co/N9HvgCk/icons8-mic-50.png"></img>

          </ButtonFooter> :
          <ButtonFooter onClick={handleRecognitionStop}
          >
            <img width={"20px"} src="https://i.ibb.co/MRm34F1/icons8-stop-50.png"></img>

          </ButtonFooter>
        }

      </ContainerInput>

      <ContainerFooter>

        <ButtonFooter onClick={
          () => {
            if (model === GPT35TURBO) {
              setModel(GPT35TURBO16K)
            } else {
              setModel(GPT35TURBO)
            }
          }
        }>{model === GPT35TURBO ? GPT35TURBO : GPT35TURBO16K}</ButtonFooter>



        <ButtonFooter onClick={
          () => {
            localStorage.removeItem("chat");
            setChat([]);
          }
        }>Clear History</ButtonFooter>
      </ContainerFooter>
    </Style>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);


