import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormInputComponent from "../Components/FormInputComponent";
import { toastArray } from "../Components/Toast";
import { toast } from "react-toastify";
import { auth } from "../firebaseConf";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Required field"),
    password: yup
      .string()
      .required("Required field")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Required field")
      .min(6, "Password must be at least 6 characters")
      .oneOf([yup.ref("password")], "passwords don't match"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        console.log("usersignup successfully!");
        toast.success("SignUp Successfull", toastArray);
      })
      .catch((error) => {
        console.log("error in signing in");
        toast.error("error", toastArray);
      });
  };

  return (
    <div className="flex flex-col w-6/12 p-4 mx-auto justify-center">
      <h1 className="text-center font-semibold">Sign Up </h1>
      <form id="hook-form" className="mt-16" onSubmit={handleSubmit(onSubmit)}>
        <FormInputComponent
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          control={control}
          error={errors?.email?.message}
          required
        />
        <FormInputComponent
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          control={control}
          error={errors?.password?.message}
          required
        />
        <FormInputComponent
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Enter your password"
          control={control}
          error={errors?.confirmPassword?.message}
          required
        />
      </form>
      <button
        type="submit"
        form="hook-form"
        className="w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg"
        onClick={() => {
          navigate("/signin");
        }}
      >
        {" "}
        Sign Up
      </button>
      <h5 className="mt-4">
        Already have an account?
        <span
          className="text-primaryLight mx-2 underline cursor-pointer"
          onClick={() => {
            navigate("/signin");
          }}
        >
          SignIn
        </span>
      </h5>
    </div>
  );
}

export default SignUp;
