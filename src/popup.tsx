import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Style, Input,
  ContainerCenterText, ContainerInput,
  ContainerChatHistory, BoxChatRequest,
  BoxChatResponse, ContainerChat,
  ContainerImgLogo, ContainerFooter,
  ButtonFooter, ContainerListIcon
} from "./styles";

import { GPT35TURBO, GPT35TURBO16K, ADA } from './api/configs';
import Markdown from 'react-markdown'

import { getResponseAzureChat } from "./api/chat";
import { getHistory, getPdf } from "./storage/localstorage";

type Chat = {
  request: string;
  response: string;
};

interface AppState {
  screenCapture: string;
  open: boolean;
  title: string;
}

const Popup = () => {
  const [chat, setChat] = useState<Array<Chat>>([]);

  const [input, setInput] = useState<string>("");
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<string>(GPT35TURBO);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };



  // loading pdf
  const [pdfFile, setPdfFile] = useState<string>('');

  const fileType = ['application/pdf'];
  const [pdfFileError, setPdfFileError] = useState('');

  const handlePdfFileChange = (e: any) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          localStorage.setItem("pdf", e.target?.result ? e.target.result as string : '');
          setPdfFile(e.target?.result ? e.target.result as string : '');
          setPdfFileError('');
        }
      }
      else {
        setPdfFile('');
        setPdfFileError('Please select valid pdf file');
        localStorage.removeItem("pdf");
      }
    }
    else {
      console.log('select your file');
    }
  }

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

  }, []);

  return (
    <Style>
      <ContainerCenterText>
        <ContainerImgLogo>
          <img width={"60px"} src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl73-294f6e5b-aad2-484f-bde8-1ecf082f1dfe.png/v1/fill/w_1280,h_1280/bug_type_symbol_galar_by_jormxdos_dffvl73-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw3My0yOTRmNmU1Yi1hYWQyLTQ4NGYtYmRlOC0xZWNmMDgyZjFkZmUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.msN6ZkYf5XuPiA27qO-1Zaow3B4iSRqp3nAHzctfBW0" alt="Bugsy" />
        </ContainerImgLogo>
        <img width={"180px"} src="https://i.ibb.co/HH8F7dy/textLogo.png" alt="Bugsy" />
      </ContainerCenterText>
      <ContainerChatHistory ref={chatHistoryRef}>
        {chat.map((item, index) => (
          <ContainerChat key={index}>
            {item.request ? <BoxChatRequest>{item.request}</BoxChatRequest> : null}
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
                .then((response) => {
                  setChat([...chat, { request: input, response: response }]);
                  localStorage.setItem("chat", JSON.stringify([...chat, { request: input, response: response }]));
                });
            }
          }}
        />
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


