import React from "react";
import { FiPlus } from "react-icons/fi";
import { ModalContext } from "../Context/ModalContext";

function LeftPaneScreen() {
  const {openModal} = React.useContext(ModalContext);

  return (
    <div className="h-screen flex justify-end bg-black">
      <div className="mx-auto flex flex-col items-center justify-center gap-3 text-center">
        <img src="./logo-small.png" alt="logo" className="h-23 w-23 max-w-[60%]  rounded-[50%]"/>
        <h3 className="font-semibold text-white">Code Deck</h3>
        <h4 className="font-semibold text-white">Code. Compile. Debug.</h4>
        <button className="w-1/2 p-4 bg-white shadow-lg rounded-full drop-shadow-2xl" onClick={() => {
          openModal({
            show: true,
            modalType: 3,
            identifiers: {
              folderId: "",
              playgroundId: ""
            }
          })
        }}>+ Create New Playground</button>
      </div>
    </div>
  );
}

export default LeftPaneScreen;
