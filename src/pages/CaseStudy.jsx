import { useParams } from 'react-router-dom';
import CaseStudyTemplate from '../components/CaseStudyTemplate';
import { getProject } from '../data/projects';

/**
 * Assumes a route like:
 *   <Route path="/work/:slug" element={<CaseStudy />} />
 *
 * and that your Work page cards link with e.g. <Link to={`/work/${slug}`}>.
 * If your router is set up differently, just swap how `slug` is read below.
 */
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