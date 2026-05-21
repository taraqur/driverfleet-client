"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const MyAddedCars = () => {
  const { data: session, isPending } = useSession();
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal State
  const [carToDelete, setCarToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit Modal State
  const [carToEdit, setCarToEdit] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const categories = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Sports'];

  const fetchMyCars = async () => {
    if (!session?.user?.email) return;

    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-cars?email=${session.user.email}`, {
        withCredentials: true
      });
      setMyCars(response.data);
    } catch (error) {
      console.error('Failed to fetch my cars:', error);
      toast.error('Failed to load your vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPending) {
      fetchMyCars();
    }
  }, [session, isPending]);

  const handleDeleteConfirm = async () => {
    if (!carToDelete) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${carToDelete._id}`, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success("Vehicle deleted successfully");
        setMyCars(myCars.filter(car => car._id !== carToDelete._id));
        setCarToDelete(null);
      }
    } catch (error) {
      console.error('Failed to delete car:', error);
      toast.error('Failed to delete the vehicle');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCarToEdit(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!carToEdit) return;

    setIsUpdating(true);
    try {
      const updateData = {
        price: carToEdit.price,
        description: carToEdit.description,
        availability: carToEdit.availability,
        imageUrl: carToEdit.imageUrl,
        type: carToEdit.type,
        location: carToEdit.location,
      };

      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/${carToEdit._id}`, updateData, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success("Vehicle updated successfully");
        // Update local state
        setMyCars(myCars.map(car =>
          car._id === carToEdit._id ? { ...car, ...updateData } : car
        ));
        setCarToEdit(null);
      }
    } catch (error) {
      console.error('Failed to update car:', error);
      toast.error('Failed to update the vehicle');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#f2ca50]/30 border-t-[#f2ca50] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 pt-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-montserrat)] text-white mb-2">My Added Cars</h1>
          <p className="text-white/60 font-[family-name:var(--font-inter)] text-lg">Manage the vehicles you have listed on DriveFleet.</p>
        </div>
        <Link href="/add-car" className="bg-[#f2ca50] text-black px-6 py-3 rounded-full font-semibold font-[family-name:var(--font-inter)] hover:bg-white transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add New Car
        </Link>
      </div>

      {myCars.length === 0 ? (
        <div className="bg-[#1a1814] border border-white/10 rounded-3xl p-16 text-center shadow-2xl">
          <span className="material-symbols-outlined text-7xl text-[#f2ca50]/50 mb-6">directions_car</span>
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-montserrat)]">No Cars Listed Yet</h2>
          <p className="text-white/60 mb-8 font-[family-name:var(--font-inter)] text-lg max-w-md mx-auto">Start earning by listing your premium vehicle on our exclusive platform.</p>
          <Link href="/add-car" className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-colors border border-white/10 font-medium font-[family-name:var(--font-inter)]">
            List Your Car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {myCars.map((car) => (
            <div key={car._id} className="bg-[#1a1814] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group shadow-xl">
              <div className="h-56 overflow-hidden relative">
                <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${car.availability === 'Available' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {car.availability || 'Available'}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-4 font-[family-name:var(--font-montserrat)]">{car.name}</h3>
                <div className="flex justify-between items-center mb-8 text-sm font-[family-name:var(--font-inter)] text-white/70 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 mb-1 tracking-wider uppercase font-bold">Daily Rate</span>
                    <span className="font-bold text-[#f2ca50] text-lg">${car.price}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-white/40 mb-1 tracking-wider uppercase font-bold">Bookings</span>
                    <span className="font-bold text-white text-lg">{car.bookingCount || 0}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCarToEdit(car)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold tracking-wide transition-colors border border-white/5 flex items-center justify-center gap-2 uppercase font-[family-name:var(--font-inter)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Update
                  </button>
                  <button
                    onClick={() => setCarToDelete(car)}
                    className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors border border-red-500/20 flex items-center justify-center gap-2 uppercase font-[family-name:var(--font-inter)]"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {carToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1a1814] border border-white/10 rounded-2xl p-8 max-w-sm w-full relative shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
            </div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white mb-2">Delete Vehicle?</h3>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-sm mb-8">
              Are you sure you want to permanently delete <strong className="text-white">{carToDelete.name}</strong> from your fleet? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCarToDelete(null)}
                className="flex-1 bg-white/10 text-white py-3 rounded-xl font-bold font-[family-name:var(--font-inter)] hover:bg-white/20 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold font-[family-name:var(--font-inter)] hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Update Modal */}
      {carToEdit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
          <div className="bg-[#1a1814] border border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl my-auto">
            <button
              onClick={() => setCarToEdit(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              disabled={isUpdating}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-white mb-2">Update Vehicle</h3>
            <p className="text-white/60 font-[family-name:var(--font-inter)] text-sm mb-8">Update the details for {carToEdit.name}.</p>

            <form onSubmit={handleEditSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Daily Rent Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={carToEdit.price}
                    onChange={handleEditChange}
                    className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                    required
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Availability Status</label>
                  <select
                    name="availability"
                    value={carToEdit.availability || 'Available'}
                    onChange={handleEditChange}
                    className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>

                {/* Car Type */}
                <div>
                  <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Car Type</label>
                  <select
                    name="type"
                    value={carToEdit.type}
                    onChange={handleEditChange}
                    className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={carToEdit.location || ''}
                    onChange={handleEditChange}
                    className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={carToEdit.imageUrl}
                  onChange={handleEditChange}
                  className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/70 text-[11px] uppercase tracking-wider font-bold mb-2 font-[family-name:var(--font-inter)]">Description</label>
                <textarea
                  name="description"
                  value={carToEdit.description}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full bg-[#110e07] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f2ca50]/50 resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCarToEdit(null)}
                  className="bg-white/5 text-white px-6 py-3 rounded-lg font-bold font-[family-name:var(--font-inter)] hover:bg-white/10 transition-colors"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#f2ca50] text-black px-8 py-3 rounded-lg font-bold font-[family-name:var(--font-inter)] hover:bg-white transition-colors"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyAddedCars;
