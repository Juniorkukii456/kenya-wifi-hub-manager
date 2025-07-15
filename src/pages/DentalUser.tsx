import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Clock, User, Phone, Heart } from "lucide-react";

const DentalUser = () => {
  const [upcomingAppointments] = useState([
    { id: 1, date: "2024-07-20", time: "10:00 AM", doctor: "Dr. Priya Patel", treatment: "Regular Checkup", status: "confirmed" },
    { id: 2, date: "2024-08-15", time: "02:30 PM", doctor: "Dr. Rajesh Kumar", treatment: "Teeth Cleaning", status: "scheduled" },
  ]);

  const [treatmentHistory] = useState([
    { id: 1, date: "2024-06-15", treatment: "Dental Filling", doctor: "Dr. Priya Patel", cost: "₹2,500", status: "completed" },
    { id: 2, date: "2024-05-10", treatment: "Root Canal", doctor: "Dr. Rajesh Kumar", cost: "₹8,000", status: "completed" },
    { id: 3, date: "2024-03-22", treatment: "Teeth Cleaning", doctor: "Dr. Priya Patel", cost: "₹1,200", status: "completed" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-secondary text-secondary-foreground";
      case "completed": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      <div className="container mx-auto px-4 py-6 space-y-6 lg:pl-72">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dental Care</h1>
            <p className="text-muted-foreground">Manage your dental health and appointments</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        {/* Welcome Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Welcome Back, Patient!
            </CardTitle>
            <CardDescription>
              Keep track of your dental health journey with us
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="font-semibold">Next Appointment</div>
              <div className="text-sm text-muted-foreground">July 20, 2024</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-secondary" />
              <div className="font-semibold">Total Treatments</div>
              <div className="text-sm text-muted-foreground">{treatmentHistory.length} completed</div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
              <div className="font-semibold">Last Visit</div>
              <div className="text-sm text-muted-foreground">June 15, 2024</div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                Your scheduled dental visits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{appointment.treatment}</div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      📅 {appointment.date} at {appointment.time}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      👨‍⚕️ {appointment.doctor}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm" variant="outline">Cancel</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming appointments
                </div>
              )}
            </CardContent>
          </Card>

          {/* Treatment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Treatment History
              </CardTitle>
              <CardDescription>
                Your past dental treatments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {treatmentHistory.map((treatment) => (
                <div key={treatment.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{treatment.treatment}</div>
                    <Badge className={getStatusColor(treatment.status)}>
                      {treatment.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    📅 {treatment.date} • 👨‍⚕️ {treatment.doctor}
                  </div>
                  <div className="text-sm font-medium text-primary">
                    Cost: {treatment.cost}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your dental care easily
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button className="flex flex-col h-20" variant="outline">
                <Calendar className="h-6 w-6 mb-2" />
                Book Appointment
              </Button>
              <Button className="flex flex-col h-20" variant="outline">
                <FileText className="h-6 w-6 mb-2" />
                View Reports
              </Button>
              <Button className="flex flex-col h-20" variant="outline">
                <User className="h-6 w-6 mb-2" />
                Update Profile
              </Button>
              <Button className="flex flex-col h-20" variant="outline">
                <Phone className="h-6 w-6 mb-2" />
                Contact Clinic
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Your Dental Health Portal • Secure & Private
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🦷 Healthy Smiles</span>
            <span>•</span>
            <span>Quality Care</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalUser;