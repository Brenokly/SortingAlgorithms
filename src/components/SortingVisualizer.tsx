import { useState, useEffect } from "react";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [isVisualizerMode, setIsVisualizerMode] = useState(true);

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray(): void {
    if (isSorting) return;
    let arr: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(arr);
    setElapsedTime(0);
    setActiveIndices([]);
    stopTimer();
  }

  function startTimer(): void {
    setElapsedTime(0);
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(interval);
  }

  function stopTimer(): void {
    setTimer((prevTimer) => {
      if (prevTimer !== null) {
        clearInterval(prevTimer);
        return null;
      }
      return prevTimer;
    });
  }

  async function bubbleSort(): Promise<void> {
    if (isSorting) return;
    setIsSorting(true);
    startTimer();

    let arr = [...array];
    let len = arr.length;
    let swapped;

    for (let i = 0; i < len; i++) {
      swapped = false;
      for (let j = 0; j < len - i - 1; j++) {
        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;

          const delay = isVisualizerMode ? 600 : 100; // Aumenta a lentidão no modo visualizer
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
      if (!swapped) break;
    }

    stopTimer();
    setIsSorting(false);
    setActiveIndices([]);
  }

  return (
    <div className="sorting-container">
      <h2>Bubble Sort</h2>
      <div className="timer">Tempo: {elapsedTime}s</div>

      <button onClick={resetArray} disabled={isSorting} className="btn">
        Gerar Novo Array
      </button>
      <button onClick={bubbleSort} disabled={isSorting} className="btn">
        Ordenar
      </button>

      <button
        onClick={() => setIsVisualizerMode(!isVisualizerMode)}
        className="btn"
      >
        {isVisualizerMode ? "Desativar Modo Visualizer" : "Ativar Modo Visualizer"}
      </button>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`array-block ${activeIndices.includes(idx) ? "active" : ""}`}
            style={{ left: `${idx * 60}px` }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;