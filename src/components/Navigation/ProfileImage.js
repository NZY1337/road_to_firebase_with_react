import React, { useState, useEffect } from "react";

const ProfileImage = ({ firebase, authUser }) => {
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    let userRef;
    if (authUser) {
      userRef = firebase.db.ref("users/" + authUser.uid + "/url");

      userRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setProfileImg(data);
      });
    }

    return () => {
      userRef && userRef.off("value");
    };
  }, [authUser, firebase.db]);

  return (
    authUser && (
      <img
        alt="user's profile img"
        src={profileImg}
        style={{ width: "30px", height: "30px", objectFit: "cover", borderRadius: "50%" }}
      />
    )
  );
};

export default ProfileImage;
