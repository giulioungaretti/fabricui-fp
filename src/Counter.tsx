import { fold, isNone } from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { useEffect, useState } from "react";
import { Text } from "./Components";
import { decrement, fetchInitialCounter, increment } from "./CounterSlice";
import ErrorBar from "./ErrorBar";
import { useAppDispatch, useAppSelector } from "./hook";

export const CounterPage = () => {
  const dispatch = useAppDispatch();
  const { n, error } = useAppSelector((state) => state.counter);

  const [localIncrement, setLocalIncrement] = useState(0);

  useEffect(() => {
    dispatch(fetchInitialCounter());
  }, [dispatch]);
  const isLoading = isNone(n);
  let body = pipe(
    n,
    fold(
      () => <Text>loading</Text>,
      (counter) => (
        <>
          <Text>{`count is: ${counter}`}</Text>
        </>
      )
    )
  );
  return (
    <>
      {pipe(
        error,
        fold(
          () => (
            <>
              <div>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    dispatch(increment({ n: localIncrement }));
                  }}
                >
                  {" "}
                  +{" "}
                </button>
                {body}
                <button
                  disabled={isLoading}
                  onClick={() => {
                    dispatch(decrement({ n: localIncrement }));
                  }}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setLocalIncrement(localIncrement + 1);
                  }}
                >
                  {" "}
                  +1{" "}
                </button>
                <Text>{`increment is: ${localIncrement}`}</Text>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setLocalIncrement(localIncrement - 1);
                  }}
                >
                  -1
                </button>
                /
              </div>
            </>
          ),
          (error) => <ErrorBar error={error} />
        )
      )}
    </>
  );
};
