'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Github, Mail, Phone, Send, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(4, 'Subject must be at least 4 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    console.log(data);

    // Simulate network request
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast({
          title: 'Message Sent Successfully!',
          description: "Thanks for reaching out. I'll get back to you within 24 hours.",
          variant: 'default',
        });
        form.reset();
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-green-500/10 rounded-full">
            <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-green-400" />
            <span className="text-xs md:text-sm text-slate-300">Let's Connect</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
            Get In <span className="text-green-400">Touch</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </header>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 md:mb-8 max-w-4xl mx-auto p-4 md:p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
              <div>
                <h3 className="font-semibold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-300">I'll get back to you within 24 hours. Thank you for reaching out!</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Centered */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Contact Information - Now takes full width on mobile, 1/3 on desktop */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-slate-800/30 border border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-400" />
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Reach out through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Contact Info Cards */}
                    <a 
                      href="mailto:ndzelenromarick@gmail.com" 
                      className="flex items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-800/50 border border-transparent hover:border-green-500/30 group"
                    >
                      <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Mail className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm md:text-base">Email</p>
                        <p className="text-sm text-slate-400 break-all">ndzelenromarick@gmail.com</p>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/237676154253" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-800/50 border border-transparent hover:border-green-500/30 group"
                    >
                      <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <div className="h-4 w-4 md:h-5 md:w-5 text-green-400">
                          <WhatsAppIcon className="h-full w-full" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm md:text-base">WhatsApp</p>
                        <p className="text-sm text-slate-400">+237 676 15 42 53</p>
                      </div>
                    </a>

                    <a 
                      href="tel:+237676154253" 
                      className="flex items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-800/50 border border-transparent hover:border-green-500/30 group"
                    >
                      <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                        <Phone className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm md:text-base">Phone</p>
                        <p className="text-sm text-slate-400">+237 676 15 42 53</p>
                      </div>
                    </a>

                    <a 
                      href="https://github.com/bongnteh-romarick-ndzelen" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 rounded-lg p-4 transition-all duration-200 hover:bg-slate-800/50 border border-transparent hover:border-blue-500/30 group"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        <Github className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm md:text-base">GitHub</p>
                        <p className="text-sm text-slate-400">bongnteh-romarick-ndzelen</p>
                      </div>
                    </a>

                    {/* Quick Info */}
                    <div className="pt-4 mt-4 border-t border-slate-700/50 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span>Response time: Typically within 24 hours</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <MapPin className="h-4 w-4 text-red-400" />
                        <span>Based in Cameroon • Available worldwide</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-slate-800/30 border border-slate-700/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-4">Why Work With Me?</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-slate-800/50">
                        <div className="text-lg font-bold text-white">24h</div>
                        <div className="text-xs text-slate-400">Response Time</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-slate-800/50">
                        <div className="text-lg font-bold text-white">100%</div>
                        <div className="text-xs text-slate-400">Satisfaction</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-slate-800/50">
                        <div className="text-lg font-bold text-white">50+</div>
                        <div className="text-xs text-slate-400">Projects</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-slate-800/50">
                        <div className="text-lg font-bold text-white">5+</div>
                        <div className="text-xs text-slate-400">Years Exp</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form - Now takes full width on mobile, 2/3 on desktop */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <Card className="bg-slate-800/30 border border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Send className="h-5 w-5 text-green-400" />
                      Send a Message
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm md:text-base">Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Your Name" 
                                    {...field} 
                                    className="bg-slate-800/50 border-slate-700 focus:border-green-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white text-sm md:text-base">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="your.email@example.com" 
                                    {...field} 
                                    className="bg-slate-800/50 border-slate-700 focus:border-green-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm md:text-base">Subject</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Regarding a new opportunity or project" 
                                  {...field} 
                                  className="bg-slate-800/50 border-slate-700 focus:border-green-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white text-sm md:text-base">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell me about your project, ideas, or questions..." 
                                  className="min-h-[140px] md:min-h-[160px] bg-slate-800/50 border-slate-700 focus:border-green-500 resize-none"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="pt-2">
                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            loading={isSubmitting}
                            size="lg"
                          >
                            {isSubmitting ? 'Sending...' : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                              </>
                            )}
                          </Button>
                          <p className="mt-3 text-xs text-slate-500">
                            By submitting this form, you agree to our privacy policy. Your data is safe with us.
                          </p>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {/* FAQ/Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Card className="bg-slate-800/30 border border-slate-700/50">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        What to Expect
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                          <span>Response within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                          <span>Initial consultation call</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5"></div>
                          <span>Detailed project proposal</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-800/30 border border-slate-700/50">
                    <CardContent className="p-4 md:p-6">
                      <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-purple-400" />
                        Best For
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                          <span>Web Application Development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                          <span>Technical Consulting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                          <span>Full-Stack Projects</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-12 md:mt-16">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-900/20 via-slate-900/20 to-emerald-900/20 border border-slate-700/50">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                  Ready to Start Your Project?
                </h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-center">
                  Whether you have a clear vision or just an idea, I'm here to help you bring it to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start a Conversation
                  </Button>
                  <Link href="/projects">
                    <Button variant="outline" size="lg" className="border-slate-700 text-white hover:bg-slate-800">
                      View My Work
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}