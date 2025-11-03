import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import { DatePicker } from "../common/DatePicker";
import AddButtonDotted from "../common/AddButtonDotted";

const CertificationForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  return (
    <div className="flex flex-col bg-gray-50 w-full">
      {fields.map((obj, index) => (
        <div key={obj.id} className="flex flex-col gap-3 mb-4 rounded-xl">
          <h1 className="text-xl">Certification Details {index + 1}</h1>

          <div className="flex md:flex-col max-md:flex-col gap-3">
            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="issuingAuthority">Issuing Authority</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Issuing Authority"
                  {...register(`certifications.${index}.issuingAuthority`, {})}
                />

                {errors.certifications?.[index]?.issuingAuthority && (
                  <p className="pb-2 text-red-900">
                    {errors.certifications?.[index]?.issuingAuthority.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="title">Title</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Enter Certification Title"
                  {...register(`certifications.${index}.title`, {})}
                />
                {errors.certifications?.[index]?.title && (
                  <p className="pb-2 text-red-900">
                    {errors.certifications?.[index]?.title.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-y-3">
              <Label htmlFor="issueDate">Issue Date</Label>
              <div className="flex flex-col gap-y-1">
                <Controller
                  name={`certifications.${index}.issueDate`}
                  control={control}
                  render={({ field }) => <DatePicker field={field} />}
                />
                {errors.certifications?.[index]?.issueDate && (
                  <p className="pb-2 text-red-900">
                    {errors.certifications?.[index]?.issueDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <Label htmlFor="link">Link</Label>

              <div className="gap-y-1 flex flex-col">
                <Input
                  placeholder="Enter a link"
                  {...register(`certifications.${index}.link`, {})}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.certifications?.[index]?.link && (
                  <p className="pb-2 text-red-900">
                    {errors.certifications?.[index]?.link.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Button
            variant={"outline"}
            className={`w-full mt-1 hover:bg-slate-900 hover:text-white hover:cursor-pointer`}
            onClick={() => remove(index)}
          >
            Remove Certification
          </Button>

          <hr
            className={`my-8 border-t border-gray-400 ${
              fields.length === 1 ? "hidden" : "block"
            }`}
          />
        </div>
      ))}

      {fields.length === 0 ? (
        <AddButtonDotted onClick={() => append()} text="+ Add Certification" />
      ) : (
        <Button
          variant={"outline"}
          className={
            "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
          }
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          Add Certification
        </Button>
      )}

      {errors?.certifications && (
        <p className="pb-2 text-red-900">{errors.certifications?.message}</p>
      )}
    </div>
  );
};

export default CertificationForm;
