import React from "react";
import { BiImport } from "react-icons/bi";

function InputConsole({ setCurrentInput, currentInput, getFile }) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#ededed] p-4 flex justify-between">
        <h3 className="font-bold">Input : </h3>
        <label
          htmlFor="inputFile"
          className="flex items-center font-semibold gap-3"
        >
          <input
            className="hidden"
            type="file"
            accept="."
            id="inputfile"
            onChange={(e) => getFile(e, setCurrentInput)}
          />
        </label>
      </div>
      <textarea
        className="h-[calc(50vh_-_4rem)] resize-none"
        onChange={(e) => setCurrentInput(e.target.value)}
        value={currentInput}
      ></textarea>
    </div>
  );
}

export default InputConsole;
