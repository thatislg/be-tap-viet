"use client";

import { useState } from "react";
import ControlPanel from "@/components/ControlPanel";
import ProgressBar from "@/components/ProgressBar";
import WritingCanvas from "@/components/WritingCanvas";

export default function Home() {
  const [text, setText] = useState(
    "Bảo học giỏi chăm ngoan.\nMỗi ngày cắp sách tới trường cùng các bạn."
  );
  
  // Trạng thái điều khiển
  const [isWriting, setIsWriting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Settings
  const [font, setFont] = useState("'HP001_4_Normal', sans-serif");
  const [zoomLevel, setZoomLevel] = useState(750); // Mặc định 750 (100%)
  const [speed, setSpeed] = useState(1);

  // Actions
  const handleStartWrite = () => {
    setIsWriting(true);
    setIsPaused(false);
    setProgress(0);
    setSpeed(1); // Reset speed when starting new
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleCancel = () => {
    setIsWriting(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handleEdit = () => {
    setIsWriting(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handleToggleSpeed = () => {
    setSpeed(s => s === 1 ? 2 : s === 2 ? 3 : 1);
  };

  const handleProgressUpdate = (newProgress: number) => {
    setProgress(newProgress);
  };

  const handleComplete = () => {
    // Khi hoàn thành, nút tạm dừng sẽ mất, nút hủy -> làm mới (sẽ được xử lý bởi logic isWriting nếu cần)
    // Thực tế ControlPanel đã bao quát nút rồi.
  };

  return (
    <>
      <ControlPanel
        text={text}
        setText={setText}
        isWriting={isWriting}
        isPaused={isPaused}
        onStartWrite={handleStartWrite}
        onPauseResume={handlePauseResume}
        onCancel={handleCancel}
        onEdit={handleEdit}
        font={font}
        setFont={setFont}
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        speed={speed}
        onToggleSpeed={handleToggleSpeed}
      />

      {isWriting && (
        <ProgressBar progress={progress} />
      )}

      {isWriting && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', width: '100%', flexGrow: 1, minHeight: 0 }}>
          <WritingCanvas
            text={text}
            font={font}
            zoomLevel={zoomLevel}
            isWriting={isWriting}
            isPaused={isPaused}
            speed={speed}
            onProgressUpdate={handleProgressUpdate}
            onComplete={handleComplete}
          />
        </div>
      )}
    </>
  );
}
