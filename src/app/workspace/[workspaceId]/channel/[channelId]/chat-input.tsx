import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

export function ChatInput({ placeholder }: ChatInputProps) {
const [editorKey, setEditorKey] = useState(0);
const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { mutate: createMessage } = useCreateMessage();

  async function handleSubmit({
    body,
    image
  }: {
    body: string;
    image: File | null;
  }) {
    console.log({ body, image });
    try {
      setIsPending(true);

      createMessage({
        workspaceId,
        channelId,
        body,
      }, {});

      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Erro ao enviar a mensagem");
    } finally {
      setIsPending(false);
    }
  }

  // editorRef.current?.focus();

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={isPending}
        innerRef={editorRef}
      />
    </div>
  );
}
