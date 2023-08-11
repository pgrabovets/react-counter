import RemoveItemButton from './RemoveItemButton';

export default function HistoryLog(props) {
  const { saved, onRemove } = props;

  const list = saved.map((item) => {
    const { value, date, id } = item;
    return (
      <li key={id} className='no-bullets d-flex justify-content-between align-items-center'>
        <span>You clicked {value} times</span>
        ({date})
        <RemoveItemButton onRemove={() => onRemove(id)} />
      </li>
    )
  });

  return (
    <div className='history-log pt-4'>
      <div className='history-log-container'>
        <h5>History log:</h5>
        <ul className='list-group'>
          {list}
        </ul>
      </div>
    </div>
  )
}