import React from "react";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
// import {useDownloadURL  } from "react-firebase-hooks/storage";
import { auth, db } from "../../firebase";
import Loader from "../Loader";
// import Modal from "../modal";
import { CardHover } from "./card";
import Modal from "rodal"
import 'rodal/lib/rodal.css';
import "./page.css";

export default ({ onclick, state }) => {

  const [show, setShow] = useState(false)

  const [value] = useCollection(db.collection("datos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  const [videos, load, error] = useCollection(db.collection("videos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });

  const incrementar = () => {
    db.collection("datos")
      .doc(value.docs[0].id)
      .update({
        numSegidores: value.docs[0].data().numSegidores + 1
      })
      .then(() => {
        console.log(
          "Estas siguentdo a " + value.docs[0].data().nombre
        );
      });
  }
  const registrarAndFoll = async () => {
    if (value) {
      // console.log(auth().currentUser);
      if (!auth().currentUser) {
        const provider = new auth.GoogleAuthProvider();

        auth()
          .signInWithPopup(provider)
          .then((result) => {

            db.collection("peoplo")
              .doc(result.user.uid)
              .set(
                {
                  email: result.user.email,
                  name: result.user.displayName,
                  avatar: result.user.photoURL
                }
              ).then(() => {
                incrementar()
                alert("ya esta siguiendolo")
              }).catch((err) => {
                console.log(JSON.stringify(err));
              })
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          });
      } else {
        alert("ya esta siguiendolo")
      }
    }
  }

  return (

    <section className={`page  ${state && "active"} ${load && "load"} `}>

      {load && <Loader />}
      {error && <span> error </span>}
      {
        videos && value &&
        <>
          <Modal
            visible={show}
            onClose={() => setShow(false)}
            animation="rotate"
          >
            <div>asdasdasd</div>
          </Modal>
          <div className="profile">
            <div
              className="avatar"
              style={{
                background: `url("${value.docs[0].data().imagen
                  }") center center/cover`
              }}
            ></div>
            <div className="title"> {value.docs[0].data().nombre}</div>
            <div className="description">
              {value.docs[0].data().descripcion}
            </div>
            <div
              className="btn-segir"
              onClick={registrarAndFoll}
            >
              Follow
            </div>
            <div
              className="btn-segir"
              onClick={() => { setShow(true) }}
            >
              Contact
            </div>
          </div>
          <div className="area-video">
            <div className="list-video">
              {videos.docs.map((doc) => {
                return (
                  <CardHover
                    datos={{ id: doc.id, ...doc.data() }}
                    click={(res, video) => {
                      onclick(res, video);
                    }}
                    key={doc.id}
                  />
                );
              })}
            </div>
          </div>
        </>
      }

    </section>
  );
};
