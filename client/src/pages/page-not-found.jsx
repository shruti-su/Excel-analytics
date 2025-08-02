import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-12 text-center">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-bold text-indigo-600  mb-4"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold  text-gray-800 dark:text-white"
      >
        Page Not Found
      </motion.h2>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-all"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Go Back Home
      </Link>
    </section>
  );
}
