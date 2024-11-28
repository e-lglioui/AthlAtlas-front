import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Title } from "@tremor/react";
import { Button } from "@/components/ui/button";
import { eventService } from '../services/event.service';
import type { Event } from '../types/event.types';
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';
import { motion } from "framer-motion";
import defaultEventImage from "../../../assets/images/event.jpg";
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign,
  ArrowLeft,
  Share2,
  Heart,
  Download,
  Edit,
  Trash2,
} from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isOwner = user?.id === event?.userId;

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
      navigate('/dashboard/events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    // Implémenter la logique d'inscription
    toast({
      title: "Success",
      description: "Registration successful!",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.name,
        text: event?.bio,
        url: window.location.href,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleDownloadParticipants = async () => {
    try {
      // Implémentez la logique de téléchargement
      const response = await eventService.downloadParticipants(event._id);
      // Créez un lien de tléchargement
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `participants-${event.name}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast({
        title: "Success",
        description: "Participants list downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download participants list",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await eventService.deleteEvent(event._id);
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      navigate('/dashboard/events');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/dashboard/events')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }

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
          onClick={() => navigate('/dashboard/events')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {isOwner && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={handleDownloadParticipants}
                title="Download participants list"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate(`/dashboard/events/edit/${event._id}`)}
                title="Edit event"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="relative group">
          {event.image ? (
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="relative h-[400px] overflow-hidden">

                <img
                  src={defaultEventImage}
                  alt="Default event"
                  className="w-full h-full object-cover absolute inset-0"
                />
                
             
            </div>
          )}

          {event.participantnbr === 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
              Sold Out
            </div>
          )}
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            <p className="text-gray-600 text-lg">{event.bio}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">
                    {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">
                    {format(new Date(event.startDate), 'h:mm a')} - 
                    {format(new Date(event.endDate), 'h:mm a')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">Event Location</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Available Tickets</p>
                  <p className="text-gray-600">{event.participantnbr} spots left</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Price</p>
                  <p className="text-gray-600">${event.prix}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            {isOwner ? (
              <div className="space-y-4">
                <Button 
                  className="w-full"
                  size="lg"
                  disabled={event.participantnbr === 0}
                  onClick={handleRegister}
                >
                  {event.participantnbr === 0 ? 'Sold Out' : 'Register Participant'}
                </Button>

                <div className="flex gap-4">
                  <Button 
                    className="flex-1"
                    variant="outline"
                    onClick={handleDownloadParticipants}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Participants
                  </Button>
                  <Button 
                    className="flex-1"
                    variant="outline"
                    onClick={() => navigate(`/dashboard/events/edit/${event._id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </Button>
                  <Button 
                    className="flex-1"
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Event
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-2">
                Contact the event organizer for registration
              </div>
            )}
          </div>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
} 