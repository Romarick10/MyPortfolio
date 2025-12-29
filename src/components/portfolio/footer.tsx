'use client';

import { Code, Github, Mail, Phone, Heart, Linkedin, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function WhatsAppIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    )
}

export function Footer() {
  const contactInfo = {
    email: 'ndzelenromarick@gmail.com',
    phone: '+237676154253',
    whatsapp: '+237676154253',
    github: 'bongnteh-romarick-ndzelen',
    linkedin: 'bongnteh-romarick-ndzelen', // Assuming your LinkedIn username
    twitter: 'bongnteh-romarick', // Update with your actual Twitter handle
    facebook: 'bongnteh.romarick' // Update with your actual Facebook username
  };

  // Format phone number for tel: link (remove + sign)
  const telNumber = contactInfo.phone.replace('+', '');
  const whatsappNumber = contactInfo.whatsapp.replace('+', '');

  return (
    <footer className="border-t bg-slate-950 border-slate-800/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-slate-800/50">
                <Code className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
              </div>
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Bongnteh Romarick Ndzelen
              </p>
            </div>
            <p className="text-xs text-slate-500">
              Made with <Heart className="inline h-3 w-3 text-red-400" /> using Next.js
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-1">
            {/* Email */}
            <Link href={`mailto:${contactInfo.email}`} passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Email"
                className="h-9 w-9 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                title="Send me an email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </Link>

            {/* Phone */}
            <Link href={`tel:${telNumber}`} passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Phone"
                className="h-9 w-9 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                title="Call me"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </Link>

            {/* WhatsApp */}
            <Link 
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Bongnteh,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!`} 
              target="_blank" 
              rel="noopener noreferrer" 
              passHref
            >
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="WhatsApp"
                className="h-9 w-9 text-slate-400 hover:text-green-400 hover:bg-green-500/10"
                title="Message me on WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </Button>
            </Link>

            {/* GitHub */}
            <Link href={`https://github.com/${contactInfo.github}`} target="_blank" rel="noopener noreferrer" passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="GitHub"
                className="h-9 w-9 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10"
                title="View my GitHub profile"
              >
                <Github className="h-4 w-4" />
              </Button>
            </Link>

            {/* LinkedIn */}
            <Link href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="LinkedIn"
                className="h-9 w-9 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                title="Connect on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>

            {/* Twitter */}
            <Link href={`https://twitter.com/${contactInfo.twitter}`} target="_blank" rel="noopener noreferrer" passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Twitter"
                className="h-9 w-9 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10"
                title="Follow me on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </Link>

            {/* Facebook */}
            <Link href={`https://facebook.com/${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" passHref>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Facebook"
                className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-600/10"
                title="Connect on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Optional: Quick contact info for mobile */}
        <div className="mt-6 pt-6 border-t border-slate-800/30">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Mail className="h-3 w-3" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-slate-300 transition-colors">
                {contactInfo.email}
              </a>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3" />
              <a href={`tel:${telNumber}`} className="hover:text-slate-300 transition-colors">
                {contactInfo.phone}
              </a>
            </div>
            <div className="hidden md:block">•</div>
            <div className="flex items-center gap-2">
              <Github className="h-3 w-3" />
              <a 
                href={`https://github.com/${contactInfo.github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                @{contactInfo.github}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}