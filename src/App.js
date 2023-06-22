import React from "react";
import {useMoveable} from "./hooks";
import {Component} from "./components";

const App = () => {

  const {
    moveableComponents,
    selected,
    setSelected,
    addMoveable,
    updateMoveable,
    handleResizeStart,
    deleteMoveable,
  } = useMoveable();
  
  return (
    <main style={{ height : "100vh", width: "100vw" }}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <>
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
            deleteMoveable={deleteMoveable}
          />
          </>
        ))}
      </div>
    </main>
  );
};

export default App;
