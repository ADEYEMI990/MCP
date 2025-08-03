import { Resume } from '../types/resume';

export default function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <div className="border p-4 mt-4">
      <h2 className="text-xl font-semibold">{resume.name}</h2>
      {/* Additional rendering logic */}
    </div>
  );
}