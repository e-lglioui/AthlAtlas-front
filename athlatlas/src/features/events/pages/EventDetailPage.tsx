import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Title } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { eventService } from '../services/event.service';
import type { Event } from '../types/event.types';
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';

export function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      const data = await eventService.getEventById(eventId);
      setEvent(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="space-y-6">
      <Title>Event Details</Title>
      
      <Card className="max-w-3xl mx-auto">
        {event.image && (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src={event.image}
              alt={event.name}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
            <p className="text-gray-600">{event.bio}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Date & Time</h3>
              <p>Starts: {format(new Date(event.startDate), 'PPp')}</p>
              <p>Ends: {format(new Date(event.endDate), 'PPp')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Tickets</h3>
              <p>Available: {event.participantnbr}</p>
              <p>Price: ${event.prix}</p>
            </div>
          </div>

          <Button className="w-full">
            Register for Event
          </Button>
        </div>
      </Card>
    </div>
  );
} 