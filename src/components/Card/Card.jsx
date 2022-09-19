export const Card = ({data: {title, datetime, creator, description, type, priority},
}) => (
    <div className="card">
        <div className="close">Eliminar</div>
        <h3>{title}</h3>
        <h6>{datetime}</h6>
        <h5>{creator} </h5>
        <button type="button">{type}</button>
        <button type="button">{priority}</button>
        <p>{description}</p>
    </div>
    )