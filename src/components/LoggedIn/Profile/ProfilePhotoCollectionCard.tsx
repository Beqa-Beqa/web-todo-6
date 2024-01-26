import { useState } from "react";
import BigImage from "./BigImage";

const ProfilePhotoCollectionCard = (props: {isOwner: boolean, src: string, alt: string}) => {
  const [isImageOpen, setIsImageOpen] = useState<{isOpen: boolean, imageSrc: string, type: string}>({isOpen: false, imageSrc: "", type: ""});

  return (
    <div className="col-xxl-4 col-lg-6 col-md-4 col-6">
      <div style={{height: 200}} className="bg-primary rounded overflow-hidden d-flex align-items-center justify-content-center">
        <img onClick={(e) => {
          const imageSrc = (e.target as HTMLImageElement).src;
          setIsImageOpen({isOpen: true, imageSrc: imageSrc, type: "profile"});
        }} className="photo-collection-image cursor-pointer object-fit-cover w-100" src={props.src} alt={props.alt} />
      </div>
      {isImageOpen.isOpen && 
        <BigImage 
          options={ props.isOwner ? 
            {hasDelete: true, hasUpload: false, hasDownload: true}
          : {hasDelete: false, hasUpload: false, hasDownload: true}
          } isImageOpen={isImageOpen} setIsImageOpen={setIsImageOpen} 
        />
      }
    </div>
  );
}

export default ProfilePhotoCollectionCard;