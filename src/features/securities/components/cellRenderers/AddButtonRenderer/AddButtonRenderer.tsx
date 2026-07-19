import type { AddButtonRendererParams } from "./types";

import styles from "./AddButtonRenderer.module.css";

export function AddButtonRenderer(props: AddButtonRendererParams) {
  const { data, onAdd, alreadyAddedIds } = props;

  if (!data) {
    return null;
  }

  const disabled = alreadyAddedIds.has(data.id);

  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={() => onAdd(data)}
    >
      Add
    </button>
  );
}
