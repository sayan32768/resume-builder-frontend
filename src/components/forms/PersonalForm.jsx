import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
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
import { Textarea } from "../ui/textarea";
const PersonalForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalDetails.socials",
  });

  return (
    <div className="flex flex-col bg-gray-50 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex md:flex-row max-md:flex-col gap-3">
          <div className="flex flex-col gap-3 flex-1">
            <Label htmlFor="name">
              Full Name <span className="text-red-900">*</span>
            </Label>

            <div className="gap-y-1 flex flex-col">
              <Input
                placeholder="Enter your name"
                {...register("personalDetails.fullName", {})}
              />

              {errors.personalDetails?.fullName && (
                <p className="pb-2 text-red-900">
                  {errors.personalDetails.fullName.message}
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
                {...register("personalDetails.email", {})}
              />
              {errors.personalDetails?.email && (
                <p className="pb-2 text-red-900">
                  {errors.personalDetails.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Label htmlFor="phone">
          Phone Number <span className="text-red-900">*</span>
        </Label>

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
            {...register("personalDetails.phone", {})}
          />
          {errors.personalDetails?.phone && (
            <p className="pb-2 text-red-900">
              {errors.personalDetails.phone.message}
            </p>
          )}
        </div>

        <Label htmlFor="Address">Address</Label>

        <div className="gap-y-1 flex flex-col">
          <Textarea
            placeholder="Enter your address"
            {...register("personalDetails.address", {})}
          />
          {errors.personalDetails?.address && (
            <p className="pb-2 text-red-900">
              {errors.personalDetails.address.message}
            </p>
          )}
        </div>

        <Label htmlFor="About">About Me</Label>

        <div className="gap-y-1 flex flex-col">
          <Textarea
            placeholder="Write something..."
            {...register("personalDetails.about", {})}
          />
          {errors.personalDetails?.about && (
            <p className="pb-2 text-red-900">
              {errors.personalDetails.about.message}
            </p>
          )}
        </div>

        <Label htmlFor="socials">Social Links</Label>
        <div className={`grid grid-cols-1 md:gap-y-3 md:gap-x-8 gap-3`}>
          {fields.map((obj, index) => (
            <div key={obj.id} className="gap-x-1">
              <div className="flex items-center gap-x-3">
                <Input
                  placeholder={`Link`}
                  {...register(`personalDetails.socials.${index}.link`, {})}
                />

                <Controller
                  name={`personalDetails.socials.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ""}
                    >
                      <SelectTrigger className={"shadow-none"}>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent className={"bg-white rounded-sm border-0"}>
                        <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                        <SelectItem value="GITHUB">GitHub</SelectItem>
                        <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                <div className={`pl-2`}>
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
              </div>

              <div>
                {errors.personalDetails?.socials?.[index]?.link && (
                  <p className="pb-2 text-red-900">
                    {errors.personalDetails.socials?.[index].link.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant={"outline"}
          className={"hover:cursor-pointer hover:bg-slate-900 hover:text-white"}
          onClick={() => append({ name: "LINKEDIN" })}
        >
          + Add Social
        </Button>
      </div>
    </div>
  );
};

export default PersonalForm;
