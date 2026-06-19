import {
  get,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
};

export function RHFTextField<T extends FieldValues>({
  label,
  name,
  type = "text",
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const error = get(errors, name)?.message as string | undefined;
  return (
    <div className="form-group">
      <label>{label}</label>

      <input type={type} {...register(name)} />

      {error && <span className="error">{error}</span>}
    </div>
  );
}
