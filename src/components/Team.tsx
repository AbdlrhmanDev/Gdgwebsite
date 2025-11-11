import { Linkedin, Github, Mail } from "lucide-react";

export function Team() {
  const team = [
    {
      name: "Sarah Al-Rashid",
      role: "Lead",
      color: "#4285f4",
      initial: "S"
    },
    {
      name: "Mohammed Hassan",
      role: "Co-Lead",
      color: "#34a853",
      initial: "M"
    },
    {
      name: "Fatima Ahmed",
      role: "Technical Lead",
      color: "#f9ab00",
      initial: "F"
    },
    {
      name: "Ali Khalid",
      role: "Events Coordinator",
      color: "#ea4335",
      initial: "A"
    },
    {
      name: "Layla Ibrahim",
      role: "Marketing Lead",
      color: "#4285f4",
      initial: "L"
    },
    {
      name: "Omar Saeed",
      role: "Community Manager",
      color: "#34a853",
      initial: "O"
    }
  ];

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate students leading the way to create an amazing developer community
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-3xl mb-4"
                style={{ backgroundColor: member.color }}
              >
                {member.initial}
              </div>

              <h3 className="text-xl mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-4">{member.role}</p>

              <div className="flex justify-center gap-3">
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center bg-[#f8f9fa] rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl mb-4">Want to join our team?</h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            We're always looking for passionate students to help organize events and 
            grow our community. Applications open at the start of each semester.
          </p>
          <button className="px-8 py-3 bg-[#4285f4] hover:bg-[#3367d6] text-white rounded-lg transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
