import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [positions, setPositions] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray(): void {
    if (isSorting) return;
    let arr: number[] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(arr);
    setPositions(arr.map((_, i) => i));
    setElapsedTime(0);
    stopTimer(); // Parar o timer caso tenha sido iniciado antes
  }

  function startTimer(): void {
    setElapsedTime(0);
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
    setTimer(interval);
  }

  function stopTimer(): void {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  }

  async function bubbleSort(): Promise<void> {
    if (isSorting) return;
    setIsSorting(true);
    startTimer();

    let arr = [...array];
    let pos = [...positions];
    let len = arr.length;
    let swapped;

    for (let i = 0; i < len; i++) {
      swapped = false;
      for (let j = 0; j < len - i - 1; j++) {
        setActiveIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          await new Promise((resolve) => setTimeout(resolve, 200));

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          [pos[j], pos[j + 1]] = [pos[j + 1], pos[j]];

          setArray([...arr]);
          setPositions([...pos]);
          swapped = true;
          
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
      if (!swapped) break;
    }

    stopTimer(); // Parar o timer quando terminar
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

      <div className="array-container">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            animate={{
              x: positions[idx] * 60,
              y: activeIndices.includes(idx) ? [0, 20, 0] : 0,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 10 }}
            className={`array-block ${activeIndices.includes(idx) ? "active" : ""}`}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;