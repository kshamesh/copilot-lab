import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Select from "./Select";
import type { Option } from "./Select";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: Option[];
};

export function RHFSelect<T extends FieldValues>({
  label,
  name,
  options,
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string;

  return (
    <div className="form-group">
      <label>{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            options={options}
          />
        )}
      />

      {error && <span className="error">{error}</span>}
    </div>
  );
}
