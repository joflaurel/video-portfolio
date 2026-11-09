import type { Filter, FilterOption } from '@/lib/gallery';
import styles from './filter-pills.module.css';

interface FilterPillsProps {
  readonly options: readonly FilterOption[];
  readonly selected: Filter;
  readonly onSelect: (filter: Filter) => void;
}

/** Scrolling row of category buttons, each with its video count. */
export function FilterPills({ options, selected, onSelect }: FilterPillsProps) {
  return (
    <div className={styles.pills} role="group" aria-label="Filter videos by category">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={styles.pill}
          aria-pressed={option.id === selected}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
          <small>{option.count}</small>
        </button>
      ))}
    </div>
  );
}
