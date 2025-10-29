import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AddButtonDotted from "../common/AddButtonDotted";
import { Textarea } from "../ui/textarea";

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
                  className={"text-black hover:cursor-pointer"}
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
        className={
          "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
        }
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
            <h1 className="text-xl mb-3">Project {index + 1} Details</h1>
            <div className="flex flex-col gap-y-3 rounded-2xl">
              <Label>
                Project Title <span className="text-red-900">*</span>
              </Label>
              <div className="flex flex-col gap-y-1">
                <Input {...register(`projects.${index}.title`, {})} />
                {errors.projects?.[index]?.title && (
                  <p className="text-red-900">
                    {errors.projects?.[index]?.title?.message}
                  </p>
                )}
              </div>

              <Label>
                Project Description <span className="text-red-900">*</span>
              </Label>
              <div className="flex flex-col gap-y-1">
                <Textarea {...register(`projects.${index}.description`, {})} />
                {errors.projects?.[index]?.description && (
                  <p className="text-red-900">
                    {errors.projects?.[index]?.description?.message}
                  </p>
                )}
              </div>

              <Label>Extra Details</Label>
              <div className="flex flex-col gap-y-1">
                <Textarea {...register(`projects.${index}.extraDetails`, {})} />
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
                className={
                  "w-full hover:bg-slate-900 hover:text-white hover:cursor-pointer"
                }
                onClick={() => remove(index)}
              >
                Remove Project
              </Button>

              <hr
                className={`my-8 border-t border-gray-400 ${
                  fields.length === 1 ? "hidden" : "block"
                }`}
              />
            </div>
          </div>
        );
      })}

      {fields.length === 0 ? (
        <AddButtonDotted onClick={() => append()} text="+ Add Project" />
      ) : (
        <Button
          type="button"
          variant={"outline"}
          className={"hover:bg-slate-900 hover:text-white hover:cursor-pointer"}
          onClick={(e) => {
            e.preventDefault();
            append();
          }}
        >
          + Add Project
        </Button>
      )}
    </div>
  );
};

export default ProjectsForm;
