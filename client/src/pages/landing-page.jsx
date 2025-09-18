import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea, Switch } from "@material-tailwind/react";
import { Carousel } from "primereact/carousel";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useAuth } from "@/components/auth/AuthContext"; // Adjust the import path as necessary

import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  LockClosedIcon,
  BoltIcon,
  Bars3Icon,
  XMarkIcon,
  EnvelopeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// 1. Refactor features into a data array
const featuresData = [
  {
    icon: ArrowUpTrayIcon,
    title: "Effortless Uploads",
    description:
      "Simply drag and drop your Excel files to instantly begin your analysis, no complex steps required.",
  },
  {
    icon: ChartBarIcon,
    title: "Instant Visualization",
    description:
      "Generate stunning, dynamic charts and dashboards the moment your data is uploaded.",
  },
  {
    icon: LockClosedIcon,
    title: "Secure & Private",
    description:
      "Your data is processed on-the-fly and is never stored, ensuring complete privacy and security.",
  },
  {
    icon: BoltIcon,
    title: "Blazing-Fast Insights",
    description:
      "Unlock key insights from even the largest datasets in a matter of seconds, not minutes.",
  },
];

const testimonials = [
  {
    name: "Shruti D.",
    feedback:
      "Excel Analytics made data storytelling so intuitive! I love how fast I can generate insights.",
    position: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Sumit D.",
    feedback:
      "Uploading Excel files is a breeze, and the visualizations are clean and interactive. Saved me hours!",
    position: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Pooja R.",
    feedback:
      "The dark mode and chart customizations are so smooth. It’s like the tool was made for analysts.",
    position: "Business Analyst",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Arjun M.",
    feedback:
      "What impressed me most is the accuracy in chart rendering and file parsing — flawless experience.",
    position: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Nisha T.",
    feedback:
      "The UI is minimal, elegant, and effective. Excel Analytics makes me enjoy data cleaning!",
    position: "Software Engineer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Karan V.",
    feedback:
      "From upload to analysis, everything just flows. Great for non-tech users too!",
    position: "Operations Lead",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];
const faqData = [
  {
    question: "Is my Excel data secure?",
    answer:
      "Your data privacy is our top priority. We never store your uploaded files. All data is processed in-memory on our servers and is completely erased once the analysis is complete.",
  },
  {
    question: "What file types are supported?",
    answer:
      "Our platform currently supports common Microsoft Excel and spreadsheet formats, including .xls, .xlsx, and .csv files.",
  },
  {
    question: "Can I download the analysis?",
    answer:
      "Yes. All visualizations, charts, and summary reports can be exported to various formats, including PNG, PDF, and CSV, for easy sharing and integration.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "We offer dedicated email support for all users. You can reach out to our team at any time for assistance or to provide feedback.",
  },
];
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-4">
    <button
      onClick={onClick}
      className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 dark:text-white transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
    >
      <span>{question}</span>
      <ChevronDownIcon
        className={`w-5 h-5 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-max-h duration-500 ease-in-out ${
        isOpen ? "max-h-96 mt-2" : "max-h-0"
      }`}
    >
      <p className="text-gray-600 dark:text-gray-400">{answer}</p>
    </div>
  </div>
);
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { isAuthenticated, userRole } = useAuth(); // Destructure the login function from useAuth\
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // State for the active FAQ item

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission failed:", error);
      // Display error message
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  function go_to_dashboard_or_login() {
    try {
      if (isAuthenticated == true) {
        if (userRole() === "admin") {
          navigate("/admin/home");
        } else if (userRole() === "user") {
          navigate("/dashboard/home");
        } else {
          navigate("/auth/sign-in");
        }
      } else {
        navigate("/auth/sign-in");
      }
    } catch (e) {
      console.error("Error navigating to dashboard or login:", e);
    }
  }
  return (
    <div className="text-gray-900 transition duration-500 bg-white dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Excel Analytics
          </h1>
          <nav className="items-center hidden gap-6 md:flex">
            <a href="#" className="font-medium hover:text-indigo-500">
              Home
            </a>
            <a href="#features" className="font-medium hover:text-indigo-500">
              Features
            </a>
            <a
              href="#testimonials"
              className="font-medium hover:text-indigo-500"
            >
              Testimonials
            </a>
            <a href="#contact" className="font-medium hover:text-indigo-500">
              Contact
            </a>
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                className="text-indigo-600 dark:text-indigo-400"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button color="indigo" size="sm">
                Register
              </Button>
            </Link>
            <Switch
              color="indigo"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </nav>
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="flex flex-col gap-4 px-4 pb-4 md:hidden">
            <a href="#" className="hover:text-indigo-500">
              Home
            </a>
            <a href="#features" className="hover:text-indigo-500">
              Features
            </a>
            <a href="#testimonials" className="hover:text-indigo-500">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-indigo-500">
              Contact
            </a>
            <Link to="/auth/sign-in">
              <Button
                variant="text"
                className="text-indigo-600 dark:text-indigo-400"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/auth/sign-up">
              <Button color="indigo" size="sm">
                Register
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span>🌞</span>
              <Switch
                color="indigo"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <span>🌙</span>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-between min-h-screen gap-2 px-6 py-24 shadow-md md:flex-row md:px-12 "
        style={{
          backgroundImage: `
      radial-gradient(circle, #e0e7ff 1px, transparent 1px),
      radial-gradient(circle, #e0e7ff 1px, transparent 1px)
    `,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      >
        {/* Text on the left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl dark:text-white">
            Transform Excel Data Into Insights
          </h1>
          <p className="max-w-xl mt-4 text-lg text-gray-600 dark:text-gray-300">
            Upload, Analyze, and Visualize Excel Files in Seconds.
          </p>
          <div className="flex justify-center gap-4 mt-6 md:justify-start">
            <Button size="lg" color="indigo" onClick={go_to_dashboard_or_login}>
              Get Started
            </Button>

            <Button size="lg" variant="outlined" color="indigo">
              See Demo
            </Button>
          </div>
        </motion.div>

        {/* Image on the right */}
        <motion.div
          className="flex-1 w-full max-w-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
        >
          <motion.img
            src="/img/charts.png"
            alt="Excel Analytics"
            className="w-full shadow-xl rounded-xl hover:shadow-2xl"
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
      <section
        id="features"
        className="px-6 py-24 bg-white dark:bg-gray-900" // A darker, more modern dark mode
      >
        <div className="container mx-auto">
          {/* 3. Enhanced Heading */}
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-5xl">
            Transform Your Data in Minutes
          </h2>
          <p className="max-w-xl mx-auto mb-16 text-xl text-center text-gray-600 dark:text-gray-400">
            Discover why thousands trust our platform for rapid, secure, and
            insightful Excel analytics.
          </p>

          {/* 4. Use the data array to render features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }} // Animate only once when in view
            className="grid grid-cols-1 gap-8 text-center md:grid-cols-2 lg:grid-cols-4" // Better grid responsiveness
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group p-8 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" // More polished card styling
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-600 transition-colors duration-300" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="px-6 py-24 bg-indigo-50 dark:bg-gray-900"
      >
        <h2 className="mb-12 text-3xl font-semibold text-center text-gray-900 dark:text-white">
          What Our Users Say
        </h2>

        <Carousel
          value={testimonials}
          itemTemplate={(item) => (
            <div className="max-w-md p-6 mx-auto text-center bg-white shadow dark:bg-gray-800 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 mx-auto mb-4 rounded-full"
              />
              <p className="italic text-gray-700 dark:text-gray-300">
                “{item.feedback}”
              </p>
              <h4 className="mt-4 font-semibold text-gray-900 dark:text-white">
                - {item.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item.position}
              </span>
            </div>
          )}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={2000}
          showIndicators={true}
          showNavigators={false} // optional: hide arrows for clean auto-slide
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-2xl bg-white dark:bg-gray-800 overflow-hidden"
          >
            {/* Gradient Header Strip */}
            <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600" />

            <div className="p-10">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="mt-2 mb-10 text-center text-gray-600 dark:text-gray-400">
                We’d love to hear from you. Drop us a message or subscribe to
                updates.
              </p>

              <form onSubmit={handleSubmit} className="grid gap-6">
                <Input
                  name="name"
                  label="Your Name"
                  color="indigo"
                  className="rounded-xl shadow-sm focus:shadow-md"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  name="email"
                  label="Email Address"
                  type="email"
                  color="indigo"
                  className="rounded-xl shadow-sm focus:shadow-md"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Textarea
                  name="message"
                  label="Message / Suggestion"
                  color="indigo"
                  rows={4}
                  className="rounded-xl shadow-sm focus:shadow-md"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {isSubmitted && (
                  <p className="text-center text-green-500 font-medium mt-2">
                    ✅ Thank you for your message!
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-20 my-14 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="p-10 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {faqData.map((faq, index) => (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        activeIndex === index
                          ? "rotate-180 text-indigo-600"
                          : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeIndex === index ? "max-h-40 mt-3" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <div className="bg-gray-100 dark:bg-gray-900">
        <footer className="bg-gradient-to-r from-indigo-700 via-purple-800 to-indigo-900 text-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto py-16 px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold text-white">
                  Excel Analytics Dashboard
                </h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Analyze your Excel files with ease. Upload, visualize, and
                  generate insights instantly with secure processing.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-md font-semibold text-white mb-3">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Upload
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="hover:text-purple-300 transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-purple-300 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-md font-semibold text-white mb-3">
                  Connect
                </h4>
                <div className="flex space-x-6">
                  <a
                    href="https://github.com/"
                    className="hover:text-purple-300 text-xl"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    className="hover:text-purple-300 text-xl"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://twitter.com/"
                    className="hover:text-purple-300 text-xl"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="mailto:your@email.com"
                    className="hover:text-purple-300 text-xl"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-purple-600 pt-4 text-center text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} Excel Analytics Dashboard | Made
                with <span className="text-red-400">♥</span> by Shruti
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
