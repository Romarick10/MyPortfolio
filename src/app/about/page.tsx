'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, GraduationCap, Lightbulb, Rocket, Code, Cpu, Palette, Users, MapPin, Calendar, Award, Download, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const skills = {
  "Programming Languages": ["JavaScript", "TypeScript", "Python", "Java", "Go"],
  "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express", "Django"],
  "Databases & Storage": ["MongoDB", "PostgreSQL", "Firebase", "Redis", "AWS S3"],
  "Tools & Platforms": ["Git", "Docker", "Vercel", "AWS", "GitHub Actions"],
  "Design & UX": ["Figma", "Tailwind CSS", "Material-UI", "Responsive Design"],
  "Soft Skills": ["Problem Solving", "Communication", "Team Leadership", "Agile Methodologies", "Project Management"]
}

const certifications = [
  {
    title: "Certified Next.js Developer",
    issuer: "Vercel",
    year: "2023",
    id: "NEXTJS-2023"
  },
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2022",
    id: "AWS-SAA-001"
  },
  {
    title: "Google Cloud Associate",
    issuer: "Google Cloud",
    year: "2022",
    id: "GCP-001"
  }
];

const interests = [
  {
    title: "Open Source",
    description: "Contributing to community projects",
    icon: <Code className="h-4 w-4" />
  },
  {
    title: "Tech Talks",
    description: "Speaking at developer conferences",
    icon: <Users className="h-4 w-4" />
  },
  {
    title: "Photography",
    description: "Digital & landscape photography",
    icon: <Palette className="h-4 w-4" />
  },
  {
    title: "Hiking",
    description: "Exploring nature trails",
    icon: <MapPin className="h-4 w-4" />
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-500/10 rounded-full">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
            <span className="text-xs md:text-sm text-slate-300">Behind the Code</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
            About <span className="text-blue-400">Me</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            My journey, expertise, and passion for creating impactful digital experiences.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-slate-800/30 border border-slate-700/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                
                <CardContent className="pt-8 pb-6 px-4 md:px-6 relative z-10">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                      <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-slate-900 relative">
                        <AvatarImage
                          src="/romarick.jpeg"
                          alt="Bongnteh Romarick Ndzelen"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-slate-800 to-slate-900 text-white text-2xl">
                          BRN
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <h2 className="text-xl md:text-2xl font-bold text-white">Bongnteh Romarick Ndzelen</h2>
                    <p className="text-blue-400 font-medium mt-1">Full-Stack Developer</p>
                    
                    <div className="mt-4 space-y-3 text-sm text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Based in Cameroon</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <span>5+ Years Experience</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Available for Hire</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link href="/experience">
                        <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                          <Download className="mr-2 h-4 w-4" />
                          View Resume
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="text-center p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="text-lg md:text-xl font-bold text-white">50+</div>
                  <div className="text-xs text-slate-400">Projects</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="text-lg md:text-xl font-bold text-white">6+</div>
                  <div className="text-xs text-slate-400">Tech Stacks</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="text-lg md:text-xl font-bold text-white">25+</div>
                  <div className="text-xs text-slate-400">Clients</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <div className="text-lg md:text-xl font-bold text-white">100%</div>
                  <div className="text-xs text-slate-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8 md:space-y-12">
            {/* Journey Section */}
            <section className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 rounded-lg bg-blue-900/20">
                  <Rocket className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">My Journey</h3>
              </div>
              
              <Card className="bg-slate-800/30 border border-slate-700/50">
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-4">
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      From a young age, I've been fascinated by how things work. This curiosity led me from tinkering with hardware to diving deep into the world of software development. I started my journey with a degree in Computer Science, where I built a strong foundation in programming principles and data structures.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                      My professional career began at a fast-paced startup, where I learned to be adaptable, resourceful, and user-focused. Now, I leverage my experience to build robust, scalable, and delightful digital experiences. My philosophy is to write clean, maintainable code and to never stop learning.
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                      <p className="text-blue-300 text-sm md:text-base italic">
                        "Code is not just about making things work—it's about creating solutions that are elegant, efficient, and make a real difference in people's lives."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Skills Section */}
            <section className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 rounded-lg bg-purple-900/20">
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Skills & Expertise</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <Card key={category} className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-base md:text-lg text-white flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-purple-400" />
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map(skill => (
                          <Badge 
                            key={skill} 
                            variant="secondary" 
                            className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education & Certifications */}
            <section className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 rounded-lg bg-green-900/20">
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Education & Certifications</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Education */}
                <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl text-white">B.S. in Computer Science</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Building className="h-4 w-4" />
                        <span>State University</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>Graduated 2020</span>
                      </div>
                      <p className="text-sm text-slate-300 mt-2">
                        Graduated with Honors. Specialized in software engineering and web technologies.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card className="bg-slate-800/30 border border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl text-white">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {certifications.map((cert, index) => (
                        <div key={index} className="flex items-start justify-between p-3 rounded-lg bg-slate-800/50">
                          <div>
                            <h4 className="font-medium text-white text-sm md:text-base">{cert.title}</h4>
                            <p className="text-xs text-slate-400">{cert.issuer}</p>
                          </div>
                          <Badge variant="outline" className="text-xs border-slate-700">
                            {cert.year}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Interests Section */}
            <section className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 rounded-lg bg-yellow-900/20">
                  <Building className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">Personal Interests</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {interests.map((interest, index) => (
                  <Card 
                    key={index} 
                    className="bg-slate-800/30 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300 group"
                  >
                    <CardContent className="p-4 md:p-6 text-center">
                      <div className="inline-flex p-3 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors mb-3">
                        <div className="text-yellow-400">{interest.icon}</div>
                      </div>
                      <h4 className="font-semibold text-white text-sm md:text-base mb-1">
                        {interest.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-400">
                        {interest.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 bg-slate-800/30 border border-slate-700/50">
                <CardContent className="p-4 md:p-6">
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    When I'm not coding, you can find me hiking in the mountains, experimenting with new recipes in the kitchen, or contributing to open-source projects. I believe a balanced life fuels creativity and problem-solving.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <section className="scroll-mt-20">
              <div className="max-w-4xl mx-auto text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 via-slate-900/20 to-purple-900/20 border border-slate-700/50">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Let's Build Something Together
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Interested in working together or learning more about my work? I'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Get In Touch
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800">
                      View Projects
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}