import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DatePicker } from "../common/DatePicker";
import AddButtonDotted from "../common/AddButtonDotted";

const OtherExperienceForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherExperience",
  });

  return (
    <div className="flex flex-col bg-gray-50 w-full">
      {fields.map((obj, index) => (
        <div key={obj.id} className="flex flex-col gap-3 p-0 mb-4 rounded-xl">
          <h1 className="text-xl">Other Experience Details {index + 1}</h1>

          <div className="flex md:flex-row max-md:flex-col gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="companyName">
                Organization Name <span className="text-red-900">*</span>
              </Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Organization Name"
                  {...register(`otherExperience.${index}.companyName`, {})}
                />

                {errors.otherExperience?.[index]?.companyName && (
                  <p className="pb-2 text-red-900">
                    {errors.otherExperience?.[index]?.companyName?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="companyAddress">Organization Address</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Enter organization address"
                  {...register(`otherExperience.${index}.companyAddress`, {})}
                />
                {errors.otherExperience?.[index]?.companyAddress && (
                  <p className="pb-2 text-red-900">
                    {errors.otherExperience?.[index]?.companyAddress?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row space-x-3">
              <div className="flex flex-col gap-3 flex-3">
                <Label htmlFor="position">Your Role</Label>

                <Input
                  placeholder="Enter your role"
                  {...register(`otherExperience.${index}.position`, {})}
                />
              </div>
            </div>

            {errors.otherExperience?.[index]?.position && (
              <p className="pb-2 text-red-900">
                {errors.otherExperience?.[index]?.position?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`otherExperience.${index}.dates.startDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="endDate">End Date</Label>

                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`otherExperience.${index}.dates.endDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>
            </div>

            {errors.otherExperience?.[index]?.dates && (
              <p className="pb-2 text-red-900">
                {errors.otherExperience?.[index]?.dates.message}
              </p>
            )}
          </div>

          <Label htmlFor="workDescription">Description</Label>

          <div className="gap-y-1 flex flex-col">
            <Input
              placeholder="Description"
              {...register(`otherExperience.${index}.workDescription`, {})}
            />
            {errors.otherExperience?.[index]?.workDescription && (
              <p className="pb-2 text-red-900">
                {errors.otherExperience?.[index]?.workDescription.message}
              </p>
            )}
          </div>

          <Button
            variant={"outline"}
            className={`w-full mt-1`}
            onClick={() => remove(index)}
          >
            Remove Experience
          </Button>
        </div>
      ))}

      {fields.length === 0 ? (
        <AddButtonDotted
          onClick={() => append()}
          text="+ Add Other Experience"
        />
      ) : (
        <Button
          variant={"outline"}
          className={"w-full"}
          onClick={() => append()}
        >
          + Add Other Experience
        </Button>
      )}

      {errors?.otherExperience && (
        <p className="pb-2 text-red-900">{errors.otherExperience.message}</p>
      )}
    </div>
  );
};

export default OtherExperienceForm;
