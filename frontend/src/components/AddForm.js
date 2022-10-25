import React from "react";

const AddForm = ({ handleFormSubmit, handleFormDataChange }) => {
  return (
    <form>
      <label>
        Company
        <input type="text" name="company" onChange={handleFormDataChange} />
      </label>{" "}
      <label>
        Position
        <input type="text" name="position" onChange={handleFormDataChange} />
      </label>{" "}
      <label>
        Date <input type="date" name="date" onChange={handleFormDataChange} />
      </label>{" "}
      <label>
        Skills{" "}
        <input type="text" name="skills" onChange={handleFormDataChange} />
      </label>{" "}
      <label>
        Contacts{" "}
        <input type="text" name="contacts" onChange={handleFormDataChange} />{" "}
      </label>{" "}
      <label>
        Status{" "}
        <select name="status" onChange={handleFormDataChange}>
          <option value="Applied">Applied</option>
          <option value="In Process">In Process</option>
          <option value="Rejected">Rejected</option>
          <option value="Online Assessment">Online Assessment</option>
          <option value="Phone Interview">Phone Interview</option>
          <option value="Onsite Interview">Onsite Interview</option>
          <option value="Behavioral Interview">Behavioral Interview</option>
          <option value="Final Interview">Final Interview</option>
          <option value="Offer">Offer</option>
          <option value="Accepted Offer">Accepted Offer</option>
          <option value="Rejected Offer">Declined Offer</option>
        </select>
      </label>{" "}
      <br />
      <br />
      <button onClick={handleFormSubmit}>Add Job</button>
    </form>
  );
};

export default AddForm;
