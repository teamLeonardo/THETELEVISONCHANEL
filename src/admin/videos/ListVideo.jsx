import ItemList from "./ItemList"

export default ({ collectionVideos, onEdit, onDelete }) => {

    const [videos, load, error] = collectionVideos

    return <div className="listVideo">
        {videos &&
            videos.docs.map((doc) => {
                return <ItemList
                    key={doc.id}
                    data={{ id: doc.id, ...doc.data() }}
                    onEdit={onEdit}
                    onDelete={onDelete}

                />
            })
        }
        {load && "load omg"}
        {error && "error omg"}
    </div>
}