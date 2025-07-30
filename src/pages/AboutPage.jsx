import React from "react";
import { Users, Award, Clock, Heart } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Users,
      title: "Expert Chefs",
      description:
        "Our experienced chefs bring authentic Nepali flavors to every dish",
    },
    {
      icon: Award,
      title: "Quality Ingredients",
      description:
        "We source the finest spices and ingredients directly from Nepal",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description:
        "Fresh, hot meals delivered to your door in 30 minutes or less",
    },
    {
      icon: Heart,
      title: "Made with Love",
      description:
        "Every dish is prepared with care and traditional cooking methods",
    },
  ];

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About NepaliThali</h1>
          <p className="text-xl leading-relaxed">
            Bringing the authentic taste of Nepal to your doorstep with
            traditional recipes, fresh ingredients, and the warmth of Himalayan
            hospitality.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 2020 in the heart of Pokhara, NepaliThali began as a
              small family restaurant with a big dream: to share the rich
              culinary heritage of Nepal with food lovers everywhere.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our journey started when our founder, inspired by his
              grandmother's traditional recipes, decided to create a platform
              where authentic Nepali cuisine could reach every home. Today,
              we're proud to serve thousands of customers across Nepal.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every dish we prepare tells a story of our culture, our
              traditions, and our commitment to preserving the authentic flavors
              that make Nepali cuisine so special.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              alt="Traditional Nepali Kitchen"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-orange-500" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          To preserve and share the authentic flavors of Nepal while providing
          convenient, high-quality food delivery services that bring families
          together around delicious, traditional meals.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
