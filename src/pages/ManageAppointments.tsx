import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";

const formSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  patientNIC: z.string().min(10, "NIC is required").max(12),
  action: z.enum(["update", "cancel"], {
    required_error: "Please select an action",
  }),
  newDate: z.string().optional(),
  newTime: z.string().optional(),
  reason: z.string().min(5, "Reason must be at least 5 characters").max(500),
});

const ManageAppointments = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appointmentId: "",
      patientNIC: "",
      reason: "",
    },
  });

  const watchAction = form.watch("action");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Appointment management:", values);
      
      if (values.action === "cancel") {
        toast.success("Appointment cancelled", {
          description: "Your appointment has been cancelled successfully.",
        });
      } else {
        toast.success("Appointment updated", {
          description: "Your appointment has been rescheduled successfully.",
        });
      }
      
      form.reset();
    } catch (error) {
      toast.error("Operation failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-2xl">Manage Appointments</CardTitle>
              <CardDescription>Update or cancel existing appointments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="action"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Action</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="update">Update Appointment</SelectItem>
                          <SelectItem value="cancel">Cancel Appointment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchAction === "update" && (
                  <>
                    <FormField
                      control={form.control}
                      name="newDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="09:00">09:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">02:00 PM</SelectItem>
                              <SelectItem value="15:00">03:00 PM</SelectItem>
                              <SelectItem value="16:00">04:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchAction === "cancel" ? "Reason for Cancellation" : "Reason for Update"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          watchAction === "cancel"
                            ? "Please provide a reason for cancellation..."
                            : "Please provide a reason for rescheduling..."
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
                variant={watchAction === "cancel" ? "destructive" : "default"}
              >
                {isSubmitting 
                  ? "Processing..." 
                  : watchAction === "cancel" 
                    ? "Cancel Appointment" 
                    : "Update Appointment"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAppointments;
