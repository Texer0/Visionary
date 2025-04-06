import Task from "../Task/Task"

function ListOfTasks({title, color, tasks }) {
    let taskAmount = [
        { title: 'Stage', color: '#FF1200', date_expiration: '28-Oct'},
        { title: 'In progress', color: '#aaaa11', date_expiration: '8-Jul'},
        { title: 'Completed', color: '#216E4E', date_expiration: '1-Apr'}
    ]

    const components = tasks?.map((item, index) => (
        <Task title={item.color} color={item.color} date_expiration={item.date_expiration} ></Task>
      ))


    return (
        <div className={`p-4 pt-1 h-[80vh] w-[36vh] rounded-[60px] m-6 border-[${color}] border-4
        bg-[${color}] shadow-[0px_0px_10px_10px_rgba(0,0,0,0.3)] bg-opacity-50 relative`}>
            
            <button className="bg-transparent text-4xl p-0 absolute pt-2 ml-3">+</button>
            <div className="text-white font-bold text-2xl mt-4 inline-flex items-center w-full">
                <span className="mx-auto">{title}</span>
            </div>
            <div className="h-[85%] overflow-y-auto">
                {components}
            </div>
        </div>
    )
}

export default ListOfTasks