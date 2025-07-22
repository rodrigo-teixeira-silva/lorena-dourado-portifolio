"use client";

import { Phone, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    {
      icon: <Phone className="w-6 h-6 text-black" />, 
      text: "(92) 9 8145-2595",
      href: "https://wa.me/559281452595"
    },
    {
      icon: <Instagram className="w-6 h-6 text-black" />, 
      text: "@lorena_dourado_estetica",
      href: "https://www.instagram.com/lorenadourado_esteta?igsh=dXpkd3ViMmprdG9t"
    },
    {
      icon: <Mail className="w-6 h-6 text-black" />, 
      text: "lorena@example.com",
      href: "mailto:lorena@example.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="contact"
      className="relative w-full min-h-screen bg-[#d8c36d] flex items-center justify-center px-4 sm:px-6 py-16"
    >
      <motion.div 
        className="flex flex-col items-center justify-center text-center gap-8 max-w-[800px] z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 font-inter"
          variants={itemVariants}
        >
          Onde me contactar
        </motion.h1>

        <motion.h2 
          className="text-lg text-gray-700 font-inter leading-relaxed max-w-[600px]"
          variants={itemVariants}
        >
          Entre em contato para agendar seu horário ou tirar dúvidas. Estou à disposição para te atender!
        </motion.h2>

        <motion.div 
          className="flex flex-col gap-6 w-full max-w-md"
          variants={itemVariants}
        >
          {contacts.map((contact, index) => (
            <motion.div 
              key={index}
              className="flex flex-col gap-2 items-center"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
              <p className="text-gray-900 font-semibold text-xl">
                {index === 0 ? "WhatsApp" : index === 1 ? "Rede Social" : "E-mail"}
              </p>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-4xl shadow-sm hover:shadow-md transition-all duration-300 w-full justify-center"
              >
                {contact.icon}
                <span className="text-gray-800 font-medium">{contact.text}</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full bg-[#f0e9d8] opacity-70"></div>
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-[#f0e9d8] opacity-50"></div>
    </section>
  );
}