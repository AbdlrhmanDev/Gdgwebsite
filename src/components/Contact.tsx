import { Mail, MapPin, Phone, Send, MessageSquare, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { getTranslation, type Language } from "../lib/i18n";
import { useState } from "react";
import { toast } from "sonner";

interface ContactProps {
  lang: Language;
}

export function Contact({ lang }: ContactProps) {
  const t = (key: string) => getTranslation(lang, key);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill in all required fields.');
      return;
    }

    const recipientEmail = 'gdg.uom2025@gmail.com';
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    window.open(mailtoLink, '_blank');
    toast.success(lang === 'ar' ? 'تم فتح برنامج البريد لإرسال رسالتك.' : 'Email client opened to send your message.');
    
    // Clear form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-background py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent -z-10 blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                 {lang === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                {lang === 'ar' 
                  ? 'لديك أسئلة؟ نود أن نسمع منك. أرسل لنا رسالة وسنقوم بالرد في أقرب وقت ممكن.'
                  : "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, color: "#4285f4", title: "Email", value: "gdg.uom2025@gmail.com", href: "mailto:gdg.uom2025@gmail.com" },
                { icon: MapPin, color: "#34a853", title: "Location", value: "Mustaqbal University" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-muted/50 transition-colors"
                  >
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{item.value}</p>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-6">{lang === 'ar' ? 'تابعنا' : 'Follow Us'}</h3>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://x.com/GDGoc_uom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
                  style={{ backgroundColor: "#000000" }}
                >
                  <Twitter className="w-4 h-4" />
                  X
                </a>
                <a
                  href="https://www.linkedin.com/company/gdgoc-uom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
                  style={{ backgroundColor: "#0A66C2" }}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl shadow-black/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-[100px] -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium ml-1">
                    {lang === 'ar' ? 'الاسم' : 'Name'}
                  </label>
                  <Input
                    id="name"
                    placeholder={lang === 'ar' ? 'اسمك' : 'Your name'}
                    className="h-12 rounded-xl bg-muted/30 border-transparent hover:bg-muted/50 focus:bg-background transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium ml-1">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="h-12 rounded-xl bg-muted/30 border-transparent hover:bg-muted/50 focus:bg-background transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium ml-1">
                  {lang === 'ar' ? 'الموضوع' : 'Subject'}
                </label>
                <Input
                  id="subject"
                  placeholder={lang === 'ar' ? 'عن ماذا تدور رسالتك؟' : 'What is this about?'}
                  className="h-12 rounded-xl bg-muted/30 border-transparent hover:bg-muted/50 focus:bg-background transition-all"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1">
                  {lang === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <Textarea
                  id="message"
                  placeholder={lang === 'ar' ? 'رسالتك...' : 'Your message...'}
                  rows={6}
                  className="rounded-xl bg-muted/30 border-transparent hover:bg-muted/50 focus:bg-background transition-all resize-none p-4"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full h-14 bg-[#4285f4] hover:bg-[#3367d6] text-white rounded-xl text-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                {lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                <Send className={`w-5 h-5 ${lang === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
