import './OutputRow.css';

export function OutputRow (props) {
    return (
        <div className={`${props.classname}-row`}>
          <div className="key">{props.label}: </div>
          <div className="value">{props.value}</div>
        </div>
    );
}