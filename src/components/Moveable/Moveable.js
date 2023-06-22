import React from 'react'
import { useResize } from '../../hooks';
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
      </>
    );
  };

    export default Component;