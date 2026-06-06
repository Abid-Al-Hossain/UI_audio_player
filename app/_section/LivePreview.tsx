"use client";

import type { CSSProperties } from "react";
import type { AudioPlayerState } from "../types";

function shell(state: AudioPlayerState): CSSProperties {
  return { width: state.width, minHeight: state.height, padding: state.padding, gap: state.gap, borderRadius: state.radius, border: `${state.borderWidth}px solid ${state.border}`, boxShadow: `0 ${Math.round(state.shadow / 3)}px ${state.shadow}px rgba(0,0,0,.28)`, background: state.background, color: state.foreground, fontFamily: state.fontFamily, opacity: state.disabled ? 0.55 : 1 };
}

export default function LivePreview({ state }: { state: AudioPlayerState }) {
  const panel = shell(state);
  const progressByState: Record<AudioPlayerState["previewState"], number> = { default: 36, hover: 44, focus: 48, active: 62, open: 36, closed: 0, selected: 72, loading: 12, empty: 0, error: 0, success: 100 };
  const progress = progressByState[state.previewState];
  const duration = 258;
  const current = Math.round((duration * progress) / 100);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  const volume = state.muted ? 0 : 72;

  return <section id={state.id} role={state.role} aria-label={state.ariaLabel} tabIndex={state.tabIndex} style={panel} className="grid content-center gap-4">
    <div className="grid gap-2">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: state.accent }}>{state.label}</p>
      <h3 style={{ fontSize: state.titleSize, fontWeight: state.fontWeight }}>{state.title}</h3>
      <p style={{ color: "color-mix(in oklab, currentColor 70%, transparent)", fontSize: state.bodySize }}>{state.description}</p>
    </div>
    <audio controls src={state.src || undefined} muted={state.muted} loop={state.loop} preload={state.preload} aria-label={state.ariaLabel} className="w-full" style={{ accentColor: state.accent }} />
    {state.showTimeline && <div className="grid gap-2" aria-label={`${state.title} timeline preview`}>
      <progress value={progress} max={100} className="h-2 w-full overflow-hidden rounded-full" style={{ accentColor: state.accent }} />
      <div className="flex justify-between text-xs" style={{ color: "color-mix(in oklab, currentColor 72%, transparent)" }}>
        <span>{formatTime(current)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>}
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "color-mix(in oklab, currentColor 74%, transparent)" }}>
      <span>{state.previewState === "loading" ? "Buffering preview" : state.previewState === "error" ? "Source unavailable" : state.previewState === "success" ? "Finished playback" : `Playback: ${state.previewState}`}</span>
      <span>Rate {state.playbackRate}x</span>
      {state.showVolume && <span>Volume {volume}% {state.muted ? "(muted)" : ""}</span>}
      <a href="#transcript" style={{ color: state.accent }}>{state.transcriptLink}</a>
    </div>
  </section>;
}
