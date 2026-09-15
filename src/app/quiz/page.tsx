'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

interface Question {
  id: number;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  curiosityHint: string;
  realWorldAnalogy: string;
  imageKeyword?: string;
}

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const className = searchParams.get('class') || '8';
  const subject = searchParams.get('subject') || 'Science';
  const topic = searchParams.get('topic') || 'General';
  const level = searchParams.get('level') || 'Beginning';
  const language = searchParams.get('language') || 'English';

  const isHindi = language === 'Hindi';

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showQuitModal, setShowQuitModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ className, subject, topic, level, language, count: 7 }),
        });
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [className, subject, topic, level, language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f17] text-white flex flex-col items-center justify-center p-4">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
          <div className="animate-spin rounded-full h-7 w-7 border-2 border-indigo-400 border-t-transparent"></div>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-100 text-center">
          {isHindi ? 'लमा एआई आपकी जिज्ञासा खोज बना रहा है...' : 'Crafting your curiosity quest...'}
        </h2>
        <p className="text-slate-400 text-sm mt-2 text-center max-w-sm">
          {isHindi
            ? `कक्षा ${className} NCERT सिद्धांतों को व्यावहारिक जीवन से जोड़ना`
            : `Applying NCERT Class ${className} concepts to everyday scenarios`}
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0b0f17] flex flex-col items-center justify-center p-4">
        <div className="bg-[#151c2c] border border-slate-800 p-8 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto text-xl">⚠️</div>
          <p className="text-slate-200 font-semibold text-sm">
            {isHindi ? 'प्रश्न लोड करने में विफल। कृपया पुनः प्रयास करें।' : 'Failed to load questions. Please try again.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-indigo-600/20"
          >
            {isHindi ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Setup'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const visualHintUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    currentQ.imageKeyword || `${topic} ${subject} educational illustration`
  )}?width=600&height=320&nologo=true`;

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === currentQ.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <main className="min-h-screen bg-[#0b0f17] flex items-center justify-center p-4 text-white">
        <div className="bg-[#151c2c] border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-4xl mx-auto shadow-inner">
            🏆
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isHindi ? 'जिज्ञासा खोज पूर्ण हुई!' : 'Quest Completed!'}
            </h1>
            <p className="text-slate-400 text-sm">
              {isHindi ? (
                <>आपने <span className="text-indigo-400 font-bold">{questions.length}</span> में से <span className="text-indigo-400 font-bold">{score}</span> प्रश्नों का सही उत्तर दिया!</>
              ) : (
                <>You solved <span className="text-indigo-400 font-bold">{score}</span> out of <span className="text-indigo-400 font-bold">{questions.length}</span> curiosity challenges!</>
              )}
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all text-sm"
          >
            {isHindi ? 'नया विषय चुनें' : 'Explore Another Topic'}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0f17] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative">
      <div className="max-w-xl w-full bg-[#151c2c] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Progress Header & Quit Action */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
            <span className="uppercase tracking-widest text-[11px] text-indigo-400">
              {isHindi ? `कक्षा ${className}` : `Class ${className}`} • {subject}
            </span>

            <div className="flex items-center gap-3">
              <span className="tracking-wider text-slate-400">
                {currentIndex + 1} / {questions.length}
              </span>
              <button
                onClick={() => setShowQuitModal(true)}
                className="px-2.5 py-1 text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all"
              >
                ✕ {isHindi ? 'छोड़ें' : 'Quit'}
              </button>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Story Scenario */}
        <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl p-4 text-slate-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
          <span className="text-base leading-none">💡</span>
          <div>
            <strong className="block text-indigo-400 font-medium mb-0.5">
              {isHindi ? 'स्थिति / परिदृश्य:' : 'Scenario:'}
            </strong>
            {currentQ.scenario}
          </div>
        </div>

        {/* Question Title */}
        <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
          {currentQ.question}
        </h2>

        {/* Visual & Text Hint Accordion */}
        <div className="space-y-3">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors group"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform text-[10px]">💡</span>
              <span className="underline">{isHindi ? 'विजुअल और संकेत देखें' : 'Need a visual hint & clue?'}</span>
            </button>
          ) : (
            <div className="bg-[#0b0f17] border border-indigo-500/20 rounded-2xl p-4 text-xs text-slate-300 space-y-3">
              <div className="overflow-hidden rounded-xl border border-slate-800 max-h-44 bg-slate-950">
                {/* // Inside your JSX layout: */}
<div className="overflow-hidden rounded-xl border border-slate-800 max-h-44 bg-slate-950 relative w-full h-44">
  <Image
    src={visualHintUrl}
    alt="Visual clue"
    width={600}
    height={320}
    unoptimized
    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
  />
</div>
              </div>
              <div>
                <strong className="text-indigo-400 block font-semibold mb-1">
                  🔍 {isHindi ? 'जिज्ञासा संकेत:' : 'Curiosity Clue:'}
                </strong>
                <p className="leading-relaxed text-slate-300">{currentQ.curiosityHint}</p>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, idx) => {
            let btnStyle =
              'bg-[#1a2336] border-slate-800 text-slate-200 hover:bg-[#202b42] hover:border-slate-700';

            if (selectedOption !== null) {
              if (idx === currentQ.correctIndex) {
                btnStyle =
                  'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium shadow-sm shadow-emerald-500/10';
              } else if (idx === selectedOption) {
                btnStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-medium';
              } else {
                btnStyle = 'bg-[#151c2c] border-slate-800 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedOption !== null}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex justify-between items-center gap-3 ${btnStyle}`}
              >
                <span>{option}</span>
                {selectedOption !== null && idx === currentQ.correctIndex && (
                  <span className="text-emerald-400 font-bold">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-World Explanation */}
        {selectedOption !== null && (
          <div className="space-y-4 pt-2 border-t border-slate-800/80">
            <div className="bg-[#0b0f17] border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="font-semibold text-indigo-400 block mb-1">
                🌊 {isHindi ? 'व्यावहारिक कनेक्शन:' : 'Everyday Connection:'}
              </strong>
              {currentQ.realWorldAnalogy}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all text-xs sm:text-sm"
            >
              {currentIndex + 1 === questions.length
                ? isHindi
                  ? 'परिणाम देखें'
                  : 'See Quest Results'
                : isHindi
                ? 'अगला प्रश्न →'
                : 'Next Curiosity Challenge →'}
            </button>
          </div>
        )}
      </div>

      {/* Quit Confirmation Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#151c2c] border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-xl">
              🚪
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                {isHindi ? 'क्विज़ छोड़ें?' : 'Quit Test?'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isHindi
                  ? 'आपकी वर्तमान प्रगति खो जाएगी। क्या आप वास्तव में मुख्य पृष्ठ पर वापस जाना चाहते हैं?'
                  : 'Your current progress will be lost. Are you sure you want to return to setup?'}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setShowQuitModal(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
              >
                {isHindi ? 'जारी रखें' : 'Keep Playing'}
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-rose-600/20"
              >
                {isHindi ? 'हाँ, छोड़ें' : 'Yes, Quit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0f17] text-white flex items-center justify-center text-sm">
          Loading...
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}