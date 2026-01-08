import React, { useEffect, useRef } from 'react'
import Gmap from '../Gmap/gmap'

function Home() {
  const divRef = useRef(null);
  
  useEffect(() => {
    // #region agent log
    if (divRef.current) {
      const computedStyle = window.getComputedStyle(divRef.current);
      const bgColor = computedStyle.backgroundColor;
      const className = divRef.current.className;
      fetch('http://127.0.0.1:7242/ingest/2292f239-9e27-46e6-a5a4-17a0e885d052',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.jsx:useEffect',message:'Home component rendered - checking styles',data:{className,backgroundColor:bgColor,hasBgBlack:className.includes('bg-black')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    }
    // #endregion
  }, []);

  return (
    <div ref={divRef} className='bg-black text-white min-h-screen'>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to H.O.P.E</h1>
        
        {/* Google Maps Live Location Section */}
        <section className="mt-12 mb-8">
          <h2 className="text-3xl font-semibold text-center mb-2">Your Current Location</h2>
          <p className="text-center text-gray-400 mb-6">Live location on Google Maps</p>
          <div className="w-full max-w-6xl mx-auto">
            <Gmap />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
