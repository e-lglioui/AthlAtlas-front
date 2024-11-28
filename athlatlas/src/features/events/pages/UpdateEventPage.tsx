import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Title } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventService } from '../services/event.service';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";

export function UpdateEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    startDate: '',
    endDate: '',
    prix: '',
    participantnbr: '',
  });

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      const event = await eventService.getEventById(eventId);
      // Formatage des dates pour l'input datetime-local
      const formatDate = (date: string) => {
        return new Date(date).toISOString().slice(0, 16);
      };

      setFormData({
        name: event.name,
        bio: event.bio,
        startDate: formatDate(event.startDate),
        endDate: formatDate(event.endDate),
        prix: event.prix.toString(),
        participantnbr: event.participantnbr.toString(),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive",
      });
      navigate('/dashboard/events');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedEvent = {
        ...formData,
        prix: parseFloat(formData.prix),
        participantnbr: parseInt(formData.participantnbr),
        userId: user?.id,
      };

      await eventService.updateEvent(id!, updatedEvent);
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
      navigate(`/dashboard/events/${id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/dashboard/events/${id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Event
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <div className="p-6">
          <Title className="mb-6">Update Event</Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter event name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                placeholder="Enter event description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Participants</label>
                <Input
                  type="number"
                  name="participantnbr"
                  value={formData.participantnbr}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/dashboard/events/${id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Event'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </motion.div>
  );
} 