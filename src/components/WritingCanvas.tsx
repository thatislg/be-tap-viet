"use client";

import { useEffect, useState, useRef } from "react";

// Types
interface CharAnimationInfo {
  char: string;
  delayStart: number;
  duration: number;
}

interface LineInfo {
  chars: CharAnimationInfo[];
  y: number;
}

interface WritingCanvasProps {
  text: string;
  font: string;
  zoomLevel: number;
  isWriting: boolean;
  isPaused: boolean;
  speed: number;
  onProgressUpdate: (progress: number) => void;
  onComplete: () => void;
}

export default function WritingCanvas({
  text,
  font,
  zoomLevel,
  isWriting,
  isPaused,
  speed,
  onProgressUpdate,
  onComplete
}: WritingCanvasProps) {
  const [lines, setLines] = useState<LineInfo[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const speedRef = useRef(1);
  
  // Ref để chứa state cho progress loop
  const progressState = useRef({
    totalDuration: 0,
    elapsedTime: 0,
    isRunning: false,
    timer: null as NodeJS.Timeout | null,
    lastTick: 0
  });

  // Effect tính toán các dòng chữ khi ấn Viết
  useEffect(() => {
    if (!isWriting) {
      setLines([]);
      if (progressState.current.timer) clearInterval(progressState.current.timer);
      onProgressUpdate(0);
      return;
    }

    // Xóa tính toán cũ
    if (progressState.current.timer) clearInterval(progressState.current.timer);
    progressState.current.elapsedTime = 0;
    progressState.current.isRunning = false;
    onProgressUpdate(0);

    // Tính toán chia dòng
    if (!svgRef.current) return;
    
    // Tạm dùng đối tượng measure bên ngoài SVG (hoặc append 1 thẻ tạm)
    const ns = "http://www.w3.org/2000/svg";
    const tempText = document.createElementNS(ns, "text");
    tempText.setAttribute("class", "chu-tap-viet");
    tempText.style.fontFamily = font;
    svgRef.current.appendChild(tempText);

    const paragraphs = text.split('\n');
    const newLinesStr: string[] = [];
    const maxLineWidth = 710;

    for (let p = 0; p < paragraphs.length; p++) {
      const words = paragraphs[p].split(' ');
      let currentLine = "";
      
      for (let i = 0; i < words.length; i++) {
        if (words[i] === "") continue;
        let testLine = currentLine.length === 0 ? words[i] : currentLine + ' ' + words[i];
        tempText.textContent = testLine;
        
        let lineWidth = tempText.getComputedTextLength();
        if (lineWidth > maxLineWidth && currentLine.length > 0) {
          newLinesStr.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine.length > 0) newLinesStr.push(currentLine);
    }
    
    tempText.remove();

    // Map string lines to animation info
    let currentGlobalTime = 0;
    const timePerChar = 0.8;
    const finalLinesData: LineInfo[] = [];

    newLinesStr.forEach((lineStr, lIndex) => {
      const charsInfo: CharAnimationInfo[] = [];
      const currentY = 40 + (lIndex * 40);

      for (let i = 0; i < lineStr.length; i++) {
        const char = lineStr[i];
        if (char !== ' ') {
          charsInfo.push({
            char,
            delayStart: currentGlobalTime,
            duration: timePerChar
          });
          currentGlobalTime += timePerChar;
        } else {
          charsInfo.push({
            char,
            delayStart: currentGlobalTime,
            duration: 0
          });
          currentGlobalTime += (timePerChar * 0.4);
        }
      }
      finalLinesData.push({ chars: charsInfo, y: currentY });
    });

    setLines(finalLinesData);

    // Bắt đầu cắm Timer cho thanh tiến trình
    // Tổng = Tg tới chữ cuối + tg vẽ nét + tg tô màu (0.2)
    const totalTimeRequired = currentGlobalTime > 0 ? currentGlobalTime + timePerChar + 0.2 : 0;
    
    progressState.current.totalDuration = totalTimeRequired;
    progressState.current.elapsedTime = 0;
    progressState.current.lastTick = performance.now();
    progressState.current.isRunning = true;
    
    if (totalTimeRequired > 0) {
      progressState.current.timer = setInterval(() => {
        const curState = progressState.current;
        if (!curState.isRunning) {
          curState.lastTick = performance.now(); // reset tick để không bị ngắt quãng nhảy vọt
          return; // pause
        }
        
        const now = performance.now();
        const diffInSeconds = ((now - curState.lastTick) / 1000) * speedRef.current;
        curState.lastTick = now;
        
        curState.elapsedTime += diffInSeconds;
        
        let percentage = (curState.elapsedTime / curState.totalDuration) * 100;
        if (percentage >= 100) {
          percentage = 100;
          if (curState.timer) clearInterval(curState.timer);
          onComplete(); // Báo hoàn thành
        }
        
        onProgressUpdate(percentage);
      }, 50);
    } else {
       onComplete();
       onProgressUpdate(100);
    }

    return () => {
      if (progressState.current.timer) clearInterval(progressState.current.timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWriting, text, font]); // Không đưa onProgressUpdate/onComplete vào để tránh re-trigger

  // Xử lý PAUSE/RESUME cho tiến trình timer
  useEffect(() => {
    if (progressState.current.isRunning !== !isPaused) {
      progressState.current.isRunning = !isPaused;
      progressState.current.lastTick = performance.now(); 
    }
  }, [isPaused]);

  // Xử lý cập nhật Tốc độ (Speed) mà không re-render SVG
  useEffect(() => {
    speedRef.current = speed;
    if (svgRef.current) {
      try {
        // Sử dụng Web Animations API để tăng tốc/chậm lại các animation đang chạy
        const animations = svgRef.current.getAnimations({ subtree: true });
        animations.forEach(anim => {
          anim.playbackRate = speed;
        });
      } catch (err) {
        console.warn("Trình duyệt không hỗ trợ getAnimations", err);
      }
    }
  }, [speed]);

  return (
    <div className="canvas-wrapper">
      <svg 
        className="vo-o-ly" 
        id="trangVo" 
        style={{ width: zoomLevel, fontFamily: font }}
        viewBox="0 0 750 1000" 
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
      >
        <defs>
          <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#b3e0ff" strokeWidth="0.3"/>
          </pattern>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="url(#smallGrid)"/>
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00bfff" strokeWidth="0.8"/>
          </pattern>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />

        <text 
          className={`chu-tap-viet ${isPaused ? "paused" : ""}`} 
          id="svgText"
        >
          {lines.map((lInfo, lineIdx) => (
            <tspan key={`line-${lineIdx}`} x="20" y={lInfo.y}>
              {lInfo.chars.map((cInfo, charIdx) => {
                if (cInfo.char === ' ') return <tspan key={`c-${lineIdx}-${charIdx}`}>{" "}</tspan>;
                
                // Thuộc tính CSS tạo animation
                const animStyle = {
                  animationName: "ve-net, to-mau",
                  animationDuration: `${cInfo.duration}s, 0.2s`,
                  animationTimingFunction: "linear, ease",
                  animationDelay: `${cInfo.delayStart}s, ${cInfo.delayStart + cInfo.duration}s`,
                  animationFillMode: "forwards, forwards"
                };

                return (
                  <tspan 
                    key={`c-${lineIdx}-${charIdx}`} 
                    className="ky-tu"
                    style={animStyle}
                  >
                    {cInfo.char}
                  </tspan>
                );
              })}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
