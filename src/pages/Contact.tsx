import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    situation: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us. We will reach out within one business day.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="section-padding bg-secondary/50">
          <div className="container max-w-4xl text-center">
            <h1 className="heading-hero mb-4">
              Schedule Your Free Consultation
            </h1>
            <p className="text-body text-lg max-w-2xl mx-auto">
              Take the first step. Fill out the form below or call us directly. All communications are confidential and protected by attorney-client privilege.
            </p>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              {/* Form */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="(614) 555-1234"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="situation" className="text-foreground">What best describes your situation? *</Label>
                    <select
                      id="situation"
                      name="situation"
                      required
                      value={formData.situation}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Select one...</option>
                      <option value="divorce">Considering or filing for divorce</option>
                      <option value="custody">Child custody or parenting dispute</option>
                      <option value="modification">Modifying existing order</option>
                      <option value="assets">Complex property/asset division</option>
                      <option value="mediation">Interested in mediation</option>
                      <option value="other">Other family law matter</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-foreground">Tell us briefly about your situation</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2"
                      placeholder="Share what's happening and what you're hoping to achieve. This helps us prepare for your consultation."
                    />
                  </div>

                  <button type="submit" className="btn-cta w-full sm:w-auto">
                    Request Free Consultation
                  </button>

                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Your information is confidential and protected.
                  </p>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2">
                <div className="card-elevated sticky top-24">
                  <h2 className="heading-subsection mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Call Us</p>
                        <a href="tel:+16145551234" className="text-muted-foreground hover:text-primary transition-colors">
                          (614) 555-1234
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Email Us</p>
                        <a href="mailto:info@morrisonfamilylaw.com" className="text-muted-foreground hover:text-primary transition-colors">
                          info@morrisonfamilylaw.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Visit Us</p>
                        <p className="text-muted-foreground">
                          250 Civic Center Dr, Suite 400<br />
                          Columbus, OH 43215
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Office Hours</p>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:30 AM - 5:30 PM<br />
                          Evenings & weekends by appointment
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      We respond to all inquiries within one business day. For urgent matters, please call directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
