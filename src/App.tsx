import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Upload,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Volume2,
  VolumeX,
  Share2,
  Skull,
  Ghost,
  Crown,
  ShieldAlert,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  Key,
  Globe,
  Download
} from "lucide-react";
import { getQuestions } from "./data/questions";
import { Language, translations } from "./i18n";
import { Option, UserAnswer, AnalysisResult } from "./types";
import { HeartbeatSynth } from "./utils/audio";

// Import the gorgeous custom gothic card image matcher
import { getCharacterImage } from "./assets/images";
import { KakaoAd } from "./components/KakaoAd";
import { AdSense } from "./components/AdSense";

// Lazy initialize heartbeat synthesizer
const synth = new HeartbeatSynth();

export default function App() {
  const [lang, setLang] = useState<Language>("ko");
  const t = translations[lang];
  const horrorQuestions = getQuestions(lang);

  // Navigation & Step State
  // "intro" | "quiz" | "analyzing" | "result"
  const [step, setStep] = useState<"intro" | "quiz" | "analyzing" | "result">("intro");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  
  // Image handling
  const [image, setImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for media
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);

  // Analysis Result State
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  // PWA Install State & Device Detection
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    // Check if running as standalone app
    const checkStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    setIsStandalone(!!checkStandalone);

    // Track mobile landscape mode
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight && window.innerWidth < 1024);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Sound effect state tracking
  useEffect(() => {
    synth.setMute(isMuted);
  }, [isMuted]);

  // Trigger a soft, eerie ambient sound when the user's result is revealed
  useEffect(() => {
    if (step === "result") {
      synth.playSpookySound();
    }
  }, [step]);

  // Clean up media streams and synth on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      synth.stop();
    };
  }, []);

  // Cycle loading messages during the "analyzing" ritual
  useEffect(() => {
    if (step !== "analyzing") return;

    setLoadingProgress(0);
    synth.start(60); // Start heartbeat at a steady 60 BPM

    const messages = t.analyzingMessages;

    let currentMsgIdx = 0;
    setLoadingText(messages[0]);

    // Animate progress and increase heart rate
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 1;
        
        // Speed up heartbeat BPM as we get closer to completion
        if (next < 30) {
          synth.setBpm(60);
        } else if (next < 60) {
          synth.setBpm(85);
        } else if (next < 85) {
          synth.setBpm(110);
        } else {
          synth.setBpm(135); // Rapid, high-intensity heartbeat
        }

        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, 20);

    // Cycle text messages
    const textInterval = setInterval(() => {
      currentMsgIdx = (currentMsgIdx + 1) % messages.length;
      setLoadingText(messages[currentMsgIdx]);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [step]);

  // Camera stream controls
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError(t.cameraError);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        // Match dimensions to square format
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        
        // Center crop the camera stream
        const sx = (video.videoWidth - size) / 2;
        const sy = (video.videoHeight - size) / 2;
        
        ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
        
        // Compress and save as base64
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleGenderSelect = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
  };

  const handleStartQuiz = () => {
    if (!gender) return;
    setStep("quiz");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // Answer selection handler
  const handleSelectAnswer = (option: Option) => {
    const activeQuestion = horrorQuestions[currentQuestionIndex];
    const newAnswer: UserAnswer = {
      questionId: activeQuestion.id,
      question: activeQuestion.question,
      choiceId: option.id,
      selectedOptionText: option.text,
      gradeValue: option.gradeValue,
    };

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = newAnswer;
    setAnswers(updatedAnswers);

    // Transition smoothly to the next question with a small delay
    setTimeout(() => {
      if (currentQuestionIndex < horrorQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Start the loading ritual and fetch analysis
        performAnalysis(updatedAnswers);
      }
    }, 300);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Deterministic grade fallback generator in case API fails or key is missing
  const getFallbackAnalysis = (calculatedGrade: number, finalGender: string): AnalysisResult => {
    const gradeDetails: Record<number, { name: string; face: string; soul: string; prophecy: string }> = {
      1: {
        name: finalGender === "male" ? "심연을 지배하는 군주, 타락 천사 루시퍼" : "성스러운 빛과 어둠을 지배하는 대천사",
        face: "당신의 눈동자 밑 깊은 그림자 속에 세상 모든 것을 복종시킬 절대적 위엄과 신적 고요가 서려 있습니다. 평범한 눈빛 뒤편에 숨겨진 차갑고 찬란한 금빛 아우라는 스스로 선과 악의 경계를 나누는 절대적 지배자의 풍모를 명확히 보여줍니다.",
        soul: "당신은 누군가의 아래에 결코 정착할 수 없는 완전무결한 본성을 갈망합니다. 도덕이나 타인의 규율을 가볍게 뛰어넘는 고고함이 있으며, 스스로 세상을 심판하고 새로운 지배적 규칙을 선포하려는 신적인 차가운 에너지가 영혼 중심부에 깊이 봉인되어 있습니다.",
        prophecy: "자정이 흐르고 영혼의 온도가 절대 영도에 도달할 때, 당신은 마침내 내면의 거대한 날개를 펴게 될 것입니다. 단, 주의하십시오. 절대적인 주권은 언제나 가혹한 고독을 수반하며, 당신에게 도달하려는 자들은 그 빛과 어둠의 위엄에 숨이 막혀 소멸해갈 것입니다.",
      },
      2: {
        name: finalGender === "male" ? "피빛 갈증의 밤을 걷는 뱀파이어 백작" : "달빛 아래 매혹의 심연을 지배하는 흑마녀",
        face: "미묘하게 비치는 서늘하고 날카로운 분위기가 상대의 이성을 흩트립니다. 얼굴에 드러난 희미한 미소 아래에 파멸적인 마력과 치명적인 끌림이 짙게 배어 있어, 단 한 번의 목격만으로 상대를 어두운 심연으로 유혹해 영영 빠져나오지 못하게 만듭니다.",
        soul: "은밀하게 어둠과 피의 권세를 탐닉하는 본능이 잠재되어 있습니다. 매혹적인 유쾌함 뒤에는 완벽하게 계산된 싸늘한 마력이 잠들어 있으며, 소중한 상대를 가두어 소유하고 파괴적인 계약으로 옭아매는 데에서 진정한 희열을 느끼는 치명적인 야수입니다.",
        prophecy: "피가 도는 밤, 진홍빛 달이 뜰 때 당신의 감춰둔 욕망이 완전히 깨어날 것입니다. 입술 너머로 뻗어 나온 서늘함이 상대를 휘감을 것이며, 오직 비밀스러운 장막 아래에서만 영원한 자유와 지배를 허락받는 오싹한 쾌락의 구렁텅이가 열릴 것입니다.",
      },
      3: {
        name: finalGender === "male" ? "오래된 안개 속 외로운 망령" : "버려진 거울에 봉인된 차가운 은빛 원혼",
        face: "존재감이 기묘할 정도로 서늘하며, 눈빛 뒤에 투명하게 얼어붙은 안개 기운이 가득 차 있습니다. 시선이 닿는 곳마다 미세한 영적 한기를 전파하는 듯하며, 이승에 걸쳐 있으나 영혼은 이미 가공할 사후의 경계를 가볍게 유랑하는 듯 공허하게 아름답습니다.",
        soul: "당신은 군중 속에 서 있으나 본질적으로 칠흑 같은 외로움과 한기를 근원에 두고 있습니다. 타인의 따뜻한 온기나 위로조차 집어삼켜 싸늘하게 얼려버리는 정막함이 있어, 아무도 닿지 못하게 형체를 감추고 조용히 세상을 방관하며 차가운 정적을 유지합니다.",
        prophecy: "차가운 겨울비가 불어와 온기를 마비시키는 순간, 당신은 어두운 안개가 되어 어떤 틈새든 투과하게 될 것입니다. 속박할 수 없는 혼이 되어 영원히 소리 없이 세상을 떠돌며, 당신의 발밑에는 오직 정막한 서리만이 내려앉아 주위를 정지시킬 것입니다.",
      },
      4: {
        name: finalGender === "male" ? "고통 없는 불사의 부패한 사체" : "황폐한 무덤가에서 일어난 차가운 피의 좀비",
        face: "얼굴 가득 생기를 빼앗긴 차갑고 기괴한 잿빛 기운이 무겁게 가라앉아 있습니다. 어떤 표정에도 미련이나 아픔이 나타나지 않으며, 오직 영혼의 끈을 강제로 끊어버린 채 육체적 본능만으로 살아가는 섬뜩하고 기이한 거대 아우라를 풍깁니다.",
        soul: "모든 사회적 속박과 도덕을 조롱하듯 무너뜨리며, 고통도 슬픔도 느끼지 못하는 완벽히 원초적이고 야수적인 기운을 갈망합니다. 훼손되고 찢기더라도 끊임없이 재생하며 질기게 버텨내려는 맹목적 생존 본능과 가공할 포효가 영혼 밑바닥에 기어 다니고 있습니다.",
        prophecy: "마지막 심장의 잔떨림이 완전히 멈추고 고통의 수용체가 파괴될 때, 당신의 원시적 본능이 지배를 시작할 것입니다. 당신을 상처 줄 수 있는 것은 이 세상에 없으며, 당신의 붉은 시선이 닿는 모든 생명은 한순간에 산산이 흩어져 침식될 것입니다.",
      },
    };

    const details = gradeDetails[calculatedGrade] || gradeDetails[3];
    return {
      grade: calculatedGrade,
      characterName: details.name,
      faceAnalysis: details.face,
      personalityAnalysis: details.soul,
      prophecy: details.prophecy,
    };
  };

  // Perform full analysis
  const performAnalysis = async (finalAnswers: UserAnswer[]) => {
    setStep("analyzing");
    setErrorMsg(null);

    // Calculate predominant grade in client side
    const gradeCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    finalAnswers.forEach((ans) => {
      const g = ans.gradeValue as 1 | 2 | 3 | 4;
      if (gradeCounts[g] !== undefined) {
        gradeCounts[g]++;
      }
    });

    let maxCount = -1;
    let preferredGrade = 3; // Default fallback Grade 3 (Ghost)

    // Detemine calculated grade preference with tie breaks
    Object.entries(gradeCounts).forEach(([gradeStr, count]) => {
      const grade = parseInt(gradeStr);
      if (count > maxCount) {
        maxCount = count;
        preferredGrade = grade;
      } else if (count === maxCount) {
        // Tie-breaker: random or slightly prioritize darker grades for fun
        if (Math.random() > 0.5) {
          preferredGrade = grade;
        }
      }
    });

    // Start a 2-second timer to synchronize with the progress bar
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // API call to custom Express server
      const apiPromise = fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: image, // base64 representation of user face
          gender: gender,
          answers: finalAnswers,
          gradePreference: preferredGrade,
          lang: lang,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error("서버 분석에 실패했습니다.");
        }
        return response.json();
      });

      // Wait for BOTH the API call and the 5-second loading delay to finish
      const [apiResult] = await Promise.all([apiPromise, delayPromise]);
      setResult(apiResult);
    } catch (error: any) {
      console.warn("Express-Gemini API failed, using atmospheric local fallback generator...", error);
      // Wait for the remaining time of the 5-second delay if not already elapsed
      await delayPromise;
      const fallbackResult = getFallbackAnalysis(preferredGrade, gender || "male");
      setResult(fallbackResult);
    } finally {
      // Transition immediately to result screen since 5 seconds have elapsed
      setStep("result");
      synth.setBpm(72); // Slow back down to a haunting steady beat
    }
  };

  const handleReset = () => {
    synth.stop();
    setStep("intro");
    setGender(null);
    setImage(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setErrorMsg(null);
    setLoadingProgress(0);
    setShareCopied(false);
  };

  // Build beautiful share text
  const handleShare = () => {
    if (!result) return;
    const gradeSymbol = "⭐".repeat(5 - result.grade);
    const textToCopy = `🩸 ${t.title} - 공포 등급 테스트 🩸

내가 다시 태어난다면 가지게 될 내면의 본모습...

👤 나의 본체: [${result.characterName}]
💀 위험 등급: ${result.grade}등급 (${gradeSymbol})

🕯️ 심연의 예언:
"${result.prophecy.substring(0, 100)}..."

지금 당신의 진짜 아우라를 확인해보세요:
${window.location.href}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(() => {
      alert("클립보드 복사에 실패했습니다. 아래 내용을 직접 복사하세요:\n\n" + textToCopy);
    });
  };

  // Get matching result illustration
  const getResultImage = () => {
    if (!result) return "";
    return getCharacterImage(gender || "male", result.grade, result.characterName);
  };

  const getGradeText = (grade: number) => {
    switch (grade) {
      case 1: return "1등급 (그리스신 / 대천사 / 루시퍼)";
      case 2: return "2등급 (악마 / 마녀 / 뱀파이어 / 반인반신)";
      case 3: return "3등급 (귀신 / 원혼)";
      case 4: return "4등급 (좀비)";
      default: return `${grade}등급`;
    }
  };

  const getGradeIcon = (grade: number) => {
    switch (grade) {
      case 1: return <Crown className="w-8 h-8 text-amber-500 animate-pulse" />;
      case 2: return <Skull className="w-8 h-8 text-horror-red-bright animate-bounce" />;
      case 3: return <Ghost className="w-8 h-8 text-blue-400 animate-pulse" />;
      case 4: return <ShieldAlert className="w-8 h-8 text-emerald-500" />;
      default: return <Skull className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div id="horror-app-root" className="min-h-[100dvh] bg-horror-dark text-slate-100 flex flex-col justify-between selection:bg-horror-red selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-900 bg-horror-dark/80 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-horror-red-bright animate-flicker" />
            <span className="font-serif tracking-widest text-sm text-horror-red-bright uppercase font-bold">
              AWAKEN YOUR INSTINCT
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Install PWA Button */}
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="flex items-center text-[10px] sm:text-xs font-mono bg-zinc-800/80 hover:bg-horror-red-bright hover:text-white text-zinc-300 px-2.5 py-1.5 rounded-full transition-colors border border-zinc-700"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                <span>{t.install}</span>
              </button>
            ) : (isIOS && !isStandalone) ? (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex items-center text-[10px] sm:text-xs font-mono bg-zinc-800/80 hover:bg-horror-red-bright hover:text-white text-zinc-300 px-2.5 py-1.5 rounded-full transition-colors border border-zinc-700"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                <span>{t.install}</span>
              </button>
            ) : null}
            
            {/* Language Selector */}
            <div className="flex items-center bg-black/40 border border-zinc-900 rounded-full px-2 py-1">
              <Globe className="w-4 h-4 text-zinc-500 mr-2" />
              <select
                className="bg-transparent text-zinc-400 text-xs outline-none cursor-pointer"
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            {/* Audio Toggle Button */}
            <button
              id="audio-toggle-btn"
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-500 hover:text-horror-red-bright transition-colors p-2 rounded-full border border-zinc-900 bg-black/40 hover:border-horror-red/40"
              title={isMuted ? "음소거 해제" : "음소거"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-grow flex items-center justify-center p-3 ${isLandscape ? 'py-3' : 'py-8 md:py-12'}`}>
        <div className={`w-full bg-horror-card border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 relative transition-all duration-300 ${
          isLandscape ? 'max-w-4xl p-4' : 'max-w-2xl p-6 md:p-8'
        }`}>
          
          {/* Subtle decorative background runic accents */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-900 select-none">† 0x00_SABBATH †</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-zinc-900 select-none">MEMENTO MORI</div>

          <AnimatePresence mode="wait">
            
            {/* STEP 1: INTRO SCREEN */}
            {step === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 flex flex-col items-center"
              >
                <div className="text-center space-y-4">
                  <span className="font-mono text-xs text-horror-red-bright tracking-widest uppercase block animate-pulse">
                    심연의 거울 공포 등급 의식
                  </span>
                  <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-white font-black animate-flicker animate-pulse">
                    {t.title}
                  </h1>
                  <p className="text-xs md:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* PWA Promminent Install Banner */}
                {(!isStandalone && (deferredPrompt || isIOS)) && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full p-4 rounded-xl bg-black/40 border border-horror-red/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-horror-red/5 blur-2xl pointer-events-none rounded-full" />
                    <div className="flex items-center gap-3 relative z-10 flex-col sm:flex-row">
                      <div className="p-2.5 bg-horror-red/10 text-horror-red-bright rounded-lg border border-horror-red/20">
                        <Download className="w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-serif tracking-wide">{t.installTitle}</h4>
                        <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">{t.installSub}</p>
                      </div>
                    </div>
                    <button
                      onClick={isIOS ? () => setShowIOSGuide(true) : handleInstallClick}
                      className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-horror-red to-red-950 hover:from-horror-red-bright hover:to-horror-red border border-horror-red-bright/20 text-white rounded-lg text-xs font-mono font-bold transition-all shrink-0 cursor-pointer shadow-md shadow-black"
                    >
                      {t.install}
                    </button>
                  </motion.div>
                )}

                {/* Identity Selection Block */}
                <div className="w-full space-y-6">
                  {/* Gender Selection */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 block text-center">
                      {t.selectGender}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        id="gender-male-btn"
                        onClick={() => handleGenderSelect("male")}
                        className={`py-4 rounded-xl border font-medium transition-all duration-300 relative overflow-hidden flex flex-col items-center gap-1 ${
                          gender === "male"
                            ? "bg-horror-red/10 border-horror-red-bright text-white shadow-[0_0_15px_rgba(155,28,28,0.3)]"
                            : "bg-black/40 border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        <span className="font-serif text-lg tracking-wider">MALE</span>
                        <span className="text-xs text-zinc-500">{t.male}</span>
                        {gender === "male" && (
                          <div className="absolute top-0 right-0 w-2 h-2 bg-horror-red-bright rounded-bl-lg" />
                        )}
                      </button>
                      <button
                        id="gender-female-btn"
                        onClick={() => handleGenderSelect("female")}
                        className={`py-4 rounded-xl border font-medium transition-all duration-300 relative overflow-hidden flex flex-col items-center gap-1 ${
                          gender === "female"
                            ? "bg-horror-purple/10 border-horror-purple-bright text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                            : "bg-black/40 border-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        }`}
                      >
                        <span className="font-serif text-lg tracking-wider">FEMALE</span>
                        <span className="text-xs text-zinc-500">{t.female}</span>
                        {gender === "female" && (
                          <div className="absolute top-0 right-0 w-2 h-2 bg-horror-purple-bright rounded-bl-lg" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Photo Upload & Capture Box */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 block text-center">
                      {t.uploadTitle}
                    </label>

                    {!image && !isCameraActive ? (
                      /* Drag & Drop Upload Portal */
                      <div
                        id="upload-dropzone"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-black/30 ${
                          isLandscape 
                            ? "min-h-[130px] p-4 gap-2" 
                            : "min-h-[220px] p-8 gap-4"
                        } ${
                          isDragging
                            ? "border-horror-red bg-horror-red/5 scale-[0.99]"
                            : "border-zinc-900 hover:border-zinc-800 hover:bg-black/40"
                        }`}
                        onClick={triggerFileSelect}
                      >
                        <div className={`rounded-full bg-zinc-950 border border-zinc-900 text-zinc-400 group-hover:text-horror-red-bright transition-colors ${
                          isLandscape ? "p-1.5" : "p-3"
                        }`}>
                          <Upload className={isLandscape ? "w-4 h-4" : "w-6 h-6"} />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-xs sm:text-sm font-medium text-zinc-300">
                            {t.dropzoneMain}
                          </p>
                          {!isLandscape && (
                            <p className="text-xs text-zinc-500">
                              {t.dropzoneSub}
                            </p>
                          )}
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        
                        {/* Divider */}
                        {!isLandscape && (
                          <div className="flex items-center gap-2 w-full max-w-xs py-2">
                            <div className="h-px bg-zinc-900 flex-grow" />
                            <span className="text-[10px] font-mono text-zinc-600">{t.or}</span>
                            <div className="h-px bg-zinc-900 flex-grow" />
                          </div>
                        )}

                        {/* Trigger Camera Stream */}
                        <button
                          id="trigger-camera-btn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            startCamera();
                          }}
                          className={`px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-horror-red text-zinc-300 hover:text-white transition-all text-xs font-mono flex items-center gap-2 ${
                            isLandscape ? "mt-1 scale-90" : ""
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" />
                          {t.realtimeCamera}
                        </button>
                      </div>
                    ) : isCameraActive ? (
                      /* Webcam Viewfinder View */
                      <div id="camera-viewfinder" className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black min-h-[260px] flex flex-col items-center justify-center">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full max-h-[300px] object-cover scale-x-[-1]"
                        />
                        {/* Retro digital alignment overlay */}
                        <div className="absolute inset-4 border border-horror-red/20 pointer-events-none rounded flex items-center justify-center">
                          <div className="w-24 h-24 border-2 border-dashed border-horror-red/30 rounded-full animate-pulse-slow" />
                          <div className="absolute top-2 left-2 font-mono text-[9px] text-horror-red-bright/40">REC [LOCKED]</div>
                        </div>

                        {/* Camera Action Buttons */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 px-4">
                          <button
                            id="capture-photo-btn"
                            onClick={capturePhoto}
                            className="px-5 py-2.5 bg-horror-red text-white hover:bg-horror-red-bright rounded-lg text-xs font-bold font-serif uppercase tracking-widest shadow-lg shadow-black/60 transition-all flex items-center gap-1.5"
                          >
                            <Camera className="w-4 h-4" />
                            {t.capture}
                          </button>
                          <button
                            id="stop-camera-btn"
                            onClick={stopCamera}
                            className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-slate-200 rounded-lg text-xs font-mono transition-all"
                          >
                            {t.cancel}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Preview of Uploaded/Captured Image */
                      <div id="image-preview-container" className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-black/40 border border-zinc-900">
                        <div className="relative w-44 h-44 rounded-xl overflow-hidden border-2 border-horror-red/40 group shadow-lg shadow-black">
                          <img
                            src={image!}
                            alt="Aura Base Source"
                            className="w-full h-full object-cover grayscale contrast-125"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-1.5 left-0 right-0 text-center">
                            <span className="font-mono text-[9px] text-horror-red-bright uppercase tracking-wider bg-black/75 px-1.5 py-0.5 rounded border border-horror-red/20">
                              LOCKED FACE
                            </span>
                          </div>
                        </div>
                        <button
                          id="re-upload-btn"
                          onClick={() => setImage(null)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-horror-red text-zinc-400 hover:text-white transition-all text-xs font-mono flex items-center gap-1.5"
                        >
                          <RefreshCw className="w-3 h-3" />
                          {t.reupload}
                        </button>
                      </div>
                    )}
                    {cameraError && (
                      <p className="text-center text-xs text-horror-red-bright flex items-center justify-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {cameraError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm & Launch Button */}
                <button
                  id="start-ceremony-btn"
                  disabled={!gender || !image}
                  onClick={handleStartQuiz}
                  className={`w-full py-4 rounded-xl font-bold uppercase font-serif tracking-widest transition-all duration-300 relative group overflow-hidden ${
                    gender && image
                      ? "bg-gradient-to-r from-horror-red to-red-950 text-white cursor-pointer hover:shadow-[0_0_20px_rgba(155,28,28,0.5)] active:scale-[0.99] border border-horror-red-bright/30"
                      : "bg-zinc-950 border border-zinc-900 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-horror-red-bright animate-flicker" />
                    {t.startCeremony}
                  </span>
                  {gender && image && (
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </motion.div>
            )}

            {/* STEP 2: 5 HAUNTING QUESTIONS */}
            {step === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Quiz Header & Indicator */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 uppercase">
                      {t.ritualStage}
                    </span>
                    <h2 className="font-serif text-xl text-white font-bold">
                      {t.question} ({currentQuestionIndex + 1}/5)
                    </h2>
                  </div>
                  <span className="font-mono text-sm text-horror-red-bright font-bold">
                    Q0{horrorQuestions[currentQuestionIndex].id}
                  </span>
                </div>

                {/* Progress bar line resembling blood / candle */}
                <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-horror-red to-horror-red-bright transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / horrorQuestions.length) * 100}%` }}
                  />
                </div>

                {/* The Question Text */}
                <div className="min-h-[80px] py-2">
                  <h3 className="text-lg md:text-xl font-serif text-slate-100 leading-relaxed font-semibold">
                    {horrorQuestions[currentQuestionIndex].question}
                  </h3>
                </div>

                {/* The Choices Options */}
                <div className={`grid grid-cols-1 ${isLandscape ? 'gap-2' : 'gap-4'}`}>
                  {horrorQuestions[currentQuestionIndex].options.map((option) => {
                    const isSelected = answers[currentQuestionIndex]?.choiceId === option.id;
                    return (
                      <button
                        key={option.id}
                        id={`option-${option.id}`}
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left rounded-xl border text-xs sm:text-sm transition-all duration-300 relative group flex items-start gap-3 ${
                          isLandscape ? "p-2.5" : "p-4"
                        } ${
                          isSelected
                            ? "bg-horror-red/10 border-horror-red-bright text-white shadow-[0_0_12px_rgba(155,28,28,0.2)]"
                            : "bg-black/30 border-zinc-900 text-zinc-300 hover:border-zinc-800 hover:bg-black/50 hover:text-slate-100"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded border flex items-center justify-center font-mono text-xs shrink-0 transition-colors ${
                          isSelected
                            ? "bg-horror-red-bright border-horror-red-bright text-white"
                            : "bg-zinc-950 border-zinc-800 text-zinc-500 group-hover:border-zinc-700"
                        }`}>
                          {option.id}
                        </span>
                        <span className="leading-relaxed font-light">{option.text}</span>
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-transparent group-hover:bg-horror-red/20 transition-all" />
                      </button>
                    );
                  })}
                </div>

                {/* Quiz Navigation footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs">
                  <button
                    id="prev-question-btn"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-1 py-2 px-3 rounded-lg border font-mono transition-all ${
                      currentQuestionIndex === 0
                        ? "border-zinc-950 text-zinc-700 cursor-not-allowed"
                        : "border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {t.prevQuestion}
                  </button>
                  <span className="font-mono text-zinc-600">† SELECT WITH DEVOTION †</span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOADING / RITUAL REVELATION */}
            {step === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 flex flex-col items-center justify-center py-12"
              >
                {/* Pulsating horror runic portal container */}
                <div className="relative flex items-center justify-center">
                  {/* Outer pulsating blood layer */}
                  <div className="w-32 h-32 rounded-full border-2 border-horror-red-bright/30 animate-ping absolute" />
                  
                  {/* Secondary runic dial */}
                  <div className="w-28 h-28 rounded-full border border-dashed border-horror-red-bright/40 animate-spin absolute" style={{ animationDuration: "12s" }} />

                  {/* Deep core heartbeat ring */}
                  <div className="w-20 h-20 rounded-full bg-black border-2 border-horror-red flex items-center justify-center relative shadow-[0_0_25px_rgba(155,28,28,0.6)] z-10 animate-pulse">
                    <Skull className="w-8 h-8 text-horror-red-bright animate-flicker" />
                  </div>
                </div>

                <div className="text-center space-y-4 max-w-sm">
                  <h3 className="font-serif text-lg text-white font-bold animate-pulse">
                    {t.ritualTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[32px] transition-all">
                    {loadingText}
                  </p>
                </div>

                {/* Progress status container */}
                <div className="w-full max-w-xs space-y-2">
                  <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                    <div
                      className="h-full bg-gradient-to-r from-horror-red via-horror-red-bright to-white transition-all duration-100"
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>SPIRIT_INDEX: 0.088</span>
                    <span>{loadingProgress}% COMPLETE</span>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-horror-red-bright animate-pulse text-center">
                  {t.ritualSub}
                </p>
              </motion.div>
            )}

            {/* STEP 4: RESULT SCREEN */}
            {step === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Result Header */}
                <div className="text-center space-y-2 pb-4 border-b border-zinc-900">
                  <div className="flex justify-center items-center gap-1.5 text-xs font-mono text-horror-red-bright uppercase tracking-widest">
                    <span>{t.ritualComplete}</span>
                    <span>•</span>
                    <span>{t.trueSelf}</span>
                  </div>
                  
                  {/* Grade Icon & Name display */}
                  <div className="flex items-center justify-center gap-3 py-1">
                    {getGradeIcon(result.grade)}
                    <h2 className="text-xl font-mono tracking-wider font-bold text-slate-300">
                      {getGradeText(result.grade)}
                    </h2>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-serif text-white font-black tracking-tight pt-1">
                    &quot;{result.characterName}&quot;
                  </h1>
                </div>

                {/* Dual Portrait Container: Original Self vs Other Self */}
                <div className={`grid gap-4 sm:gap-6 py-2 ${isLandscape ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                  
                  {/* Left Side: Original Self */}
                  <div className="space-y-2 text-center">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                      {t.originalSelf}
                    </span>
                    <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-zinc-900 bg-black/60 shadow-lg flex items-center justify-center">
                      <img
                        src={image!}
                        alt="My Original Self"
                        className="w-full h-full object-cover grayscale contrast-110 saturate-50 blur-[0.3px]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Vignette & Red aura edge overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 border border-horror-red/20 pointer-events-none rounded-xl" />
                    </div>
                  </div>

                  {/* Right Side: Other Self (Beautiful Spooky Art) */}
                  <div className="space-y-2 text-center">
                    <span className="font-mono text-[10px] text-horror-red-bright uppercase tracking-widest block animate-pulse">
                      {t.otherSelf}
                    </span>
                    <div className="aspect-square relative rounded-xl overflow-hidden border-2 border-horror-red bg-black shadow-xl flex items-center justify-center group">
                      <img
                        src={getResultImage()}
                        alt={result.characterName}
                        className="w-full h-full object-cover contrast-105 transition-all duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Crimson shadow vignetting */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 border border-horror-red/40 pointer-events-none rounded-xl shadow-[inset_0_0_20px_rgba(155,28,28,0.5)]" />
                      
                      {/* Grade Badge Overlay */}
                      <div className="absolute top-3 right-3 bg-black/80 text-horror-red-bright border border-horror-red/30 px-2.5 py-1 rounded-md text-xs font-mono font-bold">
                        G-{result.grade}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Complete Diagnostic Analysis */}
                <div className={`grid gap-4 ${isLandscape ? 'grid-cols-3' : 'grid-cols-1'}`}>
                  
                  {/* Face Analysis Section */}
                  <div className="p-5 rounded-xl bg-black/30 border border-zinc-900/60 hover:border-zinc-800 transition-colors space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Eye className="w-4 h-4 text-zinc-400" />
                      <h4 className="font-serif text-sm font-bold text-slate-300">
                        {t.faceAnalysis}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      {result.faceAnalysis}
                    </p>
                  </div>

                  {/* Personality / Soul Analysis Section */}
                  <div className="p-5 rounded-xl bg-black/30 border border-zinc-900/60 hover:border-zinc-800 transition-colors space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                      <Skull className="w-4 h-4 text-zinc-400" />
                      <h4 className="font-serif text-sm font-bold text-slate-300">
                        {t.soulAnalysis}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                      {result.personalityAnalysis}
                    </p>
                  </div>

                  {/* Red Prophecy Section (Spooky warning) */}
                  <div className="p-5 rounded-xl bg-horror-red/5 border border-horror-red/30 space-y-2 relative overflow-hidden">
                    {/* Pulsing red warning aura */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-horror-red/10 blur-2xl pointer-events-none rounded-full" />
                    
                    <div className="flex items-center gap-2 border-b border-horror-red/20 pb-2">
                      <ShieldAlert className="w-4 h-4 text-horror-red-bright" />
                      <h4 className="font-serif text-sm font-bold text-horror-red-bright uppercase tracking-wide">
                        {t.prophecy}
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal italic">
                      &quot;{result.prophecy}&quot;
                    </p>
                  </div>

                </div>

                {/* Action Buttons: Share & Restart */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                  <button
                    id="share-result-btn"
                    onClick={handleShare}
                    className="py-3.5 px-4 bg-zinc-950 border border-zinc-800 hover:border-horror-red text-zinc-300 hover:text-white rounded-xl text-xs font-mono font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Share2 className="w-4 h-4 text-horror-red-bright" />
                    {shareCopied ? t.copied : t.share}
                  </button>
                  
                  <button
                    id="restart-ceremony-btn"
                    onClick={handleReset}
                    className="py-3.5 px-4 bg-gradient-to-r from-horror-red to-red-950 hover:from-horror-red-bright hover:to-horror-red border border-horror-red-bright/30 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-black"
                  >
                    {t.reborn}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
      
      {/* Google AdSense & Kakao AdFit Bottom Ad Section */}
      <div className="flex flex-col items-center justify-center gap-2 max-w-lg mx-auto px-4 w-full">
        <AdSense />
        <KakaoAd />
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-950 bg-black/50 p-4 text-center">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-zinc-600">
          <span>&copy; 2026 THE OTHER SELF CO. ALL NIGHTMARES RESERVED.</span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-horror-red-bright animate-pulse" />
            헤드폰으로 감상하시면 공포를 더욱 가공할 수 있습니다
          </span>
        </div>
      </footer>

      {/* iOS PWA Installation Guide Modal */}
      <AnimatePresence>
        {showIOSGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-horror-card border border-horror-red/40 rounded-2xl p-6 relative shadow-2xl shadow-horror-red/10"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-horror-red/10 border border-horror-red/30 flex items-center justify-center text-horror-red-bright">
                  <Download className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                  {t.iosGuideTitle}
                </h3>
                <p className="text-xs text-zinc-400">
                  {t.installSub}
                </p>
                <div className="space-y-3 text-left py-4 border-t border-zinc-900 border-b">
                  {t.iosGuideSteps.map((stepStr: string, idx: number) => (
                    <p key={idx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                      {stepStr}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-full py-2.5 bg-zinc-900 border border-zinc-800 hover:border-horror-red hover:text-white text-zinc-300 text-xs font-mono rounded-xl transition-all cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
