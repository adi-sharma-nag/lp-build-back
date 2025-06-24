import React from 'react'

export default function Security() {
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Security</h1>
      <p className="text-gray-700">
        Requests to the backend are protected by basic authentication and a secret API key as
        defined in <code>backend/main.py</code>.
      </p>
    </div>
  )
}
