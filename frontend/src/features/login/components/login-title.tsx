export default function LoginTitle() {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-4xl dark:text-zinc-100">
        Track Your{" "}
        <span className="block text-red-600 dark:text-red-500">
          Pizza Journey
        </span>
      </h2>
      <p className="text-lg text-gray-500 sm:text-xl dark:text-zinc-500">
        Discover and track authentic Neapolitan pizzerias certified by AVPN
        (Associazione Verace Pizza Napoletana) around the world.
      </p>
    </div>
  );
}
