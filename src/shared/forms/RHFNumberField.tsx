import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  step?: string;
};

export function RHFNumberField<T extends FieldValues>({
  label,
  name,
  type = "number",
  step = "0.01",
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="form-group">
      <label>{label}</label>

      <input type={type} step={step} {...register(name)} />

      {error && <span className="error">{error}</span>}
    </div>
  );
}
