import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

export function ChatInput({ placeholder }: ChatInputProps) {
  const editorRef = useRef<Quill | null>(null);

  // editorRef.current?.focus();

  return (
    <div className="px-5 w-full">
      <Editor
        onSubmit={() => {}}
        placeholder={placeholder}
        disabled={false}
      />
    </div>
  );
}
