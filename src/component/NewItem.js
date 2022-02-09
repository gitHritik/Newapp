import React from "react";

const NewItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date,source } = props;
    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex: "1"}}>
           {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://www.swissinfo.ch/resource/image/45945846/landscape_ratio16x9/1920/1080/caa0764b3418d762daa605efa298d327/00A4B15C884C1E8D3D2F927F0EACC09B/fallback-1200x630-swi.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-primary btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}
export default NewItem