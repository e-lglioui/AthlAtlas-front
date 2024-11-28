import { useState, useEffect } from 'react';
import {
  Card,
  Title,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from "@tremor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';
import { eventService } from '../services/event.service';
import type { Event } from '../types/event.types';
import { useAuth } from '@/hooks/useAuth';
import { PlusIcon, SearchIcon, DownloadIcon } from 'lucide-react';
import { CreateEventForm } from '../components/CreateEventForm';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

export function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const event = await eventService.searchEvents(searchTerm);
        setEvents(event ? [event] : []);
      } catch (error) {
        console.error('Error searching events:', error);
      }
    } else {
      loadEvents();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        loadEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleExport = async (id: string) => {
    try {
      await eventService.exportParticipants(id);
    } catch (error) {
      console.error('Error exporting participants:', error);
    }
  };

  const handleCreateSuccess = () => {
    loadEvents(); // Recharge la liste des événements
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title>Events Management</Title>
        <Button onClick={() => navigate('/dashboard/events/create')}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <CreateEventForm 
              onSuccess={handleCreateSuccess}
              onClose={() => setShowCreateForm(false)}
            />
            <Button 
              variant="outline" 
              onClick={() => setShowCreateForm(false)} 
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          <Card>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Participants</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Start Date</TableHeaderCell>
                  <TableHeaderCell>End Date</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.bio}</TableCell>
                    <TableCell>
                      <Badge color="blue">
                        {event.participantnbr}
                      </Badge>
                    </TableCell>
                    <TableCell>${event.prix}</TableCell>
                    <TableCell>
                      {format(new Date(event.startDate), 'PPp')}
                    </TableCell>
                    <TableCell>
                      {format(new Date(event.endDate), 'PPp')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExport(event._id)}
                        >
                          <DownloadIcon className="h-4 w-4" />
                        </Button>
                        {user?.id === event.userId && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(event._id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </div>
  );
} 