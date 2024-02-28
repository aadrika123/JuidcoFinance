"use client";

import Button from "@/components/global/atoms/Button";
import Checkboxes from "@/components/global/atoms/Checkbox";
import Input from "@/components/global/atoms/Input";
import RadioButtons from "@/components/global/atoms/RadioButton";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/authReducer";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import toast, { Toaster } from "react-hot-toast";

interface LoginInitialData {
  role: string;
  user_id: string;
  password: string;
  keep: string;
  designation: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const [stateData, setStateData] = useState({
    options: [],
    designations: [],
    selectUdhd: "1",
  });
  const { options, designations, selectUdhd } = stateData;
  const LoginSchema = Yup.object().shape({
    role: Yup.string().required("Required is required"),
    designation: Yup.number().required("Designation is required"),
    user_id: Yup.string().required("User Id is required"),
    password: Yup.string().required("Password is required"),
    keep: Yup.boolean(),
  });

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await axios({
      url: `${FINANCE_URL.AUTH_URL.getDesig}/${e.target.value}`,
      method: "GET",
    });
    setStateData((prev) => ({ ...prev, designations: res.data.data }));
    setStateData((prev) => ({ ...prev, selectUdhd: e.target.value }));
  };

  //////////////// Handling useEffect for initialize the UDHDs //////////
  useEffect(() => {
    const getUDHDs = async () => {
      const res = await axios({
        url: FINANCE_URL.AUTH_URL.getUDHD,
        method: "GET",
      });

      const options = res.data.data.map(
        (item: { id: number; name: string }) => {
          return {
            key: item.name,
            value: String(item.id),
          };
        }
      );
      setStateData((prev) => ({ ...prev, options: options }));
    };
    const getDesi = async () => {
      const res = await axios({
        url: `${FINANCE_URL.AUTH_URL.getDesig}/1`,
        method: "GET",
      });
      setStateData((prev) => ({ ...prev, designations: res.data.data }));
    };
    getUDHDs();
    getDesi();
  }, []);

  ///////////////// Handling Login Logics /////////////
  const handleLogin = async (values: LoginInitialData) => {
    try {
      const res = await axios({
        url: FINANCE_URL.AUTH_URL.login,
        method: "POST",
        data: {
          user_id: values.user_id,
          password: values.password,
          designation_id: values.designation,
        },
      });

      res.data.data
        ? (dispatch(login(res.data.data)),
          window.location.replace("/finance/masters"))
        : toast.error("Somethign Went Wrong!!");
    } catch (error) {
      toast.error("Something Went Wrong!!");
      console.log(error);
    }
  };

  return (
    <div className="absolute gap-5 flex flex-col justify-center items-center p-12 bg-white rounded-xl">
      <Toaster />
      <img className="w-12 h-12" src="/Jhar_logo.png" alt="jhar-logo" />
      <div className="my-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
        >
          <path
            d="M10.4951 10.3362C10.2631 10.3362 10.0407 10.4199 9.87665 10.5691C9.71263 10.7182 9.62048 10.9204 9.62048 11.1313V13.5167C9.62048 13.7275 9.71263 13.9298 9.87665 14.0789C10.0407 14.228 10.2631 14.3118 10.4951 14.3118C10.7271 14.3118 10.9495 14.228 11.1136 14.0789C11.2776 13.9298 11.3697 13.7275 11.3697 13.5167V11.1313C11.3697 10.9204 11.2776 10.7182 11.1136 10.5691C10.9495 10.4199 10.7271 10.3362 10.4951 10.3362ZM14.8683 7.15569V5.56545C14.8683 4.51105 14.4075 3.49984 13.5874 2.75427C12.7673 2.0087 11.6549 1.58984 10.4951 1.58984C9.33528 1.58984 8.22294 2.0087 7.40282 2.75427C6.58269 3.49984 6.12195 4.51105 6.12195 5.56545V7.15569C5.42604 7.15569 4.75865 7.40701 4.26657 7.85435C3.77449 8.30169 3.49805 8.90842 3.49805 9.54105V15.1069C3.49805 15.7395 3.77449 16.3463 4.26657 16.7936C4.75865 17.241 5.42604 17.4923 6.12195 17.4923H14.8683C15.5642 17.4923 16.2316 17.241 16.7237 16.7936C17.2157 16.3463 17.4922 15.7395 17.4922 15.1069V9.54105C17.4922 8.90842 17.2157 8.30169 16.7237 7.85435C16.2316 7.40701 15.5642 7.15569 14.8683 7.15569ZM7.87121 5.56545C7.87121 4.93281 8.14766 4.32609 8.63973 3.87874C9.13181 3.4314 9.79921 3.18009 10.4951 3.18009C11.191 3.18009 11.8584 3.4314 12.3505 3.87874C12.8426 4.32609 13.119 4.93281 13.119 5.56545V7.15569H7.87121V5.56545ZM15.7429 15.1069C15.7429 15.3178 15.6508 15.52 15.4867 15.6691C15.3227 15.8183 15.1002 15.902 14.8683 15.902H6.12195C5.88998 15.902 5.66751 15.8183 5.50349 15.6691C5.33946 15.52 5.24731 15.3178 5.24731 15.1069V9.54105C5.24731 9.33018 5.33946 9.12793 5.50349 8.97882C5.66751 8.82971 5.88998 8.74593 6.12195 8.74593H14.8683C15.1002 8.74593 15.3227 8.82971 15.4867 8.97882C15.6508 9.12793 15.7429 9.33018 15.7429 9.54105V15.1069Z"
            fill="#3F3F3F"
          />
        </svg>
        <span className="text-black font-semibold">
          &nbsp;&nbsp;Login&nbsp;
        </span>
        <h1 className="text-secondary">to get access to your account</h1>
      </div>
      <div>
        <Formik
          initialValues={{
            role: selectUdhd,
            user_id: "",
            password: "",
            keep: "true",
            designation: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values: LoginInitialData) => {
            handleLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="">
                <RadioButtons
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  error={errors.role}
                  touched={touched.role}
                  label=""
                  name="role"
                  options={options}
                  className="cursor-pointer mr-1"
                  handler={changeHandler}
                />
                <SelectForNoApi
                  className="mt-2"
                  label=""
                  placeholder={`Select Your Designation`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.designation}
                  error={errors.designation}
                  touched={touched.designation}
                  name={`designation`}
                  data={designations}
                />
                <Input
                  className="mt-2"
                  placeholder="User Id*"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.user_id}
                  error={errors.user_id}
                  touched={touched.user_id}
                  name="user_id"
                />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  name="password"
                  placeholder="Password*"
                  className="mt-2"
                />
                <div className="my-2 flex items-center justify-between">
                  <Checkboxes
                    label="&nbsp;Keep me logged in"
                    name="keep"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.keep}
                    error={errors.keep}
                    touched={touched.keep}
                    className="cursor-pointer"
                  />
                  <span className="cursor-pointer text-xs">
                    Forget password?
                  </span>
                </div>
                <Button
                  className="w-[100%] flex justify-center mt-6"
                  variant="primary"
                  buttontype="submit"
                >
                  Log in
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
