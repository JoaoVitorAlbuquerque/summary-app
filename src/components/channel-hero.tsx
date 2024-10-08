import { format } from "date-fns";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

export function ChannelHero({ name, creationTime }: ChannelHeroProps) {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <p className="text-2xl font-bold flex items-center mb-2">
        # {name}
      </p>

      <p className="font-normal text-slate-800 mb-4">
        Este canal foi criado em {format(creationTime, 'MMMM do, yyyy')}. Este é o começo da sala de aprendizado <strong>{name}</strong>.
      </p>
    </div>
  );
}
