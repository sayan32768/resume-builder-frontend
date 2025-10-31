import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import AddButtonDotted from "../common/AddButtonDotted";

export const SkillsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value.trim() !== "") {
        append({ skillName: "" });
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      {fields.map((obj, index) => (
        <div key={obj.id}>
          <div className="flex flex-col gap-y-3">
            <Label htmlFor={`skill${index}.name`}>
              Skill {index + 1} <span className="text-red-900">*</span>
            </Label>

            <div className="flex flex-col gap-y-1">
              <div className="flex flex-row gap-4">
                <Input
                  placeholder="Enter a skill"
                  {...register(`skills.${index}.skillName`, {})}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
                <Button
                  className={"text-black hover:cursor-pointer"}
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
              {errors?.skills?.[index]?.skillName && (
                <p className="text-red-900">
                  {errors?.skills?.[index]?.skillName?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {fields.length === 0 ? (
        <AddButtonDotted
          onClick={() => append({ skillName: "" })}
          text="+ Add Skill"
        />
      ) : (
        <Button
          type="button"
          variant={"outline"}
          className={
            "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
          }
          onClick={() => append({ skillName: "" })}
        >
          + Add a skill
        </Button>
      )}
    </div>
  );
};
