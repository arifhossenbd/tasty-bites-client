import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "../../hooks/useTheme";

const interests = [
  "JavaScript",
  "React",
  "Node.js",
  "UI/UX",
  "Photography",
  "Travel",
  "Design",
  "Animation",
];

const statList = [
  { label: "Projects", value: 42 },
  { label: "Followers", value: "4.2k" },
  { label: "Following", value: 128 },
];

const contactInfo = [
  { icon: <FaEnvelope />, text: "arifprodev@gmail.com" },
  { icon: <FaMapMarkerAlt />, text: "Bangladesh" },
];

const socialLinks = [
  {
    icon: <FaFacebookF />,
    url: "https://www.facebook.com/iarifhussain",
    color: "text-blue-500 hover:text-blue-600",
  },
  {
    icon: <FaLinkedinIn />,
    url: "https://www.linkedin.com/in/arifhossenbd",
    color: "text-blue-700 hover:text-blue-800",
  },
  {
    icon: <FaGithub />,
    url: "https://www.github.com/arifhossenbd",
    color:
      "text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white",
  },
  {
    icon: <FaXTwitter />,
    url: "https://x.com/arifhossengd",
    color:
      "text-gray-800 hover:text-black dark:text-gray-300 dark:hover:text-white",
  },
];

export default function Profile() {
  const { currentTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={currentTheme.bgColor}>
      <motion.div
        className={`min-h-screen transition-colors duration-300 pt-16 py-24`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div
          className="relative h-[320px] sm:h-[280px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/tasty-bites-images/banner/banner2.jpg')",
            backgroundPosition: "center 30%",
          }}
        >
          <div
            className={`absolute inset-0 bg-black/40 flex justify-center items-end pb-6`}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <motion.img
                src="/arifprodev.jpg"
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <h1
                className={`text-white text-2xl font-bold mt-4 ${currentTheme.textColor}`}
              >
                Arif Hossen
              </h1>
              <p className={`text-white/90 text-sm ${currentTheme.textColor}`}>
                Frontend Developer 👩‍💻
              </p>
            </motion.div>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 my-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statList.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                variants={itemVariants}
              >
                <h2 className={`text-3xl font-bold ${currentTheme.textColor}`}>
                  {stat.value}
                </h2>
                <p className={`text-sm ${currentTheme.textColor} opacity-80`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            className={`max-w-2xl mx-auto mb-6 ${currentTheme.textColor} opacity-90`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            🚀 Passionate frontend developer dedicated to crafting seamless and
            engaging user experiences. Proficient in building responsive, fast,
            and interactive web interfaces using React, Tailwind CSS, and modern
            animation libraries like Framer Motion. Obsessed with clean code,
            creative design, and continuous learning. Always excited to
            collaborate and turn ideas into beautiful digital products! 💡✨
          </motion.p>

          {/* Contact */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 text-sm mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((item, i) => (
              <motion.span
                key={i}
                className={`flex items-center gap-2 justify-center ${currentTheme.textColor} opacity-80`}
                whileHover={{ scale: 1.05 }}
              >
                <span className={currentTheme.textColor}>{item.icon}</span>{" "}
                {item.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Interests */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-xl font-semibold mb-6 ${currentTheme.textColor}`}
            >
              💡 Interests & Skills
            </h3>
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
              }}
            >
              {interests.map((item, idx) => (
                <SwiperSlide key={idx} className="rounded-full my-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 px-4 rounded-full cursor-pointer ${currentTheme.inactiveBtn} w-full`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="mt-14 flex justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                className={`btn btn-circle btn-outline text-xl ${currentTheme.borderColor}} hover:border-transparent`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.6 }}
                viewport={{ once: true }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
