import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset, incrementByAmount } from "../features/counter/counterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count); //todo 1.state 2.name of reducer in store 3. name of state attribute(key)
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  }

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button> 
        <button onClick={() => dispatch(decrement())}>-</button> 
      </div>
      <input type="number" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} className='input-field'/>
      <br />
      <button onClick={() => dispatch(incrementByAmount(addValue))}>Increment by {addValue}</button>
      <br />
      <button onClick={resetAll}>Reset All</button>
    </section>
  );
};

export default Counter;
