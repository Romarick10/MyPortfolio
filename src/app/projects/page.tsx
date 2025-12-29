'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Filter, ChevronRight, Sparkles, Eye, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce site with a custom CMS, payment integration, and a user-friendly interface. Built with performance and scalability in mind.',
      imageUrl: 'https://picsum.photos/seed/project1/600/400',
      imageHint: 'online store',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
      liveLink: '#',
      githubLink: '#',
      category: 'full-stack',
      featured: true,
      year: '2024'
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      description: 'A complex data visualization dashboard for a SaaS product. Includes real-time updates, customizable widgets, and advanced filtering.',
      imageUrl: 'https://picsum.photos/seed/project2/600/400',
      imageHint: 'data dashboard',
      tags: ['React', 'D3.js', 'WebSocket', 'Node.js', 'MongoDB'],
      liveLink: '#',
      githubLink: '#',
      category: 'full-stack',
      featured: true,
      year: '2024'
    },
    {
      id: 3,
      title: 'Mobile Fitness App',
      description: 'A cross-platform mobile app for tracking workouts and nutrition. Features social sharing, progress tracking, and personalized plans.',
      imageUrl: 'https://picsum.photos/seed/project3/600/400',
      imageHint: 'fitness app',
      tags: ['React Native', 'Firebase', 'GraphQL', 'iOS', 'Android'],
      liveLink: '#',
      githubLink: '#',
      category: 'mobile',
      featured: true,
      year: '2023'
    },
    {
      id: 4,
      title: 'Company Blog Platform',
      description: 'A performant, SEO-optimized blog built with a headless CMS. Enables marketers to easily publish and manage content.',
      imageUrl: 'https://picsum.photos/seed/project4/600/400',
      imageHint: 'writing article',
      tags: ['Next.js', 'Contentful', 'GraphQL', 'Vercel'],
      liveLink: '#',
      githubLink: '#',
      category: 'web',
      featured: false,
      year: '2023'
    },
    {
      id: 5,
      title: 'AI-Powered Chatbot',
      description: 'A customer service chatbot that integrates with a knowledge base to provide instant, accurate answers to user queries.',
      imageUrl: 'https://picsum.photos/seed/project5/600/400',
      imageHint: 'robot assistant',
      tags: ['Python', 'Genkit', 'LangChain', 'React', 'Firebase'],
      liveLink: '#',
      githubLink: '#',
      category: 'ai-ml',
      featured: false,
      year: '2023'
    },
     {
      id: 6,
      title: 'Project Management Tool',
      description: 'A collaborative tool for teams to manage tasks, track progress, and communicate effectively, inspired by Trello.',
      imageUrl: 'https://picsum.photos/seed/project6/600/400',
      imageHint: 'kanban board',
      tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      liveLink: '#',
      githubLink: '#',
      category: 'web',
      featured: false,
      year: '2022'
    }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'featured', label: 'Featured' },
  { id: 'full-stack', label: 'Full Stack' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai-ml', label: 'AI/ML' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'featured') return project.featured;
    return project.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 lg:mb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
              <span className="text-xs md:text-sm text-slate-300">Portfolio Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
              Project <span className="text-purple-400">Gallery</span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto mb-6">
              A curated selection of projects that showcase my technical skills, design thinking, and problem-solving abilities.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-8">
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-lg md:text-xl font-bold text-white">{projects.length}</div>
                <div className="text-xs md:text-sm text-slate-400">Total Projects</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-lg md:text-xl font-bold text-white">{projects.filter(p => p.featured).length}</div>
                <div className="text-xs md:text-sm text-slate-400">Featured</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="text-lg md:text-xl font-bold text-white">6+</div>
                <div className="text-xs md:text-sm text-slate-400">Tech Stacks</div>
              </div>
            </div>
          </div>
        </header>

        {/* Category Filters */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
            <span className="text-sm md:text-base text-slate-300">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`transition-all duration-200 ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'border-slate-700 text-slate-300 hover:border-purple-500/50 hover:text-white'
                }`}
              >
                {category.label}
                {category.id === 'featured' && activeCategory === 'featured' && (
                  <Sparkles className="ml-2 h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <main className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <Card 
              key={project.id} 
              className="group flex flex-col overflow-hidden bg-slate-800/30 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 md:hover:-translate-y-2"
            >
              {/* Image with Overlay */}
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  {/* Year Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-slate-900/80 backdrop-blur-sm border-slate-700 text-slate-300 text-xs">
                      {project.year}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 md:p-6 flex-grow">
                <div className="mb-2 flex items-center justify-between">
                  <CardTitle className="text-base md:text-lg lg:text-xl text-white group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs bg-slate-700/50 text-slate-300">
                    {project.category}
                  </Badge>
                </div>
                
                <p className="mb-4 text-slate-400 text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.tags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 md:p-6 pt-0 flex justify-between gap-2 border-t border-slate-700/50 mt-4">
                <Link 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-slate-700 hover:border-purple-500 hover:text-purple-300 transition-all"
                  >
                    <Eye className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4"/>
                    <span className="text-xs md:text-sm">Live Demo</span>
                  </Button>
                </Link>
                <Link 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    <Github className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4"/>
                    <span className="text-xs md:text-sm">Source Code</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </main>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <Layers className="h-12 w-12 md:h-16 md:w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-slate-400 mb-6">
              Try selecting a different category
            </p>
            <Button 
              variant="outline"
              onClick={() => setActiveCategory('all')}
              className="border-slate-700 hover:border-purple-500"
            >
              View All Projects
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-12 md:mt-16 lg:mt-20">
          <div className="max-w-4xl mx-auto text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 via-slate-900/20 to-blue-900/20 border border-slate-700/50">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              Want to See More?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Interested in the technical details or want to discuss a custom project?
              I'd love to hear about your ideas and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Discuss a Project
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/experience">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-white hover:bg-slate-800">
                  View Experience
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}