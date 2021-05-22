import "./tab.sass"
export default ({ onCli, children }) => {

    return <div className="tab-cont" >
        <div className="tab">
            <div className="item item-gallery" onClick={() => onCli(1)}> Gallery </div>
            <div className="item item-questions" onClick={() => onCli(2)}> Questions </div>
            <div className="item item-contact" onClick={() => onCli(3)} > Contact </div>
        </div>
        {children}
    </div>
}