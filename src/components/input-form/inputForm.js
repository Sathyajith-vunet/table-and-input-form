import { useState } from "react";
import { Input } from "../Input/Input";
import { OutputRow } from "../OutputRow/OutputRow";
import "./inputForm.css";

const defaultInputObject = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function InputForm(props) {
  const [inputs, setInputs] = useState(defaultInputObject);
  const [submittedData, setSubmittedData] = useState({});
  const [errors, setErrors] = useState({});

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const disableSubmitButton = () => {
    let disable = false;
    Object.values(errors).forEach((val) => val.length > 0 && (disable = true));
    Object.keys(inputs).forEach((key) => {
      inputs[key].length === 0 && (disable = true);
    });
    return disable;
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    setSubmittedData({ ...inputs });
    setInputs(defaultInputObject);
    setErrors({});
  };

  const handleInputChange = (fieldName, fieldValue) => {
    const draftErrors = errors;
    switch (fieldName) {
      case "name":
        draftErrors.name =
          fieldValue.length < 5
            ? "Name must be at least 5 characters long!"
            : "";
        break;
      case "email":
        draftErrors.email = validEmailRegex.test(fieldValue)
          ? ""
          : "Email is not valid!";
        break;
      case "phone":
        draftErrors.phone =
          fieldValue.length < 10 || fieldValue.length > 10
            ? "Phone number should be 10 digits!"
            : "";
        break;
      case "address":
        draftErrors.address =
          fieldValue.length < 1
            ? "Address is a mandatory field. Enter a value!"
            : "";
        break;
      default:
        break;
    }

    setInputs({ ...inputs, [fieldName]: fieldValue });
    if (Object.values(submittedData).length > 0) setSubmittedData({});
    setErrors(draftErrors);
  };

  const inputFormMetaData = [
    {
      type: "text",
      required: true,
      name: "name",
      handleInputChange: handleInputChange,
      errors: errors,
      value: inputs.name,
    },
    {
      type: "text",
      required: true,
      name: "email",
      handleInputChange: handleInputChange,
      errors: errors,
      value: inputs.email,
    },
    {
      type: "text",
      required: true,
      name: "phone",
      handleInputChange: handleInputChange,
      errors: errors,
      value: inputs.phone,
    },
    {
      type: "text",
      required: true,
      name: "address",
      handleInputChange: handleInputChange,
      errors: errors,
      value: inputs.address,
    },
  ];

  const outputRowMetaData = [
    {
      classname: "",
      label: "Name",
      value: submittedData.name,
    },
    {
      classname: "",
      label: "Email",
      value: submittedData.email,
    },
    {
      classname: "",
      label: "Phone",
      value: submittedData.phone,
    },
    {
      classname: "",
      label: "Address",
      value: submittedData.address,
    },
  ];

  const renderInputForm = () => {
    return inputFormMetaData.map((inputItem) => {
      return <Input {...inputItem} />;
    });
  };

  const renderOutputRows = () => {
    return outputRowMetaData.map((outputRow) => {
      return <OutputRow {...outputRow} />;
    });
  };

  return (
    <div className="form-wrapper">
      <div className="input-section">
        <form className="input-form">
          {renderInputForm()}
          <div className="form-actions">
            <button
              className="submit-button"
              type="reset"
              disabled={disableSubmitButton()}
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="output-section">{renderOutputRows()}</div>
    </div>
  );
}
