import React, { useState, useEffect } from 'react'

function Gmap() {
  const [userLocation, setUserLocation] = useState({ lat: -1.2884, lng: 36.8233 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setLoading(false)
        },
        (err) => {
          console.error('Error getting location:', err)
          setError('Unable to get your location. Showing default location.')
          setLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Getting your location...</p>
        </div>
      </div>
    )
  }

  // Use Google Maps Embed API - works without API key for basic embeds
  const embedUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg relative">
      {error && (
        <div className="bg-yellow-600 text-black px-4 py-2 text-sm text-center absolute top-0 left-0 right-0 z-10">
          {error}
        </div>
      )}
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title="Your Location"
        className="w-full h-full"
      ></iframe>
    </div>
  )
}

export default Gmap
