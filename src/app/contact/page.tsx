import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with the AIScout team
          </p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[150px]"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    {/* 123 AI Street
                    <br /> */}
                    Salt Lake City, UT
                    <br />
                    United States
                  </p>
                </div>
              </div>
              {/* <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div> */}
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">bjornmelin16@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <h3 className="font-medium">Office Hours</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 4:00 PM (MST)</p>
                <p>Saturday - Sunday: As available</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
