import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LinksSection = ({ index }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: linkFields,
    append: linkAppend,
    remove: linkRemove,
  } = useFieldArray({
    control,
    name: `projects.${index}.links`,
  });

  return (
    <div className="flex flex-col gap-y-3">
      {linkFields.map((object, idx) => (
        <div key={object.id} className="flex flex-col gap-3">
          <Label>Project Link</Label>

          <div className="flex flex-col gap-y-1">
            <div className="flex flex-row gap-x-3">
              <Input
                placeholder={`Project Link ${idx + 1}`}
                {...register(`projects.${index}.links.${idx}.link`, {})}
              />

              <div className={`pl-2`}>
                <Button
                  className={"text-black"}
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => linkRemove(idx)}
                >
                  Remove
                </Button>
              </div>
            </div>
            {errors.projects?.[index]?.links?.[idx]?.link && (
              <p className="text-red-900">
                {errors.projects?.[index]?.links?.[idx]?.link.message}
              </p>
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant={"outline"}
        className={"w-full"}
        onClick={() => linkAppend({ link: "" })}
      >
        + Add Link
      </Button>
    </div>
  );
};

const ProjectsForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="flex flex-col gap-y-5">
      {fields.map((obj, index) => {
        return (
          <div key={obj.id}>
            <div className="flex flex-col gap-y-3 rounded-2xl bg-green-100 p-3">
              <Label>Project Title</Label>
              <div className="flex flex-col gap-y-1">
                <Input {...register(`projects.${index}.title`, {})} />
                {errors.projects?.[index]?.title && (
                  <p className="text-red-900">
                    {errors.projects?.[index]?.title?.message}
                  </p>
                )}
              </div>

              <Label>Project Description</Label>
              <div className="flex flex-col gap-y-1">
                <Input {...register(`projects.${index}.description`, {})} />
                {errors.projects?.[index]?.description && (
                  <p className="text-red-900">
                    {errors.projects?.[index]?.description?.message}
                  </p>
                )}
              </div>

              <Label>Extra Details</Label>
              <div className="flex flex-col gap-y-1">
                <Input {...register(`projects.${index}.extraDetails`, {})} />
                {errors.projects?.[index]?.extraDetails && (
                  <p className="text-red-900">
                    {errors.projects?.[index]?.extraDetails?.message}
                  </p>
                )}
              </div>

              <LinksSection index={index} />

              <Button
                type="button"
                variant={"outline"}
                className={"w-full"}
                onClick={() => remove(index)}
              >
                Remove Project
              </Button>
            </div>
          </div>
        );
      })}
      <Button
        type="button"
        variant={"outline"}
        className={""}
        onClick={() => append()}
      >
        + Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
