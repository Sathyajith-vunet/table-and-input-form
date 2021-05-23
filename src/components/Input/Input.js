import { formatHeader } from "../../utilityFunctions";
import './Input.css';

export function Input(props) {
  return (
    <>
      <label htmlFor="name">{formatHeader(props.name)}:</label>
      {props.type === 'text' && <input
        type={props.type}
        required={props.required}
        value={props.value}
        name={props.name}
        onChange={(e) =>
          props.handleInputChange(props.name, e.target.value)
        }
      />}
      {props.type === 'textarea' && <textarea
        required={props.required}
        value={props.value}
        name={props.name}
        onChange={(e) =>
          props.handleInputChange(props.name, e.target.value)
        }
      />}
      <div className="error">
        {props.errors[props.name] && props.errors[props.name].length > 0 && (
          <span>{props.errors[props.name]}</span>
        )}
      </div>
    </>
  );
}
