import { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";

function SortingVisualizer(): JSX.Element {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray(): void {
    let arr: number[] = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(arr);
  }

  function bubbleSort(): void {
    let arr: number[] = [...array];
    let len: number = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Troca
        }
      }
    }
    setArray(arr);
  }

  return (
    <div>
      <button onClick={resetArray}>Gerar Novo Array</button>
      <button onClick={bubbleSort}>Ordenar</button>

      <div style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            animate={{ height: value * 3 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "20px",
              backgroundColor: "blue",
              color: "white",
              textAlign: "center",
            }}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;