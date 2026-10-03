'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  BookOpen, CheckCircle, XCircle, Award, ArrowLeft, 
  HelpCircle, Clock, Sparkles, RotateCcw, ChevronRight 
} from 'lucide-react';
import { EducationalModule } from '@/lib/types';
import { INITIAL_MODULES } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';

export default function LessonDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addPoints } = useAuth();

  const [module, setModule] = useState<EducationalModule | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    scorePercentage: number;
    correctCount: number;
    total: number;
    passed: boolean;
  } | null>(null);

  useEffect(() => {
    const found = INITIAL_MODULES.find(m => m.slug === slug || m.id === slug) || INITIAL_MODULES[0];
    setModule(found);
  }, [slug]);

  if (!module) {
    return <div className="p-20 text-center font-mono">Loading lesson module...</div>;
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    module.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_option_index) {
        correct++;
      }
    });

    const total = module.quiz.length;
    const scorePct = Math.round((correct / total) * 100);
    const passed = scorePct >= 75;

    setQuizResults({
      scorePercentage: scorePct,
      correctCount: correct,
      total,
      passed
    });
    setQuizSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      addPoints(module.points_reward, scorePct === 100 ? "Polar Gold Medalist" : "Antarctic Scholar");
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans space-y-12">
      
      {/* Back Link */}
      <div>
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[#76543F] hover:text-[#3B261C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Education Hub</span>
        </Link>
      </div>

      {/* Lesson Hero */}
      <div className="journal-card-static rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#A67C5B]">
          <span className="uppercase font-bold">{module.category}</span>
          <span>Target: {module.target_audience}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B261C]">
          {module.title}
        </h1>

        <p className="text-base text-[#523528] leading-relaxed">
          {module.summary}
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#76543F]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {module.reading_time_mins} mins read
          </span>
          <span>•</span>
          <span className="text-emerald-800 font-semibold">+{module.points_reward} XP for completion</span>
        </div>
      </div>

      {/* Lesson Sections Content */}
      <div className="space-y-8">
        {module.sections.map((sec, idx) => (
          <div key={idx} className="bg-[#FFF8ED] p-6 sm:p-8 rounded-xl border border-[#B49A82] shadow-xs space-y-3">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#3B261C]">
              {sec.title}
            </h2>
            <p className="text-sm sm:text-base text-[#523528] leading-relaxed">
              {sec.content}
            </p>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE WORKING QUIZ SYSTEM (SECTION 15) */}
      {/* ======================================================== */}
      <div className="bg-[#F4E9D8] border-2 border-[#B49A82] rounded-2xl p-6 sm:p-10 shadow-lg space-y-8">
        
        <div className="border-b border-[#D8C2A8] pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#A67C5B] font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Interactive Knowledge Verification</span>
            </div>
            <h3 className="font-serif font-bold text-2xl text-[#3B261C]">
              Module Mastery Assessment
            </h3>
          </div>
          <span className="font-mono text-xs text-[#76543F]">
            {module.quiz.length} Questions • Pass Criteria: 75%
          </span>
        </div>

        {/* Quiz Submission Results Banner */}
        {quizResults && (
          <div
            className={`p-6 rounded-xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono ${
              quizResults.passed
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-amber-50 border-amber-500 text-amber-950'
            }`}
          >
            <div>
              <span className="text-lg font-bold block">
                {quizResults.passed ? '🎉 Congratulations! You Passed!' : 'Assessment Incomplete'}
              </span>
              <span className="text-xs">
                Score: <strong>{quizResults.scorePercentage}%</strong> ({quizResults.correctCount} of {quizResults.total} correct)
              </span>
            </div>
            {quizResults.passed ? (
              <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-lg text-emerald-900 text-xs font-bold border border-emerald-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>+{module.points_reward} XP Awarded to Profile!</span>
              </div>
            ) : (
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#3B261C] hover:bg-[#523528] text-white rounded-lg text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Review &amp; Retake</span>
              </button>
            )}
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {module.quiz.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;

            return (
              <div
                key={q.id}
                className="bg-[#FFF8ED] p-5 rounded-xl border border-[#B49A82] shadow-xs space-y-4"
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold bg-[#3B261C] text-[#FFF8ED] w-6 h-6 rounded flex items-center justify-center shrink-0">
                    {qIdx + 1}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#3B261C] leading-snug">
                    {q.question_text}
                  </h4>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    let optionStyle = 'bg-[#F4E9D8] text-[#523528] border-[#D8C2A8] hover:bg-[#D8C2A8]';

                    if (quizSubmitted) {
                      if (optIdx === q.correct_option_index) {
                        optionStyle = 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
                      } else if (isSelected && optIdx !== q.correct_option_index) {
                        optionStyle = 'bg-red-100 text-red-900 border-red-300 font-bold';
                      } else {
                        optionStyle = 'opacity-50 bg-[#F4E9D8]';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-[#3B261C] text-[#FFF8ED] border-[#3B261C] font-bold shadow-xs';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`p-3 rounded-lg border text-left flex items-start gap-2 transition-all ${optionStyle}`}
                      >
                        <span className="font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Scientific Explanation after submission */}
                {quizSubmitted && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-[#523528] leading-relaxed">
                    <strong className="text-amber-900 block mb-0.5">Scientific Explanation:</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action */}
        {!quizSubmitted && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < module.quiz.length}
              className="px-6 py-3 bg-[#3B261C] hover:bg-[#523528] disabled:opacity-40 text-[#FFF8ED] rounded-xl font-mono text-xs font-bold transition-all shadow-md"
            >
              Submit Answers &amp; Verify Score ({Object.keys(selectedAnswers).length}/{module.quiz.length})
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
