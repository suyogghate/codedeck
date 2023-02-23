import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { FcOpenedFolder } from "react-icons/fc";
import Card from "../Card";
import { ModalContext } from "../Context/ModalContext";
import { PlayGroundContext } from "../Context/PlayGroundContext";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConf";

function RightPaneScreen() {
  const [user] = useAuthState(auth);

  const { openModal } = React.useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } =
    React.useContext(PlayGroundContext);
  const navigate = useNavigate();

  const logout = (e) => {
    auth
      .signOut()
      .then(() => {
        window.localStorage.clear();
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
        console.log("Sign-out Unsuccessful.");
      });
  };

  return (
    <div className="h-screen p-8">
      <div className="flex justify-between placeholder:mt-8 items-center">
        <h2>
          My<span className="font-semibold text-2xl">PlayGround</span>
        </h2>
        <h3
          className="cursor-pointer hover:scale-75"
          onClick={() => {
            openModal({
              show: true,
              modalType: 1,
              identifiers: {
                folderId: "null",
                playground: "null",
              },
            });
          }}
        >
          <span className="font-semibold text-2xl cursor-pointer">+ </span>New
          Folder
        </h3>
        <h4> {user && <span onClick={()=>logout()} className='flex gap-2 items-center cursor-pointer'>Logout <BiLogOut/> </span>} </h4>
      </div>
      <hr className="mb-12 mt-4 bg-black" />
      {folders &&
        Object.entries(folders).map(([folderId, folder]) => (
          <div className="flex-col flex my-8">
            <div className="flex justify-between placeholder:mt-8 items-center">
              <div className="flex gap-4 items-center" key={folderId}>
                <FcOpenedFolder className="text-2xl cursor-pointer" />
                <h5 className="font-semibold">{folder.title}</h5>
              </div>
              <div className="flex gap-4 items-center">
                <BiEditAlt
                  className="text-2xl cursor-pointer"
                  onClick={() =>
                    openModal({
                      show: true,
                      modalType: 4,
                      identifiers: {
                        folderId: folderId,
                        cardId: "",
                      },
                    })
                  }
                />
                <IoTrashOutline
                  className="text-2xl cursor-pointer"
                  onClick={() => deleteFolder(folderId)}
                />
                <h4
                  className="font-semibold cursor-pointer hover:scale-75"
                  onClick={() =>
                    openModal({
                      show: true,
                      modalType: 2,
                      identifiers: {
                        folderId: "",
                        cardId: "",
                      },
                    })
                  }
                >
                  +<span> New PlayGround</span>
                </h4>
              </div>
            </div>
            <hr className="mb-12 mt-4 bg-black" />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(folder["playground"]).map(
                ([playgroundId, playground]) => (
                  <Card key={playgroundId}>
                    <div
                      onClick={(e) => {
                        e.stopPropagation(); // stop click propagation to parent
                        navigate(`/playground/${folderId}/${playgroundId}`);
                      }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src="/logo-small.png"
                          alt="logo-small"
                          className="h-10 w-10 rounded-[50%]"
                        />
                        <div>
                          <h6>{playground?.title}</h6>
                          <h6>Language: {playground?.language}</h6>
                        </div>
                      </div>
                      <div
                        className="flex gap-4 items-center"
                        onClick={
                          (e) => e.stopPropagation() // stop click propagation to parent
                        }
                      >
                        <BiEditAlt
                          className="text-2xl cursor-pointer"
                          onClick={() =>
                            openModal({
                              show: true,
                              modalType: 5,
                              identifiers: {
                                folderId: folderId,
                                cardId: playgroundId,
                              },
                            })
                          }
                        />
                        <IoTrashOutline
                          className="text-2xl cursor-pointer"
                          onClick={() => deleteCard(folderId, playgroundId)}
                        />
                      </div>
                    </div>
                  </Card>
                )
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default RightPaneScreen;
