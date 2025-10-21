import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { regex, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^\S+@\S+$/i, "Invalid email address")
    .transform((value) => value.toLowerCase().trim()),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine(
      (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if (!phoneNumber) return false;
        return phoneNumber.isValid();
      },
      {
        message: "Invalid phone number",
      }
    ),
  address: z.string().optional().or(z.literal("")),
  about: z.string().optional().or(z.literal("")),
  socials: z
    .array(
      z.object({
        name: z.enum(["LINKEDIN", "INSTAGRAM", "GITHUB"]),
        link: z.url("Invalid link"),
      })
    )
    .default([]),
});

const countryCodes = {
  IN: "+91",
  US: "+1",
  CA: "+2",
};

const PersonalForm = () => {
  const {
    trigger,
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    getValues,
  } = useForm({
    defaultValues: {
      fullName: "",
      //   countryCode: "IN",
      phone: "",
      email: "",
      address: "",
      about: "",
      socials: [],
    },
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socials",
  });

  const onSubmit = async (data) => {
    console.log("DONE");
    console.log(data);
    setError("root", {
      message: "Error",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col bg-gray-50 md:max-w-[594px] w-full">
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex md:flex-row max-md:flex-col gap-3">
              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="name">
                  Full Name <span className="text-red-900">*</span>
                </Label>

                <div className="gap-y-1 flex flex-col">
                  <Input
                    placeholder="Enter your name"
                    {...register("fullName", {})}
                  />

                  {errors.fullName && (
                    <p className="pb-2 text-red-900">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <Label htmlFor="email">
                  Email <span className="text-red-900">*</span>
                </Label>

                <div className="gap-y-1 flex flex-col">
                  <Input
                    placeholder="Enter your email"
                    {...register("email", {})}
                  />
                  {errors.email && (
                    <p className="pb-2 text-red-900">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Label htmlFor="phone">
              Phone Number <span className="text-red-900">*</span>
            </Label>

            {/* Real time validation using country code and number*/}
            {/* <div className="flex flex-row gap-x-3">
              <Controller
                name="countryCode"
                control={control}
                rules={{
                  required: "Country code is required",
                }}
                render={({ field }) => (
                  <Select
                    onValueChange={(val) => {
                      field.onChange(val);
                      trigger("phone");
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className={"bg-white rounded-sm border-0"}>
                      <SelectItem value="IN">IN (+91)</SelectItem>
                      <SelectItem value="US">US (+1)</SelectItem>
                      <SelectItem value="CA">CA (+2)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Phone is required",
                  validate: (value) => {
                    const countryCode = getValues("countryCode");
                    const prefix = countryCodes[countryCode];
                    const phoneNumber = parsePhoneNumberFromString(
                      `${prefix}${value}`
                    );
                    if (!phoneNumber) return "Invalid phone number format";
                    if (!phoneNumber.isValid()) return "Invalid phone number";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter phone number"
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("phone");
                    }}
                    onKeyDown={(e) => {
                      if (
                        !/[0-9]/.test(e.key) &&
                        ![
                          "Backspace",
                          "Delete",
                          "ArrowLeft",
                          "ArrowRight",
                          "Tab",
                        ].includes(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </div> */}

            <div className="gap-y-1 flex flex-col">
              <Input
                placeholder="Enter your phone (with country code)"
                type={"text"}
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                      "+",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                inputMode="numeric"
                {...register("phone", {})}
              />
              {errors.phone && (
                <p className="pb-2 text-red-900">{errors.phone.message}</p>
              )}
            </div>

            <Label htmlFor="Address">Address</Label>

            <div className="gap-y-1 flex flex-col">
              <Input
                placeholder="Enter your address"
                {...register("address", {})}
              />
              {errors.address && (
                <p className="pb-2 text-red-900">{errors.address.message}</p>
              )}
            </div>

            <Label htmlFor="About">About Me</Label>

            <div className="gap-y-1 flex flex-col">
              <Input
                placeholder="Write something..."
                {...register("about", {})}
              />
              {errors.about && (
                <p className="pb-2 text-red-900">{errors.about.message}</p>
              )}
            </div>

            <Label htmlFor="socials">Social Links</Label>
            <div className={`grid grid-cols-1 md:gap-y-3 md:gap-x-8 gap-3`}>
              {fields.map((obj, index) => (
                <div key={obj.id} className="gap-x-1">
                  <div className="flex items-center gap-x-3">
                    <Input
                      placeholder={`Link`}
                      {...register(`socials.${index}.link`, {})}
                    />

                    <Controller
                      name={`socials.${index}.name`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className={"shadow-none"}>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent
                            className={"bg-white rounded-sm border-0"}
                          >
                            <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                            <SelectItem value="GITHUB">GitHub</SelectItem>
                            <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <div className={`pl-2`}>
                      <Button
                        className={"text-black"}
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div>
                    {errors.socials?.[index]?.link && (
                      <p className="pb-2 text-red-900">
                        {errors.socials?.[index].link.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant={"outline"}
              className={""}
              onClick={() => append({ name: "LINKEDIN" })}
            >
              + Add Social
            </Button>
          </div>
        </div>

        <div className="flex mt-3 justify-between gap-x-3">
          {/* <Button onClick={prev} disabled={currentStep === 1}>
            Prev
          </Button> */}
          {/* <Button onClick={next} disabled={!isCurrentStepValid()}>
            {currentStep === 3 ? "Submit" : "Next"}
          </Button> */}

          <Button className={"bg-gray-900 text-white flex-1"}>Prev</Button>

          <Button
            className={"bg-gray-900 text-white flex-1"}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Next"}
          </Button>
        </div>
        {errors.root && (
          <p className="py-2 text-red-900">{errors.root.message}</p>
        )}
      </div>
    </form>
  );
};

export default PersonalForm;
