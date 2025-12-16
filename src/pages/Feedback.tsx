import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageSquare, Star } from "lucide-react";

const formSchema = z.object({
  patientName: z.string().min(2, "Name is required").max(100),
  patientNIC: z.string().min(10, "NIC is required").max(12),
  appointmentId: z.string().min(1, "Appointment ID is required"),
  doctorName: z.string().min(2, "Doctor name is required").max(100),
  rating: z.string().min(1, "Please provide a rating"),
  serviceQuality: z.string().min(1, "Please rate the service quality"),
  comments: z.string().min(10, "Comments must be at least 10 characters").max(1000),
});

const Feedback = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      patientNIC: "",
      appointmentId: "",
      doctorName: "",
      comments: "",
    },
  });

  const watchRating = form.watch("rating");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Feedback submission:", values);
      toast.success("Thank you for your feedback!", {
        description: "Your feedback helps us improve our services.",
      });
      form.reset();
    } catch (error) {
      toast.error("Submission failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const rating = watchRating || "0";

  const renderStars = (ratingValue: string) => {
    const ratingNum = parseInt(ratingValue);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => form.setValue("rating", star.toString())}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${
                star <= (hoveredRating || ratingNum || 0)
                  ? "fill-accent text-accent"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Service Feedback</CardTitle>
              <CardDescription>Share your experience and help us improve</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientNIC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient NIC</FormLabel>
                      <FormControl>
                        <Input placeholder="200012345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appointmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment ID</FormLabel>
                      <FormControl>
                        <Input placeholder="APT-2025-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="rating"
                render={() => (
                  <FormItem>
                    <FormLabel>Overall Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        {renderStars(rating)}
                        <span className="text-sm text-muted-foreground">
                          {parseInt(rating) > 0 && `${rating} out of 5 stars`}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceQuality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Quality Rating</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {["Poor", "Fair", "Good", "Very Good", "Excellent"].map((quality) => (
                          <Button
                            key={quality}
                            type="button"
                            variant={field.value === quality ? "default" : "outline"}
                            size="sm"
                            className="w-full md:w-auto"
                            onClick={() => field.onChange(quality)}
                          >
                            {quality}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments & Suggestions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please share your experience, suggestions, or any concerns..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
