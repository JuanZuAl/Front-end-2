function StatCard({ title, total }) {
        return (
            <div className="stat-card">
                <h3>{title}</h3>
                <p>{total}</p>
            </div>
        );
    }
export default StatCard;