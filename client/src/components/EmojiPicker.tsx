import { Picker } from 'emoji-mart';
import { useState } from 'react';

export default function EmojiPicker() {
  const [isOpen, setIsOpen] = useState(false);
  // const addEmoji = emoji => {
  //   handleEmoji(emoji);
  // };

  return (
    <div
      style={
        isOpen
          ? { height: 'auto', padding: '0.75rem 0', boxSizing: 'border-box' }
          : { height: 0, overflow: 'hidden' }
      }
    >
      {/* <Picker
        onSelect={handleSelect}
        color="#00D1B2"
        showPreview={false}
        title=""
      /> */}
    </div>
  );
}
