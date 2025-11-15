'use client';
// This component is EXPOSED to the Host MFE
import React, { useState } from 'react';

export default function SeatMap() {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

    const handleBooking = async () => {
        if (!selectedSeat) return;

        // CALL TO BFF API ROUTE
        const res = await fetch('/api/seats/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'U-001', seatId: selectedSeat, durationHours: 4 }),
        });

        if (res.ok) {
            alert(`Seat ${selectedSeat} booked successfully!`);
            // Update seat status locally or re-fetch map
        } else {
            const error = await res.json();
            alert(`Booking Failed: ${error.message}`); // Shows atomic booking failure (e.g., already reserved)
        }
    };
    
    // Solves: Seat Management (interactive, atomic reservation)
    return (
        <div className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Study Seat Reservation</h2>
            <div className="grid grid-cols-5 gap-2 mb-4">
                {/* Render seat grid (logic omitted for brevity) */}
                <button 
                    className={`p-2 rounded ${selectedSeat === 'A1' ? 'bg-green-500' : 'bg-gray-200'}`}
                    onClick={() => setSelectedSeat('A1')}>A1</button>
                {/* ... other seats ... */}
            </div>
            <button onClick={handleBooking} disabled={!selectedSeat}>
                Book Seat {selectedSeat}
            </button>
        </div>
    );
}