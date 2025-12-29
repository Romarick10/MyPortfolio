'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Briefcase, GraduationCap, Award, Code, Users, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const workExperience = [
  {
    role: "Senior Software Engineer",
    company: "Tech Innovators Inc.",
    period: "2021 - Present",
    description: [
      "Led the development of a new microservices architecture, improving system scalability by 300%.",
      "Mentored junior developers, conducting code reviews and fostering best practices in an Agile environment.",
      "Optimized database queries and application performance, reducing average API response time by 50%.",
      "Collaborated with product managers and designers to deliver high-quality features for a user base of over 1 million.",
    ],
    technologies: ["Microservices", "AWS", "Docker", "React", "Node.js"],
  },
  {
    role: "Software Engineer",
    company: "Digital Solutions Co.",
    period: "2020 - 2021",
    description: [
      "Developed and maintained features for a large-scale React application.",
      "Wrote comprehensive unit and integration tests, increasing code coverage by 40%.",
      "Participated in the full software development lifecycle, from conception to deployment."
    ],
    technologies: ["React", "TypeScript", "Python", "PostgreSQL"],
  }
];

const education = {
  degree: "Bachelor of Science in Computer Science",
  institution: "State University",
  period: "2016 - 2020",
  details: "Graduated with Honors. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.",
  honors: ["Magna Cum Laude", "Dean's List", "Research Scholarship"]
}

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    id: "AWS-SAA-12345"
  },
  {
    title: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    year: "2022",
    id: "GCP-PCD-67890"
  },
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    year: "2021",
    id: "AZ-900"
  }
];

const skills = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "Go"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Express", "Django"]
  },
  {
    category: "Tools & Platforms",
    items: ["Docker", "AWS", "Git", "GitHub Actions", "MongoDB", "PostgreSQL"]
  }
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-blue-500/10 rounded-full">
                <Briefcase className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                <span className="text-xs md:text-sm text-slate-300">Professional Journey</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
                Experience & <span className="text-blue-400">Resume</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl">
                My professional journey, qualifications, and technical expertise.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/Bongnteh-Romarick-Ndzelen-Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800">
                  View Projects
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-12 md:space-y-16">
          {/* Work Experience Section */}
          <section className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 rounded-lg bg-blue-900/20">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Work Experience</h2>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>
              
              <div className="space-y-6 md:space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index} className="relative pl-10 md:pl-12">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1 top-6 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-900"></div>
                    </div>
                    
                    <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                          <CardTitle className="text-lg md:text-xl text-white">
                            {job.role}
                          </CardTitle>
                          <Badge className="w-fit bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-blue-500/30">
                            {job.period}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm md:text-base font-medium">{job.company}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 md:space-y-6">
                        <ul className="space-y-2 md:space-y-3">
                          {job.description.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 text-sm md:text-base">
                              <div className="mt-1.5 flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                              </div>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {job.technologies && (
                          <div className="pt-4 border-t border-slate-700/50">
                            <div className="flex flex-wrap gap-2">
                              {job.technologies.map((tech, i) => (
                                <Badge 
                                  key={i} 
                                  variant="outline" 
                                  className="text-xs border-slate-700 text-slate-300 hover:border-blue-500/50 hover:text-blue-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 rounded-lg bg-purple-900/20">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Education</h2>
            </div>
            
            <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <CardTitle className="text-lg md:text-xl text-white">
                      {education.degree}
                    </CardTitle>
                    <Badge className="w-fit bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 border-purple-500/30">
                      {education.period}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm md:text-base font-medium">{education.institution}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 md:space-y-6">
                  <p className="text-slate-300 text-sm md:text-base">
                    {education.details}
                  </p>
                  
                  {education.honors && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">Honors & Awards</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {education.honors.map((honor, i) => (
                          <Badge 
                            key={i} 
                            className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          >
                            {honor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          </section>

          {/* Skills Section */}
          <section className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 rounded-lg bg-green-900/20">
                <Code className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Technical Skills</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {skills.map((category, index) => (
                <Card 
                  key={index} 
                  className="bg-slate-800/30 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-900/10"
                >
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg text-white">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
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

          {/* Certifications Section */}
          <section className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 rounded-lg bg-orange-900/20">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-orange-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Certifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {certifications.map((cert, index) => (
                <Card 
                  key={index} 
                  className="bg-slate-800/30 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/10 group"
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-orange-400" />
                      </div>
                      <Badge variant="outline" className="text-xs border-slate-700">
                        {cert.year}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white text-sm md:text-base mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm mb-2">
                      {cert.issuer}
                    </p>
                    <p className="text-slate-500 text-xs">
                      ID: {cert.id}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="pt-8">
            <div className="max-w-4xl mx-auto text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 via-slate-900/20 to-purple-900/20 border border-slate-700/50">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Let's Work Together
              </h3>
              <p className="text-slate-300 mb-6">
                Interested in collaborating on your next project?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Contact Me
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
        </main>
      </div>
    </div>
  );
}