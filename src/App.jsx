import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Trophy,
  Brain,
  ChevronRight,
  ChevronLeft,
  List,
  ExternalLink,
} from "lucide-react";

/**
 * ⚙️ НАЛАШТУВАННЯ ДЛЯ КОРИСТУВАЧА
 */
const GOOGLE_DOC_URL = "#"; // Посилання на ваші правила
const NEXT_APP_URL = "#"; // Посилання на ТЕМУ 5
const PREV_APP_URL = "#"; // Посилання на ТЕМУ 3 (Narzędnik)
const MENU_APP_URL = "#"; // Посилання на ГОЛОВНЕ МЕНЮ

// --- БАЗА ПИТАНЬ (50 шт) - BIERNIK ---
const QUESTIONS_DB = [
  // --- Жіночий рід (Żeński): -a -> -ę ---
  {
    text: "Lubię ______ (kawa).",
    options: ["kawę", "kawa", "kawy"],
    correct: 0,
    explanation: "Жіночий рід: -a змінюється на -ę.",
  },
  {
    text: "Mam ______ (siostra).",
    options: ["siostrę", "siostra", "siostry"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Czytam ______ (książka).",
    options: ["książkę", "książka", "książki"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Piję ______ (woda).",
    options: ["wodę", "woda", "wody"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Widzę ______ (mama).",
    options: ["mamę", "mama", "mamy"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Jem ______ (zupa).",
    options: ["zupę", "zupa", "zupy"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Kocham ______ (Polska).",
    options: ["Polskę", "Polska", "Polski"],
    correct: 0,
    explanation: "Жіночий рід: -a -> -ę.",
  },
  {
    text: "Mam ______ (nowa) pracę.",
    options: ["nową", "nowa", "nowej"],
    correct: 0,
    explanation: "Жіночий прикметник: -a -> -ą.",
  },
  {
    text: "Lubię ______ (twoja) żonę.",
    options: ["twoją", "twoja", "twojej"],
    correct: 0,
    explanation: "Жіночий займенник: -a -> -ą.",
  },
  {
    text: "Widzę ______ (wysoka) kobietę.",
    options: ["wysoką", "wysoka", "wysokiej"],
    correct: 0,
    explanation: "Жіночий прикметник: -a -> -ą.",
  },

  // --- Чоловічий Неістота (Męski Rzeczowy): Не змінюється ---
  {
    text: "Mam ______ (telefon).",
    options: ["telefon", "telefona", "telefonu"],
    correct: 0,
    explanation: "Чоловічий неживий: як у словнику (не змінюється).",
  },
  {
    text: "Widzę ______ (dom).",
    options: ["dom", "doma", "domu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "Kupuję ______ (bilet).",
    options: ["bilet", "bileta", "biletu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "On ma ______ (samochód).",
    options: ["samochód", "samochóda", "samochodu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "Lubię ten ______ (film).",
    options: ["film", "filma", "filmu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "Mam ______ (problem).",
    options: ["problem", "problema", "problemu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "Widzę twój ______ (komputer).",
    options: ["komputer", "komputera", "komputeru"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },
  {
    text: "Czytam ______ (mail).",
    options: ["mail", "maila", "mailu"],
    correct: 0,
    explanation:
      "Чоловічий неживий: не змінюється (хоча 'maila' допустимо розмовно, норма - mail).",
  },
  {
    text: "Oglądam ______ (youtube).",
    options: ["youtube", "youtuba", "youtubu"],
    correct: 0,
    explanation: "Назви сервісів часто не змінюються (або розмовно -a).",
  },
  {
    text: "Biorę ______ (długopis).",
    options: ["długopis", "długopisa", "długopisu"],
    correct: 0,
    explanation: "Чоловічий неживий: не змінюється.",
  },

  // --- Чоловічий Істота (Męski Żywotny): Додаємо -a ---
  {
    text: "Mam ______ (brat).",
    options: ["brata", "brat", "bratu"],
    correct: 0,
    explanation: "Чоловічий живий (людина): додаємо -a.",
  },
  {
    text: "Lubię tego ______ (aktor).",
    options: ["aktora", "aktor", "aktoru"],
    correct: 0,
    explanation: "Чоловічий живий: +a.",
  },
  {
    text: "Znam tego ______ (pan).",
    options: ["pana", "pan", "panu"],
    correct: 0,
    explanation: "Чоловічий живий: +a.",
  },
  {
    text: "Mam ______ (syn).",
    options: ["syna", "syn", "synu"],
    correct: 0,
    explanation: "Чоловічий живий: +a.",
  },
  {
    text: "Widzę ______ (pies).",
    options: ["psa", "piesa", "pies"],
    correct: 0,
    explanation: "Тварина: +a (Pies -> Psa, випадає 'ie').",
  },
  {
    text: "Masz ______ (kot)?",
    options: ["kota", "kot", "kotu"],
    correct: 0,
    explanation: "Тварина: +a.",
  },
  {
    text: "Znam twojego ______ (ojciec).",
    options: ["ojca", "ojcieca", "ojciec"],
    correct: 0,
    explanation: "Ojciec -> Ojca.",
  },
  {
    text: "Lubię mojego ______ (dziadek).",
    options: ["dziadka", "dziadeka", "dziadek"],
    correct: 0,
    explanation: "Dziadek -> Dziadka.",
  },
  {
    text: "Szanuję tego ______ (człowiek).",
    options: ["człowieka", "człowiek", "ludzi"],
    correct: 0,
    explanation: "Чоловічий живий: +a.",
  },
  {
    text: "Widzę ______ (pająk).",
    options: ["pająka", "pająk", "pająku"],
    correct: 0,
    explanation: "Тварина/Комаха: +a.",
  },

  // --- Винятки "Напівживі" (Їжа, Спорт, Марки, Гаджети) - поводяться як живі (+a) ---
  {
    text: "Jem ______ (pomidor).",
    options: ["pomidora", "pomidor", "pomidoru"],
    correct: 0,
    explanation: "Овочі/Фрукти часто мають закінчення -a.",
  },
  {
    text: "Jem ______ (banan).",
    options: ["banana", "banan", "bananu"],
    correct: 0,
    explanation: "Фрукти: +a.",
  },
  {
    text: "Kupuję ______ (szampan).",
    options: ["szampana", "szampan", "szampanu"],
    correct: 0,
    explanation: "Алкоголь/Напої: часто +a.",
  },
  {
    text: "Jem ______ (hamburger).",
    options: ["hamburgera", "hamburger", "hamburgeru"],
    correct: 0,
    explanation: "Фастфуд: +a.",
  },
  {
    text: "Gram w ______ (tenis).",
    options: ["tenisa", "tenis", "tenisu"],
    correct: 0,
    explanation: "Спорт/Ігри: +a.",
  },
  {
    text: "Gram w ______ (piłka nożna).",
    options: ["piłkę nożną", "piłka nożna", "piłku nożnu"],
    correct: 0,
    explanation: "УВАГА! Piłka - жіночий рід (-ę), хоча спорт.",
  },
  {
    text: "Tańczę ______ (walc).",
    options: ["walca", "walc", "walcu"],
    correct: 0,
    explanation: "Танець: +a.",
  },
  {
    text: "Mam ______ (iPhone).",
    options: ["iPhone'a", "iPhone", "iPhona"],
    correct: 0,
    explanation: "Бренди/Гаджети: часто +a.",
  },
  {
    text: "Kupuję ______ (Ford).",
    options: ["Forda", "Ford", "Fordu"],
    correct: 0,
    explanation: "Марки машин: +a.",
  },
  {
    text: "Palę ______ (papieros).",
    options: ["papierosa", "papieros", "papierosu"],
    correct: 0,
    explanation: "Сигарети: +a.",
  },

  // --- Середній рід (Nijaki): Не змінюється ---
  {
    text: "Lubię to ______ (dziecko).",
    options: ["dziecko", "dziecka", "dzieckę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Piję zimne ______ (piwo).",
    options: ["piwo", "piwa", "piwę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Widzę wielkie ______ (morze).",
    options: ["morze", "morza", "morzę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Mam ______ (okno) w pokoju.",
    options: ["okno", "okna", "oknę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Jem ______ (jabłko).",
    options: ["jabłko", "jabłka", "jabłkę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Lubię to ______ (zdjęcie).",
    options: ["zdjęcie", "zdjęcia", "zdjęcię"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Mam polskie ______ (imię).",
    options: ["imię", "imienia", "imie"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Widzę to ______ (zwierzę).",
    options: ["zwierzę", "zwierzęcia", "zwierza"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Lubię to ______ (muzeum).",
    options: ["muzeum", "muzea", "muzeę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
  {
    text: "Piję ciepłe ______ (mleko).",
    options: ["mleko", "mleka", "mlekę"],
    correct: 0,
    explanation: "Середній рід: не змінюється.",
  },
];

const PolishTrainerT4 = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  // Ініціалізація: перемішуємо питання при старті
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...QUESTIONS_DB].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setCompleted(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    const question = shuffledQuestions[currentQIndex];
    const correct = index === question.correct;

    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  // --- RENDERERS ---

  if (shuffledQuestions.length === 0)
    return <div className="p-10 text-center">Завантаження...</div>;

  const question = shuffledQuestions[currentQIndex];
  const progressPercentage = Math.round(
    (currentQIndex / shuffledQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              A1
            </span>
            <h1 className="font-bold text-slate-800 truncate">
              Тема 4: Biernik
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Назад */}
            <a
              href={PREV_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                PREV_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Попередня тема"
            >
              <ChevronLeft size={24} />
            </a>

            {/* МЕНЮ */}
            <a
              href={MENU_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                MENU_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Усі теми"
            >
              <List size={24} />
            </a>

            {/* Вперед */}
            <a
              href={NEXT_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                NEXT_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Наступна тема"
            >
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* 2. THEORY BLOCK (Collapsible) */}
        <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => setShowTheory(!showTheory)}
            className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BookOpen size={20} />
              <span>Експрес-правила</span>
            </div>
            <span className="text-xs text-slate-400">
              {showTheory ? "Згорнути" : "Показати"}
            </span>
          </div>

          {showTheory && (
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <p>
                <b>Biernik (Знахідний відмінок)</b> — Кого? Що? (Kogo? Co?).
                Використовуємо після: <i>mam, lubię, znam, widzę, jem, piję</i>.
              </p>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <strong className="block text-red-800">
                    1. Жіночий (Żeński):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      Іменник: <b>-a &rarr; -ę</b> (kawę). <br />
                      <span className="text-xs text-slate-500">
                        Виняток: Pani (не змінюється).
                      </span>
                    </li>
                    <li>
                      Прикметник: <b>-a &rarr; -ą</b> (czarną).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <strong className="block text-blue-800">
                    2. Чоловічий (Męski):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <b>Неістота (Речі):</b> Не змінюється (mam dom).
                    </li>
                    <li>
                      <b>Істота (Люди/Тварини):</b> <br />
                      Іменник: <b>+a</b> (mam brata, psa). <br />
                      Прикметник: <b>+ego</b> (dobrego).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-gray-50 rounded border border-gray-200">
                  <strong className="block text-gray-800">
                    3. Середній (Nijaki):
                  </strong>
                  <span className="text-xs">
                    Ніколи не змінюється! (widzę okno, dziecko).
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href={GOOGLE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    GOOGLE_DOC_URL === "#"
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }`}
                >
                  <ExternalLink size={14} />
                  {GOOGLE_DOC_URL === "#"
                    ? "Детальні правила (Скоро)"
                    : "Відкрити повні правила"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. GAME ZONE */}
        {!completed ? (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Питання {currentQIndex + 1} з {shuffledQuestions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                let btnClass =
                  "p-4 rounded-xl font-semibold text-lg transition-all border-2 text-left relative ";

                if (showFeedback) {
                  if (idx === question.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (selectedOption === idx) {
                    btnClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-300";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-[0.98]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showFeedback}
                    className={btnClass}
                  >
                    {opt}
                    {showFeedback && idx === question.correct && (
                      <Check
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {showFeedback &&
                      idx !== question.correct &&
                      selectedOption === idx && (
                        <X
                          size={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {!isCorrect && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-4 text-sm border border-red-100 flex gap-3 items-start">
                    <Brain size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>Підказка:</strong> {question.explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isCorrect
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-800 hover:bg-slate-900 shadow-slate-300"
                  }`}
                >
                  {currentQIndex < shuffledQuestions.length - 1
                    ? "Далі"
                    : "Завершити"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {score === shuffledQuestions.length ? (
                <Trophy size={80} className="text-yellow-500 mx-auto" />
              ) : score >= shuffledQuestions.length * 0.8 ? (
                <Trophy size={80} className="text-blue-500 mx-auto" />
              ) : (
                <RefreshCw size={80} className="text-slate-300 mx-auto" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {score === shuffledQuestions.length
                ? "Ідеально!"
                : "Тренування завершено!"}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Ваш результат: <strong className="text-slate-800">{score}</strong>{" "}
              з {shuffledQuestions.length}
            </p>

            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Почати знову
            </button>
          </div>
        )}
      </main>

      {!completed && (
        <footer className="bg-white border-t border-slate-100 p-4">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Прогрес</span>
              <span>
                {Math.round((score / (currentQIndex + 1)) * 100) || 0}% Успіху
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PolishTrainerT4;
