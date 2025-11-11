import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Contact() {
  return (
    <div className="bg-[#f8f9fa] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl">Get In Touch</h2>
              <p className="text-xl text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll 
                respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4285f4] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#4285f4]" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Email</h3>
                  <p className="text-gray-600">gdg@mustaqbal.edu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#34a853] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#34a853]" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Location</h3>
                  <p className="text-gray-600">
                    Mustaqbal University<br />
                    Student Center, 2nd Floor
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#f9ab00] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#f9ab00]" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">+966 XX XXX XXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#ea4335] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#ea4335]" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Social Media</h3>
                  <p className="text-gray-600">@gdg_mustaqbal</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((platform, index) => {
                  const colors = ["#4285f4", "#34a853", "#f9ab00", "#ea4335"];
                  return (
                    <button
                      key={platform}
                      className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: colors[index] }}
                    >
                      {platform}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm mb-2 text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={6}
                  className="w-full"
                />
              </div>

              <Button className="w-full bg-[#4285f4] hover:bg-[#3367d6]">
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
