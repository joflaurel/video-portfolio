import { Chip } from '@/components/ui/chip';
import styles from './skill-tags.module.css';

export function SkillTags({ skills }: { readonly skills: readonly string[] }) {
  return (
    <ul className={styles.tags}>
      {skills.map((skill) => (
        <li key={skill}>
          <Chip>{skill}</Chip>
        </li>
      ))}
    </ul>
  );
}
