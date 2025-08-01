import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea, Switch } from "@material-tailwind/react";
import { Carousel } from "primereact/carousel";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  LockClosedIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const testimonials = [
  {
    name: "Shruti D.",
    feedback: "Excel Analytics helped me visualize data instantly!",
    position: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Sumit D.",
    feedback: "The upload process is seamless and lightning-fast.",
    position: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Pooja R.",
    feedback: "Dark mode and interactive charts are a game changer!",
    position: "Business Analyst",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-500">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Excel Analytics</h1>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#" className="hover:text-indigo-500 font-medium">Home</a>
            <a href="#features" className="hover:text-indigo-500 font-medium">Features</a>
            <a href="#testimonials" className="hover:text-indigo-500 font-medium">Testimonials</a>
            <a href="#contact" className="hover:text-indigo-500 font-medium">Contact</a>
            <Link to="/auth/sign-in">
              <Button variant="text" className="text-indigo-600 dark:text-indigo-400">Sign In</Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button color="indigo" size="sm">Register</Button>
            </Link>
            <Switch color="indigo" checked={darkMode} onChange={toggleDarkMode} />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
            <a href="#" className="hover:text-indigo-500">Home</a>
            <a href="#features" className="hover:text-indigo-500">Features</a>
            <a href="#testimonials" className="hover:text-indigo-500">Testimonials</a>
            <a href="#contact" className="hover:text-indigo-500">Contact</a>
            <Link to="/auth/sign-in">
              <Button variant="text" className="text-indigo-600 dark:text-indigo-400">Sign In</Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button color="indigo" size="sm">Register</Button>
            </Link>
            <div className="flex items-center gap-2">
              <span>🌞</span>
              <Switch color="indigo" checked={darkMode} onChange={toggleDarkMode} />
              <span>🌙</span>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen py-24 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-2 shadow-md "
        style={{
          backgroundImage: `
      radial-gradient(circle, #e0e7ff 1px, transparent 1px),
      radial-gradient(circle, #e0e7ff 1px, transparent 1px)
    `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      >
        {/* Text on the left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Transform Excel Data Into Insights
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
            Upload, Analyze, and Visualize Excel Files in Seconds.
          </p>
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <Link to="/auth/sign-in">
              <Button size="lg" color="indigo">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outlined" color="indigo">
              See Demo
            </Button>
          </div>
        </motion.div>

        {/* Image on the right */}
        <motion.div
          className="flex-1 max-w-lg w-full"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src="/img/charts.png"
            alt="Excel Analytics"
            className="w-full rounded-xl shadow-xl hover:shadow-2xl"
            whileHover={{
              rotate: [0, 2, -2, 0],
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.97 }}
            drag
            dragElastic={0.18}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
        </motion.div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-gray-800 shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
          Why Excel Analytics?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-2xl"
          >
            <ArrowUpTrayIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">Quick Uploads</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Instantly drag and drop Excel files into the dashboard.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-2xl"
          >
            <ChartBarIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">Real-time Charts</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Generate dynamic charts immediately after upload.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-2xl"
          >
            <LockClosedIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">Data Privacy</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Your data remains secure and is never stored.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-2xl"
          >
            <BoltIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">Fast Analysis</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Get insights from large Excel datasets in seconds.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-indigo-50 dark:bg-gray-900">
        <h2 className="text-3xl font-semibold text-center mb-12">What Our Users Say</h2>
        <Carousel
          value={testimonials}
          itemTemplate={(item) => (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-md mx-auto text-center">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <p className="italic">“{item.feedback}”</p>
              <h4 className="mt-4 font-semibold">- {item.name}</h4>
              <span className="text-sm text-gray-500">{item.position}</span>
            </div>
          )}
          numVisible={1}
          circular
          autoplayInterval={4000}
        />
      </section>

      {/* Contact Form / Newsletter */}
      <section id="contact" className="py-24 px-6 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center mb-10">Stay Updated</h2>
        <form className="max-w-xl mx-auto grid gap-6">
          <Input size="lg" label="Your Name" color="indigo" className="bg-white dark:bg-gray-900" />
          <Input size="lg" label="Email Address" color="indigo" className="bg-white dark:bg-gray-900" />
          <Textarea label="Message / Suggestion" color="indigo" className="bg-white dark:bg-gray-900" rows={4} />
          <Button color="indigo" size="lg">Send</Button>
        </form>
      </section>

      {/* FAQ Section */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-24 px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h4 className="font-bold">Is my Excel data secure?</h4>
            <p>Yes. We never store your files and all processing is done securely.</p>
          </div>
          <div>
            <h4 className="font-bold">What file types are supported?</h4>
            <p>Currently we support .xls, .xlsx, and .csv files.</p>
          </div>
          <div>
            <h4 className="font-bold">Can I download the analysis?</h4>
            <p>Yes. Visualizations and summaries can be exported easily.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
