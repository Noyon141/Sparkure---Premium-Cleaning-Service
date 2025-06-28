"use client";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cleaning } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserHistoryList() {
  const [cleanings, setCleanings] = useState<Cleaning[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");

  const fetchCleanings = useCallback(async () => {
    try {
      // Build query parameters for backend filtering
      const params = new URLSearchParams();
      if (filterDateFrom) params.append("dateFrom", filterDateFrom);
      if (filterDateTo) params.append("dateTo", filterDateTo);
      if (filterServiceType) params.append("serviceType", filterServiceType);

      const response = await fetch(`/api/history?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setCleanings(data.cleanings || []);
      } else {
        toast.error("Failed to load history");
      }
    } catch (error) {
      console.error("Error fetching cleanings:", error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  }, [filterDateFrom, filterDateTo, filterServiceType]);

  useEffect(() => {
    fetchCleanings();
  }, [fetchCleanings]);

  // Refetch when filters change
  useEffect(() => {
    fetchCleanings();
  }, [fetchCleanings]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/10 text-green-500";
      case "CANCELLED":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredCleanings = cleanings; // No client-side filtering needed since backend handles it

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-background/50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <Input
            type="date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <Input
            type="date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Service Type</label>
          <select
            value={filterServiceType}
            onChange={(e) => setFilterServiceType(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="">All Services</option>
            <option value="HOME_CLEANING">Home Cleaning</option>
            <option value="OFFICE_CLEANING">Office Cleaning</option>
            <option value="MOVE_IN_OUT">Move In/Out</option>
          </select>
        </div>
        <div className="flex items-end">
          <AnimatedButton
            onClick={() => {
              setFilterDateFrom("");
              setFilterDateTo("");
              setFilterServiceType("");
            }}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </AnimatedButton>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredCleanings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-200/80">No completed services found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCleanings.map((cleaning) => (
                <TableRow key={cleaning.id}>
                  <TableCell className="font-medium">
                    {cleaning.serviceType.replace("_", " ")}
                  </TableCell>
                  <TableCell>{formatDate(cleaning.date)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {cleaning.address}
                  </TableCell>
                  <TableCell>
                    {cleaning.employee
                      ? cleaning.employee.fullName
                      : "Not assigned"}
                  </TableCell>
                  <TableCell>
                    {cleaning.price ? `$${cleaning.price}` : "N/A"}
                  </TableCell>
                  <TableCell>
                    {cleaning.duration
                      ? `${Math.floor(cleaning.duration / 60)}h ${
                          cleaning.duration % 60
                        }m`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                        cleaning.status
                      )}`}
                    >
                      {cleaning.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
