import React from 'react'

export default function Header({title,image,description}) {
  return (
    <>
      <div className="container-fluid mx-3 p-3 header-container rounded-3 ">
        <div className="row align-items-center">
          <div className="col-md-6">
          <div className="content">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <img src={image} alt='header-img'/>
          </div>
        </div>
      </div>
    </>
  )
}
