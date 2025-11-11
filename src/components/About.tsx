import { Code, Users, Lightbulb, Rocket } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Code,
      color: "#4285f4",
      title: "Learn & Build",
      description: "Get hands-on experience with Google technologies and modern development tools"
    },
    {
      icon: Users,
      color: "#34a853",
      title: "Network",
      description: "Connect with fellow developers, industry experts, and Google professionals"
    },
    {
      icon: Lightbulb,
      color: "#f9ab00",
      title: "Innovate",
      description: "Work on exciting projects and participate in hackathons and competitions"
    },
    {
      icon: Rocket,
      color: "#ea4335",
      title: "Grow",
      description: "Enhance your skills through workshops, talks, and mentorship programs"
    }
  ];

  return (
    <div className="bg-[#f8f9fa] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl">About GDG on Campus</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a community of passionate students at Mustaqbal University dedicated to 
            learning about Google technologies and making an impact through development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl mb-6 text-center">Our Mission</h3>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              At GDG on Campus Mustaqbal University, we aim to create an inclusive environment 
              where students can explore their passion for technology, develop their skills, 
              and build innovative solutions. We organize workshops, study jams, hackathons, 
              and networking events to help our community grow together. Whether you're a 
              beginner or an experienced developer, there's a place for you here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
