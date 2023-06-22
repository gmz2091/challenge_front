import { useState } from "react";
import getImage from "../services/api";


const useMoveable = () => {
    const [moveableComponents, setMoveableComponents] = useState([]);
    const [selected, setSelected] = useState(null);

    const addMoveable = async () => {
        const image = await getImage(moveableComponents.length + 1);

        setMoveableComponents([
          ...moveableComponents,
          {
            id: Math.floor(Math.random() * Date.now()),
            top: 0,
            left: 0,
            width: 100,
            height: 100,
            color: image.url,
            updateEnd: true
          },
        ]);
      };
    
      const updateMoveable = (id, newComponent, updateEnd = false) => {
        const updatedMoveables = moveableComponents.map((moveable, i) => {
          if (moveable.id === id) {
            return { id, ...newComponent, updateEnd };
          }
          return moveable;
        });
        setMoveableComponents(updatedMoveables);
      };
    
      const handleResizeStart = (index, e) => {
        console.log("e", e.direction);
        // Check if the resize is coming from the left handle
        const [handlePosX, handlePosY] = e.direction;
        // 0 => center
        // -1 => top or left
        // 1 => bottom or right
    
        // -1, -1
        // -1, 0
        // -1, 1
        if (handlePosX === -1) {
          console.log("width", moveableComponents, e);
          // Save the initial left and width values of the moveable component
          const initialLeft = e.left;
          const initialWidth = e.width;
    
          // Set up the onResize event handler to update the left value based on the change in width
        }
      }; 

    return { moveableComponents, selected, setSelected, addMoveable, updateMoveable, handleResizeStart };

}

export default useMoveable;