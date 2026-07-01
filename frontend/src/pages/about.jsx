import React from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Visionary leader with 15+ years in e-commerce",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Tech innovator driving digital transformation",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      bio: "Operational excellence ensuring customer satisfaction",
    },
    {
      name: "David Park",
      role: "Marketing Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      bio: "Creative strategist building brand awareness",
    },
  ];

  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We constantly push boundaries to deliver cutting-edge solutions",
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "Honest and transparent in all our business dealings",
    },
    {
      icon: "👥",
      title: "Customer-Centric",
      description: "Your satisfaction is our top priority",
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Committed to environmentally responsible practices",
    },
    {
      icon: "⚡",
      title: "Excellence",
      description: "We strive for the highest quality in everything we do",
    },
    {
      icon: "🌍",
      title: "Community",
      description: "Building a strong community around our brand",
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Founded",
      description: "Started with a vision to revolutionize online shopping",
    },
    {
      year: "2017",
      title: "Expansion",
      description: "Launched operations in 10 countries",
    },
    {
      year: "2019",
      title: "1 Million Customers",
      description: "Reached milestone of serving 1 million customers worldwide",
    },
    {
      year: "2021",
      title: "Industry Recognition",
      description: "Won Best E-Commerce Platform Award",
    },
    {
      year: "2023",
      title: "Global Leader",
      description: "Established presence in 50+ countries",
    },
    {
      year: "2024",
      title: "Sustainability Certified",
      description: "Achieved carbon-neutral operations",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <PageTitle title="About Us" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Story</h2>
          <p className="text-lg md:text-xl text-blue-100">
            From humble beginnings to becoming a global leader in e-commerce,
            we've always stayed focused on one thing: delivering exceptional
            value to our customers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* About Section */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Who We Are
                </h2>
                <p className="text-gray-600 text-lg mb-4">
                  We're a passionate team dedicated to creating the best online
                  shopping experience. What started as a small startup has grown
                  into a thriving marketplace serving millions of customers
                  worldwide.
                </p>
                <p className="text-gray-600 text-lg mb-4">
                  Our mission is simple: make quality products accessible to
                  everyone, everywhere. We believe in the power of e-commerce to
                  connect people with the things they love.
                </p>
                <p className="text-gray-600 text-lg mb-6">
                  With a diverse team of innovators, creators, and customer
                  advocates, we're continuously evolving to meet the needs of
                  our growing community.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                >
                  Get In Touch
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden shadow-lg h-96">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                    alt="About Us"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-6 w-48">
                  <p className="text-3xl font-bold text-blue-600 mb-1">50+</p>
                  <p className="text-gray-600 text-sm">Countries Served</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower shoppers with access to an unparalleled selection
                  of products at competitive prices, while supporting sellers
                  and merchants in reaching a global audience.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted and customer-centric
                  e-commerce platform, where innovation and sustainability shape
                  the future of retail.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Our Journey
            </h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 md:gap-12">
                  {/* Timeline dot and line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    {index !== milestones.length - 1 && (
                      <div className="w-1 h-20 bg-blue-200 mt-2" />
                    )}
                  </div>

                  {/* Timeline content */}
                  <div className="pb-8">
                    <p className="text-blue-600 font-semibold text-lg mb-2">
                      {milestone.year}
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg text-center mb-12 max-w-2xl mx-auto">
              Talented individuals from diverse backgrounds working together to
              create exceptional experiences
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 h-48 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full border-4 border-white"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-white rounded-lg shadow-md p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              By The Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  50M+
                </p>
                <p className="text-gray-600 text-lg">Products Available</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  10M+
                </p>
                <p className="text-gray-600 text-lg">Active Customers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  500K+
                </p>
                <p className="text-gray-600 text-lg">Seller Partners</p>
              </div>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  50+
                </p>
                <p className="text-gray-600 text-lg">Countries</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're looking to shop, sell, or partner with us, we'd
              love to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-200"
              >
                Start Shopping
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Get In Touch
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
