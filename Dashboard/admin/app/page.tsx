"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-full py-2 px-6 flex items-center justify-between bg-[#faf7f2] shadow-sm border-t border-gray-200">
        <div className="flex items-center">
          <Image
            src="/images/national_emblem.svg"
            alt="Government of India Emblem"
            width={50}
            height={50}
            className="object-contain"
          />
          <Link href="/">
            <Image
              src="/images/urbanEco.png"
              alt="UrbanEco Logo"
              width={170}
              height={170}
              className="object-contain pl-6 mb-4"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center flex-1 mx-12">
          <Link
            href="/"
            className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 "
          >
            Home
          </Link>
          <div className="relative group">
            <button className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 flex items-center">
              Services
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 z-50">
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Admin
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Zonal Head
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Driver
              </Link>
            </div>
          </div>
          {/* <Link
            href="/services"
            className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </Link> */}

          <div className="relative group">
            <button className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 group-hover:after:w-full after:transition-all after:duration-300 flex items-center">
              Campaign
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 z-50">
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Swachh Chintan
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Nirmal Dharti
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
               Safai Sathi
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
              KachraKalyaan
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Swachhta Ka Vaada
              </Link>
            </div>
          </div>
          
          <Link
            href="#about"
            className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-gray-600 hover:text-emerald-600 transition-colors mx-8 relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-[1px] after:w-0 hover:after:w-full after:transition-all after:duration-300 "
          >
            Contact
          </Link>
        </div>
        <Image
          src="/images/swach-bharat.png"
          alt="Swachh Bharat Mission Logo"
          width={120}
          height={120}
          className="object-contain mr-6"
        />
        <div>
          <Link
            href="/login"
            className="px-8 py-4 bg-[#138808] text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      <div
        className="w-full h-[2vh]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,153,50,1) 0%, rgba(237,237,237,1) 50%, rgba(20,136,9,1) 100%)",
        }}
      ></div>
    </>
  );
};

const ImageSlider = () => {
  const images = [
    "/images/redefining.png",
    "/images/realtime.png",
    "/images/image.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-[60vh] w-full">
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        ←
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
      >
        →
      </button>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About UrbanEco
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering communities through sustainable waste management
            solutions and environmental conservation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <div className="text-center p-6">
            <div className="text-emerald-600 text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Sustainable Solutions
            </h3>
            <p className="text-gray-600">
              Implementing eco-friendly waste management practices for a cleaner
              environment.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-emerald-600 text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Community Engagement
            </h3>
            <p className="text-gray-600">
              Working together with local communities to create lasting
              environmental impact.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-emerald-600 text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Innovation
            </h3>
            <p className="text-gray-600">
              Leveraging technology for efficient waste management and recycling
              solutions.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg mx-8">
          <div className="w-full md:w-2/5">
            <Image
              src="/images/dashboard.jpg"
              alt="UrbanEco"
              className="rounded-lg border-4 border-gray-300 shadow-md w-full"
              width={500}
              height={300}
            />
          </div>
          <div className="w-full md:w-3/5 flex justify-center items-center">
            <p className="text-gray-800 text-lg leading-relaxed px-6">
              At UrbanEco, we are driven by a singular goal: to transform urban
              waste management through the power of cutting-edge technology and
              innovative solutions. Founded with a vision to create cleaner,
              more sustainable cities, UrbanEco is at the forefront of
              leveraging artificial intelligence and smart systems to tackle one
              of the most pressing challenges of modern urban living waste
              mismanagement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-1 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Core Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how UrbanEco is revolutionizing waste management through
            cutting-edge technology and innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex items-center justify-center pr-14 pl-14">
          <div className="bg-[#fbf8ef] rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Real-time Detection
              </h3>
              <p className="text-gray-600">
                Continuously identifies waste locations using advanced AI
                algorithms and CCTV feeds.
              </p>
            </div>
          </div>

          <div className="bg- white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Automated Reporting
              </h3>
              <p className="text-gray-600">
                Seamlessly transmits detected waste data to municipal
                authorities for immediate action.
              </p>
            </div>
          </div>

          <div className="bg-[#fbf8ef] rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Progress Tracking Analytics
              </h3>
              <p className="text-gray-600">
                Monitors resolution timelines and performance metrics for
                streamlined waste management operations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 pr-14 pl-14">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Public Reporting Integration
              </h3>
              <p className="text-gray-600">
                Enables citizens to report waste incidents through an intuitive
                and accessible interface.
              </p>
            </div>
          </div>

          <div className="bg-[#fbf8ef] rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Geo-Tagged Waste Mapping
              </h3>
              <p className="text-gray-600">
                Pinpoints waste locations on an interactive map for precise
                cleanup coordination.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Heatmaps for Waste Distribution Patterns
              </h3>
              <p className="text-gray-600">
                Visualizes waste hotspot areas for efficient resource
                allocation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how UrbanEco&apos;s innovative technology transforms waste
            management through a simple & efficient process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 -translate-y-1/2 z-0">
            <div className="h-full bg-emerald-600 w-full animate-progress"></div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Step 1: Detection
              </h3>
              <p className="text-gray-600">
                UrbanEco uses advanced AI and sensor technology to identify
                waste piles in urban environments.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Step 2: Reporting
              </h3>
              <p className="text-gray-600">
                Once detected, waste locations are automatically reported to
                municipal systems for action.
              </p>
            </div>
          </div>

          {/* Step 3: Action */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Step 3: Action
              </h3>
              <p className="text-gray-600">
                UrbanEco assigns vehicles and cleanup crews to the reported
                sites for efficient waste removal.
              </p>
            </div>
          </div>

          {/* Step 4: Monitoring */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Step 4: Monitoring
              </h3>
              <p className="text-gray-600">
                The system tracks and updates the status of waste removal,
                ensuring transparency and accountability.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div
            className="relative flex justify-center items-center"
            style={{ margin: "0 auto" }}
          >
            <video
              src="/images/trash-detection.mov"
              className="rounded-lg object-cover"
              style={{ width: "70vw", height: "70vh" }}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
          >
            Discover More About UrbanEco&apos;s Technology
          </Link>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#faf7f2] relative">
      <div className="container mx-auto px-4">
        <div className="py-8 border-b border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="mb-2">
                <Link href="/" className="text-xl font-bold text-emerald-600">
                  UrbanEco
                </Link>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Revolutionizing urban waste management by developing AI-driven
                solutions that detect, report, and monitor waste in real-time,
                fostering cleaner, more livable cities for future generations.
              </p>
              <div>
                <span className="text-gray-800 text-lg font-bold mb-3 block">
                  Follow us
                </span>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    <span className="text-white text-sm">f</span>
                  </a>
                  <a
                    href="#"
                    className="bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    <span className="text-white text-sm">t</span>
                  </a>
                  <a
                    href="#"
                    className="bg-emerald-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-emerald-700 transition-colors"
                  >
                    <span className="text-white text-sm">g+</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:h-0.5 after:w-[40px] after:bg-emerald-600">
                Useful Links
              </h3>
              <ul>
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-800 text-lg font-semibold mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-[-10px] after:h-0.5 after:w-[40px] after:bg-emerald-600">
                Get in touch
              </h3>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-2.5 px-5 bg-white border border-gray-200 text-gray-800 rounded-md text-sm"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-emerald-600 text-white rounded-r-md hover:bg-emerald-700 transition-colors">
                  ➤
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 py-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-4 md:mb-0">
              <div className="flex items-start">
                <span className="text-emerald-600 text-2xl mt-1">📍</span>
                <div className="ml-3">
                  <h4 className="text-gray-800 text-lg font-semibold mb-1">
                    Find us
                  </h4>
                  <span className="text-gray-600 text-sm">
                    Hans Raj College, University of Delhi
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4 md:mb-0">
              <div className="flex items-start">
                <span className="text-emerald-600 text-2xl mt-1">📞</span>
                <div className="ml-3">
                  <h4 className="text-gray-800 text-lg font-semibold mb-1">
                    Call us
                  </h4>
                  <span className="text-gray-600 text-sm">+91-8586804202</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start">
                <span className="text-emerald-600 text-2xl mt-1">✉</span>
                <div className="ml-3">
                  <h4 className="text-gray-800 text-lg font-semibold mb-1">
                    Mail us
                  </h4>
                  <span className="text-gray-600 text-sm">
                    UrbanEco@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-3 md:mb-0">
              Copyright &copy; 2024, All Right Reserved{" "}
              <a href="#" className="text-emerald-600 hover:text-emerald-700">
                UrbanEco
              </a>
            </p>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 text-sm hover:text-emerald-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-emerald-600 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <ImageSlider />
      <AboutSection />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
