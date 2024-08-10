import React from 'react'

export default function DeleteConfirmation({deleteitem}) {
  return (
    <div className='text-center'>
    <img src='\src\assets\images\ask-for-insure.svg' alt='ask-for-insure'/>
    <h4 className='my-3'>Delete This {deleteitem}</h4>
    <span className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</span>
   
    </div>
  )
}
