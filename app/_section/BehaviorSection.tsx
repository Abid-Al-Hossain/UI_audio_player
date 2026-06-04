"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Switch from "@/components/shared/input/Switch";
import type { AudioPlayerState } from "../types";

type Props = { state: AudioPlayerState; update: <K extends keyof AudioPlayerState>(key: K, value: AudioPlayerState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return <SectionCard title="Behavior" subtitle="Behavior controls for native audio generation."><Switch label="Loop" checked={state.loop} onChange={(value) => update("loop", value)} />
<Switch label="Muted" checked={state.muted} onChange={(value) => update("muted", value)} />
<Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} /></SectionCard>;
}
