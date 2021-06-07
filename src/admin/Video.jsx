import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import AddVideos from "./videos/AddVideos";
import ListVideo from "./videos/ListVideo"
import "./styles/video.sass"
export default () => {
    const collectionVideos = useCollection(db.collection("videos"), {
        snapshotListenOptions: { includeMetadataChanges: true }
    });
    return <div className="cont-video">
        <AddVideos />
        <ListVideo collectionVideos={collectionVideos} onEdit={(re) => { console.log(re) }} onDelete={(re) => { console.log(re) }} />
    </div>
}