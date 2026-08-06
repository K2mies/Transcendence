import type { Dispatch, RefObject, SetStateAction } from "react";

type MessageInputProps = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  send: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  canChat: boolean;
};

export default function MessageInput({
  text,
  setText,
  send,
  inputRef,
  canChat,
}: MessageInputProps) {
  return (
    <div className="border-t border-secondary/20 p-4 shrink-0">
      {!canChat && (
        <div className="mb-3 rounded bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-300">
          You are no longer friends with this user. Add them again to continue
          chatting.
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={text}
          maxLength={120}
          disabled={!canChat}
          onChange={(e) => setText(e.target.value)}
          aria-label="Type a message"
          placeholder={
            canChat ? "Type a message..." : "You can no longer send messages"
          }
          className="flex-1 min-w-0 rounded bg-primary/40 p-2 outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter" && canChat) {
              send();
            }
          }}
        />

        <button
          onClick={send}
          disabled={!canChat}
          className="rounded bg-secondary px-4 py-2 text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
