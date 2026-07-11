import FadeIn from '../../components/ui/FadeIn';
import DragGallery from '../../components/media/DragGallery';
import Section from '../../components/layout/Section';
import Button from '../../components/ui/Button';
import { GALLERY_ITEMS, WORKS_BLURB } from '../../data/home';
import styles from './SelectedWorks.module.css';

export default function SelectedWorks() {
  return (
    <Section theme="dark" container={false} className={styles.works}>
      <FadeIn>
        <DragGallery items={GALLERY_ITEMS} ratio="9 / 16" showOverlay={false} />
      </FadeIn>

      <div className={`container ${styles.worksFooter}`}>
        <FadeIn className={styles.worksBlurb}>
          <p>{WORKS_BLURB}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Button to="/work" size="sm">See More Work ↗</Button>
        </FadeIn>
      </div>
    </Section>
  );
}
