import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Loader from "../Loader/"
import "./page.sass";
import Profile from "./profile/Profile";
import ListCart from "./listCard/ListCart";
import Tabulador from "../tabulador/Tabulador";
import FormContact from "./formContact/FormContact";

export default ({ onclick, state }) => {

  const [tab, setTab] = useState(1)

  const [value] = useCollection(db.collection("datos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });
  const [videos, load, error] = useCollection(db.collection("videos"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });

  return (

    <section className={`page  ${state && "active"} ${load && "load"}`}>

      {load && <Loader />}
      {error && <span> error </span>}
      {
        (videos && value) &&
        <>
          <Profile value={value} />
          <Tabulador onCli={re => setTab(re)}>
            {
              tab === 1 ?
                <ListCart onclick={onclick} videos={videos} />
                :
                tab === 3 &&
                <FormContact />
            }
          </Tabulador>
        </>
      }

    </section>
  );
};
