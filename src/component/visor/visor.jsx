import "./visor.css";
export default ({ onclose, state, video }) => {
  return (
    <section className="visor">
      <span className="close-visor" onClick={() => onclose(false)}>
        <i className="fas fa-times-circle"></i>
      </span>
      {state === true && (
        <iframe title="elframer" className="ifr" src={video} />
      )}
    </section>
  );
};
