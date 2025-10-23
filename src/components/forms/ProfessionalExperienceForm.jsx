import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../common/DatePicker";

const ProfessionalExperienceForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "professionalExperience",
  });

  return (
    <div className="flex flex-col bg-gray-50 w-full">
      {fields.map((obj, index) => (
        <div
          key={obj.id}
          className="flex flex-col gap-3 bg-green-50 p-4 mb-4 rounded-xl"
        >
          <h1 className="text-xl">Work Details {index + 1}</h1>

          <div className="flex md:flex-row max-md:flex-col gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="companyName">Company Name</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Company Name"
                  {...register(
                    `professionalExperience.${index}.companyName`,
                    {}
                  )}
                />

                {errors.professionalExperience?.[index]?.companyName && (
                  <p className="pb-2 text-red-900">
                    {
                      errors.professionalExperience?.[index]?.companyName
                        ?.message
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="companyAddress">Company Address</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Enter company address"
                  {...register(
                    `professionalExperience.${index}.companyAddress`,
                    {}
                  )}
                />
                {errors.professionalExperience?.[index]?.companyAddress && (
                  <p className="pb-2 text-red-900">
                    {
                      errors.professionalExperience?.[index]?.companyAddress
                        ?.message
                    }
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row space-x-3">
              <div className="flex flex-col gap-3 flex-3">
                <Label htmlFor="position">Position</Label>

                <Input
                  placeholder="Enter your position"
                  {...register(`professionalExperience.${index}.position`, {})}
                />
              </div>
            </div>

            {errors.professionalExperience?.[index]?.position && (
              <p className="pb-2 text-red-900">
                {errors.professionalExperience?.[index]?.position?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`professionalExperience.${index}.dates.startDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="endDate">End Date</Label>

                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`professionalExperience.${index}.dates.endDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>
            </div>

            {errors.professionalExperience?.[index]?.dates && (
              <p className="pb-2 text-red-900">
                {errors.professionalExperience?.[index]?.dates.message}
              </p>
            )}
          </div>

          <Label htmlFor="workDescription">Work Description</Label>

          <div className="gap-y-1 flex flex-col">
            <Input
              placeholder="Work Description"
              {...register(
                `professionalExperience.${index}.workDescription`,
                {}
              )}
            />
            {errors.professionalExperience?.[index]?.workDescription && (
              <p className="pb-2 text-red-900">
                {
                  errors.professionalExperience?.[index]?.workDescription
                    .message
                }
              </p>
            )}
          </div>

          <Button
            variant={"outline"}
            className={`w-full mt-1 ${
              fields.length === 1 ? "hidden" : "block"
            }`}
            onClick={() => remove(index)}
          >
            Remove Experience
          </Button>
        </div>
      ))}

      <Button variant={"outline"} className={"w-full"} onClick={() => append()}>
        Add Work Experience
      </Button>

      {errors?.professionalExperience && (
        <p className="pb-2 text-red-900">
          {errors.professionalExperience.message}
        </p>
      )}
    </div>
  );
};

export default ProfessionalExperienceForm;
