"use client";

import { Dispatch, SetStateAction } from "react";

interface ControlPanelProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isWriting: boolean;
  isPaused: boolean;
  onStartWrite: () => void;
  onPauseResume: () => void;
  onCancel: () => void;
  onEdit: () => void;
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
  zoomLevel: number;
  setZoomLevel: Dispatch<SetStateAction<number>>;
  speed: number;
  onToggleSpeed: () => void;
}

export default function ControlPanel({
  text,
  setText,
  isWriting,
  isPaused,
  onStartWrite,
  onPauseResume,
  onCancel,
  onEdit,
  font,
  setFont,
  zoomLevel,
  setZoomLevel,
  speed,
  onToggleSpeed,
}: ControlPanelProps) {
  
  const zoomPercent = Math.round((zoomLevel / 750) * 100);

  return (
    <div className={`glass-panel ${isWriting ? 'py-3 mb-2' : ''}`} style={isWriting ? { padding: '12px 24px', marginBottom: '12px' } : {}}>
      {!isWriting ? (
        <div className="input-section mb-4">
          <p className="input-header">Nội dung tập viết (Nhấn Enter để xuống dòng):</p>
          <textarea
            className="text-area"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập nội dung vào đây..."
          />
        </div>
      ) : null}

      <div className={`controls-grid ${isWriting ? 'compact-mode' : ''}`}>
        <div className="controls-group">
          {!isWriting ? (
            <button className="btn btn-primary" onClick={onStartWrite}>
              <span className="text-xl">✍️</span> Viết chữ
            </button>
          ) : (
            <>
              <button 
                className={`btn ${isPaused ? 'btn-success' : 'btn-warning'} text-white`} 
                onClick={onPauseResume}
                style={{ backgroundColor: isPaused ? 'var(--success)' : 'var(--warning)', minHeight: '36px', padding: '6px 12px', fontSize: '1rem' }}
              >
                {isPaused ? '▶ Tiếp tục' : '⏸ Tạm dừng'}
              </button>
              <button 
                className="btn btn-danger" 
                onClick={onCancel}
                style={{ minHeight: '36px', padding: '6px 12px', fontSize: '1rem' }}
              >
                ⏹ Hủy / Xóa
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={onEdit}
                style={{ minHeight: '36px', padding: '6px 12px', fontSize: '1rem' }}
              >
                ✎ Sửa nội dung
              </button>
              <button 
                className="btn btn-primary" 
                onClick={onToggleSpeed}
                style={{ minHeight: '36px', padding: '6px 12px', fontSize: '1rem' }}
              >
                {speed === 1 ? '⏩ Tua nhanh (2x)' : speed === 2 ? '⏩ Tua nhanh (3x)' : '▶ Tốc độ chuẩn (1x)'}
              </button>
            </>
          )}
        </div>

        {!isWriting && (
          <div className="controls-group">
            <select 
              className="select-input" 
              value={font} 
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="'HP001_4_Normal', sans-serif">HP001 4 ô ly (Nét thường)</option>
              <option value="'HP001_4_Bold', sans-serif">HP001 4 ô ly (Nét đậm)</option>
              <option value="'HP001_5_Normal', sans-serif">HP001 5 ô ly (Nét thường)</option>
              <option value="'HP001_5_Bold', sans-serif">HP001 5 ô ly (Nét đậm)</option>
              <option value="'HP001_4_Grid', sans-serif">HP001 4 ô ly (1 ô ly)</option>
              <option value="'HP001_4_Grid_2', sans-serif">HP001 4 ô ly (2 ô ly)</option>
              <option value="'HP001_5_Grid', sans-serif">HP001 5 ô ly (1 ô ly)</option>
            </select>

            <div className="zoom-control">
              <label>Zoom:</label>
              <input 
                type="range" 
                className="zoom-slider"
                min="375" 
                max="1500" 
                value={zoomLevel} 
                onChange={(e) => setZoomLevel(Number(e.target.value))} 
              />
              <span className="zoom-value">{zoomPercent}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
