import {
  getsessions,
  deletesession,
  savesession,
} from "../../services/sessionService";

const Button = ({ title, activeClass, _callback, Ref }) => {
  if (title === "Work" || title === "Break") {
    return (
      <button className={activeClass} onClick={_callback}>
        {title}
      </button>
    );
  }
  if (title === "Quit") {
    return (
      <div className="form-control">
        <label for="cars">Why you want to quit?</label>

        <select className="form-control mb-3" ref={Ref} id="cars">
          <option value="1">Interrupted by phone</option>
          <option value="3">Interrupted by someone</option>
          <option value="2">Need to drink or eat</option>
          <option value="4">Fatigue</option>
          <option value="5">Reached my goal</option>
        </select>

        <button className={activeClass} onClick={_callback}>
          {title}
        </button>
      </div>
    );
  }
  return (
    <button className={activeClass} onClick={_callback}>
      {title}
    </button>
  );
};
export default Button;
