// import { useState } from "react";

import { useState } from "react";

// const Display = ({counter}) => {
//   return <div>{counter}</div>;
// };

// const Button = ({onClick, text}) => {
//   return <button onClick={onClick}>{text}</button>;
// };

// const App = () => {
//   const [counter, setCounter] = useState(0);
//   console.log("rendering with counter value", counter);

//   const increaseByOne = () => {
//     console.log("increasing, value before", counter);
//     setCounter(counter + 1);
//   };

//   const decreaseByOne = () => {
//     console.log("decreasing, value before", counter);
//     setCounter(counter - 1);
//   };
//   const setToZero = () => {
//     console.log("resetting to zero, value before", counter);
//     setCounter(0);
//   };

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="Plus" />
//       <Button onClick={setToZero} text="Zero" />
//       <Button onClick={decreaseByOne} text="Minus" />
//     </div>
//   );
// };

// export default App;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  return (
    <div>
      {left}

      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
