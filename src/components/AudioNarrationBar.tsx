import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, FastForward, RotateCcw } from "lucide-react";

interface AudioNarrationBarProps {
  title: string;
  phases: {
    number: string;
    title: string;
    narrative: string[];
  }[];
}

/**
 * Normalizes company and brand names for browser SpeechSynthesis
 * to ensure accurate native pronunciation:
 * - "DIMISI" -> "Dih-mee-see" (prevents TTS engines from mispronouncing as "demise")
 * - "DIMISIPEDIA" -> "Dih-mee-see peedia"
 * - "Kalesh" -> "Kaa-laysh"
 * - "CATI" -> "C.A.T.I."
 */
function phoneticallyNormalizeForSpeech(text: string): string {
  return text
    .replace(/\bDIMISIPEDIA\b/gi, "Dih-mee-see peedia")
    .replace(/\bDIMISI\b/g, "Dih-mee-see")
    .replace(/\bDimisi\b/g, "Dih-mee-see")
    .replace(/\bKalesh\b/g, "Kaa-laysh")
    .replace(/\bCATI\b/g, "C.A.T.I.")
    .replace(/[—–]/g, ", ");
}

export function AudioNarrationBar({ title, phases }: AudioNarrationBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [rate, setRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakPhase = (index: number, playbackRate = rate) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    if (index >= phases.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPhaseIndex(0);
      return;
    }

    const phase = phases[index];
    if (!phase) return;

    const rawText = `Phase ${phase.number}. ${phase.title}. ${phase.narrative.join(" ")}`;
    const textToRead = phoneticallyNormalizeForSpeech(rawText);
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Pick natural English voice if available
    const voices = synthRef.current.getVoices();
    const englishVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("India")),
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (index + 1 < phases.length) {
        setCurrentPhaseIndex(index + 1);
        speakPhase(index + 1, playbackRate);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentPhaseIndex(0);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    setCurrentPhaseIndex(index);
    setIsPlaying(true);
    setIsPaused(false);

    synthRef.current.speak(utterance);
  };

  const handlePlayPause = () => {
    if (!synthRef.current) return;

    if (!isPlaying) {
      speakPhase(currentPhaseIndex, rate);
    } else if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentPhaseIndex(0);
  };

  const cycleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (isPlaying && !isPaused) {
      speakPhase(currentPhaseIndex, nextRate);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-border bg-surface px-4 py-3 shadow-xs sm:rounded-none">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
          <Volume2 className="size-4 animate-pulse" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Listen to Chronicle · ~12 min narration
          </p>
          <p className="font-serif text-sm font-medium text-foreground">
            {isPlaying
              ? `Playing: Phase ${phases[currentPhaseIndex]?.number} — ${phases[currentPhaseIndex]?.title}`
              : "Read aloud using Browser Speech Audio"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePlayPause}
          className="inline-flex items-center gap-1.5 border border-primary bg-primary px-3.5 py-1.5 font-mono text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
        >
          {isPlaying && !isPaused ? (
            <>
              <Pause className="size-3.5" /> Pause
            </>
          ) : (
            <>
              <Play className="size-3.5" /> {isPaused ? "Resume" : "Play Chronicle"}
            </>
          )}
        </button>

        {isPlaying || isPaused ? (
          <button
            type="button"
            onClick={handleStop}
            className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            title="Stop narration"
          >
            <Square className="size-3.5" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={cycleRate}
          className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          title="Playback speed"
        >
          <FastForward className="size-3" />
          <span>{rate}x</span>
        </button>
      </div>
    </div>
  );
}
