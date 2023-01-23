import React, { useContext } from "react";
import { ModalContext } from "./Context/ModalContext";
import {
  NewFolder,
  NewPlayGround,
  NewPlayGroundAndFolder,
  EditFolder,
  Loading,
  EditPlayGroundTitle,
} from "./ModalTypes";

function Modal() {
  const { isOpenModal } = useContext(ModalContext);
  const { modalType } = isOpenModal;
  // ModalTypes
  // 1: New Folder
  // 2. New Playground
  // 3: New Playground and Folder
  // 4: Rename Folder
  // 5: Rename Playground
  // 6: Loading

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline:none">
      <div
        className="relative w-auto my-6 mx-auto max-w-3xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="border-0 rounded-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline:none">
          {modalType === 1 && <NewFolder />}
          {modalType === 2 && <NewPlayGround />}
          {modalType === 3 && <NewPlayGroundAndFolder />}
          {modalType === 4 && <EditFolder />}
          {modalType === 5 && <EditPlayGroundTitle />}
          {modalType === 6 && <Loading />}
        </div>
      </div>
    </div>
  );
}

export default Modal;
