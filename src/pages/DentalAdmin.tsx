import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, FileText, Settings, Clock, DollarSign } from "lucide-react";

const DentalAdmin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const stats = [
    { title: "Today's Appointments", value: "12", icon: Calendar, color: "text-primary" },
    { title: "Total Patients", value: "1,247", icon: Users, color: "text-secondary" },
    { title: "Pending Treatments", value: "8", icon: FileText, color: "text-accent" },
    { title: "Revenue (Month)", value: "₹45,000", icon: DollarSign, color: "text-primary" },
  ];

  const todaysAppointments = [
    { id: 1, patient: "Rajesh Kumar", time: "09:00 AM", treatment: "Cleaning", status: "confirmed" },
    { id: 2, patient: "Priya Sharma", time: "10:30 AM", treatment: "Root Canal", status: "in-progress" },
    { id: 3, patient: "Amit Singh", time: "02:00 PM", treatment: "Filling", status: "waiting" },
    { id: 4, patient: "Sunita Devi", time: "03:30 PM", treatment: "Checkup", status: "confirmed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-primary text-primary-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      case "waiting": return "bg-secondary text-secondary-foreground";
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
            <h1 className="text-3xl font-bold text-foreground">Dental Admin Panel</h1>
            <p className="text-muted-foreground">Manage your dental practice efficiently</p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>
                  Manage today's patient appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="font-medium">{appointment.patient}</div>
                      <Badge variant="outline">{appointment.time}</Badge>
                      <span className="text-sm text-muted-foreground">{appointment.treatment}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Treatment Plan
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Generate Bill
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Dental Practice Management System • Secure & HIPAA Compliant
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>🦷 Digital Dentistry</span>
            <span>•</span>
            <span>Built with Care</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalAdmin;