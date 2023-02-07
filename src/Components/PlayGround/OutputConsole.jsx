import React from 'react'
import { BiExport } from 'react-icons/bi'

function OutputConsole({ currentOutput }) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#ededed] p-4 flex justify-between">
        <h3 className="font-bold">Output : </h3>
        <label
          htmlFor="inputFile"
          className="flex items-center font-semibold gap-3"
        >
          <input
            className="hidden"
            type="file"
            accept="."
            id="inputfile"
          />
        </label>
      </div>
      <textarea
        className="h-[calc(50vh_-_4rem)] resize-none"
        disabled
        value={currentOutput}
      ></textarea>
    </div>
  )
}

export default OutputConsole