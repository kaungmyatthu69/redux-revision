import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  increment,
  decrement,
  incrementByAmount,
  adultUserLength,
} from "@/store/conterSlice";
function CounterPage() {
  const counter = useAppSelector((state) => state.counter.value);
  const adults = useAppSelector(adultUserLength);

  const dispatch = useAppDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleIncrementByAmount = (amount: number) => {
    return () => {
      dispatch(incrementByAmount(amount));
    };
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{counter}</div>
      <div className="flex  gap-2">
        <Button onClick={handleIncrement}>Increment</Button>
        <Button onClick={handleDecrement}>Decrement</Button>
        <Button onClick={handleIncrementByAmount(5)}>
          Increment by amount
        </Button>
      </div>
    </div>
  );
}

export default CounterPage;
