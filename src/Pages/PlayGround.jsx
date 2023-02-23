import React, { useContext } from "react";
import axios from "axios";
// import CodeEditor from "../Components/PlayGround/CodeEditor";
import Navbar from "../Components/PlayGround/Navbar";
import EditContainer from "../Components/PlayGround/EditContainer";
import InputConsole from "../Components/PlayGround/InputConsole";
import OutputConsole from "../Components/PlayGround/OutputConsole";
import { ModalContext } from "../Components/Context/ModalContext";
import {
  PlayGroundContext,
  languageMap,
} from "../Components/Context/PlayGroundContext";
import { Buffer } from "buffer";
import { useParams } from "react-router-dom";
// import { async } from "@firebase/util";
import Modal from '../Components/Modal';

function PlayGround() {
  const { folderId, playgroundId } = useParams();
  const { folders, savePlayground } = useContext(PlayGroundContext);
  const { openModal, isOpenModal, closeModal } = useContext(ModalContext);
  const { title, language, code } = folders[folderId].playground[playgroundId];

  const [currentCode, setCurrentCode] = React.useState(code);
  const [currentLanguage, setCurrentLanguage] = React.useState(language);
  const [currentInput, setCurrentInput] = React.useState("");
  const [currentOutput, setCurrentOutput] = React.useState("");
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  // all logic would be here now

  const saveCode = () => {
    savePlayground(
      folderId,
      playgroundId,
      currentCode,
      currentCode,
      currentLanguage
    );
  };

  const enCode = (code) => {
    return Buffer.from(code, "binary").toString("base64");
  };

  const deCode = (code) => {
    return Buffer.from(code, "base64").toString();
  };

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "7d1261ca9dmsh9dcf9cfdf77a832p198088jsn0739bba8195d",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
      }),
    };

    const res = await axios.request(options);
    return res.data.token;
  };

  const getSubmission = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "7d1261ca9dmsh9dcf9cfdf77a832p198088jsn0739bba8195d",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    const res = await axios.request(options);

    if (res.data.status_id <= 2) {
      const res2 = await getSubmission(token);
      return res2.data;
    }
    return res.data;
  };

  const runCode = async () => {
    openModal({
      show: true,
      Modaltype: 6,
      identifiers: {
        folderId: "",
        cardId: "",
      },
    });
    const language_id = languageMap[currentLanguage].id;
    const source_code = enCode(currentCode);
    const stdin = enCode(currentInput);

    // pass the code to the judge0 api and get the token
    const token = await postSubmission(language_id, source_code, stdin);

    // get the result of the code
    const result = await getSubmission(token);

    const status_name = result.status.description;
    const decoded_output = deCode(result.stdout ? result.stdout : "");
    const decoded_error = deCode(result.stderr ? result.stderr : "");
    const decoded_compile_output = deCode(
      result.compile_output ? result.compile_output : ""
    );

    let final_output = "";

    if (result.status_id !== 3) {
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      } else {
        final_output = decoded_compile_output;
      }
    } else {
      final_output = decoded_output;
    }

    setCurrentOutput(status_name + "\n\n" + final_output);
    closeModal();
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((error) => console.log(error));
  };

  const readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  return (
      <div>
        <Navbar isFullScreen={isFullScreen}/>
        <div className="flex flex-col lg:flex-row h-full">
          <div className={`${isFullScreen ? "w-full" : "w-full lg:2-3/4"}`}>
            <EditContainer 
              title={title}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
              currentCode={currentCode}
              setCurrentCode={setCurrentCode}
              folderId={folderId}
              playgroundId={playgroundId}
              saveCode={saveCode}
              runCode={runCode}
              getFile={getFile}
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
            />
          </div>
          {
            !isFullScreen && <div className="w-full lg:w-1/4">
              <InputConsole
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
                getFile={getFile}
              />
              <OutputConsole currentOutput={currentOutput}/>
            </div>
          }
        </div>
        {isOpenModal.show && <Modal />}
      </div>
  )
}

export default PlayGround;
