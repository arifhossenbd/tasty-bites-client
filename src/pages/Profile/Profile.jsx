import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const interests = [
  "JavaScript",
  "React",
  "Node.js",
  "UI/UX",
  "Photography",
  "Travel",
  "Design",
];

const statList = [
  { label: "Posts", value: 128 },
  { label: "Followers", value: "4.2k" },
  { label: "Following", value: 321 },
];

const contactInfo = [
  { icon: <FaEnvelope />, text: "arifprodev@gmail.com" },
  { icon: <FaMapMarkerAlt />, text: "Bangladesh" },
];

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://www.facebook.com/iarifhussain", color: "text-blue-500" },
  { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/arifhossenbd", color: "text-blue-700" },
  { icon: <FaGithub />, url: "https://www.github.com/arifhossenbd", color: "text-black" },
  { icon: <FaXTwitter />, url: "https://x.com/arifhossengd", color: "text-black" },
];

export default function Profile() {
  return (
    <motion.div
      className="min-h-screen bg-base-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="relative h-[320px] sm:h-[280px] bg-cover bg-center" style={{ backgroundImage: "url('../../../public/tasty-bites-images/banner/banner2.jpg')" }}>
        <div className="absolute inset-0 bg-black/40 flex justify-center items-end pb-6">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img src="/arifprodev.jpg" alt="Profile" className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover" />
            <h1 className="text-white text-2xl font-bold mt-4">Arif Hossen</h1>
            <p className="text-white text-sm">Frontend Developer 👩‍💻</p>
          </motion.div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 my-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {statList.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
         🚀 Passionate frontend developer dedicated to crafting seamless and engaging user experiences. Proficient in building responsive, fast, and interactive web interfaces using React, Tailwind CSS, and modern animation libraries like Framer Motion. Obsessed with clean code, creative design, and continuous learning. Always excited to collaborate and turn ideas into beautiful digital products! 💡✨
        </motion.p>

        {/* Contact */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {contactInfo.map((item, i) => (
            <span key={i} className="flex items-center gap-2 justify-center">
              {item.icon} {item.text}
            </span>
          ))}
        </motion.div>

        {/* Interests */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">💡 Interests & Skills</h3>
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {interests.map((item, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="py-2 cursor-pointer"
                >
                  {item}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Socials */}
        <motion.div
          className="mt-10 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className={`btn btn-circle btn-outline text-xl ${link.color}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}