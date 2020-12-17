import React from 'react'

export default function Users({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Role: {details.role}</p>
      <p>Terms of Service Status: {details.tos ? "accepted" : "denied by user"}</p>
    </div>
  )
}

