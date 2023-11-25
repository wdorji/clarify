"use client";
import { useRouter } from "next/navigation";

type Prop = {
  buttonLabel: string | null;
  route: string | null;
  size: string | null;
};

export default function NavigateButton({ route, buttonLabel, size }: Prop) {
  const router = useRouter();
  const style =
    "w-" +
    size +
    " flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]";
  return (
    <div className={style} onClick={() => router.replace("/" + route)}>
      <span className="text-black text-base font-semibold">{buttonLabel}</span>
    </div>
  );
}
