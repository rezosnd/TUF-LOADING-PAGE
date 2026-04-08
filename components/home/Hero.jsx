"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, NotebookPen } from "lucide-react";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false });

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const getMonthImageSrc = (monthNum) => {
  return `/months/${monthNum}.avif`;
};

const FlipPage = React.memo(
  React.forwardRef((props, ref) => (
    <div className={`page bg-white relative shadow-md ${props.boxClassName || ""}`} ref={ref} data-density={props.density || "soft"}>
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center ${props.className || ""}`}
        style={{ width: props.visualWidth ? `${props.visualWidth}px` : '400px', height: props.visualHeight ? `${props.visualHeight}px` : '650px' }}
      >
        {props.children}
      </div>
    </div>
  ))
);
FlipPage.displayName = "FlipPage";

const MonthNotes = memo(({ noteKey, label, onInteractionStart, onInteractionEnd }) => {
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const saveTimeout = useRef(null);
  const UI_TIMEOUT = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
      setText(saved[noteKey] || '');
    } catch(e) {}
  }, [noteKey]);

  const handleChange = (e) => {
    setText(e.target.value);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      try {
         const saved = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
         saved[noteKey] = e.target.value;
         localStorage.setItem('calendarNotes', JSON.stringify(saved));
         setIsSaved(true);
         if (UI_TIMEOUT.current) clearTimeout(UI_TIMEOUT.current);
         UI_TIMEOUT.current = setTimeout(() => setIsSaved(false), 2000);
      } catch(err) {}
    }, 500);
  };

  const handleClear = () => {
    setText('');
    try {
       const saved = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
       delete saved[noteKey];
       localStorage.setItem('calendarNotes', JSON.stringify(saved));
    } catch(err) {}
  };

  return (
    <div className="mt-1 h-[28%] flex flex-col relative w-full border-t border-dashed border-gray-300 pt-1">
      <div className="flex justify-between items-end mb-0 md:mb-1 px-1 z-20">
        <div className="flex items-center gap-2">
          <span className="text-[9px] md:text-[10px] font-bold tracking-widest text-[#1da1f2] uppercase flex items-center gap-1">
            <NotebookPen size={12}/> {label}
          </span>
<span
  className={`text-[9px] md:text-[10px] font-medium tracking-wide transition-all duration-300 ${
    isSaved
      ? "opacity-100 text-[#1da1f2] translate-y-0 drop-shadow-[0_0_6px_rgba(29,161,242,0.6)]"
      : "opacity-0 -translate-y-1"
  }`}
>
  saved ✓
</span>
        </div>
        {text.length > 0 && (
          <button 
            type="button"
            onClick={handleClear} 
            className="text-[9px] md:text-[10px] text-red-500 hover:text-red-700 font-bold z-30 uppercase tracking-widest active:scale-95 cursor-pointer transition-transform"
          >
            Clear
          </button>
        )}
      </div>
      <textarea
        placeholder="Write..."
        className="w-full flex-1 resize-none bg-transparent outline-none text-[10px] md:text-xs text-gray-800 font-medium z-20 px-1 pt-[6px] pointer-events-auto select-text"
        value={text}
        onChange={handleChange}
        onFocus={onInteractionStart}
        onBlur={onInteractionEnd}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.target.focus();
        }}
        onPointerUp={(e) => e.stopPropagation()}
        onPointerMove={(e) => e.stopPropagation()}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.target.focus();
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.target.focus();
        }}
        onClick={(e) => {
          e.stopPropagation();
          e.nativeEvent.stopPropagation();
          e.target.focus();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          onInteractionStart?.();
        }}
        onTouchEnd={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onKeyUp={(e) => e.stopPropagation()}
        style={{
          touchAction: 'pan-y',
          lineHeight: "1.4rem",
          backgroundImage: "linear-gradient(transparent, transparent calc(1.4rem - 1px), #e2e8f0 calc(1.4rem - 1px), #e2e8f0 1.4rem)",
          backgroundSize: "100% 1.4rem",
          userSelect: 'text',
          WebkitUserSelect: 'text',
          MsUserSelect: 'text'
        }}
      />
    </div>
  );
});
export default function Hero() {
  const [range, setRange] = useState({ start: null, end: null });
  const [notes, setNotes] = useState({});
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const initialPageRef = useRef(new Date().getMonth());
  const [currentPage, setCurrentPage] = useState(initialPageRef.current);
  const bookRef = useRef();

  const [size, setSize] = useState({ physicalW: 400, physicalH: 650 });
  const [isClient, setIsClient] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  const getFlipApi = useCallback(() => bookRef.current?.pageFlip?.(), []);

  const goToPrevMonth = useCallback(() => {
    try {
      const api = getFlipApi();
      if (!api) return;
      const idx = api.getCurrentPageIndex?.();
      if (typeof api.turnToPage === 'function' && idx > 0) {
        api.turnToPage(idx - 1);
        return;
      }
      
      if (typeof api.flipPrev === 'function') {
        api.flipPrev();
      }
    } catch (error) {

    }
  }, [getFlipApi, currentPage]);

  const goToNextMonth = useCallback(() => {
    try {
      const api = getFlipApi();
      if (!api) return;
      const idx = api.getCurrentPageIndex?.();
      const count = api.getPageCount?.() ?? 12;

      if (typeof api.flipNext === 'function') {
        api.flipNext();
        return;
      }

      if (typeof api.turnToPage === 'function' && idx < count - 1) {
        api.turnToPage(idx + 1);
      }
    } catch (error) {
    }
  }, [getFlipApi]);

  useEffect(() => {
    setIsClient(true);
    let lastWidth = window.innerWidth;
    let isInitialCalculation = true;
    let resizeTimeout;

    const calculateSize = () => {
      const currentWidth = window.innerWidth;
      const isMobile = currentWidth < 768;
      setIsMobileViewport(isMobile);
      if (!isInitialCalculation && isMobile && Math.abs(currentWidth - lastWidth) < 20) {
         return;
      }
      lastWidth = currentWidth;
      isInitialCalculation = false;

      const maxW = currentWidth * 0.92;
      const maxH = window.innerHeight * 0.8;

      let visW = 400;
      let visH = 650;

      if (isMobile) {
        visW = Math.min(maxW * 0.88, 360);
        visH = (visW / 400) * 650;
      } else {
        if (visW > maxW) {
          visW = maxW;
          visH = (visW / 400) * 650;
        }
        if (visH > maxH) {
          visH = maxH;
          visW = (visH / 650) * 400;
        }
      }

      setSize({ physicalW: Math.max(visW, 250), physicalH: Math.max(visH, 400) });
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateSize, 150);
    };

    calculateSize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem("calendarMemos");
    if (savedNotes) {
      try { setNotes(JSON.parse(savedNotes)); } catch(e) {}
    }
    const savedRange = localStorage.getItem("calendarRange");
    if (savedRange) {
      try { 
        const r = JSON.parse(savedRange);
        setRange({ 
            start: r.start ? new Date(r.start) : null, 
            end: r.end ? new Date(r.end) : null 
        });
      } catch(e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarMemos", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("calendarRange", JSON.stringify({
      start: range.start?.toISOString() || null,
      end: range.end?.toISOString() || null
    }));
  }, [range]);

  const handleDateClick = useCallback((date) => {
    setRange(prevRange => {
      const start = prevRange.start;
      const end = prevRange.end;
      if (!start || (start && end)) {
        return { start: date, end: null };
      } else {
        const tDate = date.getTime();
        const tStart = start.getTime();
        if (tDate < tStart) {
          return { start: date, end: start };
        } else if (tDate > tStart) {
          return { start: start, end: date };
        } else {
          return { start: null, end: null };
        }
      }
    });
  }, []);

  const getDaysForMonth = useCallback((year, month) => {
    let day = new Date(year, month, 1).getDay();
    let startDayIndex = day === 0 ? 6 : day - 1;
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let daysInPrevMonth = new Date(year, month, 0).getDate();

    const padPrev = Array.from({ length: startDayIndex }).map((_, i) => ({
      day: daysInPrevMonth - startDayIndex + i + 1,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - startDayIndex + i + 1)
    }));

    const currentDays = Array.from({ length: daysInMonth }).map((_, i) => ({
      day: i + 1,
      isCurrentMonth: true,
      date: new Date(year, month, i + 1)
    }));

    const totalSoFar = padPrev.length + currentDays.length;
    const nextPadLength = totalSoFar % 7 === 0 ? 0 : 7 - (totalSoFar % 7);
    const padNext = Array.from({ length: nextPadLength }).map((_, i) => ({
      day: i + 1,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i + 1)
    }));

    return [...padPrev, ...currentDays, ...padNext];
  }, []);

  const currentYear = 2026;
  const months = useMemo(() => Array.from({ length: 12 }).map((_, i) => i), []);

  if (!isClient) return <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center">Loading Calendar...</div>;
  const innerFlipWidth = size.physicalH;  
  const innerFlipHeight = size.physicalW; 
  const brickPattern = `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%231da1f2' fill-opacity='0.15'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section 
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-0 md:px-8 overflow-hidden relative"
      style={{ 
        backgroundColor: '#111111',
        backgroundImage: brickPattern,
      }}
    >
      <div 
         className="relative rounded-b-lg flex flex-col items-center z-10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] mt-6 md:mt-24"
         style={{ width: size.physicalW, height: size.physicalH, touchAction: 'pan-y' }}
      >
        <button
          type="button"
          onClick={goToPrevMonth}
          className="absolute z-50 left-3 top-[12%] md:top-[20%] md:left-2 bg-[#1da1f2]/90 backdrop-blur hover:bg-white text-white hover:text-[#1da1f2] border-[1px] border-white/20 hover:border-[#1da1f2] p-2 md:p-1.5 lg:p-2 rounded-full shadow-[0_4px_25px_rgba(29,161,242,0.4)] transition-all flex items-center justify-center group pointer-events-auto active:scale-90 cursor-pointer" 
          aria-label="Previous Month">
          <ChevronLeft className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:-translate-x-1 transition-transform" strokeWidth={3} />
        </button>

        <button
          type="button"
          onClick={goToNextMonth}
          className="absolute z-50 right-3 top-[12%] md:top-[20%] md:right-2 bg-[#1da1f2]/90 backdrop-blur hover:bg-white text-white hover:text-[#1da1f2] border-[1px] border-white/20 hover:border-[#1da1f2] p-2 md:p-1.5 lg:p-2 rounded-full shadow-[0_4px_25px_rgba(29,161,242,0.4)] transition-all flex items-center justify-center group pointer-events-auto active:scale-90 cursor-pointer" 
          aria-label="Next Month">
          <ChevronRight className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </button>

        <div className="absolute -top-10 md:-top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none drop-shadow-md">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-300 shadow-inner border border-gray-400 z-10"></div>
          <svg width="60" height="25" viewBox="0 0 80 35" className="-mt-1 opacity-80 md:w-[80px] md:h-[35px] md:-mt-1.5">
            <path d="M 0 35 C 40 -10, 40 -10, 80 35" fill="none" stroke="#444" strokeWidth="2.5" />
          </svg>
        </div>

        <div className="absolute -top-3 left-0 w-full flex justify-center gap-1.5 md:gap-3 z-40 px-2 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="w-1.5 md:w-2 h-5 md:h-7 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 rounded-full shadow-md border border-gray-500"></div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
             style={{ 
               width: innerFlipWidth, 
               height: innerFlipHeight, 
               transform: "rotate(90deg)",
               touchAction: "pan-x"
             }}>
          
          <HTMLFlipBook
            width={innerFlipWidth}
            height={innerFlipHeight}
            size="fixed"
            maxShadowOpacity={0.6}
            showCover={false}
            usePortrait={true}
            useMouseEvents={false}
              clickEventForward={true}
            mobileScrollSupport={isMobileViewport}
            swipeDistance={9999}
            disableFlipByClick={true}
            flippingTime={650}
            className="demo-book custom-flip"
            ref={bookRef}
            startPage={initialPageRef.current}
            onInit={() => {
              const api = bookRef.current?.pageFlip?.();
              if (!api) return;
              const idx = api.getCurrentPageIndex?.();
              if (typeof idx === 'number') setCurrentPage(idx);
            }}
            onFlip={(e) => {
              const api = bookRef.current?.pageFlip?.();
              if (!api) return;
              const idx = api.getCurrentPageIndex?.();
              if (typeof idx === 'number') setCurrentPage(idx);
            }}
          >
            {/* Monthly Calendar Pages */}
            {months.map((month) => {
              const monthName = new Date(currentYear, month).toLocaleString("default", { month: "long" });
              const monthKey = `${currentYear}-${month}`;
              const days = getDaysForMonth(currentYear, month);

              return (
                <FlipPage visualWidth={size.physicalW} visualHeight={size.physicalH} key={monthKey} className="flex flex-col h-full bg-[#fafafa] relative overflow-hidden rounded-b-md">
                  <div className="pt-[14px]"></div>
                  
                  <div className="h-[30%] md:h-[35%] w-full relative flex-shrink-0 rounded-t border-b-4 border-[#1da1f2] bg-gradient-to-br from-[#1da1f2]/20 to-[#1da1f2]/5 flex items-center justify-center overflow-hidden">
                    <img 
                      src={getMonthImageSrc(MONTH_NUMBERS[month])} 
                      alt={monthName}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-[120px] md:text-[180px] font-bold text-[#1da1f2]/30 drop-shadow-lg">{MONTH_NUMBERS[month]}</div>
                    </div>
                    <div className="absolute inset-x-0 bottom-3 px-4 flex items-end justify-between z-10 pointer-events-none">
                      <div className="text-[10px] md:text-sm text-gray-800 font-bold tracking-[0.3em] uppercase drop-shadow-md">{currentYear}</div>
                      <div className="text-3xl md:text-5xl text-gray-900 font-bebas font-extrabold tracking-widest drop-shadow-md">{monthName}</div>
                    </div>
                  </div>

                  <div className="flex-1 p-[6px] md:p-3 flex flex-col justify-between text-xs md:text-sm">
                    <div className="w-full flex-1 flex flex-col">
                      <div className="grid grid-cols-7 mb-1 md:mb-2 border-b border-gray-200 pb-1 md:pb-2">
                          {WEEKDAYS.map((day, idx) => (
                          <div key={day} className={`text-center text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest ${idx >= 5 ? "text-[#1da1f2]" : "text-gray-400"}`}>
                              {day}
                          </div>
                          ))}
                      </div>

                      <div className="grid grid-cols-7 gap-[2px] flex-1 mt-1 md:mt-2">
                          {days.map((d, index) => {
                          const t = d.date.getTime();
                          const s = range.start?.getTime();
                          const e = range.end?.getTime();
                          
                          const isStart = s === t;
                          const isEnd = e === t;
                          const inRange = s && e && t > s && t < e;
                          const isSelectedOnly = isStart && !e; 
                          
                          const today = new Date();
                          const isToday = d.isCurrentMonth && d.date.getDate() === today.getDate() && d.date.getMonth() === today.getMonth() && d.date.getFullYear() === today.getFullYear();
                          const isWeekend = index % 7 === 5 || index % 7 === 6;
                          
                          let baseColor = d.isCurrentMonth ? (isWeekend ? "font-bold text-[#1da1f2]" : "font-bold text-gray-800") : "font-medium text-gray-300";
                          if (isToday && !isStart && !isEnd && !inRange) baseColor = "font-bold text-white";
                          if (isStart || isEnd) baseColor = "text-white font-bold";

                          let bgClass = "bg-transparent";
                          if (isToday && !isStart && !isEnd && !inRange) bgClass = "bg-rose-500 rounded-full shadow-md z-10 mx-[1px]";
                          else if (isStart && isEnd) bgClass = "bg-[#1da1f2] rounded-full shadow-md z-10 mx-[1px]";
                          else if (isSelectedOnly) bgClass = "bg-[#1da1f2] rounded-full shadow-md z-10 mx-[1px]";
                          else if (isStart) bgClass = "bg-[#1da1f2] rounded-l-full shadow-md z-10 md:pl-1";
                          else if (isEnd) bgClass = "bg-[#1da1f2] rounded-r-full shadow-md z-10 md:pr-1";
                          else if (inRange) bgClass = "bg-[#e1f0fa] -mx-[2px]";

                          const hasEvent = d.isCurrentMonth && (d.day % 12 === 0 || d.day === 15);

                          return (
                              <div key={index} onClick={() => handleDateClick(d.date)} className={`relative flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 py-[2px] ${bgClass}`}>
                                  <span className={`w-5 h-5 md:w-7 md:h-7 flex flex-col items-center justify-center text-[10px] md:text-xs z-10 ${inRange && !isStart && !isEnd ? "text-[#1da1f2] font-bold" : baseColor}`}>
                                      {d.day}
                                      {hasEvent && !isToday && !isStart && !isEnd && !inRange && (
                                          <div className="absolute bottom-[0px] w-1 h-1 md:w-1.5 md:h-1.5 bg-[#1da1f2] rounded-full"></div>
                                      )}
                                  </span>
                              </div>
                          );
                          })}
                      </div>
                    </div>

                    {/* Integrated Notes Area */}
                    {(() => {
                      const isDateSelectedInThisMonth = range.start && range.start.getFullYear() === currentYear && range.start.getMonth() === month;
                      const activeNoteKey = isDateSelectedInThisMonth 
                          ? `${currentYear}-${month}-${range.start.getDate()}` 
                          : monthKey;
                      
                      const noteLabel = isDateSelectedInThisMonth
                          ? `Notes: ${range.start.getDate()} ${monthName}`
                          : `${monthName} Notes`;
                        
                      return (
                        <MonthNotes
                          noteKey={activeNoteKey}
                          label={noteLabel}
                          onInteractionStart={() => setIsEditingNotes(true)}
                          onInteractionEnd={() => setIsEditingNotes(false)}
                        />
                      );
                    })()}
                  </div>
                </FlipPage>
              );
            })}
          </HTMLFlipBook>

        </div>
      </div>
      <div id="hero-scroll-down-text" className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 pointer-events-none opacity-0" />
    </section>
  );
};

