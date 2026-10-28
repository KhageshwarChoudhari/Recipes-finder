import { useState } from "react";


export default function useLoading() {
  const [loading, setloading] = useState(true);

  const startLoading = () => setloading(true);
  const stopLoading = () => setloading(false);

  return (loading, startLoading, stopLoading);
}
