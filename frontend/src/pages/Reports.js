import { PageHeader, Card } from '../components/UI';

export default function Reports() {
  return (
    <div className="page reports">
      <PageHeader
        title="Reports"
        subtitle="Holistic growth reports — not just grade sheets"
      />

      <div className="reports-grid">
        <Card>
          <h2>Class Growth Report</h2>
          <p className="card-desc">
            Summary of development across all five integral dimensions for Class 8A.
          </p>
          <button type="button" className="btn btn-secondary">Generate PDF</button>
        </Card>

        <Card>
          <h2>Individual Student Report</h2>
          <p className="card-desc">
            Detailed profile including academic progress, skills, personal growth, and teacher notes.
          </p>
          <button type="button" className="btn btn-secondary">Generate PDF</button>
        </Card>

        <Card>
          <h2>Parent Summary</h2>
          <p className="card-desc">
            Development-focused report designed for parent-teacher conversations.
          </p>
          <button type="button" className="btn btn-secondary">Generate PDF</button>
        </Card>
      </div>
    </div>
  );
}
