import type { CustomCellEditorProps } from "ag-grid-react";

import styles from "./CommentsCellEditor.module.css";

interface CommentsEditorParams {
  maxLength?: number;

  placeholder?: string;
}

export function CommentsCellEditor(
  props: CommentsEditorParams & CustomCellEditorProps<string>,
) {
  const { maxLength, placeholder } = props;
  return (
    <input
      className={styles.input}
      maxLength={maxLength}
      placeholder={placeholder}
      value={props.value ?? ""}
      autoFocus
      onChange={(event) => props.onValueChange(event.target.value)}
    />
  );
}
