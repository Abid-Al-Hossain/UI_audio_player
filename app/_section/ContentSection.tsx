"use client";

import { SectionCard } from "@/components/shared/layout/SectionCard";
import Input from "@/components/shared/input/Input";
import type { AudioPlayerState } from "../types";

type Props = { state: AudioPlayerState; update: <K extends keyof AudioPlayerState>(key: K, value: AudioPlayerState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native audio generation."><Input label="Transcript label" value={state.transcriptLink} onChange={(value) => update("transcriptLink", value)} /></SectionCard>;
}
