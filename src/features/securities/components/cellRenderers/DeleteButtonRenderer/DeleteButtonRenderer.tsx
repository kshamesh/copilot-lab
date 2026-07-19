import type { DeleteButtonRendererParams } from "./types";

import styles from "./DeleteButtonRenderer.module.css";

export function DeleteButtonRenderer(props: DeleteButtonRendererParams) {
  const { data, onDelete } = props;

  if (!data) {
    return null;
  }

  return (
    <button className={styles.button} onClick={() => onDelete(data.id)}>
      Delete
    </button>
  );
}
