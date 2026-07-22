import type { RefObject } from "react";

type MessageInputProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  send: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export default function MessageInput({
  text,
  setText,
  send,
  inputRef,
}: MessageInputProps) {
  return (
    <div className="border-t border-secondary/20 p-4 flex gap-2 shrink-0">
      <input
        ref={inputRef}
        value={text}
        maxLength={120}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded bg-primary/40 outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
      />

      <button
        onClick={send}
        className="px-4 py-2 bg-secondary text-primary rounded"
      >
        Send
      </button>
    </div>
  );
}
