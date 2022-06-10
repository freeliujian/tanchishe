

interface keyProps {
  value: string 
  isDown:boolean
  isUp:boolean
  press?: any
  release?: any
  downHandler:(Event:KeyboardEvent)=>void
  upHandler:(Event:KeyboardEvent)=>void
  unsubscribe:()=>void
}


const keyboard = (value:string) => {
  let key:keyProps = {
    value: value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    
    downHandler: event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) 
        key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },

    upHandler: event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },

    unsubscribe: () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    }
  };
  console.log(value);
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  return key;
}

export {
  keyboard,
  keyProps
};