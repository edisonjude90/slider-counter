import { useEffect, useState } from "react";
import Slider from "@material-ui/core/Slider";
import "./styles.css";

function useLocalStorageState(key, value) {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key) || value);
  });

  useEffect(() => {
    window.localStorage.setItem(key, state);

    return () => {
      window.localStorage.removeItem(key);
    };
  }, [key, state]);

  return [state, setState];
}

const CreateCounter = ({ counterName, initValue }) => {
  const [count, setCount] = useLocalStorageState(counterName, initValue);

  const incrementCount = () => {
    setCount((count) => {
      return count + 1;
    });
  };

  return <button onClick={incrementCount}>{count}</button>;
};

export default function App() {
  const [sliderValue, setSliderValue] = useState(0);
  const [counters, setCounters] = useState([]);

  const handleSliderChange = (event, newSlideValue) => {
    setSliderValue(newSlideValue);

    const sliderCounters = [];

    for (let i = 0; i < newSlideValue; i++) {
      sliderCounters.push({
        counterName: `count${i}`,
        initValue: 0
      });
    }

    setCounters(sliderCounters);
  };

  const sliderValueLabelFormat = (value) => {
    return `${value}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Slider
        value={sliderValue}
        min={0}
        max={10}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        valueLabelDisplay="auto"
        valueLabelFormat={sliderValueLabelFormat}
      />

      {counters.map((counter, index) => {
        return (
          <CreateCounter
            key={`counter${index}`}
            counterName={counter.counterName}
            initValue={counter.initValue}
          />
        );
      })}
    </div>
  );
}
