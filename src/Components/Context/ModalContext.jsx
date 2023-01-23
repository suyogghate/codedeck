import React from "react";
import { createContext } from "react";

export const ModalContext = createContext();

function ModalProvider({children}) {

    const initialModalFields = {
        show: false,
        modalType: "",
        identifiers: {
            folderId: "",
            cardId: ""
        }
    }

    const [isOpenModal, setIsOpenModal] = React.useState({...initialModalFields});

    const openModal = (value) => {
        setIsOpenModal(value);
    }

    const closeModal = (value) => {
        setIsOpenModal({...initialModalFields})
    }

    const ModalFeatures = {
        isOpenModal: isOpenModal,
        openModal: openModal,
        closeModal: closeModal
    }

    return (
        <ModalContext.Provider value={ModalFeatures}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;