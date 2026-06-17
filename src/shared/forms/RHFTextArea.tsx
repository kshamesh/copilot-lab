import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
};

export function RHFTextarea<T extends FieldValues>({ label, name }: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string;

  return (
    <div className="form-group">
      <label>{label}</label>

      <textarea {...register(name)} />

      {error && <span className="error">{error}</span>}
    </div>
  );
}
