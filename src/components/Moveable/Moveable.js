import React from 'react'
import { useResize, useMoveable } from '../../hooks';
import Moveable from 'react-moveable';

const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    color,
    id,
    setSelected,
    isSelected = false,
    updateEnd,
    deleteMoveable,
  }) => {
    
    const { 
      ref,
      onResize,
      onResizeEnd
     } = useResize(top, left, width, height, color, index, id)
  
    return (
      <>
        <div
          ref={ref}
          className="draggable"
          id={"component-" + id}
          style={{
            position: "absolute",
            top: top,
            left: left,
            width: width,
            height: height,
            backgroundSize: "cover",
            backgroundImage: `url(${color})`,
          }}
          onClick={() => setSelected(id)}
        />
  
        <Moveable
          target={isSelected && ref.current}
          resizable
          draggable
          onDrag={(e) => {
            updateMoveable(id, {
              top: e.top,
              left: e.left,
              width,
              height,
              color,
            });
          }}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          zoom={1}
          origin={false}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        />
        <button
          style={{ position: "absolute", top: top + 10, left: left + 10 }}
          className='delete'
          onClick={() => deleteMoveable(id)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/></svg>
         </button>
      </>
    );
  };

    export default Component;