interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ value, onChange }: Props) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Category</option>

      <option value="Electronics">Electronics</option>

      <option value="Books">Books</option>

      <option value="Sports">Sports</option>
    </select>
  );
}
