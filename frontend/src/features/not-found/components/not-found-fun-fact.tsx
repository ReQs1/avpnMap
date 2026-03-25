import { useState } from "react";
import { pizzaFunFacts } from "../constants";

function NotFoundFunFact() {
  const [funFact] = useState(
    () => pizzaFunFacts[Math.floor(Math.random() * pizzaFunFacts.length)],
  );

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-6 text-center shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="font font-semibold text-gray-900 dark:text-zinc-100">
        🍕 Did You Know?
      </p>
      <p className="text-sm text-gray-600 dark:text-zinc-500">{funFact}</p>
    </div>
  );
}

export default NotFoundFunFact;
