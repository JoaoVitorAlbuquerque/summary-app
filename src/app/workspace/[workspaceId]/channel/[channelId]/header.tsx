import { FaChevronDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useChannelId } from "@/hooks/use-channel-id";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { toast } from "sonner";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Deseja excluir este canal?",
    "Você está excluindo esta sala. Esta ação é irreversível.",
  );

  const [value, setValue] = useState(title);
  const [editOpen, setEditOpen] = useState(false);

  const { data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: isUpdatingChannel } = useUpdateChannel();
  const { mutate: removeChannel, isPending: isRemovingChannel } = useRemoveChannel();

  function handleEditOpen(value: boolean) {
    if (member?.role !== 'admin') return;

    setEditOpen(value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();

    setValue(value);
  }

  async function handleDelete() {
    const ok = await confirm();

    if (!ok) return;

    removeChannel({ id: channelId }, {
      onSuccess() {
        toast.success("Sala excluída");
        router.push(`/workspace/${workspaceId}`);
      },
      onError() {
        toast.error('Erro ao excluir a sala');
      },
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateChannel({ id: channelId, name: value }, {
      onSuccess() {
        toast.success('Sala atualizada.');
        setEditOpen(false);
      },
      onError() {
        toast.error('Erro ao atualizar sua sala.');
      },
    });
  }

  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
      <ConfirmDialog />

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              # {title}
            </DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Nome da sala</p>

                    {member?.role === 'admin' && (
                      <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                        Editar
                      </p>
                    )}
                  </div>

                  <p className="text-sm"># {title}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renomeie esta sala de estudo</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={value}
                    disabled={isUpdatingChannel}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Edite o nome desta sala..."
                  />
                </form>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUpdatingChannel}>
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button className="">
                    Salvar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {member?.role === 'admin' && (
              <button
                onClick={handleDelete}
                disabled={isRemovingChannel}
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600"
              >
                <TrashIcon className="size-4" />
                <span className="text-sm font-semibold">
                  Excluir sala de estudo
                </span>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
