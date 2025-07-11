import { useState } from "react";
import { toast } from "sonner";

type AsyncFn<Args extends any[], Return> = (...args: Args) => Promise<Return>;

function useFetch<Args extends any[], Return>(cb: AsyncFn<Args, Return>) {
  const [data, setData] = useState<Return | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: Args): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
    } catch (error: any) {
      setError(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
