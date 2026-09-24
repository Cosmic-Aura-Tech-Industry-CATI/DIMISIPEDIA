import React, { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX, ArrowUp, ArrowDown } from "lucide-react";

interface DinoGameProps {
  onScoreUpdate?: (score: number, high: number) => void;
}

export function DinoGame({ onScoreUpdate }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<"idle" | "running" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback(
    (type: "jump" | "score" | "hit") => {
      if (!soundEnabled) return;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        const ctx = audioCtxRef.current;
        if (!ctx || ctx.state === "suspended") {
          ctx?.resume();
        }
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;
        if (type === "jump") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
          osc.start(now);
          osc.stop(now + 0.08);
        } else if (type === "score") {
          osc.type = "square";
          osc.frequency.setValueAtTime(587.33, now);
          osc.frequency.setValueAtTime(880, now + 0.08);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === "hit") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
          osc.start(now);
          osc.stop(now + 0.22);
        }
      } catch {
        // Audio might fail if not permitted
      }
    },
    [soundEnabled],
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dp_dino_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const gameRef = useRef({
    state: "idle" as "idle" | "running" | "gameover",
    score: 0,
    highScore: 0,
    speed: 4.2,
    distance: 0,
    lastScoreMilestone: 0,
    milestoneFlashFrames: 0,
    groundY: 132,
    dino: {
      x: 44,
      y: 108,
      w: 24,
      h: 24,
      vy: 0,
      isGrounded: true,
      ducking: false,
      legStep: 0,
      stepTimer: 0,
    },
    obstacles: [] as Array<{
      type: "cactus-small" | "cactus-double" | "cactus-tall" | "bird";
      x: number;
      y: number;
      w: number;
      h: number;
      frame?: number;
    }>,
    clouds: [
      { x: 120, y: 24, speed: 0.6 },
      { x: 340, y: 40, speed: 0.4 },
      { x: 520, y: 18, speed: 0.7 },
    ],
    groundDots: [
      { x: 10, y: 136, len: 12 },
      { x: 80, y: 138, len: 6 },
      { x: 150, y: 135, len: 18 },
      { x: 230, y: 137, len: 8 },
      { x: 310, y: 136, len: 14 },
      { x: 400, y: 138, len: 10 },
      { x: 490, y: 135, len: 22 },
      { x: 570, y: 137, len: 8 },
    ],
    spawnTimer: 70,
  });

  useEffect(() => {
    gameRef.current.highScore = highScore;
  }, [highScore]);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.state === "idle" || g.state === "gameover") {
      g.state = "running";
      g.score = 0;
      g.speed = 4.2;
      g.distance = 0;
      g.obstacles = [];
      g.dino.y = 108;
      g.dino.vy = -8.8;
      g.dino.isGrounded = false;
      g.dino.ducking = false;
      setGameState("running");
      setScore(0);
      playBeep("jump");
      return;
    }

    if (g.state === "running" && g.dino.isGrounded) {
      g.dino.vy = -8.8;
      g.dino.isGrounded = false;
      playBeep("jump");
    }
  }, [playBeep]);

  const duck = useCallback((isDucking: boolean) => {
    const g = gameRef.current;
    if (g.state !== "running") return;
    g.dino.ducking = isDucking;
    if (isDucking && !g.dino.isGrounded) {
      g.dino.vy += 3.5;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        jump();
      } else if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        duck(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        duck(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [jump, duck]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const g = gameRef.current;
      const isDark = document.documentElement.classList.contains("dark");
      const fgColor = isDark ? "#e2e8f0" : "#1e293b";
      const groundColor = isDark ? "#475569" : "#94a3b8";
      const cloudColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
      const accentColor = isDark ? "#38bdf8" : "#0284c7";

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (g.milestoneFlashFrames > 0) {
        g.milestoneFlashFrames--;
        if (Math.floor(g.milestoneFlashFrames / 4) % 2 === 0) {
          ctx.fillStyle = isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.12)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      // 1. Draw Clouds
      ctx.fillStyle = cloudColor;
      g.clouds.forEach((cloud) => {
        if (g.state === "running") {
          cloud.x -= cloud.speed;
          if (cloud.x < -60) cloud.x = canvas.width + 40;
        }
        ctx.fillRect(cloud.x, cloud.y + 4, 36, 8);
        ctx.fillRect(cloud.x + 8, cloud.y, 20, 12);
        ctx.fillRect(cloud.x + 16, cloud.y - 4, 12, 16);
      });

      // 2. Draw Ground
      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, g.groundY);
      ctx.lineTo(canvas.width, g.groundY);
      ctx.stroke();

      ctx.fillStyle = groundColor;
      g.groundDots.forEach((dot) => {
        if (g.state === "running") {
          dot.x -= g.speed;
          if (dot.x < -30) dot.x = canvas.width + Math.random() * 40;
        }
        ctx.fillRect(dot.x, dot.y, dot.len, 1);
      });

      // 3. Update physics if running
      if (g.state === "running") {
        g.distance += 1;
        const newScore = Math.floor(g.distance / 4);
        if (newScore !== g.score) {
          g.score = newScore;
          setScore(newScore);

          if (newScore > 0 && newScore % 100 === 0 && newScore !== g.lastScoreMilestone) {
            g.lastScoreMilestone = newScore;
            g.milestoneFlashFrames = 24;
            playBeep("score");
          }

          if (newScore > g.highScore) {
            g.highScore = newScore;
            setHighScore(newScore);
            try {
              localStorage.setItem("dp_dino_highscore", String(newScore));
            } catch {
              // ignore
            }
          }
          if (onScoreUpdate) {
            onScoreUpdate(newScore, g.highScore);
          }
        }

        g.speed = Math.min(10.5, 4.2 + Math.floor(g.score / 60) * 0.35);

        g.dino.y += g.dino.vy;
        g.dino.vy += 0.52;

        const currentGround = g.groundY - (g.dino.ducking ? 16 : 24);
        if (g.dino.y >= currentGround) {
          g.dino.y = currentGround;
          g.dino.vy = 0;
          g.dino.isGrounded = true;
        }

        g.dino.stepTimer++;
        if (g.dino.stepTimer >= 6) {
          g.dino.legStep = g.dino.legStep === 0 ? 1 : 0;
          g.dino.stepTimer = 0;
        }

        g.spawnTimer--;
        if (g.spawnTimer <= 0) {
          const types: Array<"cactus-small" | "cactus-double" | "cactus-tall" | "bird"> = [
            "cactus-small",
            "cactus-double",
            "cactus-tall",
          ];
          if (g.score > 120) {
            types.push("bird");
          }
          const chosen = types[Math.floor(Math.random() * types.length)]!;

          if (chosen === "cactus-small") {
            g.obstacles.push({
              type: "cactus-small",
              x: canvas.width + 10,
              y: g.groundY - 24,
              w: 12,
              h: 24,
            });
          } else if (chosen === "cactus-double") {
            g.obstacles.push({
              type: "cactus-double",
              x: canvas.width + 10,
              y: g.groundY - 24,
              w: 22,
              h: 24,
            });
          } else if (chosen === "cactus-tall") {
            g.obstacles.push({
              type: "cactus-tall",
              x: canvas.width + 10,
              y: g.groundY - 32,
              w: 14,
              h: 32,
            });
          } else if (chosen === "bird") {
            const flyY = Math.random() > 0.5 ? g.groundY - 34 : g.groundY - 20;
            g.obstacles.push({
              type: "bird",
              x: canvas.width + 10,
              y: flyY,
              w: 22,
              h: 16,
              frame: 0,
            });
          }

          g.spawnTimer =
            Math.max(45, Math.floor(100 - g.speed * 4)) + Math.floor(Math.random() * 35);
        }

        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const ob = g.obstacles[i]!;
          ob.x -= g.speed;

          if (ob.type === "bird" && ob.frame !== undefined) {
            ob.frame = (ob.frame + 0.15) % 2;
          }

          const dinoBox = {
            x: g.dino.x + 3,
            y: g.dino.y + 2,
            w: (g.dino.ducking ? 32 : 20) - 4,
            h: (g.dino.ducking ? 15 : 24) - 3,
          };

          const obBox = {
            x: ob.x + 2,
            y: ob.y + 2,
            w: ob.w - 4,
            h: ob.h - 3,
          };

          const isColliding =
            dinoBox.x < obBox.x + obBox.w &&
            dinoBox.x + dinoBox.w > obBox.x &&
            dinoBox.y < obBox.y + obBox.h &&
            dinoBox.y + dinoBox.h > obBox.y;

          if (isColliding) {
            g.state = "gameover";
            setGameState("gameover");
            playBeep("hit");
          }

          if (ob.x < -40) {
            g.obstacles.splice(i, 1);
          }
        }
      }

      // 4. Draw Obstacles
      ctx.fillStyle = fgColor;
      g.obstacles.forEach((ob) => {
        if (ob.type === "cactus-small") {
          ctx.fillRect(ob.x + 4, ob.y, 4, 24);
          ctx.fillRect(ob.x, ob.y + 6, 4, 10);
          ctx.fillRect(ob.x, ob.y + 12, 8, 4);
          ctx.fillRect(ob.x + 8, ob.y + 4, 4, 10);
          ctx.fillRect(ob.x + 4, ob.y + 10, 8, 4);
        } else if (ob.type === "cactus-double") {
          ctx.fillRect(ob.x + 3, ob.y, 4, 24);
          ctx.fillRect(ob.x, ob.y + 6, 3, 8);
          ctx.fillRect(ob.x, ob.y + 10, 6, 4);

          ctx.fillRect(ob.x + 13, ob.y + 2, 4, 22);
          ctx.fillRect(ob.x + 17, ob.y + 7, 3, 7);
          ctx.fillRect(ob.x + 14, ob.y + 10, 6, 4);
        } else if (ob.type === "cactus-tall") {
          ctx.fillRect(ob.x + 4, ob.y, 5, 32);
          ctx.fillRect(ob.x, ob.y + 8, 4, 12);
          ctx.fillRect(ob.x, ob.y + 16, 8, 4);
          ctx.fillRect(ob.x + 9, ob.y + 6, 4, 14);
          ctx.fillRect(ob.x + 5, ob.y + 14, 8, 4);
        } else if (ob.type === "bird") {
          const wingUp = Math.floor(ob.frame ?? 0) === 0;
          ctx.fillRect(ob.x + 6, ob.y + 6, 12, 6);
          ctx.fillRect(ob.x + 14, ob.y + 4, 8, 4);
          if (wingUp) {
            ctx.fillRect(ob.x + 4, ob.y - 2, 6, 8);
          } else {
            ctx.fillRect(ob.x + 4, ob.y + 10, 6, 7);
          }
        }
      });

      // 5. Draw T-Rex Dino
      const d = g.dino;
      ctx.fillStyle = fgColor;

      if (d.ducking && d.isGrounded) {
        ctx.fillRect(d.x, d.y + 6, 26, 8);
        ctx.fillRect(d.x + 18, d.y + 2, 14, 6);
        ctx.fillRect(d.x + 28, d.y + 4, 4, 2);

        ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
        ctx.fillRect(d.x + 23, d.y + 3, 2, 2);
        ctx.fillStyle = fgColor;

        ctx.fillRect(d.x - 3, d.y + 4, 4, 4);

        if (d.legStep === 0) {
          ctx.fillRect(d.x + 6, d.y + 13, 3, 3);
          ctx.fillRect(d.x + 16, d.y + 12, 3, 4);
        } else {
          ctx.fillRect(d.x + 6, d.y + 12, 3, 4);
          ctx.fillRect(d.x + 16, d.y + 13, 3, 3);
        }
      } else {
        ctx.fillRect(d.x + 10, d.y, 13, 9);
        ctx.fillRect(d.x + 14, d.y + 9, 8, 3);

        ctx.fillStyle = isDark ? "#0f172a" : "#ffffff";
        if (g.state === "gameover") {
          ctx.fillStyle = accentColor;
          ctx.fillRect(d.x + 13, d.y + 2, 3, 3);
        } else {
          ctx.fillRect(d.x + 13, d.y + 2, 2, 2);
        }
        ctx.fillStyle = fgColor;

        ctx.fillRect(d.x + 6, d.y + 8, 8, 9);
        ctx.fillRect(d.x + 4, d.y + 10, 11, 7);

        ctx.fillRect(d.x + 16, d.y + 11, 3, 2);
        ctx.fillRect(d.x + 17, d.y + 13, 2, 2);

        ctx.fillRect(d.x, d.y + 11, 4, 4);
        ctx.fillRect(d.x - 2, d.y + 9, 3, 3);

        if (!d.isGrounded) {
          ctx.fillRect(d.x + 5, d.y + 17, 3, 5);
          ctx.fillRect(d.x + 11, d.y + 17, 3, 4);
        } else if (d.legStep === 0) {
          ctx.fillRect(d.x + 5, d.y + 17, 3, 7);
          ctx.fillRect(d.x + 6, d.y + 23, 3, 1);
          ctx.fillRect(d.x + 11, d.y + 17, 3, 4);
        } else {
          ctx.fillRect(d.x + 5, d.y + 17, 3, 4);
          ctx.fillRect(d.x + 11, d.y + 17, 3, 7);
          ctx.fillRect(d.x + 12, d.y + 23, 3, 1);
        }
      }

      // 6. Draw Scoreboard
      ctx.font = "500 12px 'IBM Plex Mono', monospace";
      ctx.textAlign = "right";

      const currentScoreStr = String(g.score).padStart(5, "0");
      const highScoreStr = String(g.highScore).padStart(5, "0");

      ctx.fillStyle = groundColor;
      ctx.fillText(`HI ${highScoreStr}   ${currentScoreStr}`, canvas.width - 15, 22);

      // 7. Overlay
      if (g.state === "idle") {
        ctx.textAlign = "center";
        ctx.fillStyle = fgColor;
        ctx.font = "600 14px 'Spectral', Georgia, serif";
        ctx.fillText("PRESS SPACE OR TAP TO RUN", canvas.width / 2, 70);

        ctx.font = "400 11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = groundColor;
        ctx.fillText("SPACE / ↑ : JUMP  ·  ↓ : DUCK", canvas.width / 2, 90);
      } else if (g.state === "gameover") {
        ctx.textAlign = "center";
        ctx.fillStyle = fgColor;
        ctx.font = "600 16px 'Spectral', Georgia, serif";
        ctx.fillText("G A M E   O V E R", canvas.width / 2, 60);

        ctx.beginPath();
        ctx.arc(canvas.width / 2, 85, 12, 0, Math.PI * 2);
        ctx.strokeStyle = groundColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = fgColor;
        ctx.font = "12px sans-serif";
        ctx.fillText("↻", canvas.width / 2, 89);

        ctx.font = "400 11px 'IBM Plex Mono', monospace";
        ctx.fillStyle = groundColor;
        ctx.fillText("PRESS SPACE OR TAP TO RETRY", canvas.width / 2, 112);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [playBeep, onScoreUpdate]);

  return (
    <div className="w-full select-none">
      <div className="mb-2 flex items-center justify-between border-b border-rule pb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="label-mono text-[10px] text-primary">DIMISIPEDIA RUNNER</span>
          <span className="font-mono text-[10px] text-muted-foreground">· T-Rex Arcade</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
            className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Muted"}</span>
          </button>
        </div>
      </div>

      <div
        onClick={jump}
        className="relative overflow-hidden border border-border bg-surface shadow-sm cursor-pointer"
        style={{ touchAction: "manipulation" }}
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="block w-full h-[160px] sm:h-[180px] object-cover"
        />

        {gameState === "gameover" ? (
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            jump();
          }}
          className="flex h-12 items-center justify-center gap-2 border border-primary/50 bg-primary/10 font-mono text-xs font-semibold text-primary active:bg-primary active:text-primary-foreground transition-colors"
        >
          <ArrowUp className="size-4" />
          <span>{gameState === "gameover" ? "RESTART" : "JUMP / TAP"}</span>
        </button>

        <button
          type="button"
          onTouchStart={(e) => {
            e.preventDefault();
            duck(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            duck(false);
          }}
          onMouseDown={() => duck(true)}
          onMouseUp={() => duck(false)}
          className="flex h-12 items-center justify-center gap-2 border border-border bg-surface font-mono text-xs font-medium text-foreground active:bg-muted transition-colors"
        >
          <ArrowDown className="size-4" />
          <span>HOLD TO DUCK</span>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
        <span className="hidden sm:inline font-mono">
          Jump: <kbd className="border border-border bg-muted px-1.5 py-0.5 text-[10px]">Space</kbd>{" "}
          / <kbd className="border border-border bg-muted px-1.5 py-0.5 text-[10px]">↑</kbd> ·
          Duck: <kbd className="border border-border bg-muted px-1.5 py-0.5 text-[10px]">↓</kbd>
        </span>
        <span className="sm:hidden font-mono">Tap game screen or buttons to jump &amp; duck</span>

        <span className="font-mono">
          Score: <strong className="text-foreground">{score}</strong> · Best:{" "}
          <strong className="text-foreground">{highScore}</strong>
        </span>
      </div>
    </div>
  );
}
