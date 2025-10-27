import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "../common/DatePicker";

const EducationDetailsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationDetails",
  });

  return (
    <div className="flex flex-col bg-gray-50 w-full">
      {fields.map((obj, index) => (
        <div key={obj.id} className="flex flex-col gap-3 p-0 mb-4 rounded-xl">
          <h1 className="text-xl">Education Details {index + 1}</h1>

          <div className="flex md:flex-row max-md:flex-col gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="name">Name</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Institution Name"
                  {...register(`educationDetails.${index}.name`, {})}
                />

                {errors.educationDetails?.[index]?.name && (
                  <p className="pb-2 text-red-900">
                    {errors.educationDetails?.[index]?.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="degree">
                Degree <span className="text-red-900">*</span>
              </Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Enter your degree"
                  {...register(`educationDetails.${index}.degree`, {})}
                />
                {errors.educationDetails?.[index]?.degree && (
                  <p className="pb-2 text-red-900">
                    {errors.educationDetails?.[index]?.degree.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row space-x-3">
              <div className="flex flex-col gap-3 flex-3">
                <Label htmlFor="score">Score</Label>

                <Input
                  placeholder="Enter your score"
                  {...register(`educationDetails.${index}.grades.score`, {})}
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <Label htmlFor="type">Grade Type</Label>

                <Controller
                  name={`educationDetails.${index}.grades.type`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger className={"shadow-none"}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className={"bg-white rounded-sm border-0"}>
                        <SelectItem value="CGPA">CGPA</SelectItem>
                        <SelectItem value="Percentage">Percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {errors.educationDetails?.[index]?.grades && (
              <p className="pb-2 text-red-900">
                {errors.educationDetails?.[index]?.grades?.message}
              </p>
            )}
          </div>

          <Label htmlFor="message">Additional Info</Label>

          <div className="gap-y-1 flex flex-col">
            <Input
              placeholder="Enter something..."
              {...register(`educationDetails.${index}.grades.message`, {})}
            />
            {errors.educationDetails?.[index]?.grades?.message && (
              <p className="pb-2 text-red-900">
                {errors.educationDetails?.[index]?.grades?.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="startDate">Start Date</Label>
                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`educationDetails.${index}.dates.startDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-y-3">
                <Label htmlFor="endDate">End Date</Label>

                <div className="flex flex-col gap-y-1">
                  <Controller
                    name={`educationDetails.${index}.dates.endDate`}
                    control={control}
                    render={({ field }) => <DatePicker field={field} />}
                  />
                </div>
              </div>
            </div>

            {errors.educationDetails?.[index]?.dates && (
              <p className="pb-2 text-red-900">
                {errors.educationDetails?.[index]?.dates.message}
              </p>
            )}
          </div>

          <Label htmlFor="Location">Location</Label>

          <div className="gap-y-1 flex flex-col">
            <Input
              placeholder="Enter Institution Address"
              {...register(`educationDetails.${index}.location`, {})}
            />
            {errors.educationDetails?.[index]?.location && (
              <p className="pb-2 text-red-900">
                {errors.educationDetails?.[index]?.location.message}
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
            Remove Education
          </Button>
        </div>
      ))}

      <Button variant={"outline"} className={"w-full"} onClick={() => append()}>
        Add Education
      </Button>

      {errors?.educationDetails && (
        <p className="pb-2 text-red-900">{errors.educationDetails.message}</p>
      )}
    </div>
  );
};

export default EducationDetailsForm;
