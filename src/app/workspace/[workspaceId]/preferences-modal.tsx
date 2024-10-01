import { toast } from "sonner";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

interface PreferencesModalProps {
  open: boolean;
  setOpen(open: boolean): void;
  initialValue: string;
}

export function PreferencesModal({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja apagar esta área de trabalho?",
    "Esta ação é irreversível"
  );

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

  async function handleRemove() {
    const ok = await confirm();

    if (!ok) return;

    removeWorkspace({
      id: workspaceId,
    }, {
      onSuccess() {
        toast.success('Área de trabalho deletada com sucesso!');
        router.replace('/');
      },
      onError() {
        toast.error('Erro ao deletar sua Área de trabalho!');
      },
    });
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok = await confirm();

    updateWorkspace({
      id: workspaceId,
      name: value
    }, {
      onSuccess() {
        toast.success('Área de trabalho atualizada! 🤩');
        setEditOpen(false);
      },
      onError() {
        toast.error('Erro ao alterar sua Área de trabalho 😓');
      },
    });
  }

  return (
    <>
      <ConfirmDialog />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              {value}
            </DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      Workspace name
                    </p>

                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                      Edit
                    </p>
                  </div>

                  <p className="text-sm">{value}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edite o nome desta Área de trabalho</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="O que vem em sua mente? - 'Trabalho', 'Projeto pessoal'..."
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkspace}>
                        Cancelar
                      </Button>
                    </DialogClose>

                    <Button disabled={isUpdatingWorkspace}>
                      Salvar
                    </Button>

                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button
              disabled={isRemovingWorkspace}
              onClick={handleRemove}
              className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
            >
              <TrashIcon />
              <p className="text-sm font-semibold">Exclua esta Área de trabalho</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
