import Picker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';

export default function EmojiPicker({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  function handleClick(emojiData: EmojiClickData) {
    setMessage(prevMessage => {
      return `${prevMessage} ${emojiData.emoji}`;
    });
  }

  return (
    <Picker
      onEmojiClick={handleClick}
      lazyLoadEmojis={true}
      width="100%"
      height="350px"
      emojiStyle={EmojiStyle.NATIVE}
      previewConfig={{ showPreview: false }}
    />
  );
}
