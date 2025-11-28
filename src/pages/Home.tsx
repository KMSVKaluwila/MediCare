import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Stethoscope, Calendar, ClipboardList, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Patient Registration",
    description: "Register new patients with complete medical details",
    icon: UserPlus,
    path: "/patient-registration",
    color: "text-primary",
  },
  {
    title: "Doctor Registration",
    description: "Register doctors with specialization and availability",
    icon: Stethoscope,
    path: "/doctor-registration",
    color: "text-accent",
  },
  {
    title: "Book Appointment",
    description: "Schedule appointments with available doctors",
    icon: Calendar,
    path: "/book-appointment",
    color: "text-primary",
  },
  {
    title: "Manage Appointments",
    description: "Update or cancel existing appointments",
    icon: ClipboardList,
    path: "/manage-appointments",
    color: "text-accent",
  },
  {
    title: "Feedback",
    description: "Share your experience and rate our services",
    icon: MessageSquare,
    path: "/feedback",
    color: "text-primary",
  },
];

const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Welcome to <span className="text-primary">MediCare</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner in healthcare management. Book appointments, manage records, and access quality medical care.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-primary hover:underline font-medium">
                    Get Started →
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      <section className="bg-card rounded-lg border p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Need Assistance?</h2>
        <p className="text-muted-foreground">
          Our support team is available 24/7 to help you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="text-sm">
            <span className="font-medium text-foreground">Emergency:</span>{" "}
            <span className="text-primary">+94 11 123 4567</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-foreground">Email:</span>{" "}
            <span className="text-primary">support@medicare.lk</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
