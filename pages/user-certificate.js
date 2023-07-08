import React, {useState} from "react";
import { useForm } from "react-hook-form";

const UserCertificate = () => {
  const [language, setLanguage] = useState("हिंदी");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const mobileValue = getValues("mobileNo");

  const onSubmit = (data) => {
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="w-full">
            <img
              src="../logo.svg"
              className="w-[139px] h-[125px] block text-center mx-auto"
            />
          </div>
          <h2 className="main-heading text-center popup-title mt-[40px]">
            Generate Your Certificate
          </h2>

          <div className="relative mt-[40px] flex flex-col items-center">
            <div className="change-number-wrap flex justify-between under-verifying">
              <label
                htmlFor="mobile_no"
                className="block mb-4 text-base font-semibold text-[#034729]"
              >
                Please Enter Registered mobile number
                <span style={{ color: "#e50000" }}>*</span>
              </label>
            </div>
            <div className="relative">
              <input
                min={0}
                type="number"
                id="mobile_no"
                {...register("mobileNo", {
                  required: {
                    value: true,
                    message: "Mobile Number is required",
                  },
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile Number should be exactly 10 digits",
                  },
                })}
                name="mobileNo"
                className="input-field bg-transparent border border-[#CFCDB4] text-[#034729] font-normal text-sm rounded-lg focus:outline-none focus:border-[#034729] block w-full p-4 pr-16"
                placeholder="mobile no"
                onChange={(e) => {
                  setValue("mobileNo", e?.target?.value, {
                    shouldValidate: true,
                  });
                }}
                onBlur={(e) => {
                  setValue("mobileNo", e?.target?.value, {
                    shouldValidate: true,
                  });
                }}
              />
            </div>
            <div className="invalid-feedback" style={{ display: "block" }}>
              {errors?.mobileNo && (
                <p style={{ color: "red" }}>{errors?.mobileNo?.message}</p>
              )}
            </div>
          </div>

          <div className="relative max-w-[574px] mx-auto mt-[60px]  ">
            <div className="change-number-wrap flex justify-center under-verifying">
              <label
                htmlFor="mobile_no"
                className="block mb-4 text-base font-semibold text-[#034729]"
              >
                Please Choose the Certificate Language
                <span style={{ color: "#e50000" }}>*</span>
              </label>
            </div>
            <div className="flex gender-select">
              <label className="rounded-0 text-white cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  className="d-none"
                  checked={language === "हिंदी"}
                  onChange={() => setLanguage("हिंदी")}
                />
                <span className="text-center d-block py-3">हिंदी</span>
              </label>
              <label className="rounded-0 text-white cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  className="d-none"
                  checked={language === "English"}
                  onChange={() => setLanguage("English")}
                />
                <span className="text-center d-block py-3">English</span>
              </label>
              <label className="rounded-0 text-white cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  className="d-none"
                  checked={language === "ગુજરાતી"}
                  onChange={() => setLanguage("ગુજરાતી")}
                />
                <span className="text-center d-block py-3">ગુજરાતી</span>
              </label>
              <label className="rounded-0 text-white cursor-pointer">
                <input
                  type="radio"
                  name="toggle"
                  className="d-none"
                  checked={language === "मराठी"}
                  onChange={() => setLanguage("मराठी")}
                />
                <span className="text-center d-block py-3">मराठी</span>
              </label>
            </div>
          </div>
          <div className="mt-[40px] flex justify-center">
            <button
              className={
                errors.mobileNo === undefined && mobileValue !== undefined
                  ? "flex items-center gap-[10px] justify-center cursor-pointer"
                  : "flex items-center gap-[10px] justify-center pointer-events-none opacity-60"
              }
              type="submit"
            >
              {" "}
              <span className="continue">Continue</span>{" "}
              <span>
                <img src="../images/right-arrow-icon.svg" />
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCertificate;
