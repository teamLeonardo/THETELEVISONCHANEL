import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { CardHover } from "./card";
import "./page.css";
export default ({ onclick, state }) => {
  const [value] = useCollection(db.collection("datos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  const [videos, load] = useCollection(db.collection("videos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  return (
    <section className={state ? "page active" : "page"}>
      <div className="profile">
        <div
          className="avatar"
          style={{
            background: `url("${
              value && value.docs[0].data().imagen
            }") center center/cover`
          }}
        ></div>
        <div className="title"> {value && value.docs[0].data().nombre}</div>
        <div className="description">
          {value && value.docs[0].data().descripcion}
        </div>
        <div
          className="btn-segir"
          onClick={() => {
            if (value) {
              if (auth.currentUser) {
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
              } else {
                const provider = new auth.GoogleAuthProvider();

                auth()
                  .signInWithPopup(provider)
                  .then((result) => {
                    console.log(JSON.stringify(result));
                  })
                  .catch((error) => {
                    console.log(JSON.stringify(error));
                  });
              }
            }
          }}
        >
          Segir
        </div>
      </div>
      <div className="area-video">
        <div className="title-video">Gallery:</div>
        <div className="list-video">
          {load && <span>loading...</span>}
          {videos &&
            videos.docs.map((doc) => {
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
    </section>
  );
};
