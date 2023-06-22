# Descripción del código

Este código está escrito en JavaScript y utiliza la biblioteca React para crear componentes interactivos. El código contiene dos custom hooks: `useMoveable` y `useResize`, que proporcionan funcionalidades específicas para manipular y redimensionar componentes en una interfaz de usuario.

## useMoveable

El hook `useMoveable` proporciona las siguientes funciones:

### `addMoveable`

```javascript
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
```

Esta función se encarga de agregar un nuevo componente movible a la lista de componentes `moveableComponents`. El componente movible tiene propiedades como `id`, `top`, `left`, `width`, `height`, `color` y `updateEnd`. Utiliza una función `getImage` para obtener una imagen de una API externa y asigna la URL de la imagen al color del componente.

### `updateMoveable`

```javascript
const updateMoveable = (id, newComponent, updateEnd = false) => {
  const updatedMoveables = moveableComponents.map((moveable, i) => {
    if (moveable.id === id) {
      return { id, ...newComponent, updateEnd };
    }
    return moveable;
  });
  setMoveableComponents(updatedMoveables);
};
```

Esta función se utiliza para actualizar un componente movible existente en la lista de componentes `moveableComponents`. Recibe el `id` del componente que se va a actualizar y un objeto `newComponent` que contiene las nuevas propiedades del componente. Si se proporciona el parámetro `updateEnd` con el valor `true`, indica que la actualización ha finalizado.

### `handleResizeStart`

```javascript
const handleResizeStart = (index, e) => {
  const [handlePosX, handlePosY] = e.direction;

  if (handlePosX === -1) {
    const initialLeft = e.left;
    const initialWidth = e.width;
  }
};
```

Esta función se invoca cuando se inicia la redimensión de un componente movible. Verifica si la redimensión se inicia desde el lado izquierdo del componente y guarda los valores iniciales de left y width. Puede utilizarse para configurar un controlador de evento onResize que actualiza el valor de left en función de los cambios en el ancho.

### `deleteMoveable`

```javascript
const deleteMoveable = (id) => {
  const updatedMoveables = moveableComponents.filter(
    (moveable) => moveable.id !== id
  );
  setMoveableComponents(updatedMoveables);
};
```

Esta función se utiliza para eliminar un componente movible de la lista de componentes `moveableComponents`. Recibe el `id` del componente que se va a eliminar y actualiza la lista de componentes sin incluir el componente con el `id` proporcionado.

## useResize

El hook `useResize` proporciona las siguientes funciones:

### `onResize`

```javascript
const onResize = async (e) => {
  let newWidth = e.width;
  let newHeight = e.height;

  const positionMaxTop = top + newHeight;
  const positionMaxLeft = left + newWidth;

  if (positionMaxTop > parentBounds?.height)
    newHeight = parentBounds?.height - top;
  if (positionMaxLeft > parentBounds?.width)
    newWidth = parentBounds?.width - left;

  updateMoveable(id, {
    top,
    left,
    width: newWidth,
    height: newHeight,
    color,
  });

  const beforeTranslate = e.drag.beforeTranslate;

  ref.current.style.width = `${e.width}px`;
  ref.current.style.height = `${e.height}px`;

  let translateX = beforeTranslate[0];
  let translateY = beforeTranslate[1];

  ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

  setNodoReferencia({
    ...nodoReferencia,
    translateX,
    translateY,
    top: top + translateY < 0 ? 0 : top + translateY,
    left: left + translateX < 0 ? 0 : left + translateX,
  });
};
```

Esta función se invoca durante la redimensión de un componente movible y se encarga de actualizar el ancho y alto del componente. También utiliza la función `updateMoveable` del hook `useMoveable` para actualizar el componente movible con las nuevas dimensiones y otras propiedades. Además, actualiza el nodo de referencia del componente con los cambios de tamaño y posición.

### `onResizeEnd`

```javascript
const onResizeEnd = async (e) => {
  let newWidth = e.lastEvent?.width;
  let newHeight = e.lastEvent?.height;

  const positionMaxTop = top + newHeight;
  const positionMaxLeft = left + newWidth;

  if (positionMaxTop > parentBounds?.height)
    newHeight = parentBounds?.height - top;
  if (positionMaxLeft > parentBounds?.width)
    newWidth = parentBounds?.width - left;

};
```

Esta función se invoca al finalizar la redimensión de un componente movible. Permite realizar acciones adicionales o aplicar lógica adicional después de la redimensión, si es necesario.

### `Moveable`

```javascript
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
  />;
```

El siguiente código se utiliza para mostrar y manipular el componente, el código contaba con un bug, que se corrigió el eliminar la funcion `updateMoveable` que se llamaba dentro de la función `onResizeEnd`, otra forma de corregir el bug tambien es seguir la documentación del componente `Moveable` y solo llamar a las propiedades para hacer`resize` como se muestra acontinuación

```javascript
<div className="target" ref={targetRef} style={{
  maxWidth: "auto",
  maxHeight: "auto",
  minWidth: "auto",
  minHeight: "auto",
}}>Target</div>
  <Moveable
    target={targetRef}
    resizable={true}
    keepRatio={false}
    throttleResize={1}
    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
    onResize={e => {
      e.target.style.width = `${e.width}px`;
      e.target.style.height = `${e.height}px`;
      e.target.style.transform = e.drag.transform;
    }}
  />
```