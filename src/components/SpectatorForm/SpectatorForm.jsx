import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SpectatorForm.css";

import { SpectatorsContext } from "./../../contexts/SpectatorsContext";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email(),
});

let defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
};

export default function SpectatorForm({ Spectator }) {
  let history = useHistory();
  const { addSpectator, updateSpectator } = useContext(SpectatorsContext);

  let submitHandler = () => {};

  if (Spectator) {
    submitHandler = (vals, e) => {
      console.log("update vals", vals);
      updateSpectator(Spectator.id, vals);
      history.push("/"); // don't need to reset form because unmounting...
    };
    // Do something
  } else {
    submitHandler = (vals, e) => {
      console.log("add vals", vals);
      reset(defaultValues);
      addSpectator(vals);
    };
  }

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: Spectator || defaultValues,
  });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-row">
        <label htmlFor="firstName" className="field-name">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          {...register("firstName")}
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <label htmlFor="firstName" role="alert" className="error">
            {errors.firstName?.message}
          </label>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="lastName" className="field-name">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          {...register("lastName")}
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <label htmlFor="lastName" role="alert" className="error">
            {errors.lastName?.message}
          </label>
        )}
      </div>


      <div className="form-row">
        <label htmlFor="email" className="field-name">
          <abbr title="break horse power">Email</abbr>
        </label>
        <input
          id="email"
          type="text"
          name="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <label htmlFor="email" role="alert" className="error">
            {errors.email?.message}
          </label>
        )}
      </div>
      
      <div className="form-row controls">
        {/* <p>{`${!isValid && isDirty}`}</p>
        <p>Valid: {`${isValid}`}</p>
        <p>Dirty: {`${isDirty}`}</p>
        <p>Submitting: {`${isSubmitting}`}</p> */}
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
        <button type="submit" disabled={isSubmitting || (!isValid || !isDirty)}>
          Submit
        </button>
      </div>
    </form>
  );
}
