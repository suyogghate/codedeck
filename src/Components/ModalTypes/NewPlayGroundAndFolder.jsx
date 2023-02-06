import React from "react";
import Select from "react-select";
import { ModalContext } from "../Context/ModalContext";
import { PlayGroundContext } from "../Context/PlayGroundContext";
import { RxCross1 } from "react-icons/rx";

function NewPlayGroundAndFolder() {
  const { isOpenModal, closeModal } = React.useContext(ModalContext);
  const { addPlayGroundAndFolder } = React.useContext(PlayGroundContext);
  const [playGroundName, setPlayGroundName] = React.useState("");
  const [folderName, setFolderName] = React.useState("");
  
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };
  
  const languageOption = [
    { value: "javascript", label: "javascript" },
    { value: "python", label: "python" },
    { value: "java", label: "java" },
    { value: "cpp", label: "cpp" },
  ];
  
  const [language, setLanguage] = React.useState(languageOption[0]);
  return (
    <div>
      <div className="flex flex-row justify-end p-4">
        <RxCross1 size={"1.2em"} onClick={() => closeModal()} />
      </div>
      <div className="px-4 py-4 mb-8 flex flex-col items-center justify-center gap-6">
        <h2>Create a New Playground & New Folder</h2>
        <div className="flex w-full">
          <label>Enter Folder Name</label>
          <input
            type="text"
            value={folderName}
            placeholder="Please enter Playground Title"
            onChange={(e) => setFolderName(e.target.value)}
            className="border-[.5px] text-sm border-gray rounded-lg shadow-sm p-2 w-full"
          />
        </div>
        <div className="flex w-full">
          <label>Enter Playground Name</label>
          <input
            type="text"
            value={playGroundName}
            placeholder="Please enter Playground Title"
            onChange={(e) => setPlayGroundName(e.target.value)}
            className="border-[.5px] text-sm border-gray rounded-lg shadow-sm p-2 w-full"
          />
        </div>
        <Select options={languageOption} value={language} onChange={handleLanguageChange}/>
        <button className="p-3 w-36 text-black bg-white rounded-lg font-semibold bg-darkBlue border-[0.5px] border-gray shadow-lg" onClick={() => {
          addPlayGroundAndFolder(folderName, playGroundName, language.value);
          closeModal();
        }}>
          Create Playground and Folder
        </button>
      </div>
    </div>
  );
}

export default NewPlayGroundAndFolder;
