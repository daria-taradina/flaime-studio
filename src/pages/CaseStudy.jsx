import { useParams } from 'react-router-dom';
import CaseStudyTemplate from '../components/media/CaseStudyTemplate';
import { getProject } from '../data/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <main style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <p>Project not found.</p>
      </main>
    );
  }

  return <CaseStudyTemplate project={project} />;
}
