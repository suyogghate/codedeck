import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { FcOpenedFolder } from "react-icons/fc";
import Card from "../Card";

function RightPaneScreen() {
  return (
    <div className="h-screen p-8">
      <div className="flex justify-between placeholder:mt-8 items-center">
        <h2>
          My<span className="font-semibold text-2xl">PlayGround</span>
        </h2>
        <h4>
          <span className="font-semibold text-2xl">+ </span>New Folder
        </h4>
      </div>
      <hr className="mb-12 mt-4 bg-black" />
      <div className="flex-col flex my-8">
        <div className="flex justify-between placeholder:mt-8 items-center">
          <div className="flex gap-4 items-center">
            <FcOpenedFolder className="text-2xl" />
            <h5 className="font-semibold">Title</h5>
          </div>
          <div className="flex gap-4 items-center">
            <BiEditAlt className="text-2xl" />
            <IoTrashOutline className="text-2xl" />
            <h5 className="font-semibold">
              +<span> New PlayGround</span>
            </h5>
          </div>
        </div>
      </div>
      <hr className="mb-12 mt-4 bg-black" />
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="/logo-small.png"
                alt="logo-small"
                className="h-10 w-10 rounded-[50%]"
              />
              <div>
                <h6>Title Dummy</h6>
                <h6>Language: C++</h6>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <BiEditAlt className="text-2xl" />
              <IoTrashOutline className="text-2xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <img
                src="/logo-small.png"
                alt="logo-small"
                className="h-10 w-10 rounded-[50%]"
              />
              <div>
                <h6>Title Dummy</h6>
                <h6>Language: C++</h6>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <BiEditAlt className="text-2xl" />
              <IoTrashOutline className="text-2xl" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RightPaneScreen;
