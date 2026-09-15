'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NCERT_DATA } from '../../lib/ncertData';


export default function Home() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<number>(8);
  const [subject, setSubject] = useState<string>('Science');
  const [topic, setTopic] = useState<string>('');
  const [level, setLevel] = useState<string>('Beginning');
  const [language, setLanguage] = useState<string>('English');
  const [loading, setLoading] = useState<boolean>(false);

  const availableSubjects = Object.keys(NCERT_DATA[selectedClass] || NCERT_DATA[8]);
  const currentSubject = availableSubjects.includes(subject) ? subject : availableSubjects[0];
  const availableTopics = NCERT_DATA[selectedClass]?.[currentSubject] || ['General Concepts'];

  const handleClassSelect = (cls: number) => {
    setSelectedClass(cls);
    const newSubs = Object.keys(NCERT_DATA[cls] || {});
    const firstSub = newSubs.length > 0 ? newSubs[0] : '';
    const firstTopic = NCERT_DATA[cls]?.[firstSub]?.[0] || '';
    setSubject(firstSub);
    setTopic(firstTopic);
  };

  const handleSubjectChange = (newSub: string) => {
    setSubject(newSub);
    const newTopics = NCERT_DATA[selectedClass]?.[newSub] || [];
    setTopic(newTopics[0] || '');
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const queryTopic = topic || availableTopics[0];
    const params = new URLSearchParams({
      class: selectedClass.toString(),
      subject: currentSubject,
      topic: queryTopic,
      level,
      language,
    });

    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#0b0f17] text-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#151c2c] border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-10 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-2xl mb-3">
            🧪
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            NCERT Curiosity Lab
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Explore, experiment, and learn without rote memorization
          </p>
        </div>

        <form onSubmit={handleStartQuiz} className="space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Medium / Language
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#0b0f17] border border-slate-800 rounded-xl">
              {['English', 'Hindi'].map((lang) => (
                <button
                  type="button"
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                    language === lang
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'Hindi' ? 'हिंदी (Hindi)' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Class
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
              {[1, 3, 5, 8, 9, 10, 11, 12].map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => handleClassSelect(cls)}
                  className={`py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all ${
                    selectedClass === cls
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-[#0b0f17] border-slate-800 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Choose Subject
            </label>
            <div className="relative">
              <select
                value={currentSubject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full bg-[#0b0f17] border border-slate-800 text-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub} className="bg-slate-900 text-slate-200">
                    {sub}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Topic Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              NCERT Chapter / Topic
            </label>
            <div className="relative">
              <select
                value={topic || availableTopics[0]}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#0b0f17] border border-slate-800 text-slate-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              >
                {availableTopics.map((top) => (
                  <option key={top} value={top} className="bg-slate-900 text-slate-200">
                    {top}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Curiosity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Beginning', icon: '🌱' },
                { name: 'Intermediate', icon: '🔍' },
                { name: 'Advanced', icon: '⚡' },
              ].map((lvl) => (
                <button
                  type="button"
                  key={lvl.name}
                  onClick={() => setLevel(lvl.name)}
                  className={`py-2.5 px-2 text-xs font-medium rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    level === lvl.name
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md'
                      : 'bg-[#0b0f17] border-slate-800 text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-base">{lvl.icon}</span>
                  <span>{lvl.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all disabled:opacity-50 text-sm sm:text-base tracking-wide flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Generating Quest...</span>
              </>
            ) : (
              'Start Curiosity Quest ✨'
            )}
          </button>
        </form>
      </div>
    </main>
  );
}